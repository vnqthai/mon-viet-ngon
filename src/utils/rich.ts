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

/** Bỏ hết markup, trả chuỗi trơn — dùng cho <title>, thẻ món, mô tả meta. */
export function plain(src: string): string {
  return src
    .replace(/\[\[([\d.]+)\|([^\|\]]+)(\|frac)?\]\]/g, (_m, base, unit, frac) =>
      fmtQty(parseFloat(base), unit, Boolean(frac), 1)
    )
    .replace(/\*\*([^*]+)\*\*/g, '$1');
}
