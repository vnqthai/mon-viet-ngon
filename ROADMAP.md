# Lộ trình Món Việt Ngon

Kho công thức món Việt tại [www.monvietngon.com](https://www.monvietngon.com) — mục tiêu dài hạn: **~100 món** phủ đủ ba miền, món nào cũng được chăm chút như món nào.

_Cập nhật: 2026-07-29 — site đang có **58 món** / 7 vùng / 13 kiểu món. Phần I (thiết kế lại giao diện) đã xong; **đợt 6, 7, 8 và 9 đã xong**. Còn đợt 10 để lên **63 món / 14 kiểu món**._

## Đã hoàn thành

- [x] 35 món, mỗi món một file YAML (`src/content/recipes/`) với bản nấu nhanh, giỏ đi chợ tự tính khẩu phần, đồng hồ đếm giờ trong từng bước, bí quyết và FAQ
- [x] Hình minh họa SVG vẽ riêng cho từng món (`src/components/art/`)
- [x] Đợt lớn 2026-07-28 (14 món): phở gà, hủ tiếu Nam Vang, bún thịt nướng, phở khô Gia Lai, cơm chiên cá mặn, gỏi xoài xanh tôm khô, gỏi gà bắp cải, gà nướng mắc khén, mực xào thơm cần tây, sườn ram mặn ngọt, cà ri gà, tôm rim nước cốt dừa, bánh cuốn nóng, trứng chưng thịt nấm mèo
- [x] Mở vùng mới **Tây Bắc** + **Tây Nguyên** và kiểu món mới **"Nướng"**
- [x] Đợt 6 (2026-07-29, 6 món): miến gà, mì vịt tiềm, miến xào cua, mì xào bò, bún đậu mắm tôm, bún bò Nam Bộ — kèm đổi tên **"Món sợi" → "Món nước"** và mở kiểu món **"Bún trộn"**
- [x] Đợt 7 (2026-07-29, 6 món): lẩu mắm, lẩu gà lá é, lẩu Thái, cháo lươn Nghệ An, cháo gà, cháo lòng — mở **hai** kiểu món mới **"Lẩu" + "Cháo"**, và nâng trang chủ từ 9 lên **12 món nổi bật**
- [x] Đợt 8 (2026-07-29, 6 món): bánh tráng cuốn thịt heo Đà Nẵng, cơm hến Huế, bánh khoái Huế, mắm ruốc xào thịt ba chỉ, bún chả cá, bún mắm nêm — **không mở kiểu món mới**, kéo Miền Trung 5 → **11 món**
- [x] Đợt 9 (2026-07-29, 5 món): bún đỏ Buôn Ma Thuột, pa pỉnh tộp, bò một nắng, cá lóc nướng trui, ốc len xào dừa — **không mở kiểu món mới**, gỡ ô mỏng cuối cùng (**Nướng 1 → 4**), Miền Tây 5 → 7, Tây Nguyên 1 → 3
- [x] Hai script QA thường trực trong `tools/` (`npm run qa`): quét bẫy YAML cả thư mục + soi trùng `id` chéo giữa các file art
- [x] **Harness render hình ra PNG** (`npm run art-png`) — chế độ `--sheet` ghép nhiều hình một tấm ở cỡ thumbnail để soi chống-đụng; thứ contact sheet không làm được
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

---

# 📊 Catalog sau đợt 9 — 58 món

| Kiểu món | | | Vùng miền | sau đợt 8 → nay | | Theo dịp | |
|---|---:|---|---|---:|---|---|---:|
| Món nước | **12** | | Miền Nam | 15 → 15 · 26% | | Đãi khách | 21 |
| Kho · **Xào** | **7 mỗi loại** | | Miền Trung | 11 → 11 · 19% | | Ăn chơi · Bữa sáng | 17 mỗi nhãn |
| Canh | 5 | | Cả nước | 11 → 11 · 19% | | Cơm nhà | 16 |
| **Nướng** · Bún trộn · Cơm | **4 mỗi loại** | | Miền Bắc | 9 → 9 · 16% | | Nhậu lai rai | 13 |
| Chiên · Cháo · Lẩu | 3 mỗi loại | | **Miền Tây** | 5 → **7** · 12% | | Cho bé | 8 |
| Hấp · Cuốn · Gỏi | 2 mỗi loại | | **Tây Nguyên** | 1 → **3** · 5% | | Cỗ Tết | 5 |
| | | | **Tây Bắc** | 1 → **2** · 3% | | **trống nhãn** | **0** |

**Độ khó:** Vừa 30 (52%) · Dễ 21 (36%) · Kỳ công 7 (12%).
**Họ màu:** Chan & húp 23 · Mặn đưa cơm 16 · Cuốn & trộn 8 · **Lửa 7** · Cơm & bánh 4.

**Ô mỏng cuối cùng đã gỡ.** *Nướng* từ 1 lên **4** — giờ không kiểu món nào dưới 2, và ô mỏng nhất (Hấp · Cuốn · Gỏi, 2 món) đều đã có sẵn quân trong đợt 10. Đây là đợt đầu tiên catalog **không còn chỗ lệch nào phải chữa gấp**.

**Hai vùng nhỏ nhất cùng lên:** Tây Nguyên 1 → 3, Tây Bắc 1 → 2. Miền Nam tụt tiếp từ 28% xuống 26% mà vẫn không bỏ món nào.

## Featured: **không đổi ô nào** ở đợt 9

Đã cân nhắc đổi **chả giò → bò một nắng** để trang chủ lần đầu phủ đủ 7/7 vùng (Tây Nguyên đang 0 ô dù chiếm 5% catalog). Ràng buộc kép — giữ họ màu 5·2·2·2·1 và độ khó 3/6/3 — chỉ chừa đúng một nước đi là gỡ chả giò, vì nó là món *Lửa* + *Vừa* duy nhất trong 12 ô.

**Thái chốt giữ chả giò.** Nó là món nổi tiếng nhất trong nhóm, mới vào từ đợt 7, và gỡ nó thì *Chiên* biến mất khỏi trang chủ. Đổi lại, **Tây Nguyên còn vắng mặt trang chủ tới hết đợt 10** — ghi lại đây để đợt sau còn cân.

Kiểm lại sau đợt 9, 12 ô **y nguyên mọi trục**: họ Chan & húp 5 · Mặn đưa cơm 2 · Cuốn & trộn 2 · Lửa 2 · Cơm & bánh 1 · **vùng** 6/7 (thiếu Tây Nguyên) · **độ khó** 3 Dễ / 6 Vừa / 3 Kỳ công · không kiểu món nào quá 3.

## ⚠️ Bỏ bê chao làm thủng bài toán đợt 10

Bê chao Mộc Châu bị gỡ khỏi đợt 9 (lý do ở phần đợt 9 bên dưới) và thay bằng pa pỉnh tộp. Vùng miền không đổi — cùng là Tây Bắc — nhưng **kiểu món thì đổi: Chiên mất một quân, Nướng được một quân.**

Roadmap cũ dựa vào bê chao để gom "Bánh" ở đợt 10 mà không ô nào tụt dưới 3. Chiếu lại bằng số thật (chạy trên 58 món hôm nay, giả lập gom Bánh):

| Kiểu món sau khi gom "Bánh" | Nay | Đợt 10 thêm | Thành |
|---|---:|---|---:|
| Bánh *(bánh xèo · bánh cuốn · bánh khoái)* | 3 | — | 3 ✅ |
| Hấp | 1 | ốc hấp + gà hấp | 3 ✅ |
| Cuốn | 2 | nem nướng | 3 ✅ |
| Gỏi | 2 | gỏi ngó sen | 3 ✅ |
| **Chiên** *(còn mỗi chả giò)* | **1** | cá tai tượng | **2** ❌ |

**Ba đường xử lý, chưa chốt:**

1. **Đợt 10 lên 6 món**, thêm một món *Chiên* — gọn nhất, và đợt 10 vốn chỉ có 5 món.
2. **Hoãn gom "Bánh" sang đợt 11**, để bánh xèo với bánh khoái ở lại Chiên thêm một đợt.
3. Bỏ luật "mỗi kiểu ≥ 3 món" cho riêng Chiên — **không nên**, vì luật đó chính là thứ giữ cho hàng chip lọc khỏi phình.

> Nghiêng về **cách 1**. Tây Bắc không có món Chiên nào nổi tiếng ngoài bê chao, nên món bù nên lấy từ vùng khác — và nếu lấy Miền Tây thì cá tai tượng đã ở đó rồi, cần một món nữa.

## Dung lượng `/mon/` ở 58 món

| | thô | **gzip** | |
|---|---:|---:|---|
| 41 món | 426 KB | 95 KB | |
| 47 món | 491 KB | 111 KB | |
| 53 món | 564 KB | 127 KB | |
| **58 món** *(đợt 9)* | **617 KB** | **140 KB** | đo 2026-07-29 |
| chiếu 63 món | | **~153 KB** | ⟵ vượt mốc |
| chiếu 70 món | | ~172 KB | |

Độ dốc thật của đợt 9 là **2,59 KB/món**, khớp gần khít độ dốc dài hạn 41→58 là **2,66 KB/món** — nên con số chiếu giờ đáng tin.

⚠️ **Mốc ~150 KB rơi vào GIỮA đợt 10, không phải cuối.** Cụ thể là quanh **món thứ 62**. Nghĩa là việc **tách hình ra `.svg` riêng** (endpoint `src/pages/art/[kind].svg.ts` theo khuôn `og/[slug].png.ts`, chi tiết ở mục đính chính bên dưới) nên làm **ngay trước hoặc trong đợt 10**, chứ đừng để sau.

---

# 📊 Catalog sau đợt 8 — 53 món

| Kiểu món | | | Vùng miền | sau đợt 7 → nay | | Theo dịp | |
|---|---:|---|---|---:|---|---|---:|
| Món nước | **11** | | Miền Nam | 15 → 15 · 28% | | Đãi khách | 18 |
| Kho | 7 | | **Miền Trung** | 5 → **11** · 21% | | Bữa sáng | 17 |
| **Xào** | **6** | | Cả nước | 11 → 11 · 21% | | Cơm nhà | 16 |
| Canh | 5 | | Miền Bắc | 9 → 9 · 17% | | Ăn chơi | 15 |
| **Bún trộn · Cơm** | **4 mỗi loại** | | Miền Tây | 5 → 5 · 9% | | Nhậu lai rai | 9 |
| Lẩu · Cháo · **Chiên** | 3 mỗi loại | | Tây Bắc | 1 · 2% | | Cho bé | 8 |
| Gỏi · Hấp · **Cuốn** | 2 mỗi loại | | Tây Nguyên | 1 · 2% | | Cỗ Tết | 5 |
| Nướng | 1 | | | | | **trống nhãn** | **0** |

**Độ khó:** Vừa 26 (49%) · Dễ 20 (38%) · Kỳ công 7 (13%).
**Họ màu:** Chan & húp 22 · Mặn đưa cơm 15 · Cuốn & trộn 8 · Lửa 4 · Cơm & bánh 4.

**Miền Trung 5 → 11**, từ đồng hạng bét lên **đồng hạng nhì** — đây là đợt chữa dứt chỗ lệch lớn nhất của catalog. Miền Nam tụt từ 32% xuống 28% mà không bỏ món nào.

**Điều kiện đợt 10 đã đủ.** *Chiên* lên 3 (bánh xèo · chả giò · bánh khoái) chính là chỗ để đợt 10 gom kiểu món **"Bánh"** mà không ô nào tụt dưới 3: gom xong Chiên còn chả giò + bê chao (đợt 9) + cá tai tượng (đợt 10) = 3, Hấp còn trứng chưng + ốc hấp + gà hấp = 3. *Cuốn* cũng đã lên 2, đợt 10 (nem nướng) đưa nốt lên 3.

**Ô còn mỏng duy nhất:** *Nướng* vẫn 1 món — đợt 9 (bò một nắng, cá lóc nướng trui) gỡ.

## Featured: đổi 2 ô ở đợt 8

Trước đợt này trang chủ có **1/12 món Miền Trung** (mì Quảng) trong khi Miền Trung sắp chiếm 21% catalog. Đổi hai ô:

| Vào | Ra |
|---|---|
| **Bánh tráng cuốn thịt heo** (Cuốn · Trung · Dễ) | Gỏi xoài xanh tôm khô (Gỏi · Nam · Dễ) |
| **Bún chả cá** (Món nước · Trung · Vừa) | Bún chả Hà Nội (Món nước · Bắc · Vừa) |

Chọn đúng cặp này vì nó **giữ nguyên mọi trục khác của 12 ô**: họ màu vẫn 5·2·2·2·1, độ khó vẫn 3 Dễ / 6 Vừa / 3 Kỳ công, không kiểu món nào quá 3. Chỉ trục vùng miền đổi: **Miền Trung 1 → 3**, Miền Nam 4 → 3, Miền Bắc 3 → 2.

> Bún chả Hà Nội là món họ *Chan & húp* **duy nhất gỡ ra được**: phở bò là đầu tàu, mì Quảng là món Miền Trung cuối cùng còn lại, canh chua và lẩu mắm giữ Miền Tây khỏi về 0. Đổi lại, ô **Cuốn** lần đầu có mặt trên trang chủ còn **Gỏi** rời đi — đó là món nổi tiếng hơn thế chỗ món ít tiếng hơn, không phải hy sinh.

**Đo lại trên trang thật:** 12 thẻ, 3 cột, 4 hàng đầy, dư 0, không tràn ngang.

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

> ⚠️ **Đo lại ở 53 món (đợt 8): 564 KB thô · 127 KB gzip** — tức là **+2,7 KB gzip mỗi món**, dốc hơn con số dùng để chiếu trước đây. Chiếu lại theo độ dốc thật: **~154 KB ở mốc 63 món**. Nghĩa là mốc kích hoạt ~150 KB rơi **ngay cuối đợt 10**, không phải cỡ 70 món như ước ban đầu. Chưa phải làm bây giờ, nhưng **nên xếp việc tách `.svg` vào ngay sau đợt 10** thay vì để ngỏ.

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

> ✅ **Đã làm ở đợt 8** — `tools/check-recipes.mjs` + `tools/check-art-ids.mjs`, chạy bằng `npm run qa`, bảng chi tiết ở README. Hai script đọc enum và **từ vựng khoá thẳng từ `content.config.ts`** nên sửa schema là chúng tự theo. Con số 137 id ở trên chính là thứ script tái lập lại đúng khi chạy trên nền 47 món — tức là nó đo đúng cái đã đếm tay. Kèm theo đó, `js-yaml` được đưa lên **devDependency trực tiếp**: trước đây nó chỉ là dep gián tiếp của astro, astro bỏ là script gãy.

### ✅ Đợt 8 — XONG 2026-07-29 · 6 món · Miền Trung · không mở kiểu món mới

| Món | Vùng | Kiểu món | Độ khó | Theo dịp |
|---|---|---|---|---|
| Bánh tráng cuốn thịt heo Đà Nẵng | Miền Trung | Cuốn | Dễ | Ăn chơi · Đãi khách |
| Cơm hến Huế | Miền Trung | Cơm | Vừa | Bữa sáng · Ăn chơi |
| Bánh khoái Huế | Miền Trung | Chiên *(về "Bánh" ở đợt 10)* | Vừa | Ăn chơi · Đãi khách |
| Mắm ruốc xào thịt ba chỉ | Miền Trung | Xào | Dễ | Cơm nhà |
| Bún chả cá | Miền Trung | Món nước | Vừa | Bữa sáng |
| Bún mắm nêm | Miền Trung | Bún trộn | Vừa | Ăn chơi |

**Bún chả cá viết theo lối "một nồi gốc, ba lối nêm".** Tên món cố ý không gắn địa danh, nên công thức cũng không được ngầm chọn phe: nấu chung một nồi nước gốc (xương + đầu cá, hành tím nướng, thơm, cà chua), rồi ở bước cuối chỉ ra chỗ rẽ — **Đà Nẵng** thả thêm bí đỏ + bắp cải cho nước ngọt dày hơi chua, **Nha Trang – Quy Nhơn** dừng lại và lọc cho trong veo, **Quảng Ngãi** nghiêng về chả chiên. Bài kể đúng sự khác nhau đó thay vì phán nơi nào đúng.

**Đợt không mở kiểu món chỉ đụng 3/7 chỗ trong bảng ở README** — kiểm từng chỗ trước khi viết, đừng suy từ đợt trước:

| Chỗ | Đợt 8 |
|---|---|
| `content.config.ts` enum `category` · `utils/family.ts` · `CAT_ORDER` · `RecipeArt.astro` `byCategory` · `contact-sheet.mjs` `FAMILIES` | **không đụng** — cả 6 món rơi vào ô có sẵn |
| `content.config.ts` enum `art` · `RecipeArt.astro` import + dòng render · `_template.yaml` | +6 mỗi chỗ |
| `contact-sheet.mjs` `SLUG_RECAT` | thêm `banh-khoai-hue: 'Bánh'` — soi trước hình trên nền vàng của đợt 10, khỏi vẽ lại lúc gom |

**Đổi số `order` 34 file.** Khác đợt 7 (nối đuôi 42–47, 0 file phải sửa): sáu món đợt này rơi vào **sáu ô nằm rải khắp dãy**, nối đuôi thì phá vỡ mọi khối. Đã chèn vào đúng khối rồi dồn số 1–53, tiện thể gỡ chỗ đan xen cũ (Chiên 19 → Cuốn 20 → Chiên 21). Script `check-recipes.mjs` xác nhận không `order` nào trùng.

**Hình: 6 art riêng, và bài học đợt 7 lặp lại y nguyên — contact sheet không đủ, phải render resvg ra PNG rồi nhìn.** Không lỗi nào dưới đây thấy được trên contact sheet:

| Hình | Bản đầu hỏng thế nào | Chữa |
|---|---|---|
| bún chả cá | khoanh chả chiên tô đặc → nhìn y **viên thịt**; hai đốm sáng trong ruột lát chả → mỗi lát thành **một khuôn mặt có hai con mắt** | vẽ chả chiên thành **lát cắt**: vành ngoài nâu là vỏ chiên, ruột trong nhạt kem; bỏ hai đốm sáng |
| bánh tráng cuốn | lát thịt nằm ngang nối đuôi nhau, mà hai đầu lát đều là **băng da màu kem** nên da lát này chạm da lát kia rồi nhập thành một dải → cả dĩa đọc ra **hai miếng thịt xông khói dài** | dựng lát **gần đứng, lợp ngang như bộ bài xòe** — mỗi lát tự tách, hai vành da lộ ra trên dưới |
| cơm hến | gò cơm trắng và lòng tô trắng cùng sắc → nhập thành **một khối oval to tướng**; bát nước hến đặt ngang tầm sát cạnh → dính vào tô **như cái vòi ấm** | hạ gò cơm xuống ngà ấm + viền một nét; hạ bát nước xuống thấp và cho **chồng lên** mép tô |
| bún mắm nêm | ba lần vẽ mắm nêm sai ba kiểu: mảng đặc vắt ngang → **con lươn**; vệt mảnh → cùng bề ngang sợi bún nên thành **bún màu xám**; phủ mờ cả mặt tô → **vũng bùn**. Sợi mít non tô kem nhạt thì **mất hút**, đổi sang khối bầu thì thành **con sò** | mắm nêm thành **một vũng gọn** giữa tô (lúc vừa dội, chưa trộn); mít non thành **sợi thon hai đầu tướp** màu nâu vàng |

Rút ra một luật dùng lâu dài: **thứ gì trong tô cũng phải khác thứ bên cạnh ở CẢ sắc lẫn DÁNG.** Ba lần hỏng của bún mắm nêm đều là do chỉ đổi màu mà giữ nguyên dáng — sốt cùng dáng với sợi bún, sợi mít cùng dáng với sợi bún.

**Chống đụng hình đã soi cạnh nhau bằng PNG ghép, không phải đoán:** bánh tráng cuốn vs gỏi cuốn vs `rolls`; bún mắm nêm vs bún đậu vs bún thịt nướng; bún chả cá vs mì Quảng vs bún bò; cơm hến vs cơm tấm vs cơm gà; bánh khoái vs bánh xèo. Cả năm nhóm đều tách bạch ở mức nhìn thumbnail.

**Lại dính đúng bẫy "chú giải phải đi cùng lần xuất hiện ĐẦU TIÊN" của đợt 7** — lần này là chữ **"ruốc"** đứng trần trụi trong `summary` cơm hến (chữ hiện trên thẻ món). Miền Bắc "ruốc" nghĩa là **chà bông**, tức là hiểu ngược hẳn. Đã sửa 5 chỗ thành "mắm ruốc"; chỗ giải thích kỹ (`ingredientGroups`) vốn đã đúng từ đầu, nhưng nó nằm quá sâu. Ticker trang chủ cũng bỏ chữ "nước lèo" khỏi dòng bánh khoái vì băng chữ chạy không có chỗ nói rõ đó là **sốt chấm sánh** chứ không phải nước dùng.

### ✅ Đợt 9 — XONG 2026-07-29 · 5 món · gỡ ô "Nướng" · không mở kiểu món mới

| Món | Vùng | Kiểu món | Độ khó | Theo dịp |
|---|---|---|---|---|
| Bún đỏ Buôn Ma Thuột | Tây Nguyên | Món nước | Vừa | Ăn chơi |
| Pa pỉnh tộp | Tây Bắc | Nướng | Vừa | Đãi khách · Nhậu lai rai |
| Bò một nắng | Tây Nguyên | Nướng | Vừa | Nhậu lai rai · Đãi khách |
| Cá lóc nướng trui | Miền Tây | Nướng | Vừa | Nhậu lai rai · Đãi khách |
| Ốc len xào dừa | Miền Tây | Xào | Dễ | Nhậu lai rai · Ăn chơi |

**Bê chao Mộc Châu bị gỡ, pa pỉnh tộp vào thay.** Lý do: nguyên liệu gốc là **bê sữa Mộc Châu**, ra khỏi vùng gần như không mua được — mà bịa ra một bản "thịt bê thường" thì món còn lại không phải là món ấy nữa. Rút ra một luật dùng lâu dài: **món nào nguyên liệu chính không mua được ở chợ thường thì không đưa lên**, dù nó nổi tiếng tới đâu. Cùng luật đó đã loại **thịt trâu gác bếp** (thịt trâu khó mua, lại đụng luật khói và đụng ngay bò một nắng trong cùng đợt) và **nộm da trâu**.

**Cái giá của việc gỡ bê chao là bài toán đợt 10 bị thủng ở ô *Chiên*** — xem mục cảnh báo ở phần catalog phía trên.

**Đợt không mở kiểu món chỉ đụng 3/7 chỗ** — đã kiểm từng chỗ chứ không suy từ đợt 8:

| Chỗ | Đợt 9 |
|---|---|
| `content.config.ts` enum `category` · `utils/family.ts` · `CAT_ORDER` · `RecipeArt.astro` `byCategory` · `contact-sheet.mjs` `FAMILIES` | **không đụng** — cả 5 món rơi vào ô có sẵn |
| `content.config.ts` enum `art` · `RecipeArt.astro` import + dòng render · `_template.yaml` | +5 mỗi chỗ |
| `contact-sheet.mjs` `SLUG_RECAT` | không đụng — đợt này không món nào chuyển kiểu |

**Đổi số `order` 39 file**, dồn lại 1–58. Năm món rơi vào bốn khối rải khắp dãy (Món nước · Nướng ×3 · Xào) nên nối đuôi thì vỡ khối. Làm bằng script có **chốt an toàn**: đối chiếu danh sách slug viết tay với danh sách file thật, lệch một cái là dừng, không sửa file nào.

**Hai bẫy YAML lại dính, và `npm run qa` bắt được trước khi build** — đúng con `*` mở đầu chuỗi đã gặp ở đợt 6 và 7: `- **Chặt bỏ chóp đuôi**…` (ốc len) và `- **Gập đôi con cá**…` (pa pỉnh tộp). Cả hai ở `quick.steps`. Script báo đúng số dòng, chữa bằng `>-` là xong.

#### Hình: đợt khó nhất từ trước tới nay — **4 món Nướng cùng nền đỏ, trong đó HAI CON CÁ NƯỚNG**

Đây là lần đầu một họ màu nhận 3 hình mới cùng lúc. Chữ ký tách bạch, soi bằng PNG ghép chứ không đoán:

| Hình | Nền đỡ | Dáng | Sắc |
|---|---|---|---|
| gà nướng mắc khén *(đã có)* | mẹt tre **tròn** | con gà ép dẹt, khối tròn nằm ngang | vàng ruộm |
| **bò một nắng** | thớt gỗ **chữ nhật** | dải thịt xé, mép răng cưa, lộn xộn | nâu đỏ sẫm |
| **cá lóc nướng trui** | tàu lá chuối **xanh** | con cá **dài thẳng**, xiên que, đặt chéo | vảy cháy **đen** |
| **pa pỉnh tộp** | dĩa sứ **trắng** + kẹp tre | con cá **gập đôi**, khối tròn nằm ngang | nâu vàng + **băng rau thơm xanh** |

Bốn thứ khác nhau cùng lúc: nền đỡ, dáng, sắc, và tỷ lệ khung. Hai con cá tách nhau bằng **dài-thẳng-chéo-đen** đối lại **ngắn-gập-ngang-vàng** — đó là cặp đối nghịch mạnh nhất tìm được.

**Ba lỗi chỉ lộ ra khi render PNG, contact sheet không thấy cái nào:**

| Hình | Bản đầu hỏng thế nào | Chữa |
|---|---|---|
| cá lóc nướng trui | tàu lá chuối xoay **cùng góc** với con cá nên viền lá ôm khít lấy cá → cả hình đọc ra **một quả đậu xanh có sọc trắng**, không ai thấy con cá đâu | lá nằm **ngang** và rộng hơn cá hẳn; cá to lên, vẽ rõ đuôi xẻ và đầu nhọn để bóng cá đọc ra trước |
| bò một nắng | dải thịt vẽ bằng đường cong trơn → đọc ra **mấy cây xúc xích** | mép **răng cưa** không đều + **hai đầu tướp xơ** + thớ dọc sáng chạy suốt |
| pa pỉnh tộp | thân tròn đều, đuôi bé → đọc ra **ổ bánh mì** | đuôi xòe to xẻ đôi, đầu chìa hẳn ra có mắt và miệng, rau thơm to lên |
| ốc len xào dừa | sốt dừa lấy `#F7EFDA→#E2D2AE`, **trùng sắc với lòng dĩa** → món tên là "xào dừa" mà không thấy nước dừa đâu; khúc sả mập bo tròn thì đọc ra **quả đậu** | sốt hạ xuống `#F0DFB4→#D2B47C` có viền rõ; sả vẽ **mảnh và dài**, đầu tướp xơ |
| bún đỏ | cọng rau cần dài vắt ngang mép tô → đọc ra **hai cái que xanh** chìa ra ngoài; tóp mỡ vẽ khối vuông bo góc → **đụng chữ ký đậu phụ chiên của bún riêu** | rau cần thành nhúm ngắn có lá nằm hẳn trong tô; tóp mỡ vẽ mẩu **méo mó**, cố ý không vuông |

**Hai con cá phải vẽ lại tới bản thứ 3–4 sau khi Thái duyệt** — cả hai lần hỏng đều KHÔNG phải vẽ xấu mà là **vẽ sai cơ chế của món**, và đó mới là bài học đáng giữ:

| Hình | Sai cơ chế ở đâu | Chữa bằng cách hiểu lại món |
|---|---|---|
| cá lóc nướng trui | vẽ "một khối đen thuôn" thay vì vẽ **con cá lóc**: đuôi xẻ nhọn (cá lóc đuôi **tròn**), đầu nhỏ và nhọn (cá lóc đầu **to, bẹt, tù** — tiếng Anh gọi *snakehead* là vì vậy), không có vây lưng/vây hậu môn, thân tô đen đặc kín | vẽ đúng giải phẫu: đầu tù, **vây lưng chạy gần suốt sống lưng** + vây hậu môn dài (hai vây đó mới làm mắt đọc ra "con cá"), đuôi tròn như quạt; da đổi từ đen đặc sang **nâu ám khói + mảng cháy loang lổ** để ra "cá nướng" chứ không phải bóng đen |
| pa pỉnh tộp | kẹp tre vẽ **dựng đứng chắn trước mặt cá** → ra cái hàng rào; sửa thành hai thanh ngang chụm một đầu → ra **mũi tên clip-art**; thân vẽ oval đều, đầu không tách khỏi mình → ra **củ khoai gắn đuôi** | đọc lại cách kẹp: **ống tre chẻ dọc, hai nửa ôm lấy cá rồi chụm ở CẢ HAI đầu, buộc lạt hai chóp** — tức là một hình hạt hạnh nhân bao quanh con cá. Thân cá cho **gáy cao ở giữa nhưng thuôn dần về cuống đuôi**, thêm **đường nắp mang** tách đầu khỏi mình |

> Luật rút ra: **vẽ hỏng thường là do chưa hiểu món, không phải do tay kém.** Cả hai lần chữa được đều bắt đầu bằng việc quay lại đọc *con cá lóc trông ra sao* và *cái kẹp tre hoạt động thế nào*, chứ không phải bằng việc chỉnh màu hay chỉnh nét.

Còn một bài học nữa là đợt 8 lặp lại từ hướng khác: **không chỉ món chính phải khác nhau, đạo cụ cũng phải khác.** Vì thế bò một nắng cố ý **bỏ lát chanh** (gà nướng đã có chanh + ớt) và thay bằng nhúm rau răm; ba món Nướng dùng ba loại chén chấm khác nhau (chẩm chéo gạch · muối kiến vàng hạt thô · nước mắm me nâu sẫm).

**Chống đụng đã soi cạnh nhau bằng PNG ghép:** cả 7 hình họ *Lửa* một tấm · bún đỏ vs **bún riêu** vs bún bò Huế vs lẩu Thái · ốc len vs tôm rim nước cốt dừa vs mực xào vs bò lúc lắc. Bún riêu là món phải soi mà suýt bỏ sót — nó cũng tô nước đỏ, cũng có tảng riêu.

#### Nội dung: bốn chỗ phải cẩn thận

**Muối kiến vàng — tra kỹ rồi mới viết.** Muối giã từ **kiến vàng rừng** (loài làm tổ trên cây) với ớt và muối hột, vùng Krông Pa (Gia Lai) – Sơn Hòa (Phú Yên); vị **chua nhẹ trước rồi mới cay**; dùng để **chấm**, không phải để ướp. Chú giải đặt ngay ở `summary` (chữ hiện trên thẻ món), không đợi tới phần nguyên liệu — đúng luật rút ra ở đợt 7. **Giữ khỏi ticker** vì băng chữ chạy không có chỗ giải thích. Đường lui viết thật: muối ớt chanh chỉ là *thứ gần nhất*, nói thẳng là **không thay được**.

> Mọi nguồn nói về muối kiến vàng đều kê protein với axit amin. **Bỏ sạch** — luật không quảng cáo dinh dưỡng.

**Cá lóc nướng trui — rơm là cái gốc, không phải điểm bán.** Bài kể chuyện đốt rơm ngoài đồng, nhưng lý do nêu ra là **cách nó cháy** (bùng nhanh, bao kín con cá, tàn cũng nhanh) chứ không phải mùi khói. Từ đó suy ra cái bếp nhà cần: **lửa to, đều, ngắn**. Ba đường viết đủ chi tiết ngang nhau — **than hoa 20–25 phút** (đường chính), **lò nướng 250 °C 30–35 phút** + bật lửa trên 5 phút cuối, và rơm (nếu đang ở quê). Nói luôn cái mất khi đổi đường.

**Hạt điều màu ≠ hạt điều.** Bún đỏ đỏ nhờ gạch cua + dầu điều, mà "dầu điều" nấu từ **hạt điều màu** — hạt nhỏ màu cam chuyên lên màu, không phải hạt điều rang muối. Hai thứ gọi tắt giống nhau nên chú giải ngay ở `summary` và nhắc lại ở phần nguyên liệu.

**Hạ bớt khẳng định "sợi to" sau khi Thái nghi.** Thái hỏi lại: có chắc bún đỏ lúc nào sợi cũng to không? Tra lại thì nguồn thống nhất là **to hơn bún thường chừng gấp rưỡi, cỡ bằng chiếc đũa**, xấp xỉ sợi bún bò Huế loại lớn — nhưng câu "**gần bằng bánh canh**" (bản đầu đưa lên cả tiêu đề lẫn summary) là cách nói mạnh nhất trong các nguồn, và mỗi hàng lại nhỉnh hơn kém nhau. Đã hạ xuống đúng mức tra được, **bỏ khẳng định đó khỏi tiêu đề**, đưa tiêu đề về điều chắc chắn: *nấu thẳng trong nồi, sợi ăn màu*.

> Luật: **cái gì đưa lên `title` thì phải là chỗ chắc nhất của món.** Tiêu đề không có chỗ để rào đón, mà lại là câu đi xa nhất (thẻ món, hero, kết quả tìm kiếm, ảnh OG).

**Chú giải cũng phải biết dừng.** Bản đầu nhét cả câu *"dầu nấu từ hạt điều màu để lên màu, không phải hạt điều rang muối"* vào `summary` — đúng luật "gloss ở lần xuất hiện đầu tiên" nhưng làm câu tóm tắt nặng trịch. Cách chữa đúng không phải là giải thích ngắn hơn mà là **đừng dùng từ khó ở summary**: summary chỉ nói "**gạch cua và dầu điều**" (từ quen thuộc, không gây hiểu nhầm), còn chữ *hạt điều màu* để dành cho phần nguyên liệu và phần chuyện món ăn — nơi có chỗ giải thích tử tế.

**Bún đỏ không có nhãn "Theo dịp" nào vừa.** Nó là quà chiều tối — không phải bữa sáng, cũng không hẳn ăn vặt vì một tô là xong bữa. Chốt **`[Ăn chơi]`** theo tiền lệ sẵn có: bún mắm nêm và bún thịt nướng đều mang đúng một nhãn *Ăn chơi* dù là bữa thật, phở khô Gia Lai mang `[Ăn chơi, Bữa sáng]`. Tức là trên site này *Ăn chơi* đang có nghĩa **"món ăn hàng, ngoài bữa cơm nhà"** chứ không phải "quà vặt".

> **Việc để dành:** trục "Theo dịp" thiếu thật một nhãn kiểu **"Quà chiều"**. Ứng viên không ít — bún đỏ, ốc len, bún đậu, bánh xèo, cháo lòng. Nhưng mở một giá trị mới thì phải **rà gắn lại nhãn cho cả 58 món** chứ không chỉ món mới, nên tách ra làm một việc riêng, đừng nhét vào một đợt món.

**Không nêu tên con đường bún đỏ** ở Buôn Ma Thuột — chỉ viết "một khúc phố", đúng luật không đưa tên đường vào nội dung món ăn. Câu tục ngữ tiếng Thái về pa pỉnh tộp cũng chỉ **diễn đạt bằng lời thường** ("đem gà tới biếu cũng không quý bằng đem cho nhau con pa pỉnh tộp") chứ không chép nguyên văn tiếng Thái, vì chỉ tra được một nguồn duy nhất cho cách phiên âm.

### Đợt 10 — 5 món · mở "Bánh"

| Món | Vùng | Kiểu món | Độ khó |
|---|---|---|---|
| Nem nướng Nha Trang | Miền Trung | Cuốn | Vừa |
| Cá tai tượng chiên xù | Miền Tây | Chiên | Vừa |
| Ốc hấp lá gừng | Miền Bắc | Hấp | Vừa |
| Gà hấp hành | Cả nước | Hấp | Dễ |
| Gỏi ngó sen tôm thịt | Miền Nam | Gỏi | Dễ |

**Mở kiểu món "Bánh"** — gom **bánh xèo miền Tây** (đang ở Chiên), **bánh cuốn nóng** (đang ở Hấp), **bánh khoái Huế** (đang ở Chiên) về một chỗ.

> ⚠️ **Bài toán này đã thủng từ đợt 9.** Kế hoạch cũ dựa vào bê chao để giữ Chiên ≥ 3, mà bê chao đã bị gỡ. Gom "Bánh" xong thì **Chiên chỉ còn chả giò + cá tai tượng = 2**. Hấp · Cuốn · Gỏi thì đợt 10 vá đủ. Ba đường xử lý và đề xuất nằm ở mục *"Bỏ bê chao làm thủng bài toán đợt 10"* phía trên — **phải chốt trước khi bắt tay vào đợt 10**.

> ⚠️ **Và mốc tách `.svg` rơi vào giữa đợt 10** (quanh món thứ 62, xem bảng dung lượng ở trên). Nên xếp việc tách hình **trước** khi viết 5 món, đừng để vừa thêm món vừa đổi cách render.

*Nem nướng Nha Trang làm theo **bản gốc cuốn bánh tráng**, không phải bản tô bún kiểu Sài Gòn.*

---

## Bức tranh sau cùng — 63 món

**Kiểu món (14 nhóm, tất cả ≥ 3 món):**

| | | | |
|---|---:|---|---:|
| Món nước | 12 | Lẩu | 3 |
| Kho | 7 | Cháo | 3 |
| Xào | 7 | Bánh | 3 |
| Canh | 5 | Cuốn | 3 |
| Bún trộn | 4 | Gỏi | 3 |
| Cơm | 4 | Hấp | 3 |
| **Nướng** | **4** | ⚠️ **Chiên** | ⚠️ **2** |

*Bảng này đã tính theo đợt 9 thật (Nướng 4 chứ không phải 3). Ô **Chiên = 2** là chỗ thủng do gỡ bê chao — chưa chốt cách vá, xem cảnh báo ở mục đợt 10.*

**Vùng miền:**

| Vùng | Trước đợt 6 | Hiện tại (58 món) | Sau đợt 10 |
|---|---:|---:|---:|
| Miền Nam | 14 (40%) | 15 (26%) | 16 (25%) |
| Miền Trung | 3 (9%) | **11 (19%)** | **12 (19%)** |
| Cả nước | 6 | 11 | 12 |
| Miền Bắc | 6 | 9 | 10 |
| Miền Tây | 4 | **7** | 8 |
| Tây Nguyên | 1 | **3** | 3 |
| Tây Bắc | 1 | **2** | 2 |

> Đợt 6 toàn món Bắc và món "cả nước" nên Miền Trung đứng nguyên ở 3 món suốt đợt đó. **Đợt 7 kéo lên 5** nhờ lẩu gà lá é và cháo lươn Nghệ An; **đợt 8 kéo một mạch lên 11**. Chỗ lệch lớn nhất của catalog coi như đã chữa xong — đợt 10 chỉ thêm nem nướng là tròn 12. **Đợt 9 lo nốt ba vùng nhỏ**: Miền Tây 5 → 7, Tây Nguyên 1 → 3, Tây Bắc 1 → 2 — cả ba đã đạt mức của bức tranh 63 món hoặc gần đạt, nên đợt 10 không phải gánh vùng nào nữa.

Miền Trung từ vùng gần bét lên đồng hạng đầu; Miền Nam từ 40% xuống 25% mà không phải bỏ món nào.

---

## Kho ý tưởng để dành (chưa xếp lịch)

- **Tây Bắc** — sau gà nướng mắc khén và pa pỉnh tộp thì vùng này còn rất ít món nấu-được-ở-nhà. Đã lọc bằng luật *"nguyên liệu chính phải mua được ở chợ thường"*:
  - **Loại hẳn:** bê chao Mộc Châu (bê sữa ngoài vùng không mua được), thịt trâu gác bếp (thịt trâu khó mua, lại đụng luật khói), nộm da trâu (da trâu không mua nổi, sơ chế quá kỳ công).
  - **Còn để dành:** **xôi ngũ sắc** (nhuộm bằng lá cẩm · nghệ · gấc · lá dứa, mua được hết; xếp vào kiểu món *Cơm* thì hơi gượng nên chưa làm), **canh cải mèo** (dễ nấu nhưng nhạt, và hình lại là thêm một tô canh nữa).
- **Đông Bắc** (Lạng Sơn, Cao Bằng, Hà Giang) — **không mở vùng riêng**; nếu sau này làm thì gắn vào "Miền Bắc". Món đã tra sẵn: khâu nhục, vịt quay lá mắc mật, phở chua Lạng Sơn.
- **Miền Trung còn dư ý tưởng:** cơm âm phủ Huế, chả ram tôm đất Bình Định, cá nục hấp cuốn bánh tráng, bánh canh cá lóc Quảng Trị.
- **Bún trộn** đã đủ quân; nếu mở rộng thì có bún ốc nguội, bún nem cua bể.

## Hạ tầng còn để dành (sau phần I & II)

- **RSS feed** — `@astrojs/rss`, endpoint `/rss.xml`. Phụ thuộc `pubDate` ở giai đoạn 5.
- **Thống kê truy cập nhẹ** — [GoatCounter](https://www.goatcounter.com), miễn phí, không cookie, hợp tinh thần "không quảng cáo" của trang. Chỉ cần 1 dòng script trong `src/layouts/Base.astro`.

## Lặt vặt

- ~~GitHub Actions cảnh báo Node 20 deprecated~~ — **xong 2026-07-29.** Ghi lại vì lần đầu đọc dễ hiểu sai: cảnh báo đó **không** nói về Node dùng để build (workflow vốn đã `node-version: 24` từ trước), mà nói về Node chạy code của bản thân mấy action. Và **2 trong 3 action bị nêu không nằm trong `deploy.yml`** — `setup-node` với `upload-artifact` được gọi bên trong `withastro/action`, nên sửa file mình không với tới; phải nâng chính `withastro/action`. Đã nâng `checkout` v4→v7, `withastro/action` v3→v6, `deploy-pages` v4→v5. `checkout@v7` có breaking change thật (chặn checkout code fork PR) nhưng repo này chỉ chạy trên `push` + `workflow_dispatch`, không dùng `pull_request_target`/`workflow_run` nên không dính.
- **Node build giữ ở 24, đừng nâng lên 26** dù máy đang chạy 26: Node bản chẵn tới tháng 10 của năm đó mới lên LTS, nên tới giờ 26 vẫn là Current. CI nên đứng ở LTS.

---

## Quy trình thêm một đợt món mới

1. Mỗi món 1 YAML — copy `src/content/recipes/_template.yaml` (tên file = slug URL); dòng có `": "` phải quote, timer label dạng `MM:SS`, định lượng viết `[[số|đơn vị]]` để tự scale theo khẩu phần
2. **Mỗi món phải có ít nhất 1 nhãn `occasions`** — không để trống
3. Vẽ art riêng ngay từ đầu: `src/components/art/Art<Ten>.astro` + thêm enum `art` trong `content.config.ts` + map trong `RecipeArt.astro`. **Vẽ và soi trên đúng nền họ màu của món** bằng contact sheet dựng ở giai đoạn 1 (hình phải giống món thật, không trùng nhau, xương đúng loài)
4. Cân lại `order` + `featured` toàn danh sách — trang chủ lấy **12 món featured đầu tiên theo order**
5. Cập nhật danh sách tease trong `ComingSoon.astro` (bỏ món đã ship, thêm từ kho ý tưởng) + ticker ở `index.astro` nếu món đáng lên
6. **`npm run qa`** trước đã — bắt bẫy YAML, `order` trùng, `id` nguyên liệu trùng, `id` art trùng chéo file (những thứ Zod không bắt được). Rồi `npm run build` để schema tự kiểm, rồi `npm run preview` mở xem từng trang mới
6b. **Soi hình bằng PNG ghép, không chỉ contact sheet** — `npm run art-png -- --sheet <món…>` (hoặc `--cat <kiểu món>` / `--fam <họ>`) xếp hình mới **cạnh hình dễ đụng** của nó, mỗi ô 260px đúng cỡ thumbnail trên `/mon/`. Hai luật:
    - thứ gì trong tô cũng phải khác thứ bên cạnh ở **cả sắc lẫn dáng** — đổi mỗi màu mà giữ nguyên dáng thì vẫn lẫn (đợt 8)
    - **đạo cụ cũng phải khác**, không riêng món chính: hai món cùng họ màu mà cùng có lát chanh + chén chấm giống nhau thì vẫn đọc ra na ná (đợt 9)
7. Duyệt kỹ nội dung + hình xong mới commit / push — deploy tự động ~40 giây
8. **Xong đợt: thống kê lại toàn bộ catalog** — đếm số món theo vùng miền, kiểu món, theo dịp (kể cả số món không nhãn), độ khó, featured — để còn cân lại cho đợt sau
