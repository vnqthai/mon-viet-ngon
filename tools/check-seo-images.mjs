/**
 * SOI ĐÁNH DẤU JSON-LD + ẢNH TÌM KIẾM — đọc HTML ĐÃ BUILD trong dist/, không
 * đọc lại code sinh ra nó. Chạy sau `npm run build`:
 *
 *     npm run seo-audit
 *
 * Vì sao có file này. Trường `image` của Recipe là trường Google BẮT BUỘC, và
 * nó hỏng theo kiểu KHÔNG AI THẤY: trang vẫn hiện bình thường, `npm run qa`
 * vẫn sạch, chỉ có con bot đi lấy ảnh là ăn 404 — rồi vài tháng sau Search
 * Console mới nhắn. Đổi tên slug một món, hay đụng vào endpoint
 * src/pages/anh-mon/[shot].jpg.ts, là đủ để lệch.
 *
 * Nên chỗ này đo đúng thứ con bot nhận được: parse khối <script ld+json> trong
 * dist/, rồi với mỗi URL ảnh đi tìm file thật trong dist/.
 *
 * KHÔNG kiểm ở đây: aggregateRating · video · nutrition. Ba trường đó Search
 * Console có nhắc nhưng site cố tình BỎ TRỐNG — xem mục "Bốn cảnh báo Recipe"
 * trong ROADMAP.md. Đừng thấy cảnh báo mà thêm vào.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist/mon';
if (!fs.existsSync(DIST)) {
  console.error('Chưa có dist/mon — chạy `npm run build` trước đã.');
  process.exit(1);
}

/* Ảnh vẽ nào nhẹ hơn ngần này gần như chắc chắn là render hỏng (nền trơn,
   mất hình món). Ảnh thật đang nằm khoảng 25–60 KB. */
const MIN_BYTES = 5_000;
const WANT_RATIOS = ['1x1', '4x3', '16x9'];

const bad = [];
let pages = 0;
let imgs = 0;

for (const dir of fs.readdirSync(DIST).sort()) {
  const file = path.join(DIST, dir, 'index.html');
  if (!fs.existsSync(file)) continue; // dist/mon/index.html — trang danh mục
  const html = fs.readFileSync(file, 'utf8');

  let recipe = null;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let obj;
    try {
      obj = JSON.parse(m[1]);
    } catch (e) {
      bad.push(`${dir}: khối JSON-LD không parse được — ${e.message}`);
      continue;
    }
    if (obj['@type'] === 'Recipe') recipe = obj;
  }
  if (!recipe) {
    bad.push(`${dir}: không có khối JSON-LD Recipe nào`);
    continue;
  }
  pages++;

  /* Hai trường Google BẮT BUỘC với Recipe */
  if (!recipe.name) bad.push(`${dir}: Recipe thiếu name`);
  const list = Array.isArray(recipe.image) ? recipe.image : recipe.image ? [recipe.image] : [];
  if (!list.length) {
    bad.push(`${dir}: Recipe thiếu image`);
    continue;
  }

  for (const ratio of WANT_RATIOS) {
    if (!list.some((u) => u.endsWith(`-${ratio}.jpg`))) bad.push(`${dir}: thiếu tỉ lệ ${ratio}`);
  }

  for (const url of list) {
    imgs++;
    let p;
    try {
      p = 'dist' + new URL(url).pathname;
    } catch {
      bad.push(`${dir}: image không phải URL tuyệt đối — ${url}`);
      continue;
    }
    if (!fs.existsSync(p)) bad.push(`${dir}: image trỏ vào file không có — ${p}`);
    else if (fs.statSync(p).size < MIN_BYTES)
      bad.push(`${dir}: ${path.basename(p)} chỉ ${fs.statSync(p).size} byte — nhiều khả năng render hỏng`);
  }
}

console.log('SOI JSON-LD + ẢNH TÌM KIẾM — dist/mon/');
console.log(`  ${pages} trang món · ${imgs} URL ảnh · ${WANT_RATIOS.join(' · ')}`);

if (bad.length) {
  console.error(`\n✗ ${bad.length} chỗ hỏng:`);
  for (const b of bad) console.error('  ' + b);
  process.exit(1);
}
console.log('  ✓ mọi trang có Recipe đủ name + 3 tỉ lệ ảnh, mọi URL ảnh có file thật');
