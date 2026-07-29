/**
 * SOI `id` TRÙNG CHÉO GIỮA CÁC FILE HÌNH — src/components/art/
 *
 *   node tools/check-art-ids.mjs
 *
 * Vì sao cần: trang /mon/ nhúng THẲNG cả 50+ hình vào cùng một tài liệu HTML.
 * `id` trong SVG là toàn cục cho cả trang, nên hai file art lỡ đặt trùng một
 * `id` là `url(#…)` của file sau sẽ ăn nhầm gradient/clipPath của file trước.
 * Hỏng hoàn toàn âm thầm: build xanh, trang món (chỉ nhúng 1 hình) vẫn đúng,
 * chỉ riêng trang danh mục sai màu — mà lại sai ở đúng cái hình mình không mở ra xem.
 *
 * Contact sheet không bắt được lỗi này: nó tự thêm hậu tố _c1.._cN vào mọi id
 * để tự cứu mình. Nên phải soi trên file gốc, ở đây.
 *
 * Kiểm luôn ba chỗ nối dễ đứt khi thêm món:
 *   art trong enum ⟷ dòng render trong RecipeArt.astro ⟷ file component có thật
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ART_DIR = path.join(ROOT, 'src/components/art');
const RECIPE_DIR = path.join(ROOT, 'src/content/recipes');
const CONFIG = path.join(ROOT, 'src/content.config.ts');

const problems = [];
const warnings = [];
const fail = (msg) => problems.push(msg);
const warn = (msg) => warnings.push(msg);

/* ---------- Đọc mọi file hình ---------- */
const artFiles = fs
  .readdirSync(ART_DIR)
  .filter((f) => f.endsWith('.astro') && f !== 'RecipeArt.astro');

const owners = new Map();   // id -> [file, …]
let totalIds = 0;

for (const f of artFiles) {
  const src = fs.readFileSync(path.join(ART_DIR, f), 'utf8');
  const ids = [...src.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);

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

/* ---------- enum art ⟷ RecipeArt.astro ⟷ file component ---------- */
const configSrc = fs.readFileSync(CONFIG, 'utf8');
const at = configSrc.indexOf('art: z');
const open = configSrc.indexOf('.enum([', at);
const close = configSrc.indexOf('])', open);
const artEnum = [...configSrc.slice(open, close).matchAll(/'([^']+)'/g)].map((m) => m[1]);

const recipeArtSrc = fs.readFileSync(path.join(ART_DIR, 'RecipeArt.astro'), 'utf8');
const rendered = Object.fromEntries(
  [...recipeArtSrc.matchAll(/kind === '([^']+)' && <(\w+)\s*\/>/g)].map((m) => [m[1], m[2]])
);
const imported = new Set(
  [...recipeArtSrc.matchAll(/^import\s+(\w+)\s+from\s+'\.\/(\w+)\.astro'/gm)].map((m) => m[1])
);

for (const k of artEnum) {
  if (!rendered[k]) fail(`art "${k}" có trong enum nhưng RecipeArt.astro không có dòng render`);
}
for (const k of Object.keys(rendered)) {
  if (!artEnum.includes(k)) fail(`RecipeArt.astro render "${k}" nhưng enum art không có giá trị đó`);
  const comp = rendered[k];
  if (!imported.has(comp)) fail(`RecipeArt.astro render <${comp}/> mà quên import`);
  if (!fs.existsSync(path.join(ART_DIR, comp + '.astro'))) fail(`không có file ${comp}.astro`);
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
