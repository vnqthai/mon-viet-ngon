import type { APIRoute } from 'astro';
import { ART_COMPONENT } from '../../utils/art';

/**
 * HÌNH MÓN THÀNH FILE RIÊNG — sinh lúc build: /art/<kind>.svg
 *
 * Cùng khuôn với og/[slug].png.ts. Trước đây mỗi thẻ món nhúng thẳng một SVG vẽ
 * tay vào HTML, nên /mon/ nặng thêm ~2,6 KB gzip mỗi lần thêm món, mà cùng một
 * hình còn bị tải lại ở cả ba trang (/mon/, trang chủ, trang chi tiết).
 *
 * Cái giá của việc tách: CSS ngoài không với vào trong <img> được, nên luật
 * .steam của recipe.css phải nằm trong file svg. Bơm MỘT LẦN ở đây trong code,
 * không chép vào 62 file art.
 */

/* Đọc thẳng mã nguồn file art. Vẽ vẫn giữ nguyên là .astro cho tiện sửa; ở đây
   chỉ cần phần <svg>…</svg> nên đọc raw là đủ, khỏi phải dựng component. */
const RAW = import.meta.glob('../../components/art/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [file, src] of Object.entries(RAW)) {
  byName[file.slice(file.lastIndexOf('/') + 1, -'.astro'.length)] = src;
}

/* Luật .steam chép từ src/styles/recipe.css — KHÔNG được lệch với bản đó.
   Kể cả @keyframes: animation trong SVG vẫn chạy khi nhúng bằng <img>.
   Chỗ reduced-motion khớp với base.css: tắt animation thì khói đứng yên,
   hiện nguyên độ mờ mặc định (base.css cho animation chạy .01ms rồi trả về
   trạng thái không-animation, tức là y như vậy). */
const STEAM_CSS = `
    .steam path{stroke:rgba(250,247,232,.75);stroke-width:7;stroke-linecap:round;fill:none;
      animation:steam 3.6s ease-in-out infinite}
    .steam path:nth-child(2){animation-delay:1.2s;stroke-width:6}
    .steam path:nth-child(3){animation-delay:2.2s;stroke-width:5}
    @keyframes steam{
      0%{transform:translateY(10px);opacity:0}
      30%{opacity:.85}
      70%{opacity:.4}
      100%{transform:translateY(-26px);opacity:0}
    }
    @media (prefers-reduced-motion:reduce){.steam path{animation:none}}`;

/** Rút <svg>…</svg> khỏi file .astro, thêm xmlns (file rời bắt buộc) + luật .steam */
function svgFile(kind: string): string | null {
  const src = byName[ART_COMPONENT[kind]];
  if (!src) return null;
  const m = src.match(/<svg[\s\S]*<\/svg>/);
  if (!m) return null;
  /* BỎ HẾT CHÚ THÍCH. Không phải để cho gọn mà vì file .svg rời được đọc bằng
     bộ phân tích XML NGHIÊM, khác hẳn HTML dễ dãi: chú thích XML cấm chứa "--",
     mà chú thích trong file art thì hay nhắc tên biến kiểu --art-halo. Nhúng
     thẳng vào HTML thì không sao, tách ra file riêng là hình đó chết hẳn (gặp
     thật ở ca-kho khi tách). Bản gốc trong .astro vẫn giữ nguyên chú thích. */
  return m[0].replace(/<!--[\s\S]*?-->\s*/g, '').replace(
    /^<svg([^>]*)>/,
    (_, attrs) =>
      `<svg xmlns="http://www.w3.org/2000/svg"${attrs}>\n  <style>${STEAM_CSS}\n  </style>`
  );
}

export function getStaticPaths() {
  return Object.keys(ART_COMPONENT).map((kind) => ({ params: { kind } }));
}

export const GET: APIRoute = ({ params }) => {
  const svg = svgFile(params.kind!);
  if (!svg) return new Response('Không có hình này', { status: 404 });
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
