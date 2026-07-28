import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { plain } from '../../utils/rich';
import { renderOgCard } from '../../utils/og';
import { familyOf } from '../../utils/family';

/** Thẻ chia sẻ mạng xã hội cho từng món — sinh PNG tĩnh lúc build: /og/<slug>.png */

export async function getStaticPaths() {
  const recipes = await getCollection('recipes');
  return recipes.map((r) => ({ params: { slug: r.id }, props: { recipe: r } }));
}

export const GET: APIRoute = async ({ props }) => {
  const d = props.recipe.data;
  const png = await renderOgCard({
    title: plain(d.title),
    chips: [d.region, d.category, d.time.total, d.difficulty],
    family: familyOf(d.category),
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
