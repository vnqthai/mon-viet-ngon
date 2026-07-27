import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Mỗi món ăn là MỘT file YAML trong src/content/recipes/.
 * Thêm món mới = copy _template.yaml, đổi tên file (tên file = slug trên URL),
 * điền nội dung — không phải đụng vào code giao diện.
 *
 * Trong mọi chuỗi văn bản có thể dùng:
 *   **chữ đậm**            → in đậm, tô màu điểm nhấn
 *   [[50|g]]               → định lượng tự tính lại theo khẩu phần (50 g cho khẩu phần gốc)
 *   [[2.5|muỗng canh|frac]] → như trên, hiển thị phân số ¼ ½ ¾ thay vì số lẻ
 */

const flavor = z.object({
  chua: z.number().min(0).max(10),
  ngot: z.number().min(0).max(10),
  man: z.number().min(0).max(10),
  cay: z.number().min(0).max(10),
  thom: z.number().min(0).max(10),
});

const ingredientItem = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().default('jar'),
  color: z.enum(['amber', 'green', 'red', 'gold']).default('amber'),
  // Định lượng: hoặc (base + unit [+ frac]) để tự scale, hoặc qtyText cố định.
  base: z.number().optional(),
  unit: z.string().optional(),
  frac: z.boolean().default(false),
  qtyText: z.string().optional(),
  note: z.string().optional(),
});

const step = z.object({
  title: z.string(),
  icon: z.string().default('pot'),
  minutes: z.string().optional(),        // "20 phút" — chip thời gian trên đầu bước
  intro: z.string().optional(),          // câu dẫn trước danh sách gạch đầu dòng
  bullets: z.array(
    z.object({
      label: z.string().optional(),      // "Khử nhớt:" — phần in đậm mở đầu
      text: z.string(),
    })
  ),
  callout: z
    .object({ type: z.enum(['warn', 'tip']), text: z.string() })
    .optional(),
  timer: z
    .object({ secs: z.number(), label: z.string(), doneMsg: z.string() })
    .optional(),
  doneText: z.string().default('Xong bước này'),
});

const recipes = defineCollection({
  loader: glob({ pattern: '[^_]*.yaml', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),                  // 1–2 câu — hiện ở hero và thẻ món
    region: z.enum(['Miền Tây', 'Miền Nam', 'Miền Trung', 'Miền Bắc', 'Cả nước']),
    category: z.enum(['Canh', 'Kho', 'Xào', 'Cuốn', 'Gỏi', 'Chiên', 'Hấp', 'Cơm', 'Bún – Phở']),
    time: z.object({ total: z.string(), active: z.string().optional() }),
    servingsBase: z.number().default(4),
    difficulty: z.enum(['Dễ', 'Vừa', 'Kỳ công']),
    featured: z.boolean().default(false), // món nổi bật trên trang chủ
    order: z.number().default(99),        // thứ tự hiển thị (nhỏ = trước)
    art: z
      .enum([
        'canh-chua', 'com-tam', 'cha-gio', 'bo-kho', 'kho-qua',
        'pho-bo', 'bun-bo', 'banh-xeo', 'ca-kho', 'thit-kho', 'canh-bi-do',
        'bun-cha', 'mi-quang', 'ga-kho', 'canh-cua',
        'bun-rieu', 'com-ga', 'bo-luc-lac', 'ga-la-giang',
        'bowl', 'claypot', 'plate', 'rolls',
      ])
      .optional(),
    heroEyebrow: z.string().default('Bếp Việt nhà mình'),

    quick: z.object({                     // BẢN NẤU NHANH cho người lười đọc
      ingredients: z.array(z.string()),
      steps: z.array(z.string()),
      warning: z.string().optional(),
    }),

    flavor: flavor.optional(),
    flavorNote: z.string().optional(),
    storyEyebrow: z.string().default('Chuyện món ăn'),
    storyTitle: z.string().optional(),    // cho phép **chữ nhấn**
    story: z.array(z.string()),

    ingredientGroups: z.array(
      z.object({
        name: z.string(),
        icon: z.string().default('basket'),
        items: z.array(ingredientItem),
      })
    ),

    stepsEyebrow: z.string().default('Vô bếp thôi!'),
    stepsTitle: z.string().optional(),
    stepsLead: z.string().optional(),
    steps: z.array(step),

    tipsEyebrow: z.string().default('Nghe lời má dặn'),
    tipsTitle: z.string().optional(),
    tipsLead: z.string().optional(),
    tips: z.array(z.object({ icon: z.string().default('bulb'), title: z.string(), text: z.string() })),

    serve: z
      .object({
        eyebrow: z.string().default('Tới giờ cơm rồi!'),
        title: z.string(),
        paras: z.array(z.string()),
        aside: z
          .object({
            title: z.string(),
            intro: z.string(),
            items: z.array(z.object({ icon: z.string().default('rice'), text: z.string() })),
          })
          .optional(),
      })
      .optional(),

    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    ticker: z.array(z.object({ icon: z.string().default('drop'), text: z.string() })).optional(),
  }),
});

export const collections = { recipes };
