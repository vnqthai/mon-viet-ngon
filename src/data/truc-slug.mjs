/**
 * SLUG CỦA 31 TRANG TRỤC LỌC — /kieu/… · /mien/… · /dip/… (SEO.md §5).
 *
 * MỘT nguồn cho bốn chỗ dùng: route [truc]/[slug], ba cửa trục ở trang chủ,
 * badge trên hero trang món, và <lastmod> trong astro.config.mjs (vì vậy phải
 * là .mjs trần — config không import được TS).
 *
 * Giá trị bên trái phải khớp ĐÚNG enum trong content.config.ts. Mở thêm giá
 * trị enum mà quên thêm slug ở đây thì build gãy ngay tại trang trục (lookup
 * ra undefined trong href) — gãy sớm là chủ ý, đừng bọc try/catch.
 */
export const KIEU_SLUG = {
  'Món nước': 'mon-nuoc',
  'Bún trộn': 'bun-tron',
  'Canh': 'canh',
  'Lẩu': 'lau',
  'Cháo': 'chao',
  'Kho': 'kho',
  'Xào': 'xao',
  'Hấp': 'hap',
  'Cơm': 'com',
  'Xôi': 'xoi',
  'Bánh': 'banh',
  'Bánh mì': 'banh-mi',
  'Chiên': 'chien',
  'Nướng': 'nuong',
  'Cuốn': 'cuon',
  'Gỏi': 'goi',
  'Chè': 'che',
};
export const MIEN_SLUG = {
  'Miền Bắc': 'mien-bac',
  'Miền Trung': 'mien-trung',
  'Miền Nam': 'mien-nam',
  'Miền Tây': 'mien-tay',
  'Tây Bắc': 'tay-bac',
  'Tây Nguyên': 'tay-nguyen',
  'Cả nước': 'ca-nuoc',
};
export const DIP_SLUG = {
  'Cơm nhà': 'com-nha',
  'Bữa sáng': 'bua-sang',
  'Đãi khách': 'dai-khach',
  'Nhậu lai rai': 'nhau-lai-rai',
  'Ăn chơi': 'an-choi',
  'Cho bé': 'cho-be',
  'Cỗ Tết': 'co-tet',
};
