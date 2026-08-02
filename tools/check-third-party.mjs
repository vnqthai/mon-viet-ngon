/**
 * SOI BÊN THỨ BA — chốt chặn tự động cho luật "Tài sản & bên thứ ba" (ROADMAP phần 4)
 *
 * Site này không được gọi ra một bên thứ ba nào và không được dính tài sản
 * không-free. Tool này chặn hai đường tái phạm:
 *   1. Tài nguyên trỏ ra ngoài — soi NGUỒN (src/, tools/, public/, astro.config)
 *      luôn luôn, và soi BẢN BUILD (dist/) khi đã build. Nguồn bắt sớm lúc viết;
 *      dist là sự thật cuối cùng vì bắt cả thứ dependency chèn vào lúc build.
 *   2. Font gãy im lặng — url(/fonts/…) khai trong fonts.css mà file không có
 *      trong public/fonts/ thì build vẫn xanh, trình duyệt lặng lẽ rơi về font
 *      hệ thống; ở đây bắt cả file thiếu lẫn file không mang chữ ký wOF2.
 *
 * Chuỗi ĐỊNH DANH thì không tính là request: schema.org (JSON-LD @context),
 * w3.org (xmlns của SVG). Chú thích code cũng được nhắc URL thoải mái — đã
 * bóc chú thích trước khi soi. Chạy: node tools/check-third-party.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OWN = /(^|\.)monvietngon\.com$/;
const INERT = /(^|\.)(schema\.org|w3\.org)$/;
const errors = [];
const rel = (f) => path.relative(ROOT, f);
const note = (file, line, what) => errors.push(`  ✗ ${file}:${line}  ${what}`);
const hostOf = (u) => { try { return new URL(u).hostname; } catch { return null; } };
const lineOf = (txt, idx) => txt.slice(0, idx).split('\n').length;

/* ---------- 1. fonts.css ↔ public/fonts ---------- */
const FONTS_CSS = 'src/styles/fonts.css';
const fontsCss = fs.readFileSync(path.join(ROOT, FONTS_CSS), 'utf8');
const fontRefs = [...fontsCss.matchAll(/url\('\/fonts\/([^']+)'\)/g)];
if (!fontRefs.length) note(FONTS_CSS, 1, 'không đọc ra khai báo url(/fonts/…) nào — file đổi định dạng?');
for (const m of fontRefs) {
  const p = path.join(ROOT, 'public/fonts', m[1]);
  if (!fs.existsSync(p)) {
    note(FONTS_CSS, lineOf(fontsCss, m.index), `khai url(/fonts/${m[1]}) mà public/fonts/ KHÔNG có file — trình duyệt sẽ im lặng rơi về font hệ thống`);
    continue;
  }
  const head = Buffer.alloc(4);
  const fd = fs.openSync(p, 'r');
  fs.readSync(fd, head, 0, 4, 0);
  fs.closeSync(fd);
  if (head.toString('ascii') !== 'wOF2') note(`public/fonts/${m[1]}`, 1, 'không mang chữ ký wOF2 — file hỏng hoặc sai định dạng');
}

/* ---------- bộ soi dùng chung ---------- */
/* Bóc chú thích để URL trong chú thích không bị tính. Chú thích dòng `//`
   không được ăn nhầm `https://` — nhờ lookbehind chặn dấu ":" đứng trước. */
const strip = (s) =>
  s.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(?<!:)\/\/[^\n]*/g, '');
const stripYaml = (s) => s.replace(/^\s*#.*$/gm, '');

const scanAttrs = (file, txt) => {
  /* thuộc tính tải tài nguyên (kể cả xlink:href) + url() trong CSS/style */
  for (const m of txt.matchAll(/\b(?:src|href|srcset|poster|action|data)\s*=\s*"(https?:\/\/[^"]+)"/g)) {
    const h = hostOf(m[1]);
    if (h && !OWN.test(h)) note(file, lineOf(txt, m.index), `tài nguyên trỏ ra ngoài: ${m[1].slice(0, 90)}`);
  }
  for (const m of txt.matchAll(/url\(\s*['"]?(https?:\/\/[^)'"]+)/g)) {
    const h = hostOf(m[1]);
    if (h && !OWN.test(h)) note(file, lineOf(txt, m.index), `url() trỏ ra ngoài: ${m[1].slice(0, 90)}`);
  }
};
const scanStrings = (file, txt) => {
  for (const m of txt.matchAll(/https?:\/\/[a-zA-Z0-9.-]+/g)) {
    const h = hostOf(m[0]);
    if (h && !OWN.test(h) && !INERT.test(h)) note(file, lineOf(txt, m.index), `host lạ trong code: ${m[0]}`);
  }
};

/* ---------- 2. NGUỒN: src/ + tools/ + public/ + astro.config.mjs ---------- */
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.astro', 'art-png', 'fonts']);
const SKIP_FILES = new Set(['contact-sheet.html']); // output sinh ra, đã gitignore
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out);
    } else if (!SKIP_FILES.has(e.name)) out.push(path.join(dir, e.name));
  }
  return out;
};
let nSource = 0;
for (const f of ['src', 'tools', 'public'].flatMap((d) => walk(path.join(ROOT, d))).concat(path.join(ROOT, 'astro.config.mjs'))) {
  const ext = path.extname(f);
  if (!['.astro', '.html', '.svg', '.css', '.ts', '.mjs', '.js', '.yaml', '.xml'].includes(ext)) continue;
  const raw = fs.readFileSync(f, 'utf8');
  nSource++;
  if (ext === '.yaml') scanStrings(rel(f), stripYaml(raw));
  else if (ext === '.svg' || ext === '.xml') scanAttrs(rel(f), raw);
  else {
    const txt = strip(raw);
    scanAttrs(rel(f), txt);
    scanStrings(rel(f), txt);
  }
}

/* ---------- 3. BẢN BUILD: dist/ nếu đã build ---------- */
let nDist = 0;
const DIST = path.join(ROOT, 'dist');
const distBuilt = fs.existsSync(path.join(DIST, 'index.html'));
if (distBuilt) {
  for (const f of walk(DIST)) {
    const ext = path.extname(f);
    if (!['.html', '.css', '.js', '.svg', '.xml'].includes(ext)) continue;
    const raw = fs.readFileSync(f, 'utf8');
    nDist++;
    if (ext === '.js') scanStrings(rel(f), raw);
    else scanAttrs(rel(f), raw); // HTML: chỉ soi thuộc tính — chuỗi trong JSON-LD không phải request
  }
}

/* ---------- kết ---------- */
console.log('SOI BÊN THỨ BA — luật "Tài sản & bên thứ ba" (ROADMAP phần 4)');
console.log(`  ${fontRefs.length} font woff2 khớp fonts.css · ${nSource} file nguồn · ${distBuilt ? `${nDist} file dist` : 'dist chưa build'}`);
if (!distBuilt) console.log('  ⚠ dist/ chưa build — lượt này chỉ soi nguồn + font; `npm run build` rồi chạy lại để soi cả bản build');
if (errors.length) {
  console.log(errors.join('\n'));
  console.log(`  ✗ ${errors.length} chỗ phạm luật — site không được gọi ra bên thứ ba, tài nguyên thì tải về repo (kiểm license!) rồi tự phục vụ`);
  process.exit(1);
}
console.log('  ✓ sạch — mọi tài nguyên đều từ chính miền này, không host lạ nào');
