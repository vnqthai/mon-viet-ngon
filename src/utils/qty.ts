/**
 * Định dạng định lượng nguyên liệu theo hệ số khẩu phần.
 * Dùng chung cho cả lúc build (giá trị ban đầu) và client (khi chỉnh khẩu phần)
 * — một nguồn logic duy nhất, tránh lệch nhau.
 */
const FRAC: Record<string, string> = { '0.25': '¼', '0.5': '½', '0.75': '¾' };

function fmtFrac(v: number): string {
  let q = Math.round(v * 4) / 4;
  if (q < 0.25) q = 0.25;
  const i = Math.floor(q);
  const f = q - i;
  const fs = FRAC[String(f)] || '';
  if (i === 0) return fs || String(q);
  return fs ? i + fs : String(i);
}

function viDecimal(v: number): string {
  return String(v).replace('.', ',');
}

/** k = số khẩu phần đang chọn / khẩu phần gốc của công thức */
export function fmtQty(base: number, unit: string, frac: boolean, k: number): string {
  const v = base * k;
  if (unit === 'g') {
    const g = Math.max(5, Math.round(v / 5) * 5);
    if (g >= 1000) return viDecimal(Math.round(g / 100) / 10) + ' kg';
    return g + ' g';
  }
  if (unit === 'ml') {
    const ml = Math.max(10, Math.round(v / 10) * 10);
    if (ml >= 1000) return viDecimal(Math.round(ml / 100) / 10) + ' lít';
    return ml + ' ml';
  }
  if (unit === 'lít') {
    return viDecimal(Math.round(v * 10) / 10) + ' lít';
  }
  if (frac) return fmtFrac(v) + ' ' + unit;
  return Math.max(1, Math.round(v)) + ' ' + unit;
}
