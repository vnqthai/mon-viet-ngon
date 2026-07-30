/**
 * SOI LIÊN KẾT CHÉO giữa các trang món — đọc HTML ĐÃ BUILD trong dist/, không
 * đọc lại code sinh ra nó. Chạy sau `npm run build`:
 *
 *     npm run link-audit
 *
 * Vì sao đọc dist/ chứ không gọi thẳng relatedFor(): gọi lại chính hàm đó rồi
 * đo là tự chấm điểm mình, hỏng ở khâu dựng trang thì không thấy. Đây đo đúng
 * thứ người đọc nhận được.
 *
 * Bốn con số cần canh (mốc 64 món, 6 gợi ý/món = 384 liên kết):
 *   mồ côi 0   · dải trùng 0   · mảnh đồ thị 1   · mỗi món đủ 6 ô
 * Ba số đầu tụt là dấu hiệu catalog mới thêm đã phá thế cân của dải gợi ý —
 * xem lại src/utils/related.ts trước khi ship.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist/mon';
if (!fs.existsSync(DIST)) {
  console.error('Chưa có dist/mon — chạy `npm run build` trước đã.');
  process.exit(1);
}

/* Cắt đúng khối <section class="section related"> … </section> rồi nhặt href.
   Trong khối đó không có <section> lồng nhau nên tìm thẻ đóng đầu tiên là đủ. */
const OPEN = '<section class="section related"';
function stripLinks(html) {
  const i = html.indexOf(OPEN);
  if (i < 0) return null;
  const j = html.indexOf('</section>', i);
  const block = html.slice(i, j);
  return [...block.matchAll(/href="\/mon\/([^/"]+)\/"/g)].map((m) => m[1]);
}

const links = new Map();
const missing = [];
for (const dir of fs.readdirSync(DIST).sort()) {
  const file = path.join(DIST, dir, 'index.html');
  if (!fs.existsSync(file)) continue; // dist/mon/index.html — trang danh mục
  const found = stripLinks(fs.readFileSync(file, 'utf8'));
  if (found === null) { missing.push(dir); continue; }
  links.set(dir, found);
}

const slugs = [...links.keys()];
const N = slugs.length;
const edges = [...links.values()].reduce((s, v) => s + v.length, 0);

/* --- mồ côi --- */
const inDeg = new Map(slugs.map((s) => [s, 0]));
for (const [, tos] of links) for (const t of tos) inDeg.set(t, (inDeg.get(t) ?? 0) + 1);
const orphans = [...inDeg].filter(([, n]) => n === 0).map(([s]) => s);

/* --- dải thiếu ô / trỏ vào chính nó / trỏ trùng trong cùng dải --- */
const short = [...links].filter(([, v]) => v.length !== 6);
const selfRef = [...links].filter(([s, v]) => v.includes(s));
const dupInStrip = [...links].filter(([, v]) => new Set(v).size !== v.length);

/* --- cặp qua lại --- */
let mutual = 0;
for (const [from, tos] of links) for (const t of tos) if (from < t && links.get(t)?.includes(from)) mutual++;

/* --- dải trùng y hệt (so dạng tập) --- */
const sig = new Map();
for (const [from, tos] of links) {
  const k = [...tos].sort().join('|');
  if (!sig.has(k)) sig.set(k, []);
  sig.get(k).push(from);
}
const dupStrips = [...sig.values()].filter((g) => g.length > 1);

/* --- đồ thị vỡ thành mấy mảnh (coi liên kết là hai chiều) --- */
const par = new Map(slugs.map((s) => [s, s]));
const find = (x) => (par.get(x) === x ? x : (par.set(x, find(par.get(x))), par.get(x)));
for (const [from, tos] of links) for (const t of tos) if (par.has(t)) par.set(find(from), find(t));
const comps = new Set(slugs.map(find)).size;

const degs = [...inDeg.values()].sort((a, b) => a - b);
const hot = [...inDeg].sort((a, b) => b[1] - a[1]).slice(0, 3);

console.log(`SOI LIÊN KẾT CHÉO — dist/mon/`);
console.log(`  ${N} trang món · ${edges} liên kết · ${(edges / N).toFixed(1)} ô/món`);

const bad = [];
const ok = (label, pass, detail) => {
  console.log(`  ${pass ? '✓' : '✗'} ${label}${detail ? ' — ' + detail : ''}`);
  if (!pass) bad.push(label);
};

ok('không món nào thiếu dải gợi ý', missing.length === 0, missing.length ? missing.join(', ') : '');
ok('mọi dải đủ 6 ô', short.length === 0, short.map(([s, v]) => `${s}:${v.length}`).join(', '));
ok('không dải nào trỏ vào chính món đó', selfRef.length === 0, selfRef.map(([s]) => s).join(', '));
ok('không ô nào lặp trong cùng dải', dupInStrip.length === 0, dupInStrip.map(([s]) => s).join(', '));
ok('không món nào mồ côi', orphans.length === 0, orphans.join(', '));
ok('không hai món nào có dải y hệt nhau', dupStrips.length === 0,
  dupStrips.slice(0, 3).map((g) => g.join(' = ')).join(' | '));
ok('catalog liền một mảnh', comps === 1, `${comps} mảnh`);

console.log(`  · in-degree ${degs[0]}–${degs[degs.length - 1]} (giữa ${degs[Math.floor(degs.length / 2)]})`);
console.log(`  · được trỏ nhiều nhất: ${hot.map(([s, n]) => `${s} ×${n}`).join(' · ')}`);
console.log(`  · cặp trỏ qua trỏ lại: ${mutual} (${Math.round((mutual * 2 * 100) / edges)}% số liên kết)`);

if (bad.length) {
  console.error(`\n✗ ${bad.length} chỗ hỏng — sửa src/utils/related.ts rồi build lại.`);
  process.exit(1);
}
console.log('  ✓ sạch');
