/**
 * HỌ MÓN — gom 14 kiểu món thành 5 họ theo *cách ăn*, mỗi họ một màu nền thẻ.
 *
 * Vì sao gom: 14 màu nền phân biệt được là bất khả, mắt không đọc nổi. Năm họ
 * thì lưới danh mục đọc ra thành từng nhóm ngay từ cái liếc đầu — màu ở đây là
 * thông tin, không phải trang trí.
 *
 * Màu nằm ở tokens.css (--fam-*). Soi hình trên nền họ bằng:
 *   node tools/contact-sheet.mjs
 */

export type FamilyId = 'nuoc' | 'man' | 'tron' | 'banh' | 'lua';

export const FAMILIES: Record<FamilyId, { name: string; cats: string[] }> = {
  nuoc: { name: 'Chan & húp',  cats: ['Món nước', 'Món sợi', 'Canh', 'Lẩu', 'Cháo'] },
  man:  { name: 'Mặn đưa cơm', cats: ['Kho', 'Xào', 'Hấp'] },
  tron: { name: 'Cuốn & trộn', cats: ['Gỏi', 'Cuốn', 'Bún trộn'] },
  banh: { name: 'Cơm & bánh',  cats: ['Cơm', 'Bánh'] },
  lua:  { name: 'Lửa',         cats: ['Nướng', 'Chiên'] },
};

// 'Món sợi' là tên cũ của 'Món nước' — giữ cả hai để đợt 6 đổi tên không gãy.

const BY_CAT = new Map<string, FamilyId>();
for (const [id, fam] of Object.entries(FAMILIES)) {
  for (const c of fam.cats) BY_CAT.set(c, id as FamilyId);
}

/** Kiểu món -> họ. Kiểu món lạ thì rơi về 'nuoc' cho khỏi vỡ giao diện. */
export function familyOf(category: string): FamilyId {
  return BY_CAT.get(category) ?? 'nuoc';
}
