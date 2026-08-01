/**
 * TITLE THEO Ý ĐỊNH TÌM KIẾM — "Cách nấu/làm {tên món} — {hook}". Xem SEO.md §4.
 *
 * Vì sao là .mjs trần chứ không TS: file này phải chạy được ở CẢ BA nơi —
 * trang món ([slug].astro), tools/check-recipes.mjs (QA trước build) và bất kỳ
 * script node nào — nên không dùng cú pháp TS lẫn import astro.
 *
 * Chỉ đổi <title>/og:title. KHÔNG đụng h1 (giọng thương hiệu trên trang),
 * không đụng `name` trong JSON-LD (tên trần là dạng đúng của schema Recipe).
 */

/** Ngân sách ký tự — quá mốc này Google cắt đuôi title trong SERP. */
export const TITLE_MAX = 62;

/* Kiểu món đọc "cách NẤU", còn lại "cách LÀM". Cơm nằm bên "làm" dù trực giác
   nói khác: đo trên catalog thì 6/7 món Cơm là món ghép/chiên/nướng (cơm tấm,
   cơm rang, cơm cháy, cơm lam…) — chỉ cơm gà Hội An là nồi nấu thật, món đó
   override bằng `seoVerb: nấu` trong YAML. */
const VERB_NAU = new Set(['Món nước', 'Canh', 'Lẩu', 'Cháo', 'Chè', 'Xôi']);

/** Phần **hook** cuối title, hoặc null nếu title không theo khuôn — QA sẽ chặn. */
export function hookOf(title) {
  const m = String(title).match(/\*\*(.+?)\*\*\s*$/);
  return m ? m[1] : null;
}

/** Tên món trần — cùng phép cắt với dishName() bên rich.ts (kể cả dấu ":"). */
export function bareName(title) {
  return String(title).split('**')[0].trim().replace(/[,:;–—-]\s*$/, '');
}

export function seoTitleFor(d) {
  if (d.seoTitle) return d.seoTitle;
  const name = bareName(d.title);
  const verb = d.seoVerb ?? (VERB_NAU.has(d.category) ? 'nấu' : 'làm');
  const lowered = name.charAt(0).toLowerCase() + name.slice(1);
  let hook = hookOf(d.title) ?? '';
  const compose = () => `Cách ${verb} ${lowered}` + (hook ? ` — ${hook}` : '');
  let t = compose();
  /* Quá ngân sách thì bỏ dần vế sau của hook — hook nhà này viết theo vế phẩy,
     vế mạnh đứng trước nên cắt đuôi là an toàn. Còn một vế mà vẫn dài thì trả
     nguyên cho QA réo, người viết rút tay bằng seoTitle. */
  while ([...t].length > TITLE_MAX && hook.includes(', ')) {
    hook = hook.slice(0, hook.lastIndexOf(', '));
    t = compose();
  }
  return t;
}
