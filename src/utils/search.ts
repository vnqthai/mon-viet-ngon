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

/** Gom mọi thứ đáng tìm của một món thành một chuỗi đã bỏ dấu. */
export function searchText(data: any, plain: (s: string) => string): string {
  const parts: string[] = [
    plain(data.title ?? ''),
    plain(data.summary ?? ''),
    data.region ?? '',
    data.category ?? '',
    ...(data.occasions ?? []),
  ];
  for (const g of data.ingredientGroups ?? []) {
    for (const it of g.items ?? []) parts.push(plain(it.name ?? ''));
  }
  return deaccent(parts.join(' ')).replace(/\s+/g, ' ').trim();
}
