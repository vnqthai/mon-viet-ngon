import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Vẽ thẻ OG (1200×630) lúc build: nền xanh sông nước, tựa món chữ Paytone One,
 * dải caro khăn rằn dưới chân — đồng bộ nhận diện với trang web.
 * Font đọc từ src/assets/fonts (đã kèm license OFL) để build không cần mạng.
 */

const font = (file: string) => readFileSync(path.resolve(`src/assets/fonts/${file}`));
const paytone = font('PaytoneOne-Regular.ttf');
const beVietnam = font('BeVietnamPro-Regular.ttf');
const beVietnamSemi = font('BeVietnamPro-SemiBold.ttf');

/* Nền ảnh OG theo HỌ MÓN, khớp với nền thẻ ở tokens.css — chia sẻ lên mạng
   xã hội thì cũng đọc ra được nhóm món, và ảnh khớp với trang khi bấm vào. */
export const OG_FAMILY: Record<string, [string, string, string]> = {
  nuoc: ['#143A42', '#235B66', '#2E7180'],
  man:  ['#421C06', '#6E3512', '#8A4A1E'],
  tron: ['#3B521C', '#5B7A2E', '#71953C'],
  banh: ['#70530C', '#A8801A', '#C39724'],
  lua:  ['#65241A', '#9A3D2B', '#B54E38'],
};

const C = {
  riverDeep: '#1F3D26',
  river: '#2C5234',
  gold: '#E0A32E',
  ink: '#F4EFDA',
  checkerA: '#7B392C',
  checkerB: '#F3EDD8',
};

/* satori nhận cây phần tử kiểu React — dựng bằng object cho khỏi cần JSX */
type El = { type: string; props: Record<string, unknown> };
function h(type: string, props: Record<string, unknown> = {}, ...children: unknown[]): El {
  const kids = children.flat().filter((c) => c !== null && c !== undefined && c !== false);
  return {
    type,
    props: { ...props, children: kids.length === 0 ? undefined : kids.length === 1 ? kids[0] : kids },
  };
}

/* Icon tô phở của site (Sprite.astro › ic-bowl) vẽ lại bằng vàng điên điển */
const bowlIcon = (px: number) =>
  h(
    'svg',
    {
      width: px, height: px, viewBox: '0 0 24 24',
      fill: 'none', stroke: C.gold, strokeWidth: 1.8,
      strokeLinecap: 'round', strokeLinejoin: 'round',
    },
    h('path', { d: 'M3.5 11.5h17c0 4.2-2.5 7.2-6.3 8.2l.2 1.3h-4.8l.2-1.3c-3.8-1-6.3-4-6.3-8.2Z' }),
    h('path', { d: 'M9.3 8c0-1.6 1.6-2.1 1.6-3.8M13.8 8c0-1.6 1.6-2.1 1.6-3.8' })
  );

export interface OgCard {
  title: string;
  chips?: string[];
  subtitle?: string;
  /** Họ món — quyết định màu nền. Bỏ trống thì dùng xanh lá thương hiệu. */
  family?: string;
}

export async function renderOgCard({ title, chips = [], subtitle, family }: OgCard): Promise<Buffer> {
  const g = (family && OG_FAMILY[family]) || [C.riverDeep, C.river, '#375F41'];
  // Nền họ "Cơm & bánh" chính là sắc vàng, nên chữ thương hiệu phải đổi sang
  // kem — vàng trên vàng thì đọc được nhưng nhạt nhòa hẳn so với bốn họ kia.
  const brandColor = family === 'banh' ? C.ink : C.gold;
  const titleSize = title.length <= 30 ? 84 : title.length <= 40 ? 72 : title.length <= 52 ? 62 : 54;

  const tree = h(
    'div',
    {
      style: {
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', position: 'relative',
        padding: '52px 72px 0',
        background: `linear-gradient(135deg, ${g[0]} 0%, ${g[1]} 60%, ${g[2]} 100%)`,
        fontFamily: 'Be Vietnam Pro',
      },
    },
    // quầng vàng ấm góc trên phải
    h('div', {
      style: {
        position: 'absolute', top: -180, right: -140, width: 600, height: 600,
        borderRadius: 600, display: 'flex',
        background: 'radial-gradient(circle at center, rgba(224,163,46,.30) 0%, rgba(224,163,46,0) 68%)',
      },
    }),
    // dòng thương hiệu
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 18 } },
      bowlIcon(46),
      h('div', { style: { fontFamily: 'Paytone One', fontSize: 40, color: brandColor, display: 'flex' } }, 'Món Việt Ngon')
    ),
    // tựa món (+ phụ đề nếu có)
    h(
      'div',
      { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 } },
      h('div', {
        style: {
          fontFamily: 'Paytone One', fontSize: titleSize, color: C.ink,
          lineHeight: 1.14, maxWidth: 1010, display: 'flex',
        },
      }, title),
      subtitle
        ? h('div', {
            style: { fontSize: 33, color: 'rgba(244,239,218,.86)', maxWidth: 930, lineHeight: 1.4, display: 'flex' },
          }, subtitle)
        : null
    ),
    // hàng "huy hiệu" thông tin
    chips.length
      ? h(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 26 } },
          ...chips.map((c) =>
            h('div', {
              style: {
                display: 'flex', padding: '10px 26px', borderRadius: 999,
                border: '2.5px solid rgba(224,163,46,.65)',
                fontSize: 29, fontWeight: 600, color: C.ink,
              },
            }, c)
          )
        )
      : null,
    // địa chỉ trang
    h('div', {
      style: { display: 'flex', marginBottom: 46, fontSize: 26, color: 'rgba(244,239,218,.72)', letterSpacing: 1 },
    }, 'www.monvietngon.com'),
    // dải caro khăn rằn sát mép dưới
    h(
      'div',
      { style: { position: 'absolute', bottom: 0, left: 0, display: 'flex' } },
      ...Array.from({ length: 40 }, (_, i) =>
        h('div', { style: { width: 30, height: 26, display: 'flex', background: i % 2 === 0 ? C.checkerA : C.checkerB } })
      )
    )
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Paytone One', data: paytone, weight: 400, style: 'normal' },
      { name: 'Be Vietnam Pro', data: beVietnam, weight: 400, style: 'normal' },
      { name: 'Be Vietnam Pro', data: beVietnamSemi, weight: 600, style: 'normal' },
    ],
  });
  return new Resvg(svg).render().asPng();
}
