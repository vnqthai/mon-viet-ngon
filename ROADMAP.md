# Lộ trình Món Việt Ngon

Kho công thức món Việt tại [www.monvietngon.com](https://www.monvietngon.com) — mục tiêu dài hạn: **~100 món** phủ đủ ba miền, món nào cũng được chăm chút như món nào.

_Cập nhật: 2026-07-27 — site đang có **21 món**, đủ 5 vùng miền (Bắc / Trung / Nam / Tây / Cả nước)._

## Đã hoàn thành

- [x] 21 món, mỗi món một file YAML (`src/content/recipes/`) với bản nấu nhanh, giỏ đi chợ tự tính khẩu phần, đồng hồ đếm giờ trong từng bước, bí quyết và FAQ
- [x] Hình minh họa SVG vẽ riêng cho từng món (`src/components/art/`)
- [x] SEO: JSON-LD schema.org/Recipe, ảnh OG chia sẻ sinh lúc build, sitemap, robots.txt
- [x] Trang bí quyết bếp (`/bi-quyet/`), trang danh mục `/mon/` có lọc theo kiểu món + miền
- [x] Trục phân loại **"Theo dịp"** (`occasions`): Nhậu lai rai · Ăn chơi · Đãi khách · Cho bé — một món gắn nhiều nhãn, lọc ở `/mon/`, hiện badge trên trang món (món cơm nhà thường ngày để trống — đó là mặc định của site)
- [x] Deploy tự động lên GitHub Pages, tên miền riêng + HTTPS, dòng bản quyền footer

## Món sắp lên mâm (đợt kế tiếp)

Đang tease trong ComingSoon: **phở gà** (Bắc), **sườn ram mặn ngọt** (Nam), **gỏi xoài xanh tôm khô** (Nam), **trứng chưng thịt nấm mèo** (Cả nước).

## Kho ý tưởng món (chưa xếp lịch)

| Nhóm | Món | Vùng |
|---|---|---|
| Món sợi | bún thịt nướng | Nam |
| Món sợi | hủ tiếu Nam Vang | Nam |
| Món sợi | phở khô Gia Lai (phở hai tô) | Tây Nguyên* |
| Món sợi | miến gà | Bắc |
| Món sợi | miến xào cua | Cả nước |
| Món sợi | mì xào bò | Cả nước |
| Món sợi | mì vịt tiềm | Nam |
| Cơm | cơm chiên cá mặn | Nam |
| Kho | tôm rim nước dừa | Tây |
| Kho | cà ri gà bánh mì | Nam |
| Xào | mực xào thơm cần tây | Cả nước |
| Hấp | bánh cuốn nóng chảo chống dính | Bắc |
| Gỏi | gỏi gà bắp cải rau răm | Cả nước |
| Nướng* | gà nướng mắc khén | Tây Bắc* |

> Khi chọn đợt mới, ưu tiên món **miền Bắc / miền Trung** cho cân danh mục (đang nghiêng về Nam).
>
> **(*) Vùng & kiểu món sẽ mở thêm:** đã chốt chủ trương thêm vùng **Tây Bắc** và **Tây Nguyên** — enum thêm vào schema khi ship món đầu tiên của vùng đó (món vùng cao cần tra cứu nguyên liệu/thuật ngữ kỹ hơn). Tương tự với kiểu món mới: **"Nướng"** (khi làm gà nướng mắc khén…), **"Bánh"** (khi đủ 3+ món bánh — bánh xèo đang ở "Chiên", bánh cuốn tương lai gom về đây), **"Cháo"** (khi làm cháo). Nhãn "Cơm nhà" cho trục Theo dịp chỉ thêm khi site có nhiều món ăn chơi — hiện tại cơm nhà là mặc định của cả site nên tag sẽ không lọc được gì.

## Hạ tầng để dành (làm từ từ, chưa vội)

### 1. Tìm kiếm client-side
- Sinh JSON index lúc build từ `getCollection`: slug, title, summary, region, category, tên nguyên liệu
- Ô tìm kiếm đặt ở `/mon/`, lọc thẻ món ngay trên trang — vanilla JS là đủ, không backend
- **Nhớ bỏ dấu tiếng Việt khi so khớp** (normalize NFD + bỏ combining marks) để gõ `pho bo` vẫn ra _phở bò_

### 2. RSS feed
- Dùng `@astrojs/rss`, endpoint `/rss.xml`
- ⚠️ Schema recipe **chưa có ngày đăng** — cần thêm field `pubDate` (optional) vào `content.config.ts`; món cũ lấy ngày commit đầu của file: `git log --follow --format=%aI -- <file> | tail -1`

### 3. Thống kê truy cập nhẹ
- [GoatCounter](https://www.goatcounter.com) — miễn phí, không cookie, hợp tinh thần "không quảng cáo" của trang
- Chỉ cần 1 dòng script trong `src/layouts/Base.astro`

## Lặt vặt

- GitHub Actions cảnh báo Node 20 deprecated ở `actions/checkout@v4`, `setup-node@v4`, `upload-artifact@v4` — nâng major khi có bản mới, không gấp

## Quy trình thêm một đợt món mới

1. Mỗi món 1 YAML — copy `src/content/recipes/_template.yaml` (tên file = slug URL); dòng có `": "` phải quote, timer label dạng `MM:SS`, định lượng viết `[[số|đơn vị]]` để tự scale theo khẩu phần
2. Vẽ art riêng ngay từ đầu: `src/components/art/Art<Ten>.astro` + thêm enum `art` trong `content.config.ts` + map trong `RecipeArt.astro`; rasterize xem thử trước khi mở trang (hình phải giống món thật, không trùng nhau, xương đúng loài)
3. Cân lại `order` + `featured` toàn danh sách — trang chủ lấy **6 món featured đầu tiên theo order**
4. Cập nhật danh sách tease trong `ComingSoon.astro` (bỏ món đã ship, thêm từ kho ý tưởng) + ticker ở `index.astro` nếu món đáng lên
5. `npm run build` để schema tự kiểm — rồi `npm run preview`, mở xem từng trang mới
6. Duyệt kỹ nội dung + hình xong mới commit / push — deploy tự động ~40 giây
