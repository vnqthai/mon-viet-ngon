/**
 * BĂNG CHUYỀN CHỮ — tính thời lượng chạy THEO LƯỢNG CHỮ, không để số cứng.
 *
 * Vì sao: `animation: ticker 30s` cũ là số cứng dùng chung cho mọi băng chuyền,
 * mà băng chuyền dài ngắn khác nhau tới cả chục lần. Cùng 30s thì băng dài chạy
 * nhanh gấp bấy nhiêu lần. Đo ngày 2026-08-01 ở khổ 1440px:
 *
 *   Trang chủ   70 mục · 23.563 px một vòng · 30s -> 785 px/s  (không đọc kịp)
 *   /mon/pho-bo/ 7 mục ·  1.635 px một vòng · 30s ->  54 px/s  (đọc êm)
 *
 * (Số trên đo hồi băng còn icon. Bỏ icon xong mỗi mục hụt 10px, xem hằng số.)
 *
 * Nên: chốt TỐC ĐỘ, để thời lượng tự suy ra. Trang món giữ nguyên như cũ
 * (1.635/55 ≈ 30s), trang chủ giãn ra đúng theo lượng chữ nó đang gánh.
 *
 * Đo lại khi đổi font hoặc cỡ chữ `.ticker__item`:
 *   const one = [...document.querySelectorAll('.ticker__item')].slice(0, n);
 *   // hồi quy bề rộng theo (số ký tự, số mục) -> PX_PER_CHAR, PX_PER_ITEM
 */

/** px/s — tốc độ trôi. Lấy đúng tốc độ băng chuyền trang món vốn đọc êm. */
const SPEED = 55;

/* Bề rộng một mục = PX_PER_CHAR·(số ký tự) + PX_PER_ITEM (padding hai bên).
   Hồi quy trên 70 mục thật của trang chủ, khớp tới từng px ở 1440px. Hai số này
   phụ thuộc FONT chứ không phụ thuộc khổ màn hình, nên tính ở lúc build được.
   PX_PER_ITEM từng là 55,7 hồi băng còn icon — bỏ icon là mất luôn 10px `gap`. */
const PX_PER_CHAR = 8.06;
const PX_PER_ITEM = 45.7;

/** Băng quá ngắn thì vòng lặp giật; giữ sàn để mắt kịp bắt nhịp. */
const MIN_SECONDS = 12;

/**
 * Thời lượng (giây) cho trọn MỘT vòng — tức đúng quãng `translateX(-50%)` của
 * dải đã nhân đôi. Trả về số nguyên cho gọn CSS.
 */
export function tickerDuration(items: { text: string }[]): number {
  const chars = items.reduce((n, t) => n + t.text.length, 0);
  const width = PX_PER_CHAR * chars + PX_PER_ITEM * items.length;
  return Math.max(MIN_SECONDS, Math.round(width / SPEED));
}
