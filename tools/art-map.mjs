/**
 * Đọc bảng ART_COMPONENT (tên art -> file component) từ src/utils/art.ts.
 *
 * Cả ba tool hình (contact-sheet, art-png, check-art-ids) đều cần bảng này. Đọc
 * thẳng từ nguồn sự thật của site nên thêm món mới là tool tự theo, không phải
 * cập nhật tay chỗ nào.
 */
import fs from 'node:fs';

export function readArtMap(artTsPath) {
  const src = fs.readFileSync(artTsPath, 'utf8');
  const block = src.match(/ART_COMPONENT[^{]*\{([\s\S]*?)\n\};/);
  if (!block) throw new Error(`Không tìm thấy bảng ART_COMPONENT trong ${artTsPath}`);
  return Object.fromEntries(
    [...block[1].matchAll(/'([^']+)':\s*'([^']+)'/g)].map((m) => [m[1], m[2]])
  );
}
