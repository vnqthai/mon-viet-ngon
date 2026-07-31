/**
 * HỌ MÓN — gom 16 kiểu món thành 6 họ theo *cách ăn*, mỗi họ một màu nền thẻ.
 *
 * Vì sao gom: 16 màu nền phân biệt được là bất khả, mắt không đọc nổi. Sáu họ
 * thì lưới danh mục đọc ra thành từng nhóm ngay từ cái liếc đầu — màu ở đây là
 * thông tin, không phải trang trí.
 *
 * Màu nằm ở tokens.css (--fam-*). Soi hình trên nền họ bằng:
 *   node tools/contact-sheet.mjs
 */

export type FamilyId = 'nuoc' | 'man' | 'tron' | 'banh' | 'lua' | 'ngot';

export const FAMILIES: Record<FamilyId, { name: string; cats: string[] }> = {
  nuoc: { name: 'Chan & húp',  cats: ['Món nước', 'Canh', 'Lẩu', 'Cháo'] },
  man:  { name: 'Mặn đưa cơm', cats: ['Kho', 'Xào', 'Hấp'] },
  tron: { name: 'Cuốn & trộn', cats: ['Gỏi', 'Cuốn', 'Bún trộn'] },
  banh: { name: 'Cơm & bánh',  cats: ['Cơm', 'Bánh', 'Bánh mì'] },
  lua:  { name: 'Lửa',         cats: ['Nướng', 'Chiên'] },
  ngot: { name: 'Ngọt & mát',  cats: ['Chè'] },
};

/**
 * Cặp màu nền thẻ của mỗi họ — GƯƠNG của --fam-* / --fam-*-deep trong
 * tokens.css. Sửa một bên phải sửa bên kia.
 *
 * Có bản TS ở đây vì endpoint /anh-mon/ render ảnh bằng resvg, mà resvg không
 * với được vào CSS của site. (tools/art-png.mjs giữ bản chép thứ ba của riêng
 * nó vì là node thuần, không import được file .ts này.)
 */
export const FAM_GROUND: Record<FamilyId, [string, string]> = {
  nuoc: ['#235B66', '#143A42'],
  man:  ['#6E3512', '#421C06'],
  tron: ['#5B7A2E', '#3B521C'],
  banh: ['#A8801A', '#70530C'],
  lua:  ['#9A3D2B', '#65241A'],
  ngot: ['#5E3A6E', '#3B2247'],
};

const BY_CAT = new Map<string, FamilyId>();
for (const [id, fam] of Object.entries(FAMILIES)) {
  for (const c of fam.cats) BY_CAT.set(c, id as FamilyId);
}

/** Kiểu món -> họ. Kiểu món lạ thì rơi về 'nuoc' cho khỏi vỡ giao diện. */
export function familyOf(category: string): FamilyId {
  return BY_CAT.get(category) ?? 'nuoc';
}
