/**
 * QUÉT BẪY YAML + lỗi âm thầm trong src/content/recipes/
 *
 *   node tools/check-recipes.mjs
 *
 * Vì sao có file này: Zod ở content.config.ts chỉ bắt được lỗi *kiểu dữ liệu*,
 * và bắt xong thì thông báo khó lần ra chỗ sai. Còn mấy lỗi dưới đây thì Zod
 * KHÔNG bắt được chút nào — build vẫn xanh, trang vẫn dựng, chỉ là sai:
 *
 *   · hai món trùng `order`            → thứ tự /mon/ đảo lung tung tuỳ máy
 *   · hai nguyên liệu trùng `id`       → giỏ đi chợ tick ô này sáng ô kia
 *   · nhãn timer ghi 10:00 mà secs=900 → đồng hồ chạy 15 phút
 *
 * Còn hai bẫy YAML kinh điển (ghi ở README) thì bắt TRƯỚC khi build:
 *   · chuỗi không quote chứa ": "  → YAML nuốt thành object
 *   · chuỗi không quote mở bằng "*" → YAML hiểu là alias
 *
 * Cách bắt bẫy thứ nhất, đáng ghi lại: không đi dò từng trường một (danh sách
 * đó sẽ mục ngay khi schema đổi), mà đọc thẳng TỪ VỰNG KHOÁ HỢP LỆ ra khỏi
 * content.config.ts rồi duyệt cả cây — hễ gặp khoá lạ thì đó chính là mẩu chuỗi
 * vừa bị nuốt thành map.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RECIPE_DIR = path.join(ROOT, 'src/content/recipes');
const CONFIG = path.join(ROOT, 'src/content.config.ts');

const problems = [];
const notes = [];
const fail = (file, msg) => problems.push({ file, msg });

/* ---------- Đọc enum + từ vựng khoá thẳng từ schema ----------
   Đọc ra thay vì chép lại: chép lại là sớm muộn cũng lệch với schema. */
const configSrc = fs.readFileSync(CONFIG, 'utf8');

const enumAfter = (label) => {
  const at = configSrc.indexOf(label);
  if (at < 0) return null;
  const open = configSrc.indexOf('[', at);
  const close = configSrc.indexOf(']', open);
  if (open < 0 || close < 0) return null;
  return [...configSrc.slice(open, close).matchAll(/'([^']+)'/g)].map((m) => m[1]);
};

const ENUMS = {
  region: enumAfter('region: z.enum('),
  category: enumAfter('category: z.enum('),
  difficulty: enumAfter('difficulty: z.enum('),
  occasions: enumAfter('.array(z.enum('),
};
// enum `art` trải nhiều dòng nên bắt riêng
const ART_ENUM = (() => {
  const at = configSrc.indexOf('art: z');
  const open = configSrc.indexOf('.enum([', at);
  const close = configSrc.indexOf('])', open);
  return [...configSrc.slice(open, close).matchAll(/'([^']+)'/g)].map((m) => m[1]);
})();

for (const [k, v] of Object.entries(ENUMS)) {
  if (!v || !v.length) fail('content.config.ts', `không đọc được enum "${k}" — schema đổi cấu trúc rồi?`);
}

/* Từ vựng khoá hợp lệ: mọi `ten: z…` trong schema — bất kể nó nằm đầu dòng
   (`summary: z.string()`), nằm lọt trong object một dòng (`{ total: z.string() }`)
   hay xuống dòng rồi mới tới `.enum(` (`art: z⏎  .enum([`).
   Schema cũng khai vài mảnh ra biến rời (`const flavor = z.object({…})` rồi
   dùng `flavor: flavor.optional()`) — nhặt tên mấy biến đó ra rồi cho vào regex,
   chứ chép tay thì đợt sau thêm mảnh mới là lại sót. */
const SUB_SCHEMAS = [...configSrc.matchAll(/^const\s+(\w+)\s*=\s*z\./gm)].map((m) => m[1]);
const KEY_RE = new RegExp(
  String.raw`\b([a-zA-Z][a-zA-Z0-9]*)\s*:\s*(?:z\b` +
    (SUB_SCHEMAS.length ? '|' + SUB_SCHEMAS.map((s) => s + String.raw`\b`).join('|') : '') +
    ')',
  'g'
);
const KEY_VOCAB = new Set([...configSrc.matchAll(KEY_RE)].map((m) => m[1]));
if (KEY_VOCAB.size < 30) fail('content.config.ts', `chỉ đọc ra ${KEY_VOCAB.size} khoá — nghi ngờ đọc hụt, đừng tin kết quả quét`);

/* ---------- Duyệt cây, tìm khoá lạ ----------
   Khoá lạ = mẩu chuỗi vừa bị YAML nuốt thành map vì có ": " mà quên quote. */
function walkKeys(node, file, trail = '') {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkKeys(v, file, `${trail}[${i}]`));
    return;
  }
  if (!node || typeof node !== 'object' || node instanceof Date) return;
  for (const [k, v] of Object.entries(node)) {
    if (!KEY_VOCAB.has(k)) {
      fail(file, `khoá lạ ${trail}.${JSON.stringify(k)} — gần như chắc chắn là chuỗi chứa ": " mà quên quote, YAML nuốt thành object`);
    }
    walkKeys(v, file, `${trail}.${k}`);
  }
}

/* ---------- Quét thô trước khi parse: chuỗi mở đầu bằng "*" ---------- */
function rawScan(src, file) {
  src.split('\n').forEach((line, i) => {
    const m = line.match(/^\s*-\s+(\*\S)/) || line.match(/^\s*[a-zA-Z]+:\s+(\*\S)/);
    if (m) fail(file, `dòng ${i + 1}: chuỗi mở đầu bằng "*" — YAML hiểu là alias. Quote lại hoặc dùng >-`);
  });
}

/* ---------- Kiểm từng món ---------- */
const files = fs.readdirSync(RECIPE_DIR).filter((f) => f.endsWith('.yaml') && !f.startsWith('_'));
const byOrder = new Map();
const docs = [];

for (const f of files) {
  const src = fs.readFileSync(path.join(RECIPE_DIR, f), 'utf8');
  rawScan(src, f);

  let doc;
  try {
    doc = yaml.load(src);
  } catch (e) {
    fail(f, `YAML không parse được: ${String(e.message).split('\n')[0]}`);
    continue;
  }
  if (!doc || typeof doc !== 'object') {
    fail(f, 'file rỗng hoặc không phải map');
    continue;
  }
  docs.push({ f, doc });
  walkKeys(doc, f);

  /* enum */
  for (const key of ['region', 'category', 'difficulty']) {
    const v = doc[key];
    if (v == null) fail(f, `thiếu \`${key}\``);
    else if (ENUMS[key] && !ENUMS[key].includes(v)) fail(f, `\`${key}: ${v}\` không có trong enum`);
  }
  if (doc.art != null && !ART_ENUM.includes(doc.art)) {
    fail(f, `\`art: ${doc.art}\` chưa có trong enum art của content.config.ts`);
  }

  /* occasions — schema có .min(1), nhưng bắt sớm thì thông báo dễ hiểu hơn */
  if (!Array.isArray(doc.occasions) || doc.occasions.length === 0) {
    fail(f, '`occasions` rỗng — mỗi món phải có ít nhất 1 nhãn');
  } else {
    for (const o of doc.occasions) {
      if (ENUMS.occasions && !ENUMS.occasions.includes(o)) fail(f, `nhãn theo dịp "${o}" không có trong enum`);
    }
  }

  /* order trùng — Zod không bắt, /mon/ sắp sai âm thầm */
  const ord = doc.order ?? 99;
  if (!byOrder.has(ord)) byOrder.set(ord, []);
  byOrder.get(ord).push(f);

  /* id nguyên liệu trùng trong cùng một món — giỏ đi chợ lưu theo id */
  const seenId = new Map();
  for (const g of doc.ingredientGroups ?? []) {
    for (const it of g.items ?? []) {
      if (!it || typeof it !== 'object') continue;
      if (seenId.has(it.id)) fail(f, `id nguyên liệu "${it.id}" dùng hai lần (${seenId.get(it.id)} và ${g.name}) — giỏ đi chợ sẽ tick nhầm ô`);
      else seenId.set(it.id, g.name);
      if (it.base != null && !it.unit) fail(f, `nguyên liệu "${it.id}" có base mà thiếu unit`);
    }
  }

  /* timer: nhãn ghi MM:SS thì phải khớp secs */
  (doc.steps ?? []).forEach((s, i) => {
    const t = s?.timer;
    if (!t) return;
    const m = String(t.label ?? '').match(/(\d+):(\d{2})/);
    if (!m) return fail(f, `bước ${i + 1}: nhãn timer "${t.label}" không có dạng MM:SS`);
    const want = Number(m[1]) * 60 + Number(m[2]);
    if (want !== t.secs) fail(f, `bước ${i + 1}: nhãn timer ghi ${m[0]} (=${want}s) nhưng secs=${t.secs}`);
  });

  /* [[số|đơn vị]] — sai cú pháp thì hiện nguyên văn dấu ngoặc ra trang */
  const flat = JSON.stringify(doc);
  for (const m of flat.matchAll(/\[\[([^\]]*)\]\]/g)) {
    const parts = m[1].split('|');
    if (parts.length < 2 || parts.length > 3 || !/^-?\d+(\.\d+)?$/.test(parts[0].trim())) {
      fail(f, `định lượng [[${m[1]}]] sai cú pháp — phải là [[số|đơn vị]] hoặc [[số|đơn vị|frac]]`);
    }
  }
  const strays = (flat.match(/\[\[/g) ?? []).length - (flat.match(/\]\]/g) ?? []).length;
  if (strays !== 0) fail(f, 'số "[[" và "]]" không khớp nhau');
}

for (const [ord, list] of byOrder) {
  if (list.length > 1) fail(list.join(' + '), `cùng \`order: ${ord}\` — thứ tự /mon/ thành không xác định`);
}

/* ---------- Vài con số để liếc qua ---------- */
const featured = docs.filter((d) => d.doc.featured === true);
notes.push(`${docs.length} món · ${featured.length} món featured · order ${Math.min(...byOrder.keys())}–${Math.max(...byOrder.keys())}`);
if (featured.length !== 12) {
  notes.push(`⚠ trang chủ lấy đúng 12 thẻ đầu theo order — đang có ${featured.length} món bật featured`);
}
const gaps = [];
const sorted = [...byOrder.keys()].sort((a, b) => a - b);
for (let i = 1; i < sorted.length; i++) if (sorted[i] !== sorted[i - 1] + 1) gaps.push(`${sorted[i - 1]}→${sorted[i]}`);
if (gaps.length) notes.push(`order có lỗ hổng: ${gaps.join(', ')} (không sai, chỉ để biết)`);

/* ---------- Báo cáo ---------- */
console.log('QUÉT CÔNG THỨC — src/content/recipes/');
for (const n of notes) console.log(`  ${n}`);
if (!problems.length) {
  console.log(`  ✓ sạch — không thấy bẫy YAML nào, không trùng order, không trùng id`);
  process.exit(0);
}
console.log(`\n  ✗ ${problems.length} lỗi:`);
for (const p of problems) console.log(`    ${p.file}\n      ${p.msg}`);
process.exit(1);
