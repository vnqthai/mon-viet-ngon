import type { APIRoute } from 'astro';
import { ART_COMPONENT } from '../../utils/art';
import { artSvgSource } from '../../utils/art-src';

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

/** Rút <svg>…</svg> khỏi file .astro, thêm xmlns (file rời bắt buộc) + luật .steam.
    Phần rút mã + bỏ chú thích nằm ở utils/art-src.ts vì endpoint ảnh JPEG cũng cần. */
function svgFile(kind: string): string | null {
  const svg = artSvgSource(ART_COMPONENT[kind]);
  if (!svg) return null;
  return svg.replace(
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
