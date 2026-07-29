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
    art/                 ← minh họa SVG (theo loại món + minh họa riêng)
  layouts/Base.astro     ← khung trang: header, footer, fonts, theme
  pages/
    index.astro          ← trang chủ
    mon/index.astro      ← danh mục món + bộ lọc
    mon/[slug].astro     ← template trang món (render từ YAML)
    bi-quyet.astro       ← bí quyết bếp Việt
  scripts/               ← JS client: theme/reveal (site.js), khẩu phần/giờ (recipe.js)
  styles/                ← tokens (màu) / base / recipe / home
  utils/                 ← qty.ts (tính khẩu phần), rich.ts (mini markup)
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
| hai bẫy YAML ở trên, báo đúng dòng | `id` trùng **chéo giữa hai file art** — cả 50+ hình cùng nhúng vào `/mon/` nên `url(#…)` ăn nhầm gradient của hình khác |
| hai món trùng `order` | tham chiếu `#id` trỏ ra ngoài file của nó |
| hai nguyên liệu trùng `id` (giỏ đi chợ tick nhầm ô) | enum `art` ⟷ `RecipeArt.astro` ⟷ file component lệch nhau |
| nhãn timer `MM:SS` lệch với `secs` | món chưa gắn art riêng |
| `occasions` rỗng · `[[số\|đơn vị]]` sai cú pháp | art khai rồi mà chưa món nào dùng |

Cả hai đọc enum và từ vựng khoá **thẳng từ `content.config.ts`**, nên sửa schema
là script tự theo, không phải cập nhật tay.

### Thêm một KIỂU MÓN mới (vd "Bánh")

Không phải một chỗ mà **bảy chỗ** — sót chỗ nào cũng hỏng âm thầm chứ không báo lỗi:

| File | Sửa gì | Sót thì sao |
|---|---|---|
| `src/content.config.ts` | enum `category` | build gãy — chỗ duy nhất *có* báo lỗi |
| `src/utils/family.ts` | xếp kiểu món vào 1 trong 5 họ màu | rơi về họ `nuoc`, **nền thẻ sai màu, không báo gì** |
| `src/pages/mon/index.astro` | thêm vào `CAT_ORDER` | **không có chip lọc**, món thành không lọc được |
| `src/components/art/RecipeArt.astro` | `byCategory` (hình dự phòng) | món chưa có art riêng rơi về `bowl` |
| `src/content/recipes/_template.yaml` | dòng chú thích | người sau chép nhầm |
| `tools/contact-sheet.mjs` | bảng `FAMILIES` | contact sheet soi sai nền |
| ROADMAP.md | bảng kế hoạch | — |

Thêm **hình vẽ riêng** cho món: `ArtTenMon.astro` + giá trị mới trong enum `art`
(`content.config.ts`) + import & dòng render trong `RecipeArt.astro`.

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
