/**
 * ĐỌC MÃ SVG THÔ CỦA HÌNH MÓN — dùng chung cho hai endpoint sinh hình:
 *   src/pages/art/[kind].svg.ts    → /art/<kind>.svg   (hình cho TRANG WEB)
 *   src/pages/anh-mon/[shot].jpg.ts → /anh-mon/…       (ảnh cho CÔNG CỤ TÌM KIẾM)
 *
 * Hai bên cần cùng một thứ — phần <svg>…</svg> rút khỏi file .astro, đã bỏ chú
 * thích — nhưng bơm CSS khác nhau: bản cho web có animation khói, bản đem
 * render ra ảnh thì không (resvg không chạy animation). Nên chỗ dùng chung
 * dừng ở đây, phần CSS để mỗi bên tự lo.
 */

/* Đọc thẳng mã nguồn file art. Vẽ vẫn giữ nguyên là .astro cho tiện sửa; ở đây
   chỉ cần phần <svg>…</svg> nên đọc raw là đủ, khỏi phải dựng component. */
const RAW = import.meta.glob('../components/art/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [file, src] of Object.entries(RAW)) {
  byName[file.slice(file.lastIndexOf('/') + 1, -'.astro'.length)] = src;
}

/**
 * Rút <svg>…</svg> khỏi file component, BỎ HẾT CHÚ THÍCH.
 *
 * Bỏ chú thích không phải để cho gọn mà vì cả hai đường ra đều đọc bằng bộ
 * phân tích XML NGHIÊM (file .svg rời trên web, và resvg khi render ảnh), khác
 * hẳn HTML dễ dãi: chú thích XML cấm chứa "--", mà chú thích trong file art thì
 * hay nhắc tên biến kiểu --art-halo hay kẻ vạch "---- lớp sau ----". Nhúng
 * thẳng vào HTML thì không sao, tách ra là hình đó chết hẳn (gặp thật ở ca-kho
 * khi tách). Bản gốc trong .astro vẫn giữ nguyên chú thích.
 */
export function artSvgSource(component: string): string | null {
  const src = byName[component];
  if (!src) return null;
  const m = src.match(/<svg[\s\S]*<\/svg>/);
  if (!m) return null;
  return m[0].replace(/<!--[\s\S]*?-->\s*/g, '');
}
