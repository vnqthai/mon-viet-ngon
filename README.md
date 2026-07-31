# Món Việt Ngon — monvietngon.com

Trang web ẩm thực Việt Nam tĩnh 100% (không backend), xây bằng [Astro](https://astro.build).
Mỗi món ăn là **một file YAML** — thêm món mới không cần đụng vào code giao diện.

## Chạy thử

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build tĩnh ra dist/
npm run preview    # xem thử bản build
```

## Cấu trúc source

```
src/
  content/recipes/       ← MỖI MÓN = 1 FILE YAML (tên file = slug URL)
    _template.yaml       ← mẫu thêm món mới, có chú thích từng trường
    canh-chua-ca-loc.yaml
    ca-kho-to.yaml
    …
  content.config.ts      ← schema dữ liệu món ăn (zod, validate lúc build)
  data/meo-bep.ts        ← bí quyết bếp dùng chung (trang /bi-quyet/)
  components/
    Sprite.astro         ← kho icon SVG (thêm icon mới vào đây)
    Icon.astro           ← <Icon name="fish"/>
    RecipeCard.astro     ← thẻ món ngoài danh mục/trang chủ
    art/                 ← minh họa SVG, mỗi món một file Art<Ten>.astro
    art/ArtImg.astro     ← gọi hình bằng <img src="/art/<kind>.svg">
  layouts/Base.astro     ← khung trang: header, footer, fonts, theme
  pages/
    index.astro          ← trang chủ
    mon/index.astro      ← danh mục món + bộ lọc
    mon/[slug].astro     ← template trang món (render từ YAML)
    art/[kind].svg.ts    ← xuất mỗi hình ra 1 file .svg lúc build
    bi-quyet.astro       ← bí quyết bếp Việt
  scripts/               ← JS client: theme/reveal (site.js), khẩu phần/giờ (recipe.js)
  styles/                ← tokens (màu) / base / recipe / home
  utils/                 ← qty.ts (khẩu phần), rich.ts (mini markup), art.ts (bảng tra hình)
```

## Thêm một món mới

1. Copy `src/content/recipes/_template.yaml` → `ten-mon-moi.yaml` (tên file = URL).
2. Điền nội dung theo chú thích trong file mẫu. Bốn điều đáng nhớ:
   - `**chữ đậm**` để nhấn; `[[500|g]]` để định lượng tự tính theo khẩu phần;
     thêm `|frac` (vd `[[2.5|muỗng canh|frac]]`) để hiện phân số ¼ ½ ¾.
   - `quick:` là **bản nấu nhanh** đầu trang — bắt buộc, viết mỗi nhịp một dòng.
   - `occasions:` **bắt buộc ít nhất 1 nhãn** — để trống là build gãy.
   - `featured: true` để món hiện ở trang chủ (trang chủ lấy **12** món đầu theo `order`).
3. `npm run build` — schema sẽ báo lỗi rõ ràng nếu thiếu/sai trường nào.

### Hai cái bẫy YAML hay dính

- Chuỗi **không quote** mà chứa `": "` sẽ bị YAML nuốt thành object. Có khi gãy
  build, có khi *im lặng* biến chuỗi thành map rồi mới gãy ở Zod với thông báo
  khó hiểu. Vd `- Đồ chua: đu đủ xanh…` → phải quote: `- "Đồ chua: đu đủ xanh…"`
- Chuỗi **bắt đầu bằng `*`** bị hiểu là YAML alias. Vd `- **Chiên ngập dầu**…`
  → quote lại. (Dùng block scalar `>-` thì cả hai bẫy đều không dính.)

### `npm run qa` — chạy trước mỗi lần build

```bash
npm run qa      # = check-recipes.mjs + check-art-ids.mjs
```

Hai script này bắt những lỗi **Zod không bắt được** — build vẫn xanh, trang vẫn
dựng, chỉ là sai:

| `tools/check-recipes.mjs` | `tools/check-art-ids.mjs` |
|---|---|
| hai bẫy YAML ở trên, báo đúng dòng | `id` trùng **chéo giữa hai file art** — từ đợt 10 mỗi hình là một file `.svg` riêng nên id hết đè nhau trên `/mon/`; phép kiểm giữ lại vì `art-png --sheet` vẫn ghép nhiều hình vào MỘT tài liệu |
| hai món trùng `order` | tham chiếu `#id` trỏ ra ngoài file của nó |
| hai nguyên liệu trùng `id` (giỏ đi chợ tick nhầm ô) | enum `art` ⟷ `ART_COMPONENT` (`utils/art.ts`) ⟷ file component lệch nhau |
| nhãn timer `MM:SS` lệch với `secs` | món chưa gắn art riêng |
| `occasions` rỗng · `[[số\|đơn vị]]` sai cú pháp | art khai rồi mà chưa món nào dùng |
| | `viewBox` lệch `0 0 520 470` · `&` trần trong `<svg>` |
| | **giá trị màu hỏng** — `fill`/`stroke`/`stop-color` không phải hex 6 · `none` · `rgb/rgba` · `url(#id)` |

Cả hai đọc enum và từ vựng khoá **thẳng từ `content.config.ts`**, nên sửa schema
là script tự theo, không phải cập nhật tay.

> Phép kiểm **giá trị màu** thêm ở đợt 11, sau khi bốn lần gõ nhầm ký tự ngoài
> ASCII vào mã hex (`#3E1F४8` — chữ số Devanagari trông gần giống chữ số Latin).
> SVG vẫn parse, hình vẫn hiện, build xanh, `qa` sạch — **chỉ có màu là im lặng
> rơi về mặc định**. Đúng loại lỗi mà file này sinh ra để bắt.

### `npm run link-audit` — chạy SAU build, mỗi khi thêm món

```bash
npm run build && npm run link-audit
```

Soi dải "Nấu gì tiếp đây?" ở cuối mỗi trang món (6 liên kết chéo — luật chọn ở
`src/utils/related.ts`). Nó **đọc HTML trong `dist/`**, không gọi lại hàm sinh ra
liên kết: tự chấm điểm mình thì hỏng ở khâu dựng trang cũng không thấy.

Bốn con số phải giữ, thêm món mới là dễ phá nhất:

| Đo gì | Phải là | Vỡ ra thì sao |
|---|---|---|
| món **mồ côi** (không ai trỏ tới) | 0 | món đó chỉ vào được từ `/mon/`, coi như nằm ngoài mạng liên kết |
| hai món có **dải y hệt** nhau | 0 | đọc hai trang thấy chung một dải, tưởng trang lỗi |
| **mảnh đồ thị** | 1 | catalog vỡ thành đảo, lang thang tới đó là hết đường |
| mỗi dải đủ **6 ô** | 95/95 | vùng hoặc kiểu món quá mỏng, dải bị cụt |

### `npm run seo-audit` — chạy SAU build, cùng lúc với `link-audit`

```bash
npm run build && npm run link-audit && npm run seo-audit
```

Parse khối JSON-LD trong `dist/` rồi đi tìm **file thật** cho từng URL ảnh của
`Recipe.image`. Bắt đúng một loại lỗi, nhưng là loại không ai thấy: trang vẫn
hiện bình thường, `npm run qa` vẫn sạch, chỉ có bot đi lấy ảnh là ăn 404 — rồi
vài tháng sau Search Console mới nhắn. Đổi slug một món, hay đụng vào
`src/pages/anh-mon/[shot].jpg.ts`, là đủ để lệch.

> Nó **không** kiểm `aggregateRating` · `video` · `nutrition`. Search Console có
> nhắc ba trường đó nhưng site **cố ý bỏ trống** — lý do từng cái ở ROADMAP phần 2,
> mục *"Bốn cảnh báo Recipe"*. Đừng thấy cảnh báo mà thêm vào.

### Thêm một KIỂU MÓN mới (vd "Bánh mì", "Chè")

Không phải một chỗ mà **tám chỗ** — sót chỗ nào cũng hỏng âm thầm chứ không báo lỗi:

| File | Sửa gì | Sót thì sao |
|---|---|---|
| `src/content.config.ts` | enum `category` | build gãy — chỗ duy nhất *có* báo lỗi |
| `src/utils/family.ts` | xếp kiểu món vào 1 trong 6 họ màu | rơi về họ `nuoc`, **nền thẻ sai màu, không báo gì** |
| `src/pages/mon/index.astro` | thêm vào `CAT_ORDER` | **không có chip lọc**, món thành không lọc được |
| `src/utils/art.ts` | `BY_CATEGORY` (hình dự phòng) | món chưa có art riêng rơi về `bowl` |
| `src/content/recipes/_template.yaml` | dòng chú thích | người sau chép nhầm |
| `tools/contact-sheet.mjs` | bảng `FAMILIES` | contact sheet soi sai nền |
| `tools/art-png.mjs` | bảng `FAMILIES` | PNG ghép soi sai nền |
| ROADMAP.md | bảng kế hoạch | — |

> Bảng này từng ghi **bảy** chỗ — thiếu `art-png.mjs`, thêm vào từ đợt 9 mà quên
> cập nhật. Đợt nào mở kiểu món cũng **kiểm lại từng dòng**, đừng suy từ đợt trước.
>
> Đợt 12 mở **"Bánh mì"** và là đợt đầu tiên phải sửa **đủ cả 8/8 chỗ** — đợt 7
> chỉ 4/8, đợt 8 và 9 chỉ 3/8.

**Nếu kiểu món mới còn MỞ LUÔN MỘT HỌ MÀU thì thành CHÍN chỗ** — thêm
`src/styles/tokens.css` (`--fam-<id>` và `--fam-<id>-deep`). Sót chỗ này thì
`family.ts` trả về một họ mà CSS không có biến, **nền thẻ rỗng và không báo gì**.
Đợt 13 mở "Chè" là lần đầu dính: chè là món **ngọt**, để chung họ với phở và
canh thì màu nền thôi làm thông tin, nên phải mở họ thứ sáu *"Ngọt & mát"* màu
tím sen. `FAM_GROUND` trong `family.ts` là **bản chép thứ hai** của cặp màu đó
(endpoint `/anh-mon/` render bằng resvg, không với được vào CSS site) — sửa một
bên phải sửa bên kia, cộng hai bảng `FAMILIES` trong `tools/`. Tổng cộng **bốn
chỗ khai cùng một cặp màu**.

Thêm **hình vẽ riêng** cho món: `Art<Ten>.astro` + một dòng trong bảng
`ART_COMPONENT` (`src/utils/art.ts`) + giá trị mới trong enum `art`
(`content.config.ts`). `npm run qa` soi cả ba chỗ có khớp nhau không.

### Soi hình: hai công cụ, KHÔNG thay nhau được

```bash
npm run contact-sheet                              # trang HTML: mọi hình trên nền họ màu
npm run art-png -- --sheet --cat Nướng             # PNG ghép: soi chống-đụng ⟵ cái này mới bắt lỗi
npm run art-png -- ca-loc-nuong-trui                # 1 hình, 520px, xem chi tiết
```

`contact-sheet` trả lời "hình có chìm vào nền không". Nó **không** trả lời được
"hai món có nhìn na ná nhau không" — đợt 7 và đợt 8 đều có lỗi hình lọt qua nó
rồi mới lộ ra khi render PNG (ống khói thành ống bô, lát chả thành khuôn mặt hai
con mắt, hai lát thịt nhập thành miếng thịt xông khói).

`art-png --sheet` xếp nhiều hình **cạnh nhau**, mỗi ô **260px — đúng cỡ thumbnail
trên `/mon/`**, chỗ duy nhất lỗi đó lộ ra. Nhận cả slug món lẫn tên `art`; chọn
theo `--cat <kiểu món>` hoặc `--fam <họ>` cho nhanh. Ra `tools/art-png/`
(đã gitignore). Luật `.steam` được bơm vào SVG vì resvg không với được CSS ngoài.

> Luật rút ra từ đợt 8: **thứ gì trong tô cũng phải khác thứ bên cạnh ở CẢ sắc
> lẫn DÁNG.** Đổi mỗi màu mà giữ nguyên dáng thì ở cỡ thumbnail vẫn lẫn.
>
> Và từ đợt 10: **vẽ hỏng thường là do chưa hiểu vật, không phải tay kém.** Con
> ốc thiếu chóp xoắn thì thành cây nấm; miếng gà chặt mà chỉ vẽ da thì thành củ
> khoai; con cá dựng đứng mà vẽ hai mắt thì thành cái mặt côn trùng. Chữa được
> đều bắt đầu bằng việc đọc lại *vật đó cấu tạo thế nào*, không phải chỉnh màu.

#### Bốn luật bố cục — rút ra ở vòng duyệt thứ hai của đợt 10

Bốn hình bị trả lại cùng một nhận xét: *"rời rạc, mảnh này mảnh kia, không giống
một món ăn"*. Từng miếng vẽ đúng cả, lỗi nằm ở **cách bày**.

1. **Món ăn phải là MỘT KHỐI.** Vẽ **một path khối liền** làm nền đống trước
   (`ArtGoiXoai`, `ArtGoiGa`, `ArtChaGio` đều làm vậy), rồi mới vẽ chi tiết **đè
   lên** nó. Miếng nào cũng phải **chồng mép** lên miếng khác. Rải từng miếng
   cách nhau là hở nền — và hở nền thì mắt đọc ra mấy vật lẻ, không ra dĩa đồ ăn.
2. **Đúng thực tế chưa đủ, hình còn phải đọc ra món ăn.** Cá tai tượng dọn thật
   là **dựng đứng** con cá, vẽ đúng vậy thì lại ra vật trưng bày. Cho nằm xuống
   dĩa mới ra món.
3. **Đừng bày đối xứng hai bên.** Hai miếng bánh phồng tôm kê cân đối hai mép
   dĩa, hai con tôm đặt bằng nhau trên đỉnh — đều bị nhận xét "nhìn kỳ". Lệch cỡ,
   lệch góc, lệch độ cao.
4. **Cảm giác GIÒN nằm ở ĐƯỜNG BAO GỒ GHỀ, không nằm ở màu.** Gắn một chuỗi cục
   nhỏ **vẽ TRƯỚC khối thịt** để chúng chỉ nhô ra ở mép — vẽ sau thì thành vòng
   hạt cườm quây quanh miếng.

### Hình nằm ở file `.svg` riêng, không nhúng vào HTML

Từ đợt 10, hình **không** nhúng thẳng vào trang nữa. Endpoint
`src/pages/art/[kind].svg.ts` xuất mỗi hình ra `/art/<kind>.svg` lúc build, còn
thẻ món gọi bằng `<img loading="lazy">` (`art/ArtImg.astro`). Kết quả: `/mon/`
từ **143,8 KB** gzip xuống còn **~30 KB** và **không tăng theo số món nữa**
(nay là **30,9 KB** ở 95 món — đo trên máy chủ, tức
**0,21 KB/món** cho 13 món của đợt 13);
ba trang (`/mon/`, trang chủ, trang chi tiết) dùng chung một file đã cache.

Ba ràng buộc mới với file art, `npm run qa` chặn cả ba:

| Ràng buộc | Vì sao |
|---|---|
| `viewBox` phải là `0 0 520 470` | `ArtImg` đặt cứng `width`/`height` theo đó để trang khỏi nhảy |
| không `currentColor`, không `var(--…)` | CSS ngoài không với vào trong `<img>` được |
| không `&` trần trong `<svg>` | file `.svg` rời đọc bằng XML **nghiêm**, một dấu `&` là chết cả hình mà build vẫn xanh |

> Chú thích trong file art **được giữ nguyên** — endpoint tự bỏ hết chú thích
> khi xuất. Cần thế vì chú thích XML cấm chứa `--`, mà chú thích trong art thì
> hay nhắc tên biến kiểu `--art-halo`; nhúng vào HTML thì không sao, tách ra file
> riêng là hình đó chết hẳn (gặp thật ở `ca-kho` lúc tách). Phần rút mã + bỏ
> chú thích nằm ở `src/utils/art-src.ts` vì endpoint ảnh JPEG cũng cần y hệt.

### Ba đường ra của cùng một hình món — đừng lẫn

| Đường ra | Ai xem | Nội dung |
|---|---|---|
| `/art/<kind>.svg` | **người đọc** — thẻ món, hero | hình vẽ, nền trong suốt (nền màu do CSS của trang lo) |
| `/anh-mon/<slug>-{1x1,4x3,16x9}.jpg` | **bot** — `image` của JSON-LD Recipe | hình vẽ **đã ghép sẵn nền họ màu**, 1200px, ba tỉ lệ |
| `/og/<slug>.png` | **mạng xã hội** — `og:image` | thẻ chữ: tên món + 4 chip, **không có hình món** |

Ba thứ này từng bị lẫn: `image` của JSON-LD trỏ vào `/og/`, tức Google lấy tấm
thẻ chữ làm thumbnail kết quả tìm kiếm. Sửa 2026-07-30 — xem ROADMAP phần 5.
Ảnh `/anh-mon/` khoá theo **slug** chứ không theo **kind** như `/art/`, vì nền
phải mang màu họ của chính món đó, mà họ suy từ `category`.

> **`/anh-mon/` KHÔNG hiện ở đâu cho người đọc thấy** — không trang nào trỏ
> `href` tới nó, không nằm trong sitemap, không bấm vào từ giao diện. Nó chỉ tồn
> tại để **bot đi lấy**. Đó là chủ đích, nhưng cũng có nghĩa là **mở trang web
> lên xem thì không bao giờ gặp** — muốn coi thì gõ thẳng URL, ví dụ
> `https://www.monvietngon.com/anh-mon/che-buoi-4x3.jpg`. Ghi rõ ở đây vì đã có
> lần chủ trang không biết là site có thứ này.

## Deploy lên GitHub Pages + domain monvietngon.com

Repo đã có sẵn workflow `.github/workflows/deploy.yml` và `public/CNAME`.

```bash
git init && git add . && git commit -m "Mon Viet Ngon v1"
gh repo create mon-viet-ngon --public --source=. --push
```

Rồi trên GitHub: **Settings → Pages → Source: GitHub Actions** (push lần đầu
workflow sẽ tự chạy).

Trỏ DNS của monvietngon.com:

| Loại  | Host | Giá trị                                      |
|-------|------|----------------------------------------------|
| A     | @    | 185.199.108.153 / 109.153 / 110.153 / 111.153 |
| CNAME | www  | vnqthai.github.io                            |

Cuối cùng vào **Settings → Pages → Custom domain** điền `www.monvietngon.com`
(bản canonical — `monvietngon.com` sẽ tự redirect về www) và bật **Enforce HTTPS**
(chờ DNS lan truyền xong, thường dưới 1 giờ).

## Ghi chú kỹ thuật

- Giỏ đi chợ, tiến độ nấu, khẩu phần, theme lưu bằng `localStorage`,
  namespace theo món: `mvn:<slug>:…` — không cookie, không server.
- Font Google (Paytone One, Be Vietnam Pro, Dancing Script — đủ tiếng Việt),
  offline tự rơi về font hệ thống.
- Toàn bộ minh họa là SVG trong repo, không ảnh ngoài.
