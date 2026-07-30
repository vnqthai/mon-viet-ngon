import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { artKind, ART_COMPONENT } from '../../utils/art';
import { artSvgSource } from '../../utils/art-src';
import { familyOf, FAM_GROUND } from '../../utils/family';

/**
 * ẢNH MÓN CHO CÔNG CỤ TÌM KIẾM — sinh JPEG lúc build:
 *   /anh-mon/<slug>-1x1.jpg · <slug>-4x3.jpg · <slug>-16x9.jpg
 *
 * VÌ SAO CÓ FILE NÀY. Trường `image` của JSON-LD Recipe trước đây trỏ vào
 * /og/<slug>.png — mà đó là THẺ CHIA SẺ: nền màu họ, tên món chữ Paytone One,
 * bốn chip, viền caro. Không có tí hình món nào trên đó. Google lấy đúng ảnh
 * này làm thumbnail cho kết quả công thức và cho Google Hình ảnh, nên món của
 * mình đi thi trong một băng chuyền toàn ảnh đồ ăn bằng một tấm thiệp chữ.
 *
 * Giờ `image` trỏ vào đây: hình vẽ món thật, đặt trên đúng nền họ màu của
 * trang món, xuất ba tỉ lệ 1:1 · 4:3 · 16:9 như Google khuyến nghị để mỗi chỗ
 * hiển thị tự chọn khung hợp nhất. /og/ giữ nguyên nhiệm vụ cũ — thẻ chia sẻ
 * mạng xã hội, chỗ đó thì tên món nằm trên ảnh lại là đúng.
 *
 * Vì sao JPEG chứ không PNG: nền là gradient mượt, PNG nén rất tệ với thứ đó —
 * đo thật trên máy là 201 KB/ảnh, cả site 192 ảnh thành ~38 MB. JPEG q84 xuống
 * còn ~48 KB mà mắt không phân biệt được (hình vẽ phẳng, không có chữ nhỏ để
 * lộ artifact). WebP còn nhẹ hơn nữa nhưng JPEG là thứ MỌI con bot đều đọc
 * được — Google, Bing, Facebook, Pinterest — mà ảnh này sinh ra chỉ để cho bot
 * xem, người đọc không bao giờ tải nó.
 *
 * Vì sao khoá theo SLUG chứ không theo KIND như /art/: nền phải mang màu họ của
 * chính món đó, mà họ màu suy từ `category` của món chứ không từ tên hình.
 */

/* Ba tỉ lệ Google khuyến nghị cho ảnh công thức. Bề ngang 1200 để ảnh nào cũng
   vượt mốc "800.000 điểm ảnh" mà tài liệu Google đặt ra (1200×675 = 810.000). */
const RATIOS = {
  '1x1':  { w: 1200, h: 1200 },
  '4x3':  { w: 1200, h: 900 },
  '16x9': { w: 1200, h: 675 },
} as const;
type RatioId = keyof typeof RATIOS;

/* Hình chiếm 86% khung, canh giữa. Đủ to để nhìn ra món ở cỡ thumbnail, vẫn
   chừa lề để không thành ảnh bị cắt cụt. */
const FILL = 0.86;

/* Luật .steam của recipe.css, BẢN TĨNH — resvg không với được CSS ngoài và
   cũng không chạy animation. Thiếu luật này thì mọi path khói đổ fill đen,
   hình nào có khói cũng hỏng. */
const STEAM_CSS = `
    .steam path{stroke:rgba(250,247,232,.75);stroke-width:7;stroke-linecap:round;fill:none}
    .steam path:nth-child(2){stroke-width:6}
    .steam path:nth-child(3){stroke-width:5}`;

export async function getStaticPaths() {
  const recipes = await getCollection('recipes');
  return recipes.flatMap((r) =>
    (Object.keys(RATIOS) as RatioId[]).map((ratio) => ({
      params: { shot: `${r.id}-${ratio}` },
      props: { recipe: r, ratio },
    }))
  );
}

/** Dựng tài liệu SVG: nền gradient họ màu + quầng sáng, hình món lồng vào giữa.
    Nền vẽ đúng như thẻ trên site — linear-gradient(160deg) và --art-halo. */
function compose(art: string, fam: string, w: number, h: number): string {
  const [, , vw, vh] = (art.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 520 470')
    .split(/\s+/)
    .map(Number);
  const s = Math.min((w * FILL) / vw, (h * FILL) / vh);
  const aw = Math.round(vw * s);
  const ah = Math.round(vh * s);
  const [from, to] = FAM_GROUND[fam as keyof typeof FAM_GROUND] ?? FAM_GROUND.nuoc;

  /* 160deg trong CSS = hướng (sin160, -cos160) = (.342, .940), quy ra toạ độ hộp */
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <style>${STEAM_CSS}</style>
  <defs>
    <linearGradient id="bg" x1="0.329" y1="0.030" x2="0.671" y2="0.970">
      <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#FFF7E1" stop-opacity="0.22"/>
      <stop offset="0.76" stop-color="#FFF7E1" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#halo)"/>
  ${art.replace(
    /^<svg/,
    `<svg x="${Math.round((w - aw) / 2)}" y="${Math.round((h - ah) / 2)}" width="${aw}" height="${ah}" preserveAspectRatio="xMidYMid meet"`
  )}
</svg>`;
}

export const GET: APIRoute = async ({ props }) => {
  const d = props.recipe.data;
  const { w, h } = RATIOS[props.ratio as RatioId];
  const art = artSvgSource(ART_COMPONENT[artKind(d.art, d.category)]);
  if (!art) return new Response('Không có hình cho món này', { status: 404 });

  const png = new Resvg(compose(art, familyOf(d.category), w, h)).render().asPng();
  const jpg = await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  return new Response(jpg, { headers: { 'Content-Type': 'image/jpeg' } });
};
