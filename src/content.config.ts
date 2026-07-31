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
    region: z.enum(['Miền Tây', 'Miền Nam', 'Miền Trung', 'Miền Bắc', 'Tây Bắc', 'Tây Nguyên', 'Cả nước']),
    category: z.enum(['Canh', 'Kho', 'Xào', 'Nướng', 'Cuốn', 'Gỏi', 'Chiên', 'Hấp', 'Cơm',
      'Món nước', 'Bún trộn', 'Lẩu', 'Cháo', 'Bánh', 'Bánh mì', 'Chè']),
    // Định nghĩa để không lẫn: Món nước = một tô là xong bữa (kể cả tô nước lèo
    // dọn riêng như phở khô, bún chả) · Canh = món trong mâm cơm, ăn với cơm trắng
    // · Lẩu = nồi đặt giữa bàn, ăn tới đâu nhúng tới đó · Cháo = gạo ninh nhừ
    // · Bánh = vỏ tráng/đổ từ bột gạo, dù rồi đem chiên hay đem hấp (bánh xèo,
    //   bánh khoái, bánh cuốn) — xếp theo THỨ LÀM RA chứ không theo cách làm chín.
    // · Bánh mì = ổ bánh mì kẹp nhân. Tách hẳn khỏi "Bánh" vì khác nguyên liệu
    //   gốc (bột MÌ nướng lò, không phải bột gạo tráng/đổ) và khác cách ăn (cầm
    //   tay, một ổ là xong bữa). Cùng trục "hình thức món" với Cơm · Cháo · Bánh,
    //   KHÔNG phải trục xuất xứ — đừng lấy nhóm này làm cớ mở nhóm theo xuất xứ.
    // · Chè = món NGỌT nấu đường, ăn bằng muỗng, dọn ngoài bữa cơm. Đây là kiểu
    //   món đầu tiên tách theo VỊ chứ không theo hình thức — và nó có họ màu
    //   riêng ("Ngọt & mát", tím sen) đúng vì lý do đó: một ly chè đứng lẫn giữa
    //   lưới món mặn thì màu nền phải nói ngay "cái này ngọt".
    // Theo dịp / đối tượng — một món gắn được nhiều nhãn, để lọc ở /mon/.
    // MỌI MÓN PHẢI CÓ ÍT NHẤT 1 NHÃN: để trống thì món đó biến mất khỏi cả trục
    // lọc này, kể cả những món chủ lực của trang.
    occasions: z
      .array(z.enum([
        'Cơm nhà',      // món dọn cùng cơm trắng trong bữa cơm gia đình
        'Bữa sáng',     // món điểm tâm, ăn hàng buổi sáng
        'Đãi khách',    // món đãi tiệc, nồi lớn — KHÔNG dùng cho món ăn hàng thường ngày
        'Nhậu lai rai',
        'Ăn chơi',
        'Cho bé',
        'Cỗ Tết',       // mâm cỗ Tết – giỗ chạp
      ]))
      .min(1)
      .default([]),
    // Ngày đăng lần đầu — ĐẶT MỘT LẦN RỒI KHÔNG ĐỔI. Dùng cho datePublished
    // trong JSON-LD và để sắp thứ tự RSS sau này.
    pubDate: z.coerce.date().optional(),
    // Ngày sửa nội dung — chỉ đổi khi sửa có nghĩa (đổi định lượng, đổi bước,
    // sửa sai công thức). Sửa chính tả hay chỉnh câu chữ thì để yên, không thì
    // RSS và Google tưởng bài mới.
    updatedDate: z.coerce.date().optional(),

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
        'pho-ga', 'hu-tieu', 'bun-thit-nuong', 'pho-kho', 'com-chien',
        'goi-xoai', 'goi-ga', 'ga-nuong', 'muc-xao', 'suon-ram',
        'ca-ri-ga', 'tom-rim', 'banh-cuon', 'trung-chung',
        'goi-cuon', 'rau-muong',
        'mien-ga', 'mi-vit-tiem', 'mien-xao-cua', 'mi-xao-bo', 'bun-dau', 'bun-bo-nam-bo',
        'lau-mam', 'lau-ga-la-e', 'lau-thai', 'chao-luon', 'chao-ga', 'chao-long',
        'bun-cha-ca', 'bun-mam-nem', 'com-hen', 'banh-khoai', 'banh-trang-cuon', 'mam-ruoc-xao',
        'bun-do', 'pa-pinh-top', 'bo-mot-nang', 'ca-loc-nuong-trui', 'oc-len-xao-dua',
        'nem-nuong', 'ca-tai-tuong', 'oc-hap-la-gung', 'ga-hap-hanh', 'goi-ngo-sen', 'canh-ga-chien',
        'suon-xao-chua-ngot', 'bun-suon-sau', 'oc-chuoi-dau', 'long-luoc',
        'canh-suon-bi-dao', 'canh-suon-khoai-tay', 'ca-tim-nuong',
        'banh-mi-thit', 'banh-mi-cha-ca', 'banh-mi-heo-quay', 'heo-quay',
        'xoi-xeo', 'xoi-man',
        'banh-uot-cha-lua', 'banh-uot-long-ga', 'banh-uot-tom-chay',
        'ca-thu-sot-ca', 'ca-nuc-sot-ca',
        'che-buoi', 'che-ba-ba', 'che-thai', 'che-dau-xanh-bot-bang', 'che-dau-do',
        'lau-de-chao', 'lau-de-me', 'lau-bo-da-lat', 'lau-bo-giam',
        'bo-xao-thien-ly', 'kho-qua-xao-trung', 'canh-ca-chua-trung', 'cua-hap-bia',
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
