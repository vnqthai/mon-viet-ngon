import { plain, dishName } from './rich';

/**
 * Bỏ dấu tiếng Việt để tìm kiếm: gõ "pho bo" vẫn ra "phở bò".
 *
 * ⚠️ NFD KHÔNG tách được chữ đ/Đ — nó là một ký tự riêng chứ không phải d + dấu.
 * Phải thay tay, không thì "dau hu" không tìm ra "đậu hũ".
 */
export function deaccent(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/** Bỏ dấu + bỏ dấu câu, còn lại toàn âm tiết cách nhau đúng một khoảng trắng. */
function tidy(s: string): string {
  return deaccent(s).replace(/[^a-z0-9]+/g, ' ').trim();
}

export interface SearchFields {
  /** Chỉ TÊN MÓN, không kèm câu quảng trong `**…**`. */
  name: string;
  /** Miền + kiểu món + theo dịp. */
  meta: string;
  /** Tên mọi nguyên liệu, gộp hết các nhóm. */
  ing: string;
}

/**
 * Ba trường tìm kiếm đặt riêng trên thẻ, KHÔNG gộp thành một chuỗi — bộ tìm
 * kiếm chấm điểm theo trường để trúng tên món ăn đứt trúng nguyên liệu.
 *
 * ⚠️ KHÔNG đưa `summary` vào đây. Summary là văn xuôi và hay nhắc tên món khác
 * ("cùng họ với canh chua cá lóc"), nên gõ đúng tên món này lại lòi ra món kia.
 * Bản cũ gộp cả summary lẫn mọi nguyên liệu rồi `includes()`: đo trên đúng 64
 * món đang có thì gõ "hanh" ra 60/64 món, "ca" ra 58/64, còn đảo thứ tự chữ
 * ("kho bo" thay vì "bo kho") thì ra 0.
 */
export function searchFields(data: any): SearchFields {
  const ing: string[] = [];
  for (const g of data.ingredientGroups ?? []) {
    for (const it of g.items ?? []) ing.push(plain(it.name ?? ''));
  }
  return {
    name: tidy(dishName(data.title)),
    meta: tidy([data.region, data.category, ...(data.occasions ?? [])].join(' ')),
    ing: tidy(ing.join(' ')),
  };
}
