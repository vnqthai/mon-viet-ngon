/**
 * RENDER HÌNH MÓN RA PNG — thứ duy nhất bắt được lỗi hình
 *
 *   node tools/art-png.mjs bo-mot-nang                    # 1 hình, 520px
 *   node tools/art-png.mjs --sheet ga-nuong bo-mot-nang   # GHÉP MỘT TẤM để soi chống-đụng
 *   node tools/art-png.mjs --sheet --cat Nướng            # cả một kiểu món
 *   node tools/art-png.mjs --sheet --fam lua              # cả một họ màu
 *   node tools/art-png.mjs --all                          # mọi hình, mỗi hình một file
 *
 * Vì sao có file này: contact sheet (HTML) KHÔNG đủ. Đợt 7 và đợt 8 đều có lỗi
 * hình chỉ lộ ra khi render PNG rồi nhìn bằng mắt — ống khói cao thành ống bô,
 * lát chả thành khuôn mặt hai con mắt, hai lát thịt nhập thành miếng thịt xông
 * khói. Đợt 8 phải dựng harness tạm trong scratchpad; giờ nó ở lại đây.
 *
 * Chế độ --sheet là chế độ quan trọng nhất: nó xếp nhiều hình CẠNH NHAU trên
 * đúng nền họ màu, mỗi ô 260px — tức đúng cỡ thumbnail của thẻ trên /mon/. Lỗi
 * "hai món nhìn na ná" chỉ lộ ra ở cỡ đó và chỉ khi đặt cạnh nhau.
 *
 * Nền vẽ đúng như thẻ thật: gradient họ màu 160deg + quầng --art-halo, và luật
 * .steam được bơm vào SVG (resvg không với được CSS ngoài).
 *
 * Mapping art -> component đọc thẳng từ src/utils/art.ts nên không lệch khi thêm món.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { readArtMap } from './art-map.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ART_DIR = path.join(ROOT, 'src/components/art');
const RECIPE_DIR = path.join(ROOT, 'src/content/recipes');
const FONT_DIR = path.join(ROOT, 'src/assets/fonts');
const OUT_DIR = path.join(ROOT, 'tools/art-png');

/* Năm họ màu — bảng gốc ở src/utils/family.ts, tokens ở src/styles/tokens.css */
const FAMILIES = {
  nuoc: { name: 'Chan & húp',  from: '#235B66', to: '#143A42', cats: ['Món nước', 'Canh', 'Lẩu', 'Cháo'] },
  man:  { name: 'Mặn đưa cơm', from: '#6E3512', to: '#421C06', cats: ['Kho', 'Xào', 'Hấp'] },
  tron: { name: 'Cuốn & trộn', from: '#5B7A2E', to: '#3B521C', cats: ['Gỏi', 'Cuốn', 'Bún trộn'] },
  banh: { name: 'Cơm & bánh',  from: '#A8801A', to: '#70530C', cats: ['Cơm', 'Bánh'] },
  lua:  { name: 'Lửa',         from: '#9A3D2B', to: '#65241A', cats: ['Nướng', 'Chiên'] },
};
const famOfCat = (cat) =>
  Object.entries(FAMILIES).find(([, f]) => f.cats.includes(cat))?.[0] ?? 'nuoc';

/* ---------- Tham số dòng lệnh ---------- */
const argv = process.argv.slice(2);
const opts = { sheet: false, all: false, cols: 0, w: 0, out: OUT_DIR, name: '', fam: '', cat: '' };
const targets = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--sheet') opts.sheet = true;
  else if (a === '--all') opts.all = true;
  else if (a === '--cols') opts.cols = +argv[++i];
  else if (a === '--w') opts.w = +argv[++i];
  else if (a === '--out') opts.out = path.resolve(argv[++i]);
  else if (a === '--name') opts.name = argv[++i];
  else if (a === '--fam') opts.fam = argv[++i];
  else if (a === '--cat') opts.cat = argv[++i];
  else if (a.startsWith('--')) { console.error(`Không hiểu cờ ${a}`); process.exit(1); }
  else targets.push(a);
}

/* ---------- Đọc mapping art -> component ---------- */
const artToComponent = readArtMap(path.join(ROOT, 'src/utils/art.ts'));

/* ---------- Đọc các món ---------- */
const field = (src, key) => {
  const m = src.match(new RegExp('^' + key + ':\\s*(.+)$', 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
};
const recipes = fs
  .readdirSync(RECIPE_DIR)
  .filter((f) => f.endsWith('.yaml') && !f.startsWith('_'))
  .map((f) => {
    const src = fs.readFileSync(path.join(RECIPE_DIR, f), 'utf8');
    const cat = field(src, 'category');
    return {
      slug: f.replace(/\.yaml$/, ''),
      title: (field(src, 'title').split('**')[0] || '').trim(),
      cat,
      art: field(src, 'art'),
      fam: famOfCat(cat),
    };
  });

/* Một "ô" cần: art (tên kind), nhãn, họ màu. Nhận cả slug lẫn tên art. */
function resolve(token) {
  const bySlug = recipes.find((r) => r.slug === token);
  if (bySlug) {
    if (!bySlug.art) return { err: `${token}: món này chưa gắn art riêng` };
    return { art: bySlug.art, label: bySlug.title || bySlug.slug, fam: bySlug.fam, cat: bySlug.cat };
  }
  if (artToComponent[token]) {
    const user = recipes.find((r) => r.art === token);
    return {
      art: token,
      label: user ? user.title : token,
      fam: opts.fam || (user ? user.fam : 'nuoc'),
      cat: user ? user.cat : '(dự phòng)',
    };
  }
  return { err: `${token}: không phải slug món, cũng không phải tên art trong utils/art.ts` };
}

let tokens = targets;
if (opts.all) tokens = recipes.filter((r) => r.art).map((r) => r.slug);
if (opts.cat) tokens = tokens.concat(recipes.filter((r) => r.cat === opts.cat && r.art).map((r) => r.slug));
if (opts.fam && !targets.length && !opts.cat)
  tokens = tokens.concat(recipes.filter((r) => r.fam === opts.fam && r.art).map((r) => r.slug));

if (!tokens.length) {
  console.error('Chưa chỉ định hình nào. Ví dụ:');
  console.error('  node tools/art-png.mjs bo-mot-nang');
  console.error('  node tools/art-png.mjs --sheet --cat Nướng');
  process.exit(1);
}

const tiles = [];
for (const t of tokens) {
  const r = resolve(t);
  if (r.err) { console.error('  ⚠ ' + r.err); continue; }
  if (!artToComponent[r.art]) { console.error(`  ⚠ ${t}: art "${r.art}" không có trong bảng ART_COMPONENT`); continue; }
  tiles.push(r);
}
if (!tiles.length) process.exit(1);

/* ---------- Rút SVG khỏi component, làm id duy nhất theo ô ----------
   Ghép nhiều hình vào MỘT tài liệu thì id là toàn cục — y hệt cái bẫy trên
   /mon/. Không gắn hậu tố là ô sau ăn nhầm gradient của ô trước. */
let uid = 0;
function artSvg(kind) {
  const comp = artToComponent[kind];
  const file = path.join(ART_DIR, comp + '.astro');
  if (!fs.existsSync(file)) return null;
  const m = fs.readFileSync(file, 'utf8').match(/<svg[\s\S]*<\/svg>/);
  if (!m) return null;
  /* Bỏ chú thích y như endpoint src/pages/art/[kind].svg.ts làm: resvg đọc SVG
     bằng bộ phân tích XML nghiêm, mà chú thích XML cấm chứa "--" (rất hay gặp
     trong chú thích file art: "--art-halo", "---- lớp sau ----"). Không bỏ thì
     tool gãy trên đúng những file vẫn ship ra web bình thường. */
  let svg = m[0].replace(/<!--[\s\S]*?-->\s*/g, '');
  const suffix = '_t' + ++uid;
  for (const id of new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]))) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    svg = svg
      .replace(new RegExp('id="' + esc + '"', 'g'), `id="${id}${suffix}"`)
      .replace(new RegExp('url\\(#' + esc + '\\)', 'g'), `url(#${id}${suffix})`)
      .replace(new RegExp('href="#' + esc + '"', 'g'), `href="#${id}${suffix}"`);
  }
  return svg;
}

/* viewBox của hình, để đặt vào <svg> lồng cho đúng tỉ lệ */
const viewBoxOf = (svg) => (svg.match(/viewBox="([^"]+)"/) || [, '0 0 520 470'])[1];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Nền thẻ thật: linear-gradient(160deg, ground, ground-deep) + --art-halo.
   160deg trong CSS = hướng (sin160, -cos160) = (.342, .940) — quy ra toạ độ hộp. */
function grounds(fam, i) {
  const f = FAMILIES[fam] || FAMILIES.nuoc;
  return `
    <linearGradient id="bg${i}" x1="0.329" y1="0.030" x2="0.671" y2="0.970">
      <stop offset="0" stop-color="${f.from}"/><stop offset="1" stop-color="${f.to}"/>
    </linearGradient>
    <radialGradient id="halo${i}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#FFF7E1" stop-opacity="0.22"/>
      <stop offset="0.76" stop-color="#FFF7E1" stop-opacity="0"/>
    </radialGradient>`;
}

/* Luật .steam của recipe.css — resvg không với được CSS ngoài, phải bơm vào.
   Thiếu luật này thì mọi path khói đổ fill đen, hình nào có khói cũng hỏng. */
const STEAM_CSS = `
    .steam path{stroke:rgba(250,247,232,.75);stroke-width:7;stroke-linecap:round;fill:none}
    .steam path:nth-child(2){stroke-width:6}
    .steam path:nth-child(3){stroke-width:5}`;

const fontFiles = fs
  .readdirSync(FONT_DIR)
  .filter((f) => f.endsWith('.ttf'))
  .map((f) => path.join(FONT_DIR, f));

function render(svg, width) {
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Be Vietnam Pro' },
    background: '#F3F0E0',
  });
  return r.render().asPng();
}

fs.mkdirSync(opts.out, { recursive: true });
const written = [];

if (opts.sheet) {
  /* ---------- GHÉP MỘT TẤM ----------
     Mỗi ô dựng đúng tỉ lệ khối art của thẻ: nền họ màu, hình chiếm 74% bề rộng.
     260px/ô = cỡ thumbnail thật trên /mon/ — chỗ lỗi "hai món na ná" lộ ra. */
  const W = opts.w || 260;
  const cols = opts.cols || Math.min(tiles.length, 4);
  const rows = Math.ceil(tiles.length / cols);
  const PAD = 14;            // đệm giữa các ô
  const ARTH = Math.round(W * 0.92);   // cao khối nền
  const CAP = 34;            // chỗ cho nhãn dưới ô
  const CELLH = ARTH + CAP;
  const sheetW = cols * W + (cols + 1) * PAD;
  const sheetH = rows * CELLH + (rows + 1) * PAD;

  const defs = [];
  const body = [];
  tiles.forEach((t, i) => {
    const svg = artSvg(t.art);
    const col = i % cols, row = (i / cols) | 0;
    const x = PAD + col * (W + PAD), y = PAD + row * (CELLH + PAD);
    defs.push(grounds(t.fam, i));
    const inner = Math.round(W * 0.74);
    const vb = svg ? viewBoxOf(svg) : '0 0 520 470';
    const [, , vw, vh] = vb.split(/\s+/).map(Number);
    const innerH = Math.round((inner * vh) / vw);
    body.push(`
    <g transform="translate(${x} ${y})">
      <rect width="${W}" height="${ARTH}" rx="14" fill="url(#bg${i})"/>
      <rect width="${W}" height="${ARTH}" rx="14" fill="url(#halo${i})"/>
      ${svg
        ? svg.replace(
            /^<svg/,
            `<svg x="${Math.round((W - inner) / 2)}" y="${Math.round((ARTH - innerH) / 2)}" width="${inner}" height="${innerH}" preserveAspectRatio="xMidYMid meet"`
          )
        : ''}
      <text x="${W / 2}" y="${ARTH + 21}" text-anchor="middle" font-family="Be Vietnam Pro"
            font-size="13" font-weight="600" fill="#242B1D">${esc(t.label)}</text>
      <text x="${W / 2}" y="${ARTH + 33}" text-anchor="middle" font-family="Be Vietnam Pro"
            font-size="10" fill="#5F6A52">${esc(t.cat)} · ${esc(FAMILIES[t.fam]?.name || t.fam)}</text>
    </g>`);
  });

  const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${sheetW}" height="${sheetH}" viewBox="0 0 ${sheetW} ${sheetH}">
  <style>${STEAM_CSS}</style>
  <defs>${defs.join('')}</defs>
  <rect width="${sheetW}" height="${sheetH}" fill="#F3F0E0"/>
  ${body.join('')}
</svg>`;

  const file = path.join(opts.out, (opts.name || 'sheet-' + tiles.map((t) => t.art).join('_').slice(0, 60)) + '.png');
  fs.writeFileSync(file, render(doc, sheetW * 2));   // ×2 cho nét trên màn retina
  written.push([file, `${tiles.length} hình · ${cols} cột · ô ${W}px (cỡ thumbnail /mon/)`]);
} else {
  /* ---------- Mỗi hình một PNG ---------- */
  const W = opts.w || 520;
  for (const t of tiles) {
    const svg = artSvg(t.art);
    if (!svg) { console.error(`  ⚠ ${t.art}: không đọc được svg`); continue; }
    const vb = viewBoxOf(svg);
    const [, , vw, vh] = vb.split(/\s+/).map(Number);
    const H = Math.round((W * vh) / vw);
    const i = uid;
    const doc = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <style>${STEAM_CSS}</style>
  <defs>${grounds(t.fam, i)}</defs>
  <rect width="${W}" height="${H}" fill="url(#bg${i})"/>
  <rect width="${W}" height="${H}" fill="url(#halo${i})"/>
  ${svg.replace(/^<svg/, `<svg x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet"`)}
</svg>`;
    const file = path.join(opts.out, t.art + '.png');
    fs.writeFileSync(file, render(doc, W * 2));
    written.push([file, `${t.label} · ${t.cat} · họ ${FAMILIES[t.fam]?.name || t.fam}`]);
  }
}

console.log('RENDER HÌNH RA PNG');
for (const [f, note] of written) console.log(`  ${path.relative(ROOT, f)}  —  ${note}`);
console.log(`  ${written.length} file trong ${path.relative(ROOT, opts.out)}/`);
