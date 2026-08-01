/**
 * RSS — /rss.xml
 *
 * Sắp theo `pubDate` MỚI NHẤT TRƯỚC, không theo `order`. Hai thứ tự này khác
 * hẳn nhau: `order` là thứ tự bày trên trang (gom theo kiểu món, cân cho lưới
 * đẹp), còn người theo dõi feed thì chỉ muốn biết bếp mới ra món gì.
 *
 * Món nào chưa có `pubDate` thì BỎ QUA chứ không lấy ngày hôm nay — đặt ngày
 * giả là mỗi lần build feed lại đảo lộn, ai theo dõi cũng tưởng có bài mới.
 * Hiện mọi món đều đã có, nên trên thực tế không món nào rớt.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { plain, dishName } from '../utils/rich';

export async function GET(context) {
  const recipes = (await getCollection('recipes'))
    .filter((r) => r.data.pubDate)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: 'Món Việt Ngon',
    description:
      'Công thức món Việt ba miền, hướng dẫn cặn kẽ từng bước: bản nấu nhanh, ' +
      'giỏ đi chợ tự tính khẩu phần, đồng hồ đếm giờ và bí quyết cho từng món.',
    site: context.site,
    trailingSlash: true,
    customData: '<language>vi</language>',
    items: recipes.map((r) => ({
      // Tên món thôi, bỏ câu quảng trong ** — trình đọc feed hiện đúng một dòng
      // tiêu đề, nhét cả câu quảng vào là bị cắt cụt.
      title: dishName(r.data.title),
      description: plain(r.data.summary),
      link: `/mon/${r.id}/`,
      pubDate: new Date(r.data.pubDate),
      categories: [r.data.region, r.data.category, ...r.data.occasions],
    })),
  });
}
