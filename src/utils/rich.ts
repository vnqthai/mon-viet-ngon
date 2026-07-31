import { fmtQty } from './qty';

/**
 * Chuyển "mini markup" trong dữ liệu YAML thành HTML an toàn:
 *   **đậm**                 → <b>đậm</b>
 *   [[100|ml]]              → <span class="num" data-base="100" data-unit="ml">100 ml</span>
 *   [[2.5|muỗng canh|frac]] → như trên, hiển thị dạng phân số (2½ muỗng canh)
 * Các span data-base được script khẩu phần trên client tính lại khi người dùng
 * đổi số người ăn.
 */
function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function rich(src: string): string {
  let out = escapeHtml(src);

  out = out.replace(/\[\[([\d.]+)\|([^\|\]]+)(\|frac)?\]\]/g, (_m, base, unit, frac) => {
    const b = parseFloat(base);
    const isFrac = Boolean(frac);
    const shown = fmtQty(b, unit, isFrac, 1);
    return `<span class="num" data-base="${b}" data-unit="${unit}"${isFrac ? ' data-frac="1"' : ''}>${shown}</span>`;
  });

  out = out.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  return out;
}

/**
 * Chỉ lấy TÊN MÓN từ title.
 *
 * title viết theo lối "Bún chả Hà Nội **chả cháy cạnh, nước chấm ấm thanh**" —
 * phần trong ** là câu quảng cho hero, đặt lên thẻ món thì vừa dài vừa lặp ý
 * với dòng tóm tắt ngay dưới. Thẻ chỉ cần cái tên.
 */
export function dishName(src: string): string {
  // Dấu nối cuối phần tên phải cắt hết, kể cả DẤU HAI CHẤM: title kiểu
  // "Chè bà ba: **3 thứ khoai, một nồi cốt dừa**" mà không cắt thì thẻ món
  // hiện ra "Chè bà ba:" — cụt lủn, trông như lỗi hiển thị.
  const before = src.split('**')[0].trim().replace(/[,:;–—-]\s*$/, '');
  return before || plain(src);
}

/** Bỏ hết markup, trả chuỗi trơn — dùng cho <title>, thẻ món, mô tả meta. */
export function plain(src: string): string {
  return src
    .replace(/\[\[([\d.]+)\|([^\|\]]+)(\|frac)?\]\]/g, (_m, base, unit, frac) =>
      fmtQty(parseFloat(base), unit, Boolean(frac), 1)
    )
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}
