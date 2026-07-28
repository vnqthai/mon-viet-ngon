/**
 * CONTACT SHEET — soi hình minh họa trên nền họ màu
 *
 * Dựng một trang HTML render mọi hình trong src/components/art/ trên đúng nền
 * họ màu của món đó, để phát hiện hình nào bị chọi màu / chìm vào nền.
 * Chạy lại sau mỗi đợt món mới:  node tools/contact-sheet.mjs
 *
 * Mapping art -> component đọc thẳng từ RecipeArt.astro nên không lệch khi thêm món.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ART_DIR = path.join(ROOT, 'src/components/art');
const RECIPE_DIR = path.join(ROOT, 'src/content/recipes');
const OUT = path.join(ROOT, 'tools/contact-sheet.html');

/* ---------- Năm họ màu (Thái chốt 2026-07-28) ---------- */
const FAMILIES = [
  { id: 'nuoc', name: 'Chan & húp',  from: '#235B66', to: '#143A42', cats: ['Món nước', 'Canh', 'Lẩu', 'Cháo'] },
  { id: 'man',  name: 'Mặn đưa cơm', from: '#6E3512', to: '#421C06', cats: ['Kho', 'Xào', 'Hấp'] },
  { id: 'tron', name: 'Cuốn & trộn', from: '#5B7A2E', to: '#3B521C', cats: ['Gỏi', 'Cuốn', 'Bún trộn'] },
  { id: 'banh', name: 'Cơm & bánh',  from: '#A8801A', to: '#70530C', cats: ['Cơm', 'Bánh'] },
  { id: 'lua',  name: 'Lửa',         from: '#9A3D2B', to: '#65241A', cats: ['Nướng', 'Chiên'] },
];
/* Sắc độ đang cân nhắc — chọn xong thì sửa thẳng vào FAMILIES ở trên.
   Mỗi mục: họ nào, thử mấy sắc, và lấy món nào ra thử (ưu tiên món khó nhất). */
const TRIALS = [
  {
    famId: 'nuoc',
    title: 'Họ “Chan & húp” — có nên bỏ xanh lá sang xanh nước?',
    note: 'Đang có HAI họ cùng hệ xanh (Chan & húp và Cuốn & trộn), tách nhau chủ yếu nhờ độ sáng chứ không nhờ sắc. Chuyển sang xanh nước thì năm họ mới thật sự phủ đủ vòng màu. Lưu ý: 34/40 file hình vẽ VÀNH TÔ bằng đúng #2C5234 — xem vành xanh lá đặt trên nền lam có chỏi không.',
    prefer: ['pho-bo', 'bun-bo-hue', 'canh-chua-ca-loc', 'hu-tieu-nam-vang', 'mi-quang-tom-thit'],
    options: [
      { label: 'X0 · xanh sông hiện tại', from: '#2C5234', to: '#1F3D26' },
      { label: 'X1 · xanh lục biển',      from: '#1E4A4C', to: '#123033' },
      { label: 'X2 · xanh lam đậm',       from: '#22456B', to: '#152B44' },
      { label: 'X3 · xanh lam nhạt hơn',  from: '#3E6E96', to: '#27506F' },
    ],
  },
  {
    famId: 'man',
    title: 'Họ “Mặn đưa cơm” — nồi đất đang chìm vào nền',
    note: 'Bốn món kho dùng tộ đất màu nâu, đặt trên nền nâu là mất hẳn đường viền. Thử nền sâu hơn để tộ nổi lên.',
    prefer: ['ca-kho-to', 'ga-kho-gung', 'thit-kho-hot-vit', 'tom-rim-nuoc-cot-dua', 'bo-kho'],
    options: [
      { label: 'N1 · nâu hiện tại', from: '#8A4A1E', to: '#5E3113' },
      { label: 'N2 · nâu sâu',      from: '#6E3512', to: '#421C06' },
      { label: 'N3 · nâu gần đen',  from: '#57280C', to: '#301503' },
    ],
  },
  {
    famId: 'banh',
    title: 'Họ “Cơm & bánh” — chưa chốt sắc, lại đang quá gần họ nâu',
    note: 'Vàng #8F6410 và nâu #8A4A1E nhìn thoáng qua gần như một màu, hai họ không tách ra được. Sắc càng sáng càng tách.',
    prefer: [],
    options: [
      { label: 'V1 · nghệ đậm',      from: '#8F6410', to: '#5E4108' },
      { label: 'V2 · vàng đất sáng', from: '#A8801A', to: '#70530C' },
      { label: 'V3 · vàng rêu trầm', from: '#7A6420', to: '#4F4114' },
    ],
  },
];
const OLD_GROUND = { from: '#2C5234', to: '#1F3D26' }; // nền xanh đậm hiện tại, để so sánh

/* Quầng sáng sau hình — làm trong CSS thẻ, KHÔNG sửa file SVG.
   Chữa được cái gốc: tộ đất nâu trùng sắc với nền nâu. */
const HALO = [
  { label: 'Q0 · không quầng (hiện tại)', css: 'none' },
  { label: 'Q1 · quầng nhẹ',  css: 'radial-gradient(closest-side, rgba(255,247,225,.13), transparent 74%)' },
  { label: 'Q2 · quầng vừa',  css: 'radial-gradient(closest-side, rgba(255,247,225,.22), transparent 76%)' },
  { label: 'Q3 · quầng rõ',   css: 'radial-gradient(closest-side, rgba(255,247,225,.32), transparent 78%)' },
];
/* 4 món tộ nâu + 3 món tô trắng — để thấy quầng có làm hỏng nhóm trắng không */
const HALO_SAMPLES = ['ca-kho-to', 'thit-kho-hot-vit', 'ga-kho-gung', 'tom-rim-nuoc-cot-dua', 'bo-kho', 'muc-xao-thom-can-tay', 'suon-ram-man-ngot'];

/* Kiểu món hiện tại -> kiểu món sau khi đổi tên ở đợt 6 */
const CAT_RENAME = { 'Món sợi': 'Món nước' };
/* Món chuyển kiểu, không suy được từ tên category */
const SLUG_RECAT = {
  'bun-thit-nuong': 'Bún trộn',
  'banh-xeo-mien-tay': 'Bánh',
  'banh-cuon-nong': 'Bánh',
};

/* ---------- Đọc mapping art -> component từ RecipeArt.astro ---------- */
const recipeArtSrc = fs.readFileSync(path.join(ART_DIR, 'RecipeArt.astro'), 'utf8');
const artToComponent = Object.fromEntries(
  [...recipeArtSrc.matchAll(/kind === '([^']+)' && <(\w+)\s*\/>/g)].map((m) => [m[1], m[2]])
);

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
    const slug = f.replace(/\.yaml$/, '');
    const rawCat = field(src, 'category');
    const cat = SLUG_RECAT[slug] || CAT_RENAME[rawCat] || rawCat;
    // Tiêu đề dạng "Bún bò Huế **cay nồng sả ruốc…**" — tên món là phần trước **
    const rawTitle = field(src, 'title');
    return {
      slug,
      title: (rawTitle.split('**')[0] || '').trim() || slug,
      fullTitle: rawTitle.replace(/\*\*/g, ''),
      rawCat,
      cat,
      art: field(src, 'art'),
      region: field(src, 'region'),
      difficulty: field(src, 'difficulty'),
      time: (src.match(/^time:\n\s*total:\s*(.+)$/m) || [, ''])[1].replace(/^["']|["']$/g, ''),
      // Câu tóm tắt nằm giữa cặp ** trong title
      blurb: (rawTitle.match(/\*\*(.+?)\*\*/) || [, ''])[1] || '',
      family: FAMILIES.find((fam) => fam.cats.includes(cat)) || null,
    };
  });

/* ---------- Rút SVG khỏi component, làm id duy nhất ---------- */
let uid = 0;
function svgOf(componentName) {
  const file = path.join(ART_DIR, componentName + '.astro');
  if (!fs.existsSync(file)) return null;
  const m = fs.readFileSync(file, 'utf8').match(/<svg[\s\S]*<\/svg>/);
  if (!m) return null;
  let svg = m[0];
  const suffix = '_c' + ++uid;
  for (const id of new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]))) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    svg = svg
      .replace(new RegExp('id="' + esc + '"', 'g'), `id="${id}${suffix}"`)
      .replace(new RegExp('url\\(#' + esc + '\\)', 'g'), `url(#${id}${suffix})`)
      .replace(new RegExp('href="#' + esc + '"', 'g'), `href="#${id}${suffix}"`);
  }
  return svg;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const grad = (g) => `linear-gradient(160deg, ${g.from} 0%, ${g.to} 100%)`;

function tile(r) {
  const comp = artToComponent[r.art];
  const svg = comp ? svgOf(comp) : null;
  const warn = !r.art ? 'chưa gắn art' : !comp ? `art "${r.art}" không có trong RecipeArt` : !svg ? 'không đọc được svg' : null;
  return `
    <figure class="tile" data-family="${r.family ? r.family.id : 'none'}">
      <div class="tile__art" style="--ground:${grad(r.family || OLD_GROUND)}">
        ${svg || `<div class="tile__missing">${esc(warn)}</div>`}
      </div>
      <figcaption>
        <b>${esc(r.title)}</b>
        <span>${esc(r.cat)}${r.cat !== r.rawCat ? ` <i>(nay: ${esc(r.rawCat)})</i>` : ''}</span>
        ${warn ? `<span class="warn">${esc(warn)}</span>` : ''}
      </figcaption>
    </figure>`;
}

/* ---------- Hình dùng chung (bowl/claypot/plate/rolls) ---------- */
const GENERIC = ['bowl', 'claypot', 'plate', 'rolls'];
const usedArts = new Set(recipes.map((r) => r.art).filter(Boolean));
const orphanArts = Object.keys(artToComponent).filter((k) => !usedArts.has(k) && !GENERIC.includes(k));

const sections = FAMILIES.map((fam) => {
  const list = recipes.filter((r) => r.family && r.family.id === fam.id);
  return `
  <section class="fam">
    <header class="fam__head">
      <span class="fam__chip" style="background:${grad(fam)}"></span>
      <h2>${esc(fam.name)}</h2>
      <span class="fam__meta">${esc(fam.cats.join(' · '))} — <b>${list.length}</b> món hiện có · nền <code>${fam.from}</code></span>
    </header>
    <div class="grid">${list.map(tile).join('')}</div>
  </section>`;
}).join('');

const genericSection = `
  <section class="fam">
    <header class="fam__head">
      <span class="fam__chip" style="background:${grad(OLD_GROUND)}"></span>
      <h2>Hình dùng chung &amp; chưa dùng tới</h2>
      <span class="fam__meta">Không thuộc họ nào — hiện trên nền xanh cũ để tham chiếu</span>
    </header>
    <div class="grid">
      ${[...GENERIC, ...orphanArts]
        .map((k) => {
          const svg = svgOf(artToComponent[k]);
          return `<figure class="tile"><div class="tile__art" style="--ground:${grad(OLD_GROUND)}">${svg || ''}</div>
            <figcaption><b>${esc(k)}</b><span>${GENERIC.includes(k) ? 'dự phòng' : 'chưa món nào dùng'}</span></figcaption></figure>`;
        })
        .join('')}
    </div>
  </section>`;

/* Các bảng thử sắc độ — mỗi bảng lấy vài món của họ đó render trên từng sắc */
const trialSections = TRIALS.map((t) => {
  const pool = recipes.filter((r) => r.family && r.family.id === t.famId && r.art && artToComponent[r.art]);
  const picked = [
    ...t.prefer.map((s) => pool.find((r) => r.slug === s)).filter(Boolean),
    ...pool.filter((r) => !t.prefer.includes(r.slug)),
  ].slice(0, 5);
  return `
  <section class="fam fam--pick">
    <header class="fam__head">
      <h2>${t.title}</h2>
    </header>
    <p class="fam__note">${t.note}</p>
    ${t.options
      .map(
        (opt) => `
      <div class="pick">
        <div class="pick__label"><span class="fam__chip" style="background:${grad(opt)}"></span>
          <b>${esc(opt.label)}</b> <code>${opt.from}</code></div>
        <div class="grid grid--sm">
          ${picked
            .map((r) => {
              const svg = svgOf(artToComponent[r.art]);
              return `<figure class="tile"><div class="tile__art" style="--ground:${grad(opt)}">${svg || ''}</div>
                <figcaption><b>${esc(r.title)}</b></figcaption></figure>`;
            })
            .join('')}
        </div>
      </div>`
      )
      .join('')}
  </section>`;
}).join('');

/* ---------- Lưới danh mục thử: thẻ món thật, trộn đủ 5 họ ----------
   Đây mới là thứ để quyết màu — ô màu trơn không cho thấy màu sống thế nào
   khi nằm trong thẻ và xếp cạnh nhau. */
const MIX = [
  'pho-bo', 'ca-kho-to', 'goi-xoai-xanh-tom-kho', 'com-tam-suon-nuong', 'ga-nuong-mac-khen',
  'bun-bo-hue', 'thit-kho-hot-vit', 'bun-thit-nuong', 'banh-xeo-mien-tay', 'cha-gio',
  'canh-chua-ca-loc', 'muc-xao-thom-can-tay', 'goi-ga-bap-cai', 'com-ga-hoi-an', 'ga-kho-gung',
];
function realCard(r) {
  const svg = svgOf(artToComponent[r.art]);
  const fam = r.family || OLD_GROUND;
  return `
  <a class="rc" href="#" onclick="return false">
    <div class="rc__art" style="--ground:${grad(fam)}">
      <span class="rc__kind">${esc(r.cat)}</span>
      ${svg || ''}
      <div class="rc__wave"><svg viewBox="0 0 400 26" preserveAspectRatio="none"><path d="M0 14 C 60 26 120 2 200 10 C 280 18 340 24 400 12 L 400 26 L 0 26 Z" fill="currentColor"/></svg></div>
    </div>
    <div class="rc__body">
      <h4>${esc(r.title)}</h4>
      <p>${esc(r.blurb)}</p>
      <div class="rc__meta"><span>${esc(r.region)}</span><span>${esc(r.time)}</span><span>${esc(r.difficulty)}</span></div>
    </div>
  </a>`;
}
const mixCards = MIX.map((s) => recipes.find((r) => r.slug === s)).filter((r) => r && r.art && artToComponent[r.art]);
const previewSection = `
  <section class="fam fam--preview">
    <header class="fam__head"><h2>Lưới danh mục thử — thẻ món thật</h2>
      <span class="fam__meta">15 món trộn đủ 5 họ, xếp như trang danh mục. <b>Đây là chỗ để quyết màu.</b></span></header>
    <p class="fam__note">Nhìn xem: năm họ có đọc ra thành từng nhóm không, hay chỉ thành một mảng lộn xộn?
      Có màu nào nhảy ra chói hơn hẳn phần còn lại không? Bấm “So với nền cũ” ở thanh trên để thấy lưới hiện tại toàn xanh đậm.</p>
    <div class="rcgrid">${mixCards.map(realCard).join('')}</div>
  </section>`;

/* ---------- Thử quầng sáng: chữa trùng sắc mà không đụng file SVG ---------- */
const famMan = FAMILIES.find((f) => f.id === 'man');
const haloSection = `
  <section class="fam fam--pick">
    <header class="fam__head"><h2>Quầng sáng sau hình — chữa gốc, không sửa SVG</h2></header>
    <p class="fam__note">Tộ đất nâu chìm vào nền nâu là do <b>trùng sắc</b>, tối thêm chỉ giảm chứ không chữa.
      Một quầng sáng mờ đặt sau hình — làm trong CSS của thẻ, <b>không đụng file SVG nào</b> — nhấc mọi món khỏi mọi nền.
      Bốn món đầu là tộ nâu, ba món cuối là tô/đĩa trắng: xem quầng có làm nhóm trắng bị bệt không.</p>
    ${HALO.map(
      (h) => `
      <div class="pick">
        <div class="pick__label"><b>${esc(h.label)}</b></div>
        <div class="grid grid--sm">
          ${HALO_SAMPLES.map((s) => recipes.find((r) => r.slug === s))
            .filter((r) => r && r.art && artToComponent[r.art])
            .map((r) => {
              const svg = svgOf(artToComponent[r.art]);
              const bg = h.css === 'none' ? grad(famMan) : `${h.css}, ${grad(famMan)}`;
              return `<figure class="tile"><div class="tile__art" style="--ground:${bg}">${svg || ''}</div>
                <figcaption><b>${esc(r.title)}</b></figcaption></figure>`;
            })
            .join('')}
        </div>
      </div>`
    ).join('')}
  </section>`;

/* Dải năm nền đặt cạnh nhau — kiểm xem năm họ có tách nhau ra không.
   Kèm dải giả lập cho từng phương án đang thử của họ "Chan & húp". */
const stripFor = (list) =>
  `<div class="strip">${list.map((f) => `<div class="strip__cell" style="background:${grad(f)}"><b>${esc(f.name)}</b><code>${f.from}</code></div>`).join('')}</div>`;

const nuocTrial = TRIALS.find((t) => t.famId === 'nuoc');
const paletteStrip = `
  <section class="fam">
    <header class="fam__head"><h2>Năm nền đặt cạnh nhau</h2>
      <span class="fam__meta">Nếu hai ô nào nhìn thoáng qua giống nhau thì hai họ đó chưa tách được</span></header>
    ${stripFor(FAMILIES)}
    ${nuocTrial
      ? `<p class="fam__note" style="margin-top:22px">Thử đổi họ <b>Chan &amp; húp</b> sang xanh nước — xem năm họ có phủ đều vòng màu hơn không:</p>
         ${nuocTrial.options
           .slice(1)
           .map(
             (opt) =>
               `<div class="pick"><div class="pick__label"><span class="fam__chip" style="background:${grad(opt)}"></span><b>${esc(opt.label)}</b> <code>${opt.from}</code></div>
                ${stripFor(FAMILIES.map((f) => (f.id === 'nuoc' ? { ...f, from: opt.from, to: opt.to } : f)))}</div>`
           )
           .join('')}`
      : ''}
  </section>`;

const counts = FAMILIES.map((f) => `${f.name}: ${recipes.filter((r) => r.family && r.family.id === f.id).length}`).join(' · ');

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Contact sheet — hình món trên nền họ màu</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Paytone+One&family=Be+Vietnam+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
:root{
  --paper:#F3F0E0; --card:#FBF9EE; --ink:#242B1D; --muted:#5F6A52; --line:#D8D2B6;
  --river:#2C5234; --gold:#E0A32E; --chili:#B7402E;
  --fd:"Paytone One","Arial Rounded MT Bold",system-ui,sans-serif;
  --fb:"Be Vietnam Pro",-apple-system,"Segoe UI",Roboto,sans-serif;
}
@media (prefers-color-scheme: dark){
  :root:not([data-theme]){--paper:#141A10;--card:#1C2416;--ink:#EDE9D4;--muted:#A8B096;--line:#33402B;--chili:#D9604A}
}
:root[data-theme="dark"]{--paper:#141A10;--card:#1C2416;--ink:#EDE9D4;--muted:#A8B096;--line:#33402B;--chili:#D9604A}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--fb);line-height:1.6}
svg{display:block;max-width:100%}
h1,h2{font-family:var(--fd);font-weight:400;margin:0;line-height:1.2}
code{font-size:.85em;background:var(--card);border:1px solid var(--line);border-radius:5px;padding:1px 6px}

/* khói: luật của recipe.css, thiếu là path khói đổ fill đen */
.steam path{stroke:rgba(250,247,232,.75);stroke-width:7;stroke-linecap:round;fill:none}
.steam path:nth-child(2){stroke-width:6}
.steam path:nth-child(3){stroke-width:5}

.wrap{max-width:1240px;margin:0 auto;padding:0 24px}
header.top{background:linear-gradient(160deg,#2C5234,#1F3D26);color:#F4EFDA;padding:38px 0 34px}
header.top h1{font-size:2rem;color:#FDFBEF;margin-bottom:8px}
header.top p{margin:0;max-width:70ch;color:rgba(244,239,218,.86);font-size:.95rem}
header.top .tally{margin-top:14px;font-size:.82rem;color:var(--gold)}

.bar{position:sticky;top:0;z-index:9;display:flex;flex-wrap:wrap;gap:10px;align-items:center;
  background:color-mix(in srgb,var(--paper) 92%,transparent);backdrop-filter:blur(8px);
  border-bottom:1px solid var(--line);padding:12px 24px}
.bar button{font-family:var(--fb);font-weight:700;font-size:.84rem;cursor:pointer;
  border:1.5px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:8px 15px}
.bar button:hover{border-color:var(--gold)}
.bar .hint{font-size:.8rem;color:var(--muted);margin-left:auto}

.fam{padding:34px 0 10px;border-top:1px solid var(--line)}
.fam__head{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin-bottom:18px}
.fam__head h2{font-size:1.35rem}
.fam__chip{width:26px;height:26px;border-radius:8px;display:block;flex:none;border:1px solid rgba(0,0,0,.2)}
.fam__meta{font-size:.84rem;color:var(--muted)}
.fam__meta b{color:var(--ink)}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px}
.grid--sm{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.tile{margin:0;background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden}
.tile__art{background:var(--ground);padding:14px 12px;min-height:120px;display:grid;place-items:center}
.tile__art svg{width:80%}
.tile__missing{color:#F4C9C0;font-size:.78rem;text-align:center;font-weight:700}
.tile figcaption{padding:9px 12px 11px;display:flex;flex-direction:column;gap:1px}
.tile figcaption b{font-size:.88rem;line-height:1.3}
.tile figcaption span{font-size:.74rem;color:var(--muted)}
.tile figcaption i{font-style:normal;opacity:.7}
.tile figcaption .warn{color:var(--chili);font-weight:700}
body.compare .tile__art{background:linear-gradient(160deg,#2C5234 0%,#1F3D26 100%)}

.pick{margin-bottom:22px}
.rcgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(215px,1fr));gap:16px}
.rc{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--line);
  border-radius:18px;overflow:hidden;text-decoration:none;color:var(--ink);
  box-shadow:0 8px 22px rgba(46,58,32,.10);transition:transform .18s,box-shadow .18s}
.rc:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(46,58,32,.18)}
.rc__art{position:relative;background:var(--ground);padding:16px 14px 4px}
.rc__art svg{width:74%;margin:0 auto}
.rc__kind{position:absolute;top:11px;left:12px;z-index:2;font-size:.63rem;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:5px;
  background:rgba(0,0,0,.32);color:#fff;backdrop-filter:blur(3px)}
.rc__wave{color:var(--card);margin-top:-6px}
.rc__wave svg{width:100%;height:22px;display:block}
.rc__body{padding:4px 15px 15px;display:flex;flex-direction:column;gap:6px;flex:1}
.rc__body h4{font-family:var(--fd);font-weight:400;font-size:1.05rem;line-height:1.28;margin:0}
.rc__body p{margin:0;font-size:.79rem;color:var(--muted);line-height:1.5;flex:1}
.rc__meta{display:flex;flex-wrap:wrap;gap:4px 12px;padding-top:9px;border-top:1px dashed var(--line);
  font-size:.72rem;font-weight:600;color:var(--muted)}
body.compare .rc__art{background:linear-gradient(160deg,#2C5234 0%,#1F3D26 100%)}
.fam__note{margin:0 0 16px;font-size:.9rem;color:var(--muted);max-width:78ch}
.strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.strip__cell{border-radius:12px;padding:26px 14px 16px;color:#F4EFDA;display:flex;flex-direction:column;gap:4px}
.strip__cell b{font-size:.95rem}
.strip__cell code{background:rgba(0,0,0,.25);border-color:transparent;color:#F4EFDA;align-self:flex-start}
.pick__label{display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:.9rem}
footer{padding:40px 0 60px;color:var(--muted);font-size:.84rem}
</style>
</head>
<body>
<header class="top">
  <div class="wrap">
    <h1>Contact sheet — hình món trên nền họ màu</h1>
    <p>Mỗi hình được render trên đúng nền họ màu mà món đó sẽ dùng sau khi thiết kế lại.
       Việc cần làm: soi tìm hình nào <b>chìm vào nền</b> hoặc <b>chọi màu</b> — chỉ những hình đó mới phải sửa.
       Bấm “So với nền cũ” để đối chiếu với nền xanh đậm hiện tại.</p>
    <p class="tally">${esc(counts)} · tổng ${recipes.length} món · ${uid} hình</p>
  </div>
</header>

<div class="bar">
  <button type="button" id="cmp">So với nền cũ</button>
  <button type="button" id="thm">Đổi nền sáng/tối</button>
  <span class="hint">Sinh bởi <code>node tools/contact-sheet.mjs</code> — file này là kết quả, đừng sửa tay</span>
</div>

<div class="wrap">
  ${paletteStrip}
  ${previewSection}
  ${haloSection}
  ${sections}
  ${trialSections}
  ${genericSection}
</div>

<footer class="wrap">
  Chạy lại sau mỗi đợt món để soi hình mới. Sửa danh sách họ màu ở đầu <code>tools/contact-sheet.mjs</code>.
</footer>

<script>
  var b=document.body,r=document.documentElement;
  document.getElementById('cmp').addEventListener('click',function(){
    b.classList.toggle('compare');
    this.textContent=b.classList.contains('compare')?'Về nền mới':'So với nền cũ';
  });
  document.getElementById('thm').addEventListener('click',function(){
    var dark=r.getAttribute('data-theme')==='dark'||(!r.hasAttribute('data-theme')&&matchMedia('(prefers-color-scheme: dark)').matches);
    r.setAttribute('data-theme',dark?'light':'dark');
  });
</script>
</body>
</html>`;

fs.writeFileSync(OUT, html);
console.log(`Contact sheet: ${path.relative(ROOT, OUT)}`);
console.log(`  ${recipes.length} món · ${uid} hình vẽ`);
for (const f of FAMILIES) {
  console.log(`  ${f.name.padEnd(14)} ${String(recipes.filter((r) => r.family && r.family.id === f.id).length).padStart(2)} món  ${f.from}`);
}
const noFam = recipes.filter((r) => !r.family);
if (noFam.length) console.log(`  ⚠ chưa xếp họ: ${noFam.map((r) => `${r.slug} (${r.cat})`).join(', ')}`);
const noArt = recipes.filter((r) => !r.art || !artToComponent[r.art]);
if (noArt.length) console.log(`  ⚠ thiếu art: ${noArt.map((r) => r.slug).join(', ')}`);
