import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import yaml from 'js-yaml';

import sitemap from '@astrojs/sitemap';

/* <lastmod> cho sitemap — Google chỉ dùng khi giá trị "consistently and
   verifiably accurate", nên chỉ ghi ngày THẬT: trang món lấy updatedDate ??
   pubDate của chính món; trang chủ và /mon/ lấy ngày mới nhất toàn catalog
   (hai trang đó dựng từ dữ liệu món nên đổi theo); trang không có ngày thật
   thì bỏ trống, đừng bịa. Đọc thẳng YAML vì astro.config không với được
   astro:content. Xem SEO.md §7. */
const SITE = 'https://www.monvietngon.com';
const recipeDay = new Map();
let newestDay = '';
for (const f of readdirSync('src/content/recipes')) {
  if (!f.endsWith('.yaml') || f.startsWith('_')) continue;
  const d = yaml.load(readFileSync(`src/content/recipes/${f}`, 'utf8'));
  const raw = d?.updatedDate ?? d?.pubDate;
  if (!raw) continue;
  const day = new Date(raw).toISOString().slice(0, 10);
  recipeDay.set(f.slice(0, -'.yaml'.length), day);
  if (day > newestDay) newestDay = day;
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      serialize(item) {
        const slug = item.url.match(/\/mon\/([^/]+)\/$/)?.[1];
        if (slug && recipeDay.has(slug)) {
          item.lastmod = recipeDay.get(slug);
        } else if (newestDay && (item.url === `${SITE}/` || item.url === `${SITE}/mon/`)) {
          item.lastmod = newestDay;
        }
        return item;
      },
    }),
  ],
});
