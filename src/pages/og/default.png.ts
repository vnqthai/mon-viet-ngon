import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgCard } from '../../utils/og';

/** Thẻ chia sẻ mặc định cho trang chủ / danh mục / bí quyết: /og/default.png */

export const GET: APIRoute = async () => {
  const recipes = await getCollection('recipes');
  const regionCount = new Set(recipes.map((r) => r.data.region)).size;
  const png = await renderOgCard({
    title: 'Món Việt Ngon',
    subtitle: 'Nấu món Việt chuẩn vị, dễ như cơm nhà — bản nấu nhanh, giỏ đi chợ tự tính khẩu phần, hẹn giờ từng bước.',
    chips: [`${recipes.length} món ngon`, `${regionCount} vùng miền`, 'Không quảng cáo'],
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
