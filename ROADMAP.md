# Lộ trình Món Việt Ngon

Kho công thức món Việt tại [www.monvietngon.com](https://www.monvietngon.com) — mục tiêu dài hạn: **~100 món** phủ đủ ba miền, món nào cũng được chăm chút như món nào.

_Cập nhật: 2026-07-29 — site đang có **47 món** / 7 vùng / 13 kiểu món. Phần I (thiết kế lại giao diện) đã xong; **đợt 6 và đợt 7 đã xong**. Còn đợt 8–10 (16 món) để lên **63 món / 14 kiểu món**._

## Đã hoàn thành

- [x] 35 món, mỗi món một file YAML (`src/content/recipes/`) với bản nấu nhanh, giỏ đi chợ tự tính khẩu phần, đồng hồ đếm giờ trong từng bước, bí quyết và FAQ
- [x] Hình minh họa SVG vẽ riêng cho từng món (`src/components/art/`)
- [x] Đợt lớn 2026-07-28 (14 món): phở gà, hủ tiếu Nam Vang, bún thịt nướng, phở khô Gia Lai, cơm chiên cá mặn, gỏi xoài xanh tôm khô, gỏi gà bắp cải, gà nướng mắc khén, mực xào thơm cần tây, sườn ram mặn ngọt, cà ri gà, tôm rim nước cốt dừa, bánh cuốn nóng, trứng chưng thịt nấm mèo
- [x] Mở vùng mới **Tây Bắc** + **Tây Nguyên** và kiểu món mới **"Nướng"**
- [x] Đợt 6 (2026-07-29, 6 món): miến gà, mì vịt tiềm, miến xào cua, mì xào bò, bún đậu mắm tôm, bún bò Nam Bộ — kèm đổi tên **"Món sợi" → "Món nước"** và mở kiểu món **"Bún trộn"**
- [x] Đợt 7 (2026-07-29, 6 món): lẩu mắm, lẩu gà lá é, lẩu Thái, cháo lươn Nghệ An, cháo gà, cháo lòng — mở **hai** kiểu món mới **"Lẩu" + "Cháo"**, và nâng trang chủ từ 9 lên **12 món nổi bật**
- [x] SEO: JSON-LD schema.org/Recipe, ảnh OG chia sẻ sinh lúc build, sitemap, robots.txt
- [x] Trang bí quyết bếp (`/bi-quyet/`), trang danh mục `/mon/` có lọc theo kiểu món · theo dịp · miền
- [x] Deploy tự động lên GitHub Pages, tên miền riêng + HTTPS, dòng bản quyền footer

---

# PHẦN I — Thiết kế lại giao diện (hướng "Khăn rằn")

## Vì sao làm bây giờ

Ở mốc 63 món, giao diện hiện tại gãy ở bốn chỗ — đều là hệ quả của số lượng, không phải chuyện thẩm mỹ:

| | Vấn đề |
|---|---|
| **29 chip lọc** | Kiểu món 15 · Theo dịp 8 · Miền 6 — ba hàng chip phải cuộn hết mới thấy món đầu tiên trên điện thoại |
| **590 KB** | `/mon/` đã nặng **327 KB** với 35 món (đo 2026-07-28); ở 63 món là ~590 KB HTML vì mỗi thẻ nhúng một SVG vẽ tay |
| **Không đếm kết quả** | Bấm lọc xong không biết còn bao nhiêu món; chỉ khi rỗng hẳn mới có thông báo |
| **Lọc miền bị lẫn** | Món "Cả nước" hiện ở mọi miền — sắp có 12 món như vậy, bấm "Miền Bắc" sẽ ra 10 món Bắc kèm 12 món lẫn vào |

Hướng đã chọn: **"Khăn rằn"** — đi hẳn về ngôn ngữ thị giác Nam Bộ, dải caro thành cấu trúc thay vì đường viền trang trí, và quan trọng nhất là **nền thẻ mã hóa theo họ món** để lưới 63 món đọc ra thành từng nhóm ngay từ cái liếc đầu.

## Năm họ màu

14 kiểu món không thể có 14 màu nền phân biệt được — mắt không đọc nổi. Gom thành **5 họ theo cách ăn**:

| Họ | Nền | Gồm kiểu món | Số món (ở mốc 63) |
|---|---|---|---:|
| **Chan & húp** | lam pha lục `#235B66` | Món nước · Canh · Lẩu · Cháo | 23 |
| **Mặn đưa cơm** | nâu sâu `#6E3512` | Kho · Xào · Hấp | 17 |
| **Cuốn & trộn** | xanh lá `#5B7A2E` | Gỏi · Cuốn · Bún trộn | 10 |
| **Cơm & bánh** | vàng đất `#A8801A` | Cơm · Bánh | 7 |
| **Lửa** | đỏ ớt `#9A3D2B` | Nướng · Chiên | 6 |

Nhãn trên thẻ vẫn ghi **kiểu món cụ thể** ("Món nước", "Lẩu"…) — màu chỉ báo họ.

**Ba mã màu đã đổi so với dự kiến ban đầu, sau khi soi contact sheet:**

- **Nâu** hạ từ `#8A4A1E` xuống `#6E3512` — tộ đất vốn màu nâu, đặt trên nền nâu là mất hẳn đường bao.
- **Vàng** chọn `#A8801A` thay `#8F6410` — sắc cũ nhìn thoáng qua gần như trùng với nâu, hai họ không tách được.
- **Chan & húp** chuyển từ xanh lá thương hiệu `#2C5234` sang **lam pha lục** `#235B66` — trước đó có hai họ cùng hệ xanh, tách nhau chỉ nhờ độ sáng.

> Đường tới màu này đi qua bốn lần thử. **Lam thuần `#22456B`** tách sắc mạnh nhất nhưng đặt lên trang thì lạc lõng, vì bốn họ kia đều **ấm** còn nó là mảng **lạnh duy nhất** — mà lại thuộc họ đông nhất, 23/63 món. **Lục biển `#1E4A4C`** hòa hơn nhưng trầm quá, thành nền xỉn nhất trong năm. **Lam nhạt `#3E6E96`** loại thẳng: nền phải đủ tối vì nhãn kiểu món là chữ trắng và cả 40 hình đều vẽ theo lối sáng-trên-nền-tối. `#235B66` là chỗ cân bằng — pha đủ lục để bắc cầu sang khung xanh lá, giữ đủ lam để không lẫn với họ Cuốn & trộn.
>
> Kiểm thêm khi đổi: **34/40 file hình vẽ vành tô bằng đúng `#2C5234`**. Trên nền lam pha lục, vành đó chỉ đọc như một nét viền sẫm — không chỏi, không phải sửa hình nào.

### Khung site GIỮ NGUYÊN xanh lá

Đã thử đổi khung sang lam đậm, men lam, đỏ cờ và đỏ sơn mài (mockup có nút hoán tại chỗ). Kết luận: **giữ `--river` `#2C5234` / `--river-deep` `#1F3D26`** như hiện tại.

Rút ra được một quy tắc dùng lâu dài: **màu khung không nên trùng hệ với họ món đông nhất**, không thì màu đó chiếm cả hai tầng và thành màu chủ đạo của cả site.

| Khung thử | Đụng họ | Số món họ đó | |
|---|---|---:|---|
| Xanh lá `#2C5234` | Cuốn & trộn `#5B7A2E` | 10 / 63 | ✅ giữ |
| Lam đậm `#22456B` | Chan & húp — trùng khít | 23 / 63 | lam chiếm cả site |
| Men lam `#2A4E8C` | Chan & húp | 23 / 63 | vẫn cùng hệ lam |
| Đỏ cờ `#C81E1E` | Lửa `#9A3D2B` | 6 / 63 | gắt khi trải cả hero lẫn footer |
| Đỏ sơn mài `#8E2A22` | Lửa — khá sát | 6 / 63 | thẻ Kho dễ tan vào nền |

**Màu khung dùng ở đâu** (`grep var(--river)`): gradient hero cả ba loại trang · nền "Bản nấu nhanh" · chữ "Việt" trên logo · `.accent` trong tiêu đề mục · chữ cái đầu bài · icon số bước · chip lọc đang chọn · toast · nền footer.

## Giai đoạn 1 — Nền màu & kiểm hình  ⟵ *cổng quyết định*

- [x] Dựng **contact sheet** (`node tools/contact-sheet.mjs`) — render mọi hình trên đúng nền họ màu của nó. Công cụ này ở lại làm QA thường trực cho mọi đợt món sau; mapping art đọc thẳng từ `RecipeArt.astro` nên không lệch khi thêm món.
- [x] Chốt 5 mã màu sau khi soi (xem bảng trên)
- [x] Thêm token 5 họ + quầng sáng vào `tokens.css`
- [x] Sửa số ít hình bị chọi màu — **không vẽ lại hàng loạt**

**Quầng sáng sau hình (`--art-halo`).** Tộ đất nâu chìm vào nền nâu là do *trùng sắc*, hạ nền tối thêm chỉ giảm chứ không chữa. Cách chữa gốc là một quầng sáng mờ đặt sau hình, **làm trong CSS của thẻ chứ không sửa file SVG** — một chỗ, mọi món, mọi họ. Đã chọn mức vừa (`rgba(255,247,225,.22)`); mạnh hơn thì quầng làm loãng màu nền và mất tác dụng phân họ.

**Việc hình đã xử lý:**

| Việc | Món | Xong |
|---|---|---|
| Viền sáng ở miệng và thân tộ (tộ to và tối nhất nhóm, quầng chung chưa đủ) | cá kho tộ | ✓ |
| Vẽ hình riêng (trước đó dùng hình dự phòng dùng chung) | gỏi cuốn tôm thịt · rau muống xào tỏi | ✓ |

Ngoài ba món trên, **32 hình còn lại đều sống tốt trên nền mới** — không phải vẽ lại hàng loạt.

> Hai hình dự phòng `rolls` và `plate` hoá ra vốn được vẽ đúng cho hai món này (aria-label ghi rõ), nên trang món chưa bao giờ hiển thị sai — chỉ là thiếu chữ ký nhận diện: gỏi cuốn thiếu **cọng hẹ ló ra**, rau muống chỉ là một đống xanh chung chung. Hai hình mới bổ sung đúng hai thứ đó.

## Giai đoạn 2 — Trang danh mục `/mon/`

- [x] **Thẻ món mới** — nền theo họ (`utils/family.ts`) + quầng sáng, nhãn kiểu món góc trên, miền · thời gian · độ khó ở chân thẻ. Tiêu đề thẻ giờ chỉ còn **tên món** (`dishName()`), không kèm câu quảng — trước đó nó lặp ý với dòng tóm tắt ngay dưới
- [x] **Kệ lọc cuộn ngang** từng trục, không xuống dòng thành tường chip; thứ tự chip cố định để thêm món mới không làm hàng lọc nhảy
- [x] **Ô tìm kiếm bỏ dấu tiếng Việt** — gõ `dau phong` ra _đậu phộng_. Chuỗi tìm kiếm (tên, tóm tắt, miền, kiểu món, theo dịp, **tên từng nguyên liệu**) tính sẵn lúc build vào `data-search`, trình duyệt chỉ phải chuẩn hóa mỗi câu người dùng gõ
- [x] **Dòng đếm kết quả** + tóm tắt bộ lọc đang bật + nút bỏ hết lọc
- [x] **Sửa lỗi lọc miền** — "Cả nước" giờ là một miền như mọi miền khác. Trước đây bấm "Miền Bắc" ra 12 món (6 Bắc + 6 lẫn), giờ ra đúng 6
- [x] **Cuộn tới đâu vẽ tới đó** — `content-visibility:auto` trên thẻ

> ⚠️ **`content-visibility` giảm chi phí DỰNG chứ không giảm dung lượng tải.** `/mon/` hiện **345 KB** với 35 món (327 KB trước khi thêm chuỗi tìm kiếm), ở 63 món sẽ khoảng **620 KB** — vì mỗi thẻ vẫn nhúng thẳng một SVG vẽ tay vào HTML.
>
> Muốn cắt thật dung lượng thì phải **đưa hình ra file `.svg` riêng, gọi bằng `<img loading="lazy">`** — trình duyệt mới bỏ qua được hình ngoài màn hình và cache lại từng hình. Cái giá: CSS ngoài không với vào trong `<img>` được, nên luật `.steam path` phải nhúng vào từng file svg. **Chưa làm — chờ xem 620 KB có thành vấn đề thật không.**

**Chưa soi tận mắt:** bố cục ở bề rộng điện thoại (CSS đã viết: nhãn kệ xuống dòng, kệ tràn ra sát lề) — công cụ đổi kích thước cửa sổ không ăn trong phiên này.

## Giai đoạn 3 — Trang chủ

- [x] **`/mon/` đọc & ghi tham số URL** (`?kieu=` · `?dip=` · `?mien=` · `?q=`) — bộ lọc phản chiếu vào thanh địa chỉ nên đường dẫn lưu lại hay gửi cho người khác vẫn ra đúng cái đang xem
- [x] **Ô tìm kiếm ngay ở hero** — form GET thuần sang `/mon/?q=…`, không có JS vẫn chạy
- [x] **Khu lối vào theo trục** — "Nấu cho dịp gì?" và "Thèm vị vùng nào?", mỗi cửa kèm **số món đang có** để khỏi bấm vào rồi mới thấy trống. Cửa nào chưa có món thì tự ẩn (Cơm nhà · Bữa sáng · Cỗ Tết sẽ hiện sau khi gắn nhãn ở giai đoạn 5)
- [x] **9 món nổi bật** (tăng từ 6) — giữ nguyên 6 món cũ, thêm gỏi xoài xanh tôm khô · gà nướng mắc khén · trứng chưng thịt nấm mèo

Chín món nổi bật giờ phủ **cả 5 họ màu**, 6/7 vùng (thiếu Tây Nguyên — vùng đó mới có phở khô Gia Lai, lấy vào thì thành món nước thứ tư), không kiểu món nào quá 3, và độ khó chia 3 Dễ · 4 Vừa · 2 Kỳ công.

## Giai đoạn 4 — Trang chi tiết món & phần còn lại

- [x] **Trang chi tiết món mang màu HỌ của chính nó** — bấm thẻ nâu thì rơi vào trang nâu, bấm thẻ đỏ thì rơi vào trang đỏ. Ba khối đổi theo họ: hero, "Bản nấu nhanh", và thẻ "Tới giờ cơm rồi"
- [x] **Ảnh OG cũng theo họ** (`OG_FAMILY` trong `src/utils/og.ts`) — chia sẻ lên mạng xã hội thì ảnh khớp với trang khi bấm vào. Riêng họ "Cơm & bánh" đổi chữ thương hiệu sang kem, vì vàng trên vàng thì nhạt nhòa
- [x] **Trang bí quyết** — soi lại, không phải sửa gì: nó không dùng hero gradient nào

**Cách làm, để lần sau khỏi phải nghĩ lại:** trang món đặt `--ground` / `--ground-deep` lên `<main id="recipe-root">` theo họ, còn CSS viết `var(--ground, var(--river))`. Nơi nào không có `--ground` — trang chủ, trang bí quyết — thì tự rơi về xanh lá thương hiệu. Nhờ vậy `.mam-card` dùng chung ở cả trang chủ lẫn trang món mà mỗi nơi ra một màu đúng, không cần tách class.

Chữ cái đầu bài và icon số bước **cố ý giữ xanh lá** `--river`: đó là nét mực nhỏ trên nền giấy kem, vàng hay đỏ đặt ở cỡ đó thì đọc không nổi.

## Giai đoạn 5 — Schema & nhãn

- [x] **`pubDate` + `updatedDate`** vào `content.config.ts`, cả hai optional
  - `pubDate` → `datePublished` trong JSON-LD, và dùng sắp thứ tự RSS sau này
  - `updatedDate` → `dateModified` + dòng "cập nhật" cuối bài
  - **Quy ước:** chỉ đổi `updatedDate` khi sửa nội dung có nghĩa (đổi định lượng, đổi bước, sửa sai công thức) — sửa chính tả thì để yên, không thì RSS và Google tưởng bài mới
  - 35 món cũ đã điền `pubDate` lấy từ ngày commit đầu của file
- [x] **Gắn lại nhãn "Theo dịp" cho toàn bộ 35 món**

Schema giờ có `.min(1)` cho `occasions` — **để trống là build gãy**, không phải trông cậy vào việc nhớ. Sau khi gắn lại:

| Nhãn | Số món | | Nhãn | Số món |
|---|---:|---|---|---:|
| Cơm nhà | 14 | | Ăn chơi | 7 |
| Đãi khách | 11 | | Nhậu lai rai | 5 |
| Bữa sáng | 10 | | Cho bé · Cỗ Tết | 4 · 4 |

**Trống nhãn: 0.** "Đãi khách" đã gỡ khỏi 4 món vốn là món ăn hàng chứ không phải món đãi tiệc — phở gà, mì Quảng, bún bò Huế, canh gà lá giang — nên từ 15 xuống 11, lọc lại có nghĩa.

---

# ✅ PHẦN I HOÀN TẤT

Cả 5 giai đoạn đã xong, build xanh 38 trang.

## ✅ Đã sửa: giao diện trên điện thoại

Ba lỗi Thái báo, đều đã tái hiện được và sửa xong:

| Lỗi | Chữa thế nào |
|---|---|
| Chip lọc tràn ngang, phải cuộn mới thấy | **Bỏ hẳn kệ cuộn ngang trên điện thoại.** Ba hàng chip gộp vào một bảng **đóng/mở**, mở ra thì chip **xuống dòng hết** — bộ lọc nằm ngoài màn hình thì không ai bấm |
| Chữ trong ô tìm kiếm không hiện hết | Rút gọn còn *"Tìm món hoặc nguyên liệu…"*; câu gợi ý gõ-không-dấu tách xuống một dòng riêng — vốn dĩ nó đáng đọc chứ không đáng nhét vào placeholder |
| Chip dính sát mép trái | Bỏ luôn thủ thuật tràn lề `margin-inline:-24px` đi kèm kệ cuộn |

Thêm **nút "lên đầu trang"** (Thái đề nghị) — đặt toàn cục, hiện sau khi cuộn quá 900px, tôn trọng `prefers-reduced-motion`, ẩn khi in. Trang chi tiết món mới là trang dài nhất nên nó có ích ở đó nhất.

**Cách soi mobile khi công cụ đổi kích thước cửa sổ không ăn:** dựng một file HTML tạm trong `public/`, nhúng trang vào `<iframe width="414">`. Iframe cho document bên trong một viewport thật nên **media query chạy đúng**; để cùng origin thì còn với vào trong tắt hiệu ứng hiện dần và bấm thử được. Xong nhớ xóa file tạm.

## ✅ Đã sửa 2026-07-29: kệ lọc cuộn ngang trên desktop

Thái báo: mép phải ba hàng chip bị mờ. Đo lại thì ra **hai lỗi chồng nhau**, cả hai đều đo được bằng harness iframe + `getBoundingClientRect`:

1. **Dải mờ bôi vô điều kiện.** `mask-image` gắn cứng vào `.shelf__rail`, không hỏi rail có tràn hay không. Trục "Theo dịp" và "Miền" có `scrollWidth == clientWidth` — không có gì để cuộn — mà chip cuối vẫn bị làm mờ.
2. **Cuộn ngang giấu mất chip**, đúng cái tật đã bỏ trên điện thoại hồi phần I:

| bề rộng | chip bị giấu hôm nay | ở mốc 63 món |
|---:|---:|---:|
| 1440px | 1 | 4 |
| 1024px | 2 | 5 |
| 900px | 5 | 8 |
| 760px | **11 / 28** | **14** |

**Chữa:** bỏ hẳn kệ cuộn, cho chip **xuống dòng ở mọi bề rộng** — tức là dùng đúng cách đã chọn cho điện thoại. Mặt nạ, `scroll-snap`, `overscroll-behavior`, mẹo giấu thanh cuộn đều xóa theo; CSS ngắn lại và chỉ còn **một hành vi duy nhất** ở mọi màn hình, khác nhau mỗi chỗ điện thoại có thêm bảng đóng/mở.

**Giá:** khối lọc cao thêm **44px** (màn rộng) tới **132px** (760px). Đo lại sau khi sửa: **0 chip bị giấu ở mọi bề rộng, cả hôm nay lẫn mốc 63.**

**Còn lo "chip quá nhiều thì sao?"** — ba trục đều là từ vựng đóng, không phình vô hạn: kiểu món 11 → 14 ở mốc 63 → nhiều lắm 16–18 (luật "mỗi kiểu ≥ 3 món" tự chặn); theo dịp 7 và miền 7 gần như cố định (roadmap đã chốt không mở vùng Đông Bắc riêng). Xấu nhất ~35 chip ≈ 4 hàng ≈ 230px. Nếu có ngày vượt thật thì đường lui là gộp trục vào `<select>`, nhưng số liệu nói là chưa cần.

**Bước tiếp theo:** vào đợt 8 (6 món Miền Trung).

---

# 📊 Catalog sau đợt 7 — 47 món

| Kiểu món | | | Vùng miền | sau đợt 6 → nay | | Theo dịp | |
|---|---:|---|---|---:|---|---|---:|
| Món nước | 10 | | Miền Nam | 15 → 15 · 32% | | Đãi khách | 16 |
| Kho | 7 | | Cả nước | 8 → **11** · 23% | | Bữa sáng | 15 |
| Canh · Xào | 5 mỗi loại | | Miền Bắc | 9 → 9 · 19% | | Cơm nhà | 15 |
| Bún trộn · Cơm | 3 mỗi loại | | Miền Tây | 4 → **5** · 11% | | Ăn chơi | 11 |
| **Lẩu · Cháo** | **3 mỗi loại** | | Miền Trung | 3 → **5** · 11% | | Nhậu lai rai | 9 |
| Chiên · Gỏi · Hấp | 2 mỗi loại | | Tây Bắc | 1 · 2% | | Cho bé | 8 |
| Cuốn · Nướng | 1 mỗi loại | | Tây Nguyên | 1 · 2% | | Cỗ Tết | 5 |
| | | | | | | **trống nhãn** | **0** |

**Độ khó:** Vừa 22 (47%) · Dễ 18 (38%) · Kỳ công 7 (15%).
**Họ màu:** Chan & húp 21 · Mặn đưa cơm 14 · Cuốn & trộn 6 · Cơm & bánh 3 · Lửa 3.

**Miền Trung 3 → 5** và Miền Nam tụt từ 37% xuống 32% mà không bỏ món nào — gỡ được một phần chỗ lệch lớn nhất của catalog. Cả 13 kiểu món đang có đều **≥ 1**, hai kiểu vừa mở đều vào đúng mức tối thiểu **3 món**.

**Hai ô còn mỏng cần để mắt:** *Cuốn* và *Nướng* vẫn mỗi ô 1 món — đợt 7 không đụng tới hai ô này. Đợt 8 (bánh tráng cuốn thịt heo) và đợt 10 (nem nướng) gỡ cho Cuốn; đợt 9 (bò một nắng, cá lóc nướng trui) gỡ cho Nướng.

## Featured: 9 → 12 món (đổi ở đợt 7)

Cả 6 món đợt 7 đều thuộc **một họ màu duy nhất** (*Chan & húp*), nên với 9 ô thì mọi cách xếp đều phải hy sinh một thứ — đã thử hết bốn cách trước khi quyết:

| Cách xếp trong 9 ô | Hỏng chỗ nào |
|---|---|
| + lẩu mắm + bún đậu, − canh chua − trứng chưng | 1 Dễ / 5 Vừa / 3 Kỳ công — trang chủ toàn món khó |
| + lẩu mắm, − mì Quảng | **Miền Trung 0 món**, ngay trong đợt kéo Miền Trung lên |
| + lẩu gà lá é, − canh chua | **Miền Tây 0 món** — mất vùng làm nên nhận diện khăn rằn |
| + lẩu mắm + bún đậu, − trứng chưng − gỏi xoài | họ *Chan & húp* lên 5/9, đúng cái muốn tránh |

9 ô không chứa nổi cùng lúc: Miền Trung + Miền Tây + Cả nước + Tây Bắc + đủ 5 họ màu + một món mở màn kiểu món mới + bún đậu (đã hoãn từ đợt 6). Nên **giữ nguyên cả 9 món cũ và thêm 3**: **lẩu mắm** (mở màn kiểu món mới), **bún đậu mắm tôm** (nợ từ đợt 6), **chả giò** — món nổi tiếng nhất còn đứng ngoài trang chủ, và nó gỡ luôn chuyện họ *Lửa* chỉ có 1/9.

Kết quả 12 món: **họ** Chan & húp 5 · Mặn đưa cơm 2 · Cuốn & trộn 2 · Lửa 2 · Cơm & bánh 1 (tỷ lệ 42% cho họ đông nhất, đúng bằng tỷ lệ của nó trong catalog) · **vùng** 6/7 (thiếu Tây Nguyên) · **độ khó** 3 Dễ / 6 Vừa / 3 Kỳ công · không kiểu món nào quá 3.

> **Một lý do phụ nhưng đo được:** lưới `auto-fill minmax(252px, 1fr)` cho 2–4 cột tuỳ bề rộng. **12 chia hết cho cả 2, 3 và 4**, còn 9 thì ở 4 cột ra hàng cụt 4+4+1. Đã đếm lại trên trang thật: 12 thẻ, 3 cột, 4 hàng đầy, dư 0.

**Cháo cố ý không lên trang chủ:** cháo lòng kén người ăn, cháo gà nhìn nhạt — hai món đó sống tốt hơn ở chip lọc và dải "Sắp lên mâm". Featured là chỗ để món mạnh nhất, không phải chỗ trưng đủ mặt kiểu món.

**Dung lượng `/mon/` ở 47 món: 491 KB thô · 111 KB gzip.** Mốc kích hoạt việc tách hình ra `.svg` riêng vẫn là **gzip vượt ~150 KB** — còn xa, khớp với đường chiếu 136 KB ở mốc 63 món.

## ⚠️ Đính chính: mọi con số dung lượng trước đây đều là **CHƯA NÉN**

Đo lại 2026-07-29 và đối chiếu với máy chủ thật. GitHub Pages **đã nén sẵn** (`content-encoding: gzip`, kiểm bằng `curl -I` trên www.monvietngon.com). Nên con số đáng quan tâm là cột gzip, không phải cột thô:

| | thô | **gzip (thật sự tải về)** | brotli |
|---|---:|---:|---:|
| khung trang | 63 KB | **17 KB** | |
| 257 thẻ `<svg>` nhúng thẳng | 363 KB (85%) | 78 KB | |
| **`/mon/` ở 41 món** | 426 KB | **95 KB** | 71 KB |
| **`/mon/` ở 47 món** *(đo lại sau đợt 7)* | 491 KB | **111 KB** | |
| chiếu ở 63 món | 620 KB | 136 KB | ~104 KB |
| chiếu ở 100 món | 948 KB | 206 KB | ~157 KB |
| **nếu tách `.svg` ra ngoài** | | **~34 KB, không đổi theo số món** | |

Vậy "590 KB / 620 KB" trong phần I là số thô — nó phóng đại mức khẩn cấp lên gấp **4,5 lần**. Thực tế hôm nay chỉ 95 KB qua dây.

**Việc tách hình vẫn đáng làm, nhưng vì lý do khác chứ không phải vì 620 KB:** nó **cắt đứt quan hệ giữa dung lượng trang và số món** (34 KB dù 41 hay 100 món), và cho phép **dùng chung một file giữa `/mon/`, trang chủ và trang chi tiết** — hiện mỗi trang tải lại y hình đó từ đầu.

**Cách làm đúng là một endpoint lúc build, không phải sửa tay từng file:** thêm `src/pages/art/[kind].svg.ts` theo đúng khuôn `src/pages/og/[slug].png.ts` đã có sẵn, rồi `RecipeCard` gọi `<img loading="lazy">`. Luật `.steam` được bơm vào trong endpoint **một lần trong code**, không phải chép vào 41 (hay 100) file. Cách vẽ art giữ nguyên là `.astro`. Đã kiểm: **không file art nào dùng `currentColor` hay `var(--…)`** — `.steam` là ràng buộc CSS duy nhất, nên tách là sạch.

⇒ **Hoãn được tới sau mốc 63, và làm lúc nào cũng tốn từng ấy công.** Mốc kích hoạt nên đặt theo **gzip vượt ~150 KB** (cỡ 70 món), chứ đừng đặt theo số thô.

| Nhãn mới | Nghĩa |
|---|---|
| **Cơm nhà** | Món dọn cùng cơm trắng trong bữa cơm gia đình (canh · mặn · rau) |
| **Bữa sáng** | Món điểm tâm, ăn hàng buổi sáng |
| **Cỗ Tết** | Mâm cỗ Tết – giỗ chạp |

Đồng thời **gỡ "Đãi khách" khỏi 4 món** vốn là món ăn hàng chứ không phải món đãi tiệc: phở gà, mì Quảng, bún bò Huế, canh gà lá giang. Sau khi gắn lại: Cơm nhà 14 · Đãi khách 11 · Bữa sáng 10 · Ăn chơi 7 · Nhậu lai rai 5 · Cho bé 4 · Cỗ Tết 4 · **trống nhãn 0**.

> **Cách làm:** làm thẳng trên `main`, nhưng **chỉ push khi cả phần I xong**. Header, footer và thẻ món dùng chung nên deploy nửa vời sẽ ra trang nửa cũ nửa mới.

---

# PHẦN II — 28 món mới (35 → 63)

Bắt đầu ngay sau giai đoạn 5. Làm sau chứ không xen vào, vì **28 hình món mới cần được vẽ trên nền màu mới ngay từ đầu** — vẽ trước rồi soi lại là làm hai lần.

Thứ tự các đợt được xếp sao cho **mỗi kiểu món mới chỉ mở khi đã đủ quân**, không ô nào bị rút cạn giữa chừng.

### ✅ Đợt 6 — XONG 2026-07-29 · 6 món · mở "Món nước" + "Bún trộn"

| Món | Vùng | Kiểu món | Độ khó | Theo dịp |
|---|---|---|---|---|
| Miến gà | Miền Bắc | Món nước | Vừa | Bữa sáng · Cho bé |
| Mì vịt tiềm | Miền Nam | Món nước | Kỳ công | Đãi khách |
| Miến xào cua | Cả nước | Xào | Vừa | Cỗ Tết · Đãi khách |
| Mì xào bò | Cả nước | Xào | Dễ | Ăn chơi · Cho bé |
| Bún đậu mắm tôm | Miền Bắc | Bún trộn | Vừa | Ăn chơi · Nhậu lai rai |
| Bún bò Nam Bộ | Miền Bắc | Bún trộn | Dễ | Bữa sáng · Ăn chơi |

**Đã đổi tên kiểu món "Món sợi" → "Món nước"** (tên cũ khó hiểu), kèm ba việc chuyển chỗ:
- **Bún thịt nướng** chuyển sang **Bún trộn** (cùng bún đậu + bún bò Nam Bộ là đủ 3 món để mở)
- **Miến xào cua, mì xào bò** vào thẳng **Xào**, không đẻ kiểu món riêng
- **Phở khô Gia Lai ở lại "Món nước"** — nó dọn kèm một tô nước lèo riêng

> **Định nghĩa để không lẫn:** *Món nước = một tô là xong bữa · Canh = món trong mâm cơm.*
> Định nghĩa này đã chép thẳng vào chú thích của `content.config.ts` để lần sau khỏi phải tra lại.

**Đổi tên enum là việc đụng 15 chỗ, không phải một chỗ** — ghi lại để đợt 7 (mở Lẩu + Cháo) khỏi sót: 9 file YAML · `content.config.ts` (enum `category` + enum `art`) · `utils/family.ts` · `RecipeArt.astro` (map `byCategory` + import + dòng render) · `pages/mon/index.astro` (`CAT_ORDER`) · `_template.yaml` · `tools/contact-sheet.mjs`.

*Bún bò Nam Bộ là món Hà Nội — "Nam Bộ" là tên một con phố ở Hà Nội chứ không phải vùng miền. Bài viết nêu đúng cơ chế đặt tên đó và **không nêu tên phố nay là gì**: Thái chốt 2026-07-29 rằng nội dung món ăn không đưa tên đường và tên danh nhân vào. Nguồn gốc còn tranh cãi nên đã viết dạng giai thoại.*

**Sửa sau khi Thái duyệt — mì vịt tiềm không lấy "thuốc bắc" làm điểm bán.** Áp đúng khuôn luật khói than: bỏ hết câu mang tính bổ dưỡng ("có tiếng là bổ", "ấm từ trong ra", "món của ngày trở trời"); **bỏ việc kê tên vị thuốc kèm liều gam** (bản đầu ghi "đương quy · xuyên khung, mỗi thứ 5 g" — hai vị thuốc thật, có chống chỉ định thật) và gộp thành **"gói gia vị tiềm vịt mua sẵn"**; chữ "thuốc bắc" **giữ đúng một lần** ở ghi chú mua nguyên liệu (người đọc cần biết ra tiệm nào), mọi chỗ chào hàng đổi sang "thảo mộc / gia vị tiềm". Ticker trang chủ cũng sửa theo.

> Rà lại toàn bộ 41 món sau đó: các món cũ đã sẵn đúng luật — `phở bò` và `bò kho` chỉ nhắc "thuốc bắc" như **lỗi cần tránh** ("nước hắc mùi thuốc bắc") hoặc **chỗ đi mua**, không nhắc ở title/summary/ticker. Riêng `canh gà lá giang` có câu "nồi nhôm… không tốt cho sức khỏe" — đó là **cảnh báo an toàn**, khác loại với quảng bá, nên giữ.

**Bẫy YAML gặp phải khi viết 6 món này** (mất một vòng build mới ra, ghi lại cho đợt sau):
- Chuỗi thường (không quote, không dùng `>-`) mà chứa `": "` thì **YAML nuốt thành object** — có khi gãy build, có khi *im lặng* biến chuỗi thành map rồi mới gãy ở Zod. Vd `- Đồ chua: đu đủ xanh…`, `- text: Nếm thử: mặn đậm…`
- Chuỗi thường **bắt đầu bằng `*`** bị hiểu là YAML alias. Vd `- **Chiên ngập dầu** cho da vàng…`
- Cách kiểm nhanh trước khi build: chạy `js-yaml` trên cả thư mục rồi soi xem có trường nào đáng lẽ là chuỗi mà ra object không.

### ✅ Đợt 7 — XONG 2026-07-29 · 6 món · mở "Lẩu" + "Cháo"

| Món | Vùng | Kiểu món | Độ khó | Theo dịp |
|---|---|---|---|---|
| Lẩu mắm | Miền Tây | Lẩu | Kỳ công | Đãi khách · Nhậu lai rai |
| Lẩu gà lá é | Miền Trung | Lẩu | Vừa | Đãi khách · Nhậu lai rai |
| Lẩu Thái | Cả nước | Lẩu | Vừa | Đãi khách · Ăn chơi |
| Cháo lươn Nghệ An | Miền Trung | Cháo | Vừa | Bữa sáng · Cho bé |
| Cháo gà | Cả nước | Cháo | Dễ | Cơm nhà · Bữa sáng · Cho bé |
| Cháo lòng | Cả nước | Cháo | Vừa | Bữa sáng · Nhậu lai rai |

*Lẩu gà lá é gốc Phú Yên (Miền Trung), nổi tiếng nhờ Đà Lạt — đã kể chuyện đó trong bài. Lẩu Thái viết ở dạng "lẩu Thái kiểu Việt", nói thẳng gốc là **tom yum** của Thái Lan ngay đoạn đầu phần chuyện món ăn.*

**Mở kiểu món lần này chỉ phải sửa 4/7 chỗ — Phần I đã đi trước 3 chỗ.** Kiểm từng chỗ trước khi viết chứ đừng tin trí nhớ:

| Chỗ | Trạng thái khi vào đợt 7 |
|---|---|
| `content.config.ts` enum `category` | phải thêm (kèm 6 giá trị `art` mới) |
| `RecipeArt.astro` `byCategory` | phải thêm — `Lẩu` → `claypot`, `Cháo` → `bowl` |
| `_template.yaml` | phải thêm (nhân tiện sửa chú thích `occasions` vẫn ghi "tùy chọn" trong khi schema đã `.min(1)` từ giai đoạn 5) |
| ROADMAP | phải sửa |
| `utils/family.ts` · `CAT_ORDER` · `contact-sheet.mjs` | **đã có sẵn từ Phần I** |

**Thứ tự `order` nối 42–47, không đánh số lại file nào.** Khối `Canh` vốn nằm cuối dãy (38–41), nên nối Lẩu → Cháo ngay sau đó vừa đúng thứ tự trong `CAT_ORDER` (Canh · Lẩu · Cháo) vừa gom cùng họ màu. Đợt 6 phải renumber 25 file vì chèn vào giữa; đợt này 0 file.

**Bẫy YAML lại dính đúng một lần** — `- **Gỡ thịt bằng tay**, tước dọc…` trong `quick.steps` bị hiểu là alias vì mở đầu bằng `*`. Script quét (`js-yaml` + soi trường nào đáng lẽ chuỗi mà ra object) bắt được trước khi build, đúng như cách ghi ở đợt 6.

**Hình:** 6 art riêng. Rủi ro thật của đợt này là **3 nồi lẩu giống nhau và 3 tô cháo giống nhau**, nên mỗi hình được gắn một chữ ký tách bạch: nồi đất thấp + rổ rau (lẩu mắm) · nồi đồng có **ống khói** + chén muối ớt xanh (lá é) · nồi inox nước đỏ + tôm (lẩu Thái); cháo nâu cánh gián + sợi lươn (cháo lươn) · cháo trắng + gà xé + gừng sợi (cháo gà) · khoanh dồi tròn + lát lòng rỗng ruột + giá (cháo lòng).

> **Soi bằng resvg mới thấy, contact sheet không đủ.** Bản vẽ đầu có ba lỗi chỉ lộ ra khi render PNG rồi nhìn: **ống khói lẩu gà lá é cao gấp rưỡi mức cần** nên thành cái ống bô; **nồi inox lẩu Thái quá nhợt** khiến mảng nước đỏ không bật lên được; và **thịt gà xé trong cháo gà gần trùng màu mặt cháo** nên cả tô nhìn trống trơn. Chữa bằng ba việc: hạ ống khói và đổi nồi sang sắc đồng ấm (tách hẳn khỏi inox lạnh của lẩu Thái), sẫm nồi inox xuống một bậc, và hạ tông thịt gà xé sẫm hơn nền một bậc rõ rệt.

**Sửa sau khi Thái duyệt — từ có thật vẫn có thể khó hiểu.** Thái hỏi *"ngải bún là gì?"*, *"bánh mướt là bánh gì?"* Cả hai đều đã WebSearch kiểm chứng và **đã chú giải kỹ ở phần nguyên liệu** — nhưng lại xuất hiện trần trụi ở `summary`, tức là chữ hiện trên thẻ món và hero, chỗ người đọc gặp đầu tiên. Rút ra: **chú giải phải đi cùng lần xuất hiện ĐẦU TIÊN, không phải lần giải thích kỹ nhất.** Đã chữa: bỏ "ngải bún" khỏi summary lẩu mắm và khỏi ticker (băng chữ chạy không có chỗ giải thích), gloss ngay ở `quick.ingredients` — "một loại củ họ gừng"; bánh mướt gloss thành "**thứ bánh cuốn không nhân của xứ Nghệ**". Soi lại toàn đợt thì còn hai từ dính đúng tật đó nhưng chưa ai kêu, sửa luôn: **lá é** ("rau thơm họ húng quế") và **hành tăm** ("củ nhỏ cỡ đầu ngón tay, nồng hơn hành tím").

> Nhân đó bắt được một mô tả **sai**: bánh mướt bị viết là "bánh tráng mỏng cuộn lại". Bánh tráng là bánh phơi khô; bánh mướt tráng bột gạo tẻ trên tấm vải căng miệng nồi hơi — tức là **bánh cuốn không nhân**. Đã sửa cả 3 chỗ và bỏ câu thay thế bị vòng tròn ("không mua được bánh mướt thì thay bằng bánh cuốn không nhân").

**Tiêu đề cháo lòng bỏ "khoanh dồi mềm"** — dồi là món phụ trong tô, không phải thứ định nghĩa món. Title còn *"Cháo lòng ngọt nước luộc, lòng giòn sựt"*, và summary + heroEyebrow + ticker trang chủ cũng thôi mở đầu bằng dồi.

**Hai script QA nên giữ lại cho đợt sau:** một cái quét bẫy YAML cả thư mục, một cái **soi trùng `id` chéo giữa các file art** — cả 47 hình cùng nhúng thẳng vào `/mon/` nên hai file dùng chung một `id` là hỏng âm thầm. Lần này: 137 id, không trùng chéo file nào.

### Đợt 8 — 6 món · Miền Trung

| Món | Vùng | Kiểu món | Độ khó |
|---|---|---|---|
| Bánh tráng cuốn thịt heo Đà Nẵng | Miền Trung | Cuốn | Dễ |
| Cơm hến Huế | Miền Trung | Cơm | Vừa |
| Bánh khoái Huế | Miền Trung | Chiên *(về "Bánh" ở đợt 10)* | Vừa |
| Mắm ruốc xào thịt ba chỉ | Miền Trung | Xào | Dễ |
| Bún chả cá | Miền Trung | Món nước | Vừa |
| Bún mắm nêm | Miền Trung | Bún trộn | Vừa |

*Bún chả cá **không gắn địa danh** vào tên món — Nha Trang, Quy Nhơn, Đà Nẵng, Quảng Ngãi đều có, mỗi nơi nêm nước lèo một kiểu; kể sự khác nhau đó trong bài.*

### Đợt 9 — 5 món · Tây Bắc · Tây Nguyên · Miền Tây

| Món | Vùng | Kiểu món | Độ khó |
|---|---|---|---|
| Bê chao Mộc Châu | Tây Bắc | Chiên | Dễ |
| Bún đỏ Buôn Ma Thuột | Tây Nguyên | Món nước | Vừa |
| Bò một nắng | Tây Nguyên | Nướng | Vừa |
| Cá lóc nướng trui | Miền Tây | Nướng | Vừa |
| Ốc len xào dừa | Miền Tây | Xào | Dễ |

### Đợt 10 — 5 món · mở "Bánh"

| Món | Vùng | Kiểu món | Độ khó |
|---|---|---|---|
| Nem nướng Nha Trang | Miền Trung | Cuốn | Vừa |
| Cá tai tượng chiên xù | Miền Tây | Chiên | Vừa |
| Ốc hấp lá gừng | Miền Bắc | Hấp | Vừa |
| Gà hấp hành | Cả nước | Hấp | Dễ |
| Gỏi ngó sen tôm thịt | Miền Nam | Gỏi | Dễ |

**Mở kiểu món "Bánh"** — gom **bánh xèo miền Tây** (đang ở Chiên), **bánh cuốn nóng** (đang ở Hấp), **bánh khoái Huế** (đang ở Chiên) về một chỗ. Để tới đợt 10 mới gom vì lúc đó Chiên và Hấp đã đủ quân, gom xong không ô nào tụt dưới 3 món.

*Nem nướng Nha Trang làm theo **bản gốc cuốn bánh tráng**, không phải bản tô bún kiểu Sài Gòn.*

---

## Bức tranh sau cùng — 63 món

**Kiểu món (14 nhóm, tất cả ≥ 3 món):**

| | | | |
|---|---:|---|---:|
| Món nước | 12 | Lẩu | 3 |
| Kho | 7 | Cháo | 3 |
| Xào | 7 | Bánh | 3 |
| Canh | 5 | Chiên | 3 |
| Bún trộn | 4 | Nướng | 3 |
| Cơm | 4 | Cuốn | 3 |
| | | Gỏi | 3 |
| | | Hấp | 3 |

**Vùng miền:**

| Vùng | Trước đợt 6 | Hiện tại (47 món) | Sau đợt 10 |
|---|---:|---:|---:|
| Miền Nam | 14 (40%) | 15 (32%) | 16 (25%) |
| Miền Trung | 3 (9%) | 5 (11%) | **12 (19%)** |
| Cả nước | 6 | 11 | 12 |
| Miền Bắc | 6 | 9 | 10 |
| Miền Tây | 4 | 5 | 8 |
| Tây Nguyên | 1 | 1 | 3 |
| Tây Bắc | 1 | 1 | 2 |

> Đợt 6 toàn món Bắc và món "cả nước" nên Miền Trung đứng nguyên ở 3 món suốt đợt đó. **Đợt 7 kéo được lên 5** nhờ lẩu gà lá é và cháo lươn Nghệ An; bảy món Trung còn lại dồn vào đợt 8–10. Đây vẫn là chỗ lệch lớn nhất còn lại của catalog.

Miền Trung từ vùng gần bét lên đồng hạng đầu; Miền Nam từ 40% xuống 25% mà không phải bỏ món nào.

---

## Kho ý tưởng để dành (chưa xếp lịch)

- **Tây Bắc** — vùng này đang cạn món nấu-được-ở-nhà sau gà nướng mắc khén và bê chao. Đã cân nhắc và tạm gác: pa pỉnh tộp, xôi ngũ sắc, canh cải mèo, thịt trâu gác bếp, nộm da trâu. Chờ tìm được món xứng đáng rồi làm.
- **Đông Bắc** (Lạng Sơn, Cao Bằng, Hà Giang) — **không mở vùng riêng**; nếu sau này làm thì gắn vào "Miền Bắc". Món đã tra sẵn: khâu nhục, vịt quay lá mắc mật, phở chua Lạng Sơn.
- **Miền Trung còn dư ý tưởng:** cơm âm phủ Huế, chả ram tôm đất Bình Định, cá nục hấp cuốn bánh tráng, bánh canh cá lóc Quảng Trị.
- **Bún trộn** đã đủ quân; nếu mở rộng thì có bún ốc nguội, bún nem cua bể.

## Hạ tầng còn để dành (sau phần I & II)

- **RSS feed** — `@astrojs/rss`, endpoint `/rss.xml`. Phụ thuộc `pubDate` ở giai đoạn 5.
- **Thống kê truy cập nhẹ** — [GoatCounter](https://www.goatcounter.com), miễn phí, không cookie, hợp tinh thần "không quảng cáo" của trang. Chỉ cần 1 dòng script trong `src/layouts/Base.astro`.

## Lặt vặt

- GitHub Actions cảnh báo Node 20 deprecated ở `actions/checkout@v4`, `setup-node@v4`, `upload-artifact@v4` — nâng major khi có bản mới, không gấp

---

## Quy trình thêm một đợt món mới

1. Mỗi món 1 YAML — copy `src/content/recipes/_template.yaml` (tên file = slug URL); dòng có `": "` phải quote, timer label dạng `MM:SS`, định lượng viết `[[số|đơn vị]]` để tự scale theo khẩu phần
2. **Mỗi món phải có ít nhất 1 nhãn `occasions`** — không để trống
3. Vẽ art riêng ngay từ đầu: `src/components/art/Art<Ten>.astro` + thêm enum `art` trong `content.config.ts` + map trong `RecipeArt.astro`. **Vẽ và soi trên đúng nền họ màu của món** bằng contact sheet dựng ở giai đoạn 1 (hình phải giống món thật, không trùng nhau, xương đúng loài)
4. Cân lại `order` + `featured` toàn danh sách — trang chủ lấy **9 món featured đầu tiên theo order**
5. Cập nhật danh sách tease trong `ComingSoon.astro` (bỏ món đã ship, thêm từ kho ý tưởng) + ticker ở `index.astro` nếu món đáng lên
6. `npm run build` để schema tự kiểm — rồi `npm run preview`, mở xem từng trang mới
7. Duyệt kỹ nội dung + hình xong mới commit / push — deploy tự động ~40 giây
8. **Xong đợt: thống kê lại toàn bộ catalog** — đếm số món theo vùng miền, kiểu món, theo dịp (kể cả số món không nhãn), độ khó, featured — để còn cân lại cho đợt sau
