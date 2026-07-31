/**
 * SOI `id` TRÙNG CHÉO GIỮA CÁC FILE HÌNH — src/components/art/
 *
 *   node tools/check-art-ids.mjs
 *
 * Vì sao cần: `id` trong SVG là toàn cục cho cả tài liệu, nên hai file art lỡ
 * đặt trùng một `id` là `url(#…)` của file sau ăn nhầm gradient/clipPath của
 * file trước. Hỏng hoàn toàn âm thầm — build xanh, chỉ có màu là sai.
 *
 * ⚠️ Từ đợt 10, hình ra file .svg riêng (/art/<kind>.svg) nên mỗi hình là một
 * tài liệu riêng, id hết đè nhau trên /mon/. Giữ phép kiểm này làm chốt phòng
 * xa vì nó vẫn bắt lỗi thật ở hai chỗ: `art-png.mjs --sheet` ghép nhiều hình
 * vào MỘT tài liệu, và nếu có ngày quay lại nhúng thẳng thì lỗi tái xuất ngay.
 *
 * Kiểm luôn bốn chỗ nối dễ đứt khi thêm món:
 *   art trong enum ⟷ ART_COMPONENT trong utils/art.ts ⟷ file component có thật
 *   ⟷ viewBox "0 0 520 470" (ArtImg đặt cứng width/height theo đó)
 *
 * Và soi GIÁ TRỊ MÀU (thêm ở đợt 11) — xem chú thích tại chỗ. Chủ đề chung của
 * mọi phép kiểm trong file này: bắt đúng loại lỗi KHÔNG làm build đỏ, không làm
 * trang vỡ, chỉ âm thầm ra sai màu. Loại lỗi đó không có ai báo ngoài file này.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readArtMap } from './art-map.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ART_DIR = path.join(ROOT, 'src/components/art');
const RECIPE_DIR = path.join(ROOT, 'src/content/recipes');
const CONFIG = path.join(ROOT, 'src/content.config.ts');
const ART_TS = path.join(ROOT, 'src/utils/art.ts');

const problems = [];
const warnings = [];
const fail = (msg) => problems.push(msg);
const warn = (msg) => warnings.push(msg);

/* ---------- Đọc mọi file hình ---------- */
const artFiles = fs
  .readdirSync(ART_DIR)
  .filter((f) => f.endsWith('.astro') && f !== 'ArtImg.astro');

const owners = new Map();   // id -> [file, …]
let totalIds = 0;

for (const f of artFiles) {
  const src = fs.readFileSync(path.join(ART_DIR, f), 'utf8');
  const ids = [...src.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);

  /* Soi đúng thứ endpoint xuất ra: phần <svg>…</svg>, đã bỏ chú thích. */
  const body = ((src.match(/<svg[\s\S]*<\/svg>/) || [''])[0]).replace(/<!--[\s\S]*?-->/g, '');
  if (!body) fail(`${f}: không tìm thấy khối <svg>…</svg>`);

  /* Hình ra file .svg riêng rồi thì <img> phải biết trước tỉ lệ, không thì chữ
     dưới thẻ bị đẩy lúc hình tải xong. ArtImg đặt cứng 520×470 cho mọi hình. */
  const vb = (body.match(/viewBox="([^"]+)"/) || [])[1];
  if (vb !== '0 0 520 470') fail(`${f}: viewBox "${vb}" — mọi hình phải là "0 0 520 470" (ArtImg.astro đặt cứng width/height theo đó)`);
  if (/currentColor|var\(--/.test(body)) fail(`${f}: dùng currentColor / var(--…) — CSS ngoài không với vào trong <img> được`);

  /* File .svg rời được đọc bằng bộ phân tích XML NGHIÊM, khác HTML dễ dãi: một
     dấu & trần (vd trong aria-label) là cả hình chết, mà build vẫn xanh.
     Chú thích chứa "--" cũng từng làm chết ca-kho.svg — chỗ đó chữa tận gốc rồi
     (endpoint bỏ hết chú thích), còn dấu & thì phải soi ở đây. */
  if (/&(?!(#\d+|#x[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);)/.test(body))
    fail(`${f}: có dấu & trần trong <svg> — file .svg rời là hỏng cả hình, phải viết &amp;`);

  /* GIÁ TRỊ MÀU — bắt một lỗi CÂM HOÀN TOÀN mà phép kiểm cũ không thấy: ký tự
     ngoài ASCII lọt vào mã hex (`#3E1F४8`, `#B79A६E` — chữ số Devanagari trông
     gần giống chữ số Latin). SVG vẫn parse, hình vẫn hiện, build xanh, qa sạch
     — chỉ có màu là im lặng rơi về mặc định. Đợt 11 dính bốn lần trong một phiên
     và chỉ phát hiện nhờ tình cờ soi lại bằng tay.
     Bốn dạng dưới đây phủ đúng 100% giá trị đang có trong các file art, nên phép
     kiểm này chặt mà không báo nhầm. Nhà này viết hex 6 ký tự; hex 3 vẫn cho qua
     vì SVG chấp nhận, còn màu đặt tên (`red`, `white`) thì cố ý KHÔNG cho —
     bảng màu nằm ở tokens.css, đừng đẻ tên màu rời rạc trong hình. */
  const COLOR_OK = /^(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6}|none|rgba?\([0-9,.\s]*\)|url\(#[A-Za-z0-9_-]+\))$/;
  for (const m of body.matchAll(/\b(fill|stroke|stop-color)="([^"]*)"/g)) {
    if (COLOR_OK.test(m[2])) continue;
    const why = /[^\x00-\x7F]/.test(m[2])
      ? 'có ký tự ngoài ASCII lọt vào mã hex — màu sẽ âm thầm rơi về mặc định'
      : 'phải là hex 6 ký tự · none · rgb/rgba · url(#id); màu đặt tên thì không dùng ở đây';
    fail(`${f}: ${m[1]}="${m[2]}" ${why}`);
  }

  const seenHere = new Set();
  for (const id of ids) {
    if (seenHere.has(id)) fail(`${f}: id "${id}" khai hai lần trong cùng file`);
    seenHere.add(id);
    if (!owners.has(id)) owners.set(id, []);
    owners.get(id).push(f);
  }
  totalIds += seenHere.size;

  /* Tham chiếu phải trỏ vào id có thật TRONG CÙNG FILE — trỏ ra ngoài file thì
     trên trang món (chỉ nhúng một hình) sẽ mất hẳn gradient. */
  const refs = new Set([
    ...[...src.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]),
    ...[...src.matchAll(/\bhref="#([^"]+)"/g)].map((m) => m[1]),
  ]);
  for (const r of refs) {
    if (!seenHere.has(r)) fail(`${f}: trỏ tới #${r} nhưng file này không khai id đó`);
  }
  for (const id of seenHere) {
    if (!refs.has(id)) warn(`${f}: id "${id}" khai rồi mà không ai dùng`);
  }
}

for (const [id, list] of owners) {
  if (list.length > 1) {
    fail(`id "${id}" dùng chung ở ${list.length} file: ${list.join(', ')} — trên /mon/ chúng đè lên nhau`);
  }
}

/* ---------- enum art ⟷ utils/art.ts ⟷ file component ---------- */
const configSrc = fs.readFileSync(CONFIG, 'utf8');
const at = configSrc.indexOf('art: z');
const open = configSrc.indexOf('.enum([', at);
const close = configSrc.indexOf('])', open);
const artEnum = [...configSrc.slice(open, close).matchAll(/'([^']+)'/g)].map((m) => m[1]);

const rendered = readArtMap(ART_TS);

for (const k of artEnum) {
  if (!rendered[k]) fail(`art "${k}" có trong enum nhưng ART_COMPONENT (utils/art.ts) không có dòng nào`);
}
for (const k of Object.keys(rendered)) {
  if (!artEnum.includes(k)) fail(`utils/art.ts khai "${k}" nhưng enum art không có giá trị đó`);
  if (!fs.existsSync(path.join(ART_DIR, rendered[k] + '.astro'))) fail(`không có file ${rendered[k]}.astro`);
}

/* ---------- Món nào chưa gắn art riêng ---------- */
const recipes = fs.readdirSync(RECIPE_DIR).filter((f) => f.endsWith('.yaml') && !f.startsWith('_'));
const GENERIC = ['bowl', 'claypot', 'plate', 'rolls'];
const usedArts = new Set();
for (const f of recipes) {
  const src = fs.readFileSync(path.join(RECIPE_DIR, f), 'utf8');
  const m = src.match(/^art:\s*(\S+)\s*$/m);
  if (!m) warn(`${f}: chưa gắn art riêng — sẽ rơi về hình dự phòng theo kiểu món`);
  else usedArts.add(m[1]);
}
for (const k of artEnum) {
  if (!usedArts.has(k) && !GENERIC.includes(k)) warn(`art "${k}" chưa món nào dùng`);
}

/* ---------- Báo cáo ---------- */
console.log('SOI ID HÌNH — src/components/art/');
console.log(`  ${artFiles.length} file hình · ${totalIds} id · ${artEnum.length} giá trị trong enum art`);
for (const w of warnings) console.log(`  · ${w}`);
if (!problems.length) {
  console.log('  ✓ sạch — không id nào trùng chéo file, mọi tham chiếu nằm đúng trong file của nó');
  process.exit(0);
}
console.log(`\n  ✗ ${problems.length} lỗi:`);
for (const p of problems) console.log(`    ${p}`);
process.exit(1);
