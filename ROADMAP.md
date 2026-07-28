# Lộ trình Món Việt Ngon

Kho công thức món Việt tại [www.monvietngon.com](https://www.monvietngon.com) — mục tiêu dài hạn: **~100 món** phủ đủ ba miền, món nào cũng được chăm chút như món nào.

_Cập nhật: 2026-07-28 — site đang có **35 món** / 7 vùng. Chặng tới gồm hai phần đi liền nhau: **thiết kế lại giao diện** (giai đoạn 1–5), rồi **28 món mới** (đợt 6–10) đưa site lên **63 món / 14 kiểu món**._

## Đã hoàn thành

- [x] 35 món, mỗi món một file YAML (`src/content/recipes/`) với bản nấu nhanh, giỏ đi chợ tự tính khẩu phần, đồng hồ đếm giờ trong từng bước, bí quyết và FAQ
- [x] Hình minh họa SVG vẽ riêng cho từng món (`src/components/art/`)
- [x] Đợt lớn 2026-07-28 (14 món): phở gà, hủ tiếu Nam Vang, bún thịt nướng, phở khô Gia Lai, cơm chiên cá mặn, gỏi xoài xanh tôm khô, gỏi gà bắp cải, gà nướng mắc khén, mực xào thơm cần tây, sườn ram mặn ngọt, cà ri gà, tôm rim nước cốt dừa, bánh cuốn nóng, trứng chưng thịt nấm mèo
- [x] Mở vùng mới **Tây Bắc** + **Tây Nguyên** và kiểu món mới **"Nướng"**
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

**Bước tiếp theo:** vào đợt 6.

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

### Đợt 6 — 6 món · mở "Món nước" + "Bún trộn"

| Món | Vùng | Kiểu món | Độ khó |
|---|---|---|---|
| Miến gà | Miền Bắc | Món nước | Vừa |
| Mì vịt tiềm | Miền Nam | Món nước | Kỳ công |
| Miến xào cua | Cả nước | Xào | Vừa |
| Mì xào bò | Cả nước | Xào | Dễ |
| Bún đậu mắm tôm | Miền Bắc | Bún trộn | Vừa |
| Bún bò Nam Bộ | Miền Bắc | Bún trộn | Dễ |

**Đổi tên kiểu món "Món sợi" → "Món nước"** (tên cũ khó hiểu), kèm ba việc chuyển chỗ:
- **Bún thịt nướng** chuyển sang **Bún trộn** (cùng bún đậu + bún bò Nam Bộ là đủ 3 món để mở)
- **Miến xào cua, mì xào bò** vào thẳng **Xào**, không đẻ kiểu món riêng
- **Phở khô Gia Lai ở lại "Món nước"** — nó dọn kèm một tô nước lèo riêng

> **Định nghĩa để không lẫn:** *Món nước = một tô là xong bữa · Canh = món trong mâm cơm.*

*Bún bò Nam Bộ là món Hà Nội — "Nam Bộ" là tên một con phố (nay là Lê Duẩn) chứ không phải vùng miền. Nguồn gốc còn tranh cãi nên viết dạng giai thoại.*

### Đợt 7 — 6 món · mở "Lẩu" + "Cháo"

| Món | Vùng | Kiểu món | Độ khó |
|---|---|---|---|
| Lẩu mắm | Miền Tây | Lẩu | Kỳ công |
| Lẩu gà lá é | Miền Trung | Lẩu | Vừa |
| Lẩu Thái | Cả nước | Lẩu | Vừa |
| Cháo lươn Nghệ An | Miền Trung | Cháo | Vừa |
| Cháo gà | Cả nước | Cháo | Dễ |
| Cháo lòng | Cả nước | Cháo | Vừa |

*Lẩu gà lá é gốc Phú Yên (Miền Trung), nổi tiếng nhờ Đà Lạt — kể chuyện đó trong bài. Lẩu Thái viết ở dạng "lẩu Thái kiểu Việt", không nhận là món Việt gốc.*

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

| Vùng | Hiện tại | Sau đợt 10 |
|---|---:|---:|
| Miền Nam | 14 (40%) | 16 (25%) |
| Miền Trung | 3 (9%) | **12 (19%)** |
| Cả nước | 6 | 12 |
| Miền Bắc | 6 | 10 |
| Miền Tây | 4 | 8 |
| Tây Nguyên | 1 | 3 |
| Tây Bắc | 1 | 2 |

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
