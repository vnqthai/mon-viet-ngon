import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import yaml from 'js-yaml';
import { KIEU_SLUG, MIEN_SLUG, DIP_SLUG } from './src/data/truc-slug.mjs';

import sitemap from '@astrojs/sitemap';

/* <lastmod> cho sitemap — Google chỉ dùng khi giá trị "consistently and
   verifiably accurate", nên chỉ ghi ngày THẬT: trang món lấy updatedDate ??
   pubDate của chính món; trang chủ, /mon/ và 31 trang trục lấy ngày mới nhất
   của đúng nhóm món dựng ra trang đó; trang không có ngày thật (bi-quyet,
   gioi-thieu) thì bỏ trống, đừng bịa. Đọc thẳng YAML vì astro.config không
   với được astro:content. Xem SEO.md §7. */
const SITE = 'https://www.monvietngon.com';
const recipeDay = new Map(); // slug món  → ngày
const pathDay = new Map(); //   đường dẫn trang gộp → ngày mới nhất của nhóm
const bump = (p, day) => {
  if (!pathDay.has(p) || day > pathDay.get(p)) pathDay.set(p, day);
};
for (const f of readdirSync('src/content/recipes')) {
  if (!f.endsWith('.yaml') || f.startsWith('_')) continue;
  const d = yaml.load(readFileSync(`src/content/recipes/${f}`, 'utf8'));
  const raw = d?.updatedDate ?? d?.pubDate;
  if (!raw) continue;
  const day = new Date(raw).toISOString().slice(0, 10);
  recipeDay.set(f.slice(0, -'.yaml'.length), day);
  bump('/', day);
  bump('/mon/', day);
  /* Giá trị enum chưa có slug thì bỏ qua lặng lẽ — trang trục của nó cũng
     chưa tồn tại (trang-truc.ts mới là chỗ khai trang), nên không ghi là đúng. */
  if (KIEU_SLUG[d.category]) bump(`/kieu/${KIEU_SLUG[d.category]}/`, day);
  if (MIEN_SLUG[d.region]) bump(`/mien/${MIEN_SLUG[d.region]}/`, day);
  for (const o of d.occasions ?? []) {
    if (DIP_SLUG[o]) bump(`/dip/${DIP_SLUG[o]}/`, day);
  }
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      serialize(item) {
        const slug = item.url.match(/\/mon\/([^/]+)\/$/)?.[1];
        const path = item.url.startsWith(SITE) ? item.url.slice(SITE.length) : null;
        if (slug && recipeDay.has(slug)) {
          item.lastmod = recipeDay.get(slug);
        } else if (path && pathDay.has(path)) {
          item.lastmod = pathDay.get(path);
        }
        return item;
      },
    }),
  ],
});
