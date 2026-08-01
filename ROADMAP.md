# Lộ trình Món Việt Ngon

Kho công thức món Việt tại [www.monvietngon.com](https://www.monvietngon.com) — mục tiêu dài hạn: **200 món** phủ đủ ba miền, món nào cũng được chăm chút như món nào.

_Cập nhật 2026-08-01 (sau đợt 16). Site đang **126 món / 7 vùng / 17 kiểu món**, không kiểu món nào dưới 3._

> 🎉 **ĐÃ QUA MỐC 100 MÓN** ở đợt 14 (95 → 104), live 2026-08-01 (`8a35b30`, deploy xanh, đã curl kiểm production). Mục tiêu tiếp theo là **200 món — Thái chốt 2026-07-31**; đợt 15 đưa lên **115**, đợt 16 lên **126** — tức đã đi hơn **một phần tư** quãng còn lại. **Chỗ chặn đường đó không phải dung lượng hay công viết — mà là đụng hình**; phân tích bằng số ở phần 2, mục *"Đường tới 200 món"*. Đọc mục đó trước khi mở đợt mới.


**Cách đọc file này:** bốn phần đầu là **thứ còn dùng** — trạng thái, việc còn lại, quy trình, luật đã chốt. Phần **Nhật ký** ở cuối là **chuyện đã qua**, giữ lại vì phần lý lẽ đằng sau mỗi quyết định mới là chỗ đáng giá; đừng đọc nó như chỉ dẫn, và vài con số trong đó chỉ đúng ở thời điểm viết.

---

# 1 · Trạng thái hôm nay

| | |
|---|---|
| **Nội dung** | 126 món · 7 vùng · 17 kiểu món · 7 nhãn Theo dịp · **0 món trống nhãn** |
| **Giao diện** | Hướng "Khăn rằn": nền thẻ mã hóa theo **6 họ màu**, trang chi tiết mang màu họ của chính nó |
| **Trang chủ** | 12 món nổi bật, phủ **7/7 vùng** · ô tìm ở hero (form GET sang `/mon/?q=`) · **3 trục lối vào** (Kiểu món 17 · Theo dịp 7 · Miền 7 — mỗi cửa kèm số món, bấm là sang `/mon/` đã lọc sẵn) |
| **Dung lượng** | `/mon/` **38,5 KB** gzip ở 126 món (**39.470 B, đo thật trên máy chủ 2026-08-01**; hệ số ước cục bộ nâng lên **×1,025** sau 7 điểm dữ liệu) — 11 món thêm 2,8 KB, tức **0,25 KB/món** |
| **Liên kết chéo** | Mỗi trang món có dải **6 món** cuối trang — 0 mồ côi, 0 dải trùng, catalog liền **1 mảnh**, 756 liên kết |
| **QA** | `npm run qa` (bắt buộc trước mỗi build) · `npm run link-audit` + `npm run seo-audit` (sau build) · `npm run art-png -- --sheet` · `npm run contact-sheet` |
| **SEO** | JSON-LD `Recipe` · `BreadcrumbList` + breadcrumb thật · `WebSite` + `SearchAction` · `canonical` + `og:url` · sitemap · **RSS** `/rss.xml` |
| **Ảnh tìm kiếm** | `/anh-mon/<slug>-{1x1,4x3,16x9}.jpg` — hình món trên nền họ màu, sinh lúc build. **Khác `/og/`**: `/og/` là thẻ chữ để chia sẻ, `/anh-mon/` là ảnh cho bot |
| **Hạ tầng** | JSON-LD Recipe · ảnh OG sinh lúc build · sitemap · robots.txt · deploy tự động GitHub Pages + HTTPS |

## Catalog hôm nay

**Kiểu món (17 nhóm, tất cả ≥ 3 món):**

| | | | |
|---|---:|---|---:|
| **Món nước** | **20** | Cơm | 7 |
| **Xào** | **12** | Xôi | 6 |
| **Kho** | **12** | **Hấp** | **6** |
| **Bánh** | **11** | Bún trộn | 5 |
| **Chè** | **9** | Chiên | 4 |
| Canh | 8 | Bánh mì | 3 |
| **Nướng** | **7** | Cháo | 3 |
| Lẩu | 7 | Cuốn | 3 |
| | | Gỏi | 3 |

*Đợt 16 **không mở kiểu món mới** — 11 món rải vào 8 nhóm sẵn có: **Món nước 18 → 20**, **Xào 10 → 12**, **Kho 10 → 12**, **Bánh 10 → 11**, **Chè 7 → 9**, **Hấp 5 → 6**, **Nướng 6 → 7**. Đợt 15 trước đó mở kiểu món thứ 17 "Xôi".*

> ⚠️ **Đợt 16 nhận HAI món nước, đưa nhóm to nhất từ 18 lên 20 — biết là ngược lời dặn, và đây là lý do.** ① **Súp cua**: Thái chốt xếp vào Món nước sau khi cân với Canh (định nghĩa Canh là *"món trong mâm cơm, ăn với cơm trắng"*, súp cua không phải vậy). ② **Miến lươn Nghệ An**: bản canonical của món là bản nước. Cả hai đều **né được khuôn chung của họ teal bằng vật đựng + ruột** (xem phần 4), nên không làm họ đó khó thêm. Nhưng **đây là hai ngoại lệ liên tiếp — đợt 17 thì đừng nhận món nước nào nữa**, trừ khi nó mở ra một hướng phân biệt mới như bánh đa cua ở đợt 15.
>
> **Họ tím "Ngọt & mát" lên 9 và SẮP CẠN VẬT ĐỰNG.** Chín món chè giờ dùng chín dáng khác nhau: tô nông · ly cao thẳng · ly miệng loe · tô sâu có chân · **tô thủy tinh thấp rộng** (chè sen long nhãn) · ly vuông · **chén sâu có chân** (chè trôi nước) · hũ trụ có nắp · cốc thấp hai tầng. Luật đợt 13 *"năm món cùng kiểu món thì phải khác nhau ở dáng vật đựng trước đã"* nay đã tiêu gần hết vốn — **món chè thứ mười phải phân biệt bằng RUỘT hoặc HÌNH KHỐI, đừng trông vào vật đựng nữa.**

> ⚠️ **Món nước vẫn là ô to gấp đôi ô nhì (18 vs 10), và họ "Chan & húp" lên 36/115.** Đợt 15 **cố ý nhận thêm một món nước** (bánh đa cua) dù phần 2 đã dặn đừng — lý do: sợi bánh đa đỏ là thứ **chưa tô nào trên site có**, nên nó không làm họ teal khó thêm mà còn mở ra một hướng phân biệt mới. **Đây là ngoại lệ có lý do, đừng lấy làm tiền lệ chung** — bánh canh cá lóc Quảng Trị và phở chua Lạng Sơn vẫn nên hoãn.
>
> **Vì sao "Xôi" phải tách khỏi "Cơm".** Ba lý do, xếp theo sức nặng. ① **Nó gỡ đúng chỗ kẹt mà chính file này đã ghi**: xôi ngũ sắc bị để dành từ lâu với lý do *"xếp vào kiểu món Cơm thì hơi gượng"* — mở Xôi là làm được ngay, và món đó kéo **Tây Bắc 3 → 4**. ② Xôi khác Cơm ở cả ba chỗ: khác hạt (nếp ≠ tẻ), khác cách làm chín (đồ hơi ≠ nấu nước), khác chỗ đứng trong ngày (quà sáng gói lá / đĩa trên mâm cỗ ≠ bát cơm trong bữa). ③ Luật ≥3 thoả rộng rãi cả hai bên (Xôi 6, Cơm 7).
>
> **Ranh giới đã chốt, để đợt sau khỏi cãi lại:** *Xôi = nếp đồ chín, **hạt còn rời**, xúc hay bốc mà ăn. Bánh chưng / bánh tét cũng là nếp nhưng **nén thành khối rồi cắt miếng** ⇒ thuộc "Bánh". Cơm lam là nếp nhưng **nướng ống rồi cắt khoanh**, không phải xôi đồ ⇒ ở lại "Cơm".* Đã ghi vào `content.config.ts` và `_template.yaml`.
>
> **Và định nghĩa "Bánh" phải nới theo.** Cũ là *"vỏ tráng/đổ từ bột gạo"* — bánh chưng không phải bột nên rơi ra ngoài. Nay là *"làm từ gạo hoặc nếp rồi **tạo hình** — bột tráng, bột đổ khuôn, bột đổ chảo, hay nguyên hạt gói lá nén chặt — dù chiên, hấp hay luộc"*. Vẫn loại được bánh mì (bột **mì**) và vẫn loại được xôi (hạt rời, không tạo hình).

> **Vì sao "Chè" phải có họ màu riêng, không nhét vào họ nào đang có.** Mười lăm kiểu món cũ đều là món **mặn**, khác nhau ở *hình thức* hoặc *cách nấu*. Chè là kiểu món đầu tiên tách theo **VỊ** — và đúng vì lý do đó nên nó không có chỗ trong năm họ cũ: để chung *"Chan & húp"* thì ly chè bưởi mang đúng nền teal của phở bò, màu thôi làm thông tin và thành trang trí; để chung *"Cơm & bánh"* thì họ đó phình lên 15 món và mất nghĩa. Mở họ **"Ngọt & mát"** màu **tím sen `#5E3A6E`** — hệ màu duy nhất chưa dùng, vì bốn họ kia đều ấm còn họ thứ năm là teal.
>
> **Bài học quy trình:** mở kiểu món mà mở luôn họ màu thì **không phải 8 chỗ mà 9** — thêm `tokens.css`. Và cặp màu đó được khai ở **bốn nơi** (`tokens.css` · `FAM_GROUND` trong `family.ts` · hai bảng `FAMILIES` trong `tools/`). Đã cập nhật bảng của README.

> **Vì sao "Bánh mì" là kiểu món chứ không nhét vào "Bánh"** (đợt 12). Định nghĩa đang có của *Bánh* là **vỏ tráng/đổ từ bột gạo** — ổ bánh mì là bột **mì** nướng lò, nhét vào là phá định nghĩa. Và nó nằm đúng trục với Cơm · Cháo · Bánh (**hình thức món**), không phải trục **xuất xứ** như bài toán "Món Tây" còn đang treo ở phần 2. Xếp vào họ màu *Cơm & bánh*.

**Vùng miền:**

| Vùng | Trước đợt 6 | Sau đợt 9 (58 món) | Sau đợt 11 (71) | Sau đợt 12 (82) | Sau đợt 13 (95) | Sau đợt 14 (104) | Sau đợt 15 (115) | **Nay (126 món)** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Miền Nam | 14 (40%) | 15 (26%) | 17 (24%) | 21 (26%) | 25 (26%) | 27 (26%) | 29 (25%) | **33 (26%)** |
| Miền Bắc | 6 | 9 | 13 (18%) | 14 (17%) | 15 (16%) | 20 (19%) | 26 (23%) | **28 (22%)** |
| Cả nước | 6 | 11 | 16 (23%) | 18 (22%) | 23 (24%) | 23 (22%) | 24 (21%) | **24 (19%)** |
| Miền Trung | 3 (9%) | 11 (19%) | 12 (17%) | 15 (18%) | 15 (16%) | 16 (15%) | 16 (14%) | **19 (15%)** |
| Miền Tây | 4 | 7 | 8 (11%) | 8 (10%) | 10 (11%) | 10 (10%) | 11 (10%) | **13 (10%)** |
| Tây Nguyên | 1 | 3 | 3 (4%) | 4 (5%) | 5 (5%) | 5 (5%) | 5 (4%) | **5 (4%)** |
| Tây Bắc | 1 | 2 | 2 (3%) | 2 (2%) | 2 (2%) | 3 (3%) | 4 (3%) | **4 (3%)** |

> **Đợt 16 — Miền Trung được bù đúng như đã dặn, sau hai đợt đứng yên.** Ba món Trung (**chè hạt sen long nhãn** Huế · **miến lươn Nghệ An** · **bánh bèo Huế**) kéo **16 → 19**, và tỉ lệ **quay đầu tăng lần đầu kể từ đợt 12**: 14% → 15%. Miền Tây cũng lên **11 → 13** (kho quẹt, mắm chưng). "Cả nước" **chỉ nhận đúng một món** (chà bông) nên tỉ lệ tiếp tục xuống 21% → 20% — vẫn giữ đúng nếp.
>
> ⚠️ **Chỗ cần để mắt — TÂY NGUYÊN VÀ TÂY BẮC ĐỨNG YÊN THÊM MỘT ĐỢT NỮA.** Tây Nguyên **5 món, đứng nguyên bốn đợt liền**; Tây Bắc **4 món, đứng nguyên hai đợt**. Đợt 16 tìm không ra món Tây Nguyên nào vừa nổi tiếng, vừa nấu được ở nhà, vừa không đụng hình với `ga-nuong-mac-khen` / `bo-mot-nang` đang có. **Đây không còn là lời nhắc mà là việc phải quyết** — xem phần 2, mục *"Đường tới 200 món"* việc số 3. *(Cột "Sau đợt 10" đã gỡ khỏi bảng cho đỡ chật — số cũ tra ở phần Nhật ký.)*
>
> **Đợt 15 — Miền Bắc lên hạng nhì, Tây Bắc nhúc nhích lần thứ hai liên tiếp.** Sáu món Bắc (bánh chưng · bánh giầy · bánh đúc nóng · bánh đa cua · xôi gấc · sữa chua nếp cẩm) kéo **20 → 26**, lần đầu vùng này vượt "Cả nước". **Tây Bắc 3 → 4** nhờ **xôi ngũ sắc** — và đáng ghi là món đó mở khoá được **chỉ vì đợt này mở kiểu món "Xôi"**, đúng cái lý do nó bị hoãn bấy lâu.
>
> **Đợt 14 chữa đúng hai chỗ đợt 13 để lại.** ① **"Cả nước" đứng nguyên ở 23 và tụt từ 24% xuống 22%** — chín món của đợt không có món nào gán "Cả nước", đúng chủ ý. ② **Tây Bắc 2 → 3** nhờ **cơm lam**, lần đầu vùng này nhúc nhích kể từ đợt 9. Ngoài ra **Miền Bắc 15 → 20** (5 món: bún măng vịt, bún mọc, bún ốc, bún ốc nguội, cơm rang dưa bò), nhảy lên hạng ba và bỏ xa Miền Trung.
>
> **Chỗ cần để mắt đã đổi.** "Cả nước" tạm ổn; giờ mỏng nhất là **Tây Nguyên (5) và Tây Bắc (3)**. Xem phần 2, mục *"Đường tới 200 món"* việc số 3 — ở 200 món mà Tây Bắc vẫn 4–5 thì trục vùng miền thành nói dối, và **chốt hướng ở đây rẻ hơn chốt ở mốc 180**.
>
> **Cơm lam là tiền lệ cho câu hỏi đó.** Nó là món Tây Bắc đầu tiên **hơi lấn luật "nguyên liệu chính phải mua được ở chợ thường"** — ống nứa không phải chợ nào cũng có. Đã xử bằng cách nói thẳng trong FAQ (mua ở đâu) và cho hẳn cách thay bằng lá chuối + giấy bạc, kèm câu *"nói thẳng là không giống bản gốc"*. **Nếu Thái đồng ý lối này thì mở được thêm vài món vùng cao đang bị luật đó chặn**; nếu không thì cơm lam là ngoại lệ duy nhất. — **Đợt 15 đã dùng lại đúng lối này ba lần**: bánh đa đỏ (bánh đa cua), nếp nương (xôi ngũ sắc) và cá thát lát tươi (chả cá) đều là thứ ngoài vùng khó mua. Cách xử giống hệt: nói thẳng ở phần chọn mua, cho hẳn thứ thay thế, và **ghi rõ thay rồi thì không còn đúng bản gốc**. Ba lần trôi chảy ⇒ coi như lối này đã thành nếp, khỏi hỏi lại.

> Đợt 12 là đợt món đường phố / quà sáng, nghiêng hẳn về Nam nên **Miền Nam quay lại 26%** sau khi vừa xuống 24%. Bù lại **bộ ba bánh ướt rơi vào ba vùng khác nhau** — chả lụa (Nam) · lòng gà Đà Lạt (Tây Nguyên) · tôm chấy Huế (Trung) — nên Tây Nguyên lần đầu lên **4** và Miền Trung lên **15**.

> Đợt 11 kéo **Miền Bắc 10 → 13** (bún sườn nấu sấu, ốc om chuối đậu, lòng heo luộc), vùng vốn đứng thứ tư. Miền Nam lần đầu xuống dưới 25%.

> Đợt 6 toàn món Bắc và món "cả nước" nên Miền Trung đứng nguyên ở 3 món suốt đợt đó. **Đợt 7 kéo lên 5** nhờ lẩu gà lá é và cháo lươn Nghệ An; **đợt 8 kéo một mạch lên 11**. Chỗ lệch lớn nhất của catalog coi như đã chữa xong — đợt 10 chỉ thêm nem nướng là tròn 12. **Đợt 9 lo nốt ba vùng nhỏ**: Miền Tây 5 → 7, Tây Nguyên 1 → 3, Tây Bắc 1 → 2 — cả ba đã đạt mức của bức tranh 63 món hoặc gần đạt, nên đợt 10 không phải gánh vùng nào nữa.

Miền Trung từ vùng gần bét lên đồng hạng đầu; Miền Nam từ 40% xuống 25% mà không phải bỏ món nào.

---

# 2 · Việc còn lại

> **Dọn dẹp sau đợt 10: xong cả 5 việc** (2026-07-30) — `pubDate` 6 món về đúng ngày live · id `cgGa` chết đã gỡ nên `npm run qa` giờ **sạch trắng, không còn cảnh báo nào** · `contact-sheet.mjs` bỏ giàn giáo Phần I (465 → 327 dòng) · `_template.yaml` thôi chép tay 68 tên art · ROADMAP cấu trúc lại. Không còn nợ dọn dẹp nào.

## ~~Người đọc gặp ngay~~ — XONG cả ba 2026-07-30

Ba việc này soi ra 2026-07-30 và làm ngay trong ngày. Chi tiết ở mục *"Trang 404 và liên kết chéo"* trong phần Nhật ký; đây chỉ ghi kết quả:

1. **Trang 404** — `src/pages/404.astro`, ra đúng `dist/404.html` ở gốc (đã kiểm, không bị đẩy thành `404/index.html`). Có ô tìm món, ba đường về, sáu món gợi ý. **Đã nghiệm thu trên máy chủ 2026-07-30:** `curl -sI https://www.monvietngon.com/khong-ton-tai/` trả về **404**, không phải 200.
2. **Liên kết chéo** — mỗi trang món có dải **6 món**, chọn theo 2 cùng vùng + 2 cùng kiểu món + 2 cùng nhãn theo dịp. Đo trên HTML đã build: **0 mồ côi · 0 dải trùng · 1 mảnh liền · 384 liên kết**. Giữ bằng `npm run link-audit`.
3. **~~3 ô đầu trang chủ `eager`~~ — làm rồi GỠ RA cùng ngày.** Đo xong mới biết giả định đằng sau nó sai: **không ô nào nằm trên màn hình đầu**, và **LCP của trang chủ là chữ `<h1>` chứ không phải ảnh nào**. Xem mục *"Đo LCP trang chủ"* trong phần Nhật ký — ở đó có cả việc đáng làm mọc ra từ số đo này.

## Hạ tầng, theo thứ tự đáng làm

> 🔍 **SEO — kế hoạch đầy đủ nằm ở [`SEO.md`](SEO.md) (lập 2026-08-01), phiên nào đụng SEO thì mở file đó trước, đừng làm theo trí nhớ.** Tóm một dòng: 4 fix kỹ thuật nhỏ ĐÃ LÀM cùng ngày (meta robots + og:site_name + lastmod sitemap + gỡ SearchAction chết); còn chờ Thái duyệt 2 việc lớn (title theo ý định tìm kiếm "cách nấu/cách làm" · ~31 trang trục lọc) + 1 câu mức lộ danh cho trang giới thiệu; kèm danh sách ĐỪNG-LÀM đã tra nguồn (FAQPage chết 5/2026, llms.txt không ai đọc, Pinterest vắng ở VN…).

1. **Thống kê truy cập — Thái đã chốt dùng [Google Analytics 4](https://analytics.google.com), KHÔNG dùng GoatCounter (2026-07-30).** Chưa làm, và cố ý chưa làm ngay — nhưng **sẽ làm sớm**, nên đừng gỡ mục này xuống.

   Vì sao vẫn đáng làm: hiện không biết người đọc thật sự dùng gì, nên mọi quyết định về 12 ô featured, thứ tự chip lọc, món nào lên ticker đều đang dựa trên suy luận. **Đã có một việc bị chặn vì thiếu nó**: phương án C/D của hero (bỏ 2 nút CTA) — xem mục *"Rút ngắn hero trang chủ"* phần Nhật ký.

   > **Đã cân GoatCounter rồi mới chọn GA4 — đừng bàn lại, nhưng phải biết mình đang trả gì.** Số đo thật (`curl` + `content-encoding: gzip`, 2026-07-30):
   >
   > | | tải về gzip | so với `/mon/` (24,1 KB) |
   > |---|---:|---|
   > | `gtag.js` (GA4) | **148.650 B ≈ 145 KB** | **gấp 6 lần cả trang** |
   > | `count.js` (GoatCounter) | 3.327 B ≈ 3,3 KB | 1/7 trang |
   >
   > GA4 mạnh hơn hẳn (sự kiện, phễu, nối thẳng Search Console) và **Thái muốn ở trong hệ sinh thái Google** — đó là lý do chốt. Ba điều phải nhớ khi gắn:
   > - **145 KB sẽ là thứ nặng nhất site**, trên một trang mà cả câu chuyện kỹ thuật từ đợt 10 tới giờ là *"24,1 KB và không tăng theo số món"*. Nạp `async`/`defer`, đừng để nó chặn.
   > - **GA4 đặt cookie ⇒ cần dải xin phép** nếu có khách EU. Dải đó sẽ nằm đúng trên cái hero vừa mất công rút ngắn — hai việc đá nhau, tính trước.
   > - **Search Console đã trả lời sẵn một phần, miễn phí, không cần một dòng JS nào**: người ta gõ gì để ra site, trang nào được hiện, trang nào được bấm. Xem hết bên đó trước khi dựng báo cáo GA cho cùng câu hỏi.
2. ~~**RSS feed**~~ — **xong 2026-07-30**, `/rss.xml`, 64 món sắp theo `pubDate` mới nhất trước.
3. **Tự host font, bỏ Google Fonts — CHƯA LÀM, và cố ý hoãn.** Hiện là một stylesheet chặn render từ bên thứ ba. Repo **đã có sẵn** `BeVietnamPro-Regular/SemiBold.ttf` + `PaytoneOne-Regular.ttf` trong `src/assets/fonts/` (dùng sinh ảnh OG).

   > **Đọc kỹ trước khi làm — mấy chỗ dễ hiểu sai:**
   > - **Ba file `.ttf` sẵn có KHÔNG dùng thẳng được.** Google đang phục vụ `woff2` đã cắt bộ ký tự; `.ttf` đầy đủ nặng 112–134 KB nên thay thẳng là **nặng hơn hiện tại**. Cần `woff2`, và **thiếu hẳn hai face**: Be Vietnam Pro **700** và Dancing Script **600**.
   > - **Lợi ích KHÔNG phải là LCP.** URL đã có `&display=swap` nên chữ vẽ ngay bằng font dự phòng — *file font* không chặn vẽ chữ. Cái chặn là **bản thân cái stylesheet**: không một chữ nào xuất hiện trước khi `fonts.googleapis.com` trả lời. Lợi ích thật là **bỏ điểm hỏng đơn lẻ duy nhất của site**, bỏ 2 vòng DNS+TLS, và bớt nháy chữ.
   > - **Chưa định lượng được.** Không có số bóp băng thông nào (PSI API trả 429 vì thiếu key). Đo lượt đầu mạng chậm rồi hãy quyết, đừng làm vì nghe hay.

4. ~~**Hero trang chủ đang dài — cân nhắc rút ngắn.**~~ — **XONG 2026-07-30, ship bản B + phần điện thoại của F.** Thẻ món đầu tiên **1164 → 1006px** desktop (−158) và **1624 → 1309px** điện thoại (−315); hero **738 → 649px** và **1142 → 899px**. Không bỏ một thành phần nào khỏi trang. Chi tiết + 6 phương án đã đo ở mục *"Rút ngắn hero trang chủ"* phần Nhật ký.

   > **Còn phần chưa làm, và nó chờ GA4:** phương án **C** (bỏ 2 nút *"Xem hết món ngon"* + *"Bí quyết bếp Việt"*, gộp 3 pill thống kê thành một dòng) đo được **−294px desktop / −485px điện thoại** và là bản duy nhất đưa thẻ món lọt màn hình đầu ở 1440×900. **Cố ý chưa làm** vì cái giá là hai đích bấm lớn nhất trang mà chưa ai biết có bao nhiêu người bấm. Gắn GA4 xong, nhìn số một tuần rồi quyết. Phương án **D** (bỏ thêm eyebrow + câu dẫn khối món) thì đắt hơn nữa, để sau C.
5. **Nhãn "Quà chiều"** cho trục Theo dịp. Ứng viên: **bún ốc nguội** (món quà chiều rõ nhất của cả catalog — chính bài viết của nó gọi vậy), bún đỏ, ốc len, bún đậu, bánh xèo, cháo lòng, cơm cháy chà bông. Mở một giá trị enum mới là phải **rà gắn lại cả 115 món** chứ không chỉ món mới — nên phải là việc riêng, **đừng nhét vào một đợt món**.

## ~~SEO còn thiếu~~ — XONG 2026-07-30

- ~~`rel="canonical"`~~ — có ở mọi trang trừ 404 (trang 404 không có bản chuẩn nào để trỏ tới). Kèm `og:url`.
- ~~`BreadcrumbList`~~ — có, **kèm breadcrumb nhìn thấy được** trong hero trang món; Google chỉ hiện đường dẫn phân cấp khi trang có breadcrumb thật.
- ~~`WebSite`~~ — có ở trang chủ, kèm `SearchAction` trỏ `/mon/?q=` (khai được vì trang có tìm kiếm thật, form GET thuần).

## Bốn cảnh báo Recipe của Search Console — **cố ý để nguyên**

Search Console gửi thư (2026-07-29, mã WNC-10030322) báo 4 vấn đề Recipe. **Cả bốn đều là trường `recommended`, không phải `required`** — chính thư đó ghi *"non-critical… don't prevent the page or feature from appearing on Google"*. Đánh dấu của site hợp lệ và vẫn đủ điều kiện hiện rich result. Ba trong bốn cái **không được** sửa:

| Cảnh báo | Vì sao để nguyên |
|---|---|
| **`aggregateRating`** | Điểm đánh giá bắt buộc phải đến từ người dùng thật. Google ghi rõ: nếu bên được đánh giá tự kiểm soát đánh giá về chính mình thì trang **mất quyền** hiện sao, và bịa số là lỗi ăn manual action. Site tĩnh trên GitHub Pages, không có tài khoản, không có chỗ nhận đánh giá — gắn vào là **đánh đổi rich result đang có lấy một con số bịa**. Muốn có thật thì cần backend, là việc khác hẳn. |
| **`nutrition`** | Vi phạm luật không quảng cáo dinh dưỡng (phần 4, nhóm 4: *đếm calo/canxi/chất xơ*). `nutrition.calories` đúng là cái bị cấm. Chưa kể số sẽ là số ước. **Cảnh báo này để mở vĩnh viễn.** |
| **`video`** | Không có video. Chỉ sửa được bằng cách quay thật. |
| **`image`/`video` trong `recipeInstructions`** | Sửa cho tử tế = mỗi bước một hình riêng: 64 món × ~6–8 bước ≈ **hơn 400 hình**. Dán ảnh món vào mọi bước thì tắt được cảnh báo nhưng người đọc chẳng được gì — đó là nhồi đánh dấu. Để mở, trừ khi có ngày ngồi vẽ hình từng bước thật. |

> **Đọc đúng con số "Items: 4".** Báo cáo ghi 4 mục cho mỗi dòng, mà site có 64 món / 67 URL trong sitemap — nghĩa là Google mới đọc được đánh dấu Recipe của **4 trang**, không phải chỉ 4 trang bị dính. Site mới live 2026-07-27. Mọi trang món dùng chung một khuôn nên con số này sẽ **bò dần lên 64**; đó không phải hỏng thêm.

## ~~Ảnh `image` của Recipe là thẻ chữ~~ — XONG 2026-07-30

Chỗ đáng sửa lại **không** nằm trong bốn cảnh báo trên, mà ở trường `image` — trường Google **bắt buộc**, và không bị báo lỗi vì nó *có* giá trị hợp lệ. Nó trỏ vào `/og/<slug>.png`, tức tấm thẻ chia sẻ: nền họ màu, tên món chữ Paytone One, bốn chip, viền caro — **không có tí hình món nào**. Mà đúng ảnh đó là thumbnail của kết quả công thức và của Google Hình ảnh, nên món của mình đi thi trong băng chuyền toàn ảnh đồ ăn bằng một tấm thiệp chữ.

Đã sửa: thêm endpoint `src/pages/anh-mon/[shot].jpg.ts` sinh **hình vẽ món trên đúng nền họ màu**, ba tỉ lệ 1:1 · 4:3 · 16:9 theo khuyến nghị của Google. `/og/` giữ nguyên nhiệm vụ cũ — chia sẻ mạng xã hội, chỗ đó tên món nằm trên ảnh lại là đúng.

## Mốc dung lượng cũ đã hết hiệu lực

> **"~150 KB gzip" giờ vô nghĩa, đừng dùng lại.** Từ đợt 10 độ dốc xuống còn ~0,2 KB/món (chỉ còn phần chữ của cái thẻ) thay vì 2,6 KB/món. **Đã đi qua mốc 100 và số khớp dự đoán:** hồi ở 64 món ước "100 món ≈ 31 KB", nay 104 món **đo thật ra 33,1 KB** — đúng độ dốc. **Không còn rào dung lượng nào trên đường tới 200** (ước ~53 KB).

## Đường tới 200 món

**Mốc 100 đã qua ở đợt 14; đợt 15 lên 115, đợt 16 lên 126.** Còn ~74 món nữa mới tới 200 — tức là **6–8 đợt cỡ đợt 13–16**.

**Không vỡ chỗ nào — nền kỹ thuật làm được 126 thì làm được 200:**

| | Nay (126 món) | Ước ở 200 món |
|---|---|---|
| `/mon/` gzip | **38,5 KB** (đo thật; hệ số ước nay ×1,025) | **~53 KB** — vẫn xa mốc cũ 150 KB |
| Build | 49,3 s / 130 trang | **~75 s** (phần sinh ảnh chiếm chủ yếu) |
| `/anh-mon/` | 378 ảnh | ~600 ảnh — artifact, không nằm trong repo |
| 12 ô featured | 10% catalog | 6% — **chọn lọc hơn**, không tệ hơn |
| Ô mỏng nhất | 3 món | 6 món — không kiểu món nào tụt dưới luật ≥3 |

**Chỗ vỡ là ĐỤNG HÌNH, và nó không tăng tuyến tính.** Mỗi hình mới phải khác **mọi** hình cũ ở cỡ 260px, nên cái quyết định độ khó là **hàng xóm đông cỡ nào**, không phải tổng số món:

- Họ **"Mặn đưa cơm"** vọt **25 → 30 chỉ trong đợt 16** (kho quẹt, giả cầy, mắm chưng, mì xào giòn, chà bông) — **nay là họ chịu sức ép mạnh nhất sau teal**. Riêng nhóm Xào đã có **12 hình mà sáu trong số đó dùng chung đúng một khuôn** ("gò đồ xào nằm bẹp trên dĩa bầu dục trắng"). Món Xào thứ mười ba **bắt buộc phải đổi hình khối hoặc vật đựng**, đừng vẽ thêm gò nữa.
- Họ **"Chan & húp"** đã lên **38 hình** và trên đường tới **~62**. **Món nước 20 → ~28**, **Kho 12 → 20**.
- Họ **"Cơm & bánh"** ở **27 hình**. Đợt 16 cho thấy nó **vẫn còn chỗ**: bánh bèo Huế lách vào bằng bố cục "nhiều vật nhỏ trên một khay" mà chưa ai dùng.
- Họ **"Ngọt & mát"** mới 9 hình nhưng **đã tiêu hết chín dáng vật đựng** — xem khung ở phần 1. Đây là họ nhỏ nhất mà lại sắp cạn đòn bẩy trước nhất.
- Đợt 13 đã phải bịa chiêu mới tách nổi **7 nồi lẩu**. Tới **15 nồi lẩu** là cạn chiêu.
- Viết nội dung thì tuyến tính — 17,8 KB/món, có khuôn sẵn. Vẽ hình thì không.

**Ba việc phải đổi TRƯỚC — đợt 14 đã làm xong hai, còn một:**

1. ~~**Cách soi đụng hình.**~~ — **XONG ở đợt 14.** Trước khi vẽ dòng nào, render **cả họ màu** bằng `npm run art-png -- --sheet --fam <họ>` rồi mới quyết bố cục. Làm thế mới thấy được thứ mà soi từng cặp không bao giờ thấy: **31/31 hình họ teal dùng chung đúng một khuôn**. Đây giờ là bước bắt buộc, đã ghi vào quy trình phần 3.
2. **Vốn từ bố cục — ĐỢT 15 TÌM RA ĐÒN BẨY THỨ TƯ, và nó mạnh nhất.** Đợt 14 chốt: đổi **vật đựng** và đổi **động tác** thì đậu, đổi **góc nhìn** thì bị trả lại cả hai lần (lý lẽ ở phần 4, mục đầu nhóm *Màu và hình*). Đợt 15 thêm vào: **đổi HÌNH KHỐI của chính món ăn**. Tám hình mới dồn vào họ vàng mà không cái nào lẫn, vì chúng không còn là "gò/đống đặt trong vật đựng" nữa — **khối vuông** (bánh chưng), **trụ nằm ngang + khoanh cắt** (bánh tét), **hai miếng tròn xếp chồng** (bánh giầy), **năm gò rời xếp vòng** (xôi ngũ sắc). Đây là đòn bẩy rẻ nhất còn lại: nó **không phá ngữ pháp của trang** (vẫn nhìn chếch từ trên, vẫn vật đựng nguyên vẹn) mà đổi hẳn đường bao.
   > **Và nó đi kèm một cái giá phải biết trước:** món có hình khối lạ thì **rất dễ đọc ra ĐỒ VẬT** thay vì đồ ăn — đợt 15 dính bốn lần trong một đợt (cục gạch · vỏ bánh tart · chồng bát đĩa · cốc đong thí nghiệm). Thuốc giải luôn là một thứ: **cho thấy cấu tạo bên trong** (cắt một miếng ra, bẻ đôi, lộ mặt cắt) và **cho đường bao gồ ghề gợn hạt**. Xem phần 4.
   >
   > **Đòn bẩy còn lại cho đường tới 200: hình khối + vật đựng + động tác + ruột.** Bốn thứ, không phải ba — và ba đợt nữa vẫn chưa cạn.
3. **Trục vùng miền — CÒN NGUYÊN, và sau đợt 16 thì nó thu lại thành đúng MỘT câu hỏi: TÂY NGUYÊN VÀ TÂY BẮC.** Miền Trung đã chữa xong ở đợt 16 (16 → 19, tỉ lệ quay đầu tăng), nên phần còn lại của bài toán chỉ là hai vùng cao: **Tây Nguyên 5 (đứng yên bốn đợt), Tây Bắc 4 (đứng yên hai đợt)**. Ba đường vẫn như cũ: chấp nhận lệch và nói thẳng · nới luật *"mua được ở chợ thường"* · gộp Tây Bắc vào Miền Bắc như đã làm với Đông Bắc.
   > **Và đây là số liệu mới để quyết:** đường thứ hai (nới luật nguyên liệu) **đã chạy trơn bốn lần** — cơm lam ở đợt 14; bánh đa đỏ, nếp nương, cá thát lát ở đợt 15 — mà **tổng cộng chỉ đẻ ra đúng MỘT món Tây Bắc**. Đợt 16 đi tìm món Tây Nguyên thì vướng cả ba tầng cùng lúc: món nổi tiếng thì nguyên liệu không mua được ngoài vùng (muối kiến vàng, lá rừng, cà đắng), món mua được thì **đụng hình với `ga-nuong-mac-khen` và `bo-mot-nang` đã có**. **Kết luận: đường thứ hai đã hết tác dụng với hai vùng này.** Còn lại đường ① và ③, và cả hai đều là câu Thái phải chốt. Ở 200 món mà Tây Bắc vẫn 4–5 thì trục vùng miền thành nói dối — **chốt bây giờ vẫn rẻ hơn chốt ở 180**.

> **Ba điều vẫn đúng khi chọn món:**
> - **"Cả nước" đã hạ xuống 20%** — ba đợt liền chỉ nhận 0–1 món vào ô đó. Giữ nếp này.
> - **Đợt sau nên nghiêng về TÂY NGUYÊN và TÂY BẮC** — Miền Trung coi như đã chữa xong ở đợt 16. Nhưng đọc việc số 3 ngay trên trước đã: hai vùng đó đang bị chặn bởi cả nguyên liệu lẫn đụng hình, nên **có thể phải chốt hướng trước rồi mới chọn được món**.
> - **Kho ý tưởng vẫn còn nguyên 5 món sau đợt 16** — vì 11 món của đợt 16 đều do Thái nêu, không lấy từ kho (bánh bèo Huế là món đề xuất mới để thay bò kho). **Vẫn phải có nguồn món mới trước khi ngồi chọn đợt 17.**

> **Nếu chỉ làm một thứ:** ~~trang 404 + liên kết chéo~~ — đã làm 2026-07-30. Việc còn lại mà người đọc cảm nhận được liền thì hết; những gì còn trong danh sách đều là hạ tầng hoặc SEO, không ai nhìn thấy.

## Kho ý tưởng để dành — **chưa xếp vào đợt nào**

> **Đợt 16 đã xong (2026-08-01) — KHÔNG CÓ ĐỢT 17 NÀO ĐƯỢC XẾP LỊCH.** Thái nêu 11 món, chốt lại **11 món** sau vòng hỏi (1 món trùng phải thay, 3 câu xếp loại/đặt tên phải chốt). **Muốn làm tiếp phải ngồi chọn món với Thái trước, đừng tự mở đợt** — và lý do cứng vẫn còn đó: **kho ý tưởng chỉ còn 5 món**.
>
> **Đợt 16 gồm:** chè hạt sen long nhãn (Trung) · chè trôi nước (Nam) · mì xào giòn (Nam) · miến lươn Nghệ An (Trung) · kho quẹt (Tây) · mắm chưng (Tây) · chà bông thịt heo (Cả nước) · súp cua (Nam) · **bánh bèo Huế** (Trung) · bò nướng lá lốt (Nam) · chân giò nấu giả cầy (Bắc).
>
> ⭐ **LUẬT SOI TRÙNG VỪA CỨU MỘT BÀN THUA TRÔNG THẤY.** Thái nêu **bò kho** — mà `bo-kho.yaml` đã live từ lâu (Miền Nam · Kho · order 50). Bắt được ở bước 0, mất năm giây `ls`. Nếu bỏ qua bước đó thì đã tra món, viết 340 dòng YAML và vẽ xong một cái hình trước khi phát hiện. **Bò kho được thay bằng bánh bèo Huế** — Thái chọn, và nó vừa bù Miền Trung vừa mở được bố cục "nhiều vật nhỏ trên khay" chưa ai dùng.
>
> **Ba câu phải hỏi Thái trước khi viết, ghi lại vì đợt sau sẽ gặp lại dạng này:** ① **món không có kiểu món nào vừa** (súp cua — site chưa có nhóm "Súp", mà luật ≥3 thì một mình nó không mở nhóm được → Thái chốt xếp Món nước); ② **tên món đụng nghĩa với món đã có** ("ruốc" ở Trung/Nam là mắm ruốc, mà site đã có *Mắm ruốc xào thịt ba chỉ* → chốt gọi **"Chà bông thịt heo"**, và nhắc một câu "ngoài Bắc gọi là ruốc" trong FAQ cho người gõ tìm vẫn ra); ③ **món có nhiều bản vùng miền** (miến lươn Hà Nội hay Nghệ An → Thái chọn Nghệ An). **Cả ba đều là câu đổi hẳn việc phải làm, nên hỏi trước là đúng — đừng tự đoán.**
>
> **Cách "làm cả hai bản" vẫn rất được, đợt 15 dùng lại một lần:** **bánh chưng ↔ bánh tét** — cùng ruột (nếp · đậu xanh · ba chỉ), khác dáng, khác lá, khác vùng. Tra một lần dùng được hai, và tự nó thành bài so sánh Bắc–Nam. Trước đó đợt 14 làm bún ốc nóng ↔ nguội; đợt 13 làm ba cặp.
>
> **Luật đợt 14 vẫn giữ: SOI TRÙNG TRƯỚC KHI TRA MÓN.** `ls src/content/recipes/` mất năm giây. Đợt 15 nhờ nó mà bắt sớm được **xôi đậu xanh ↔ xôi xéo** (cùng nếp + đậu xanh) — soi ra thì thấy vẫn khác thật (đậu đồ chung, hạt lẫn trong nếp ↔ đậu giã nắm xéo lát phủ trên), nên giữ cả hai và viết cho rõ chỗ khác. Soi trùng **không phải để loại**, mà để biết mình cần viết gì.
>
> **Một luật mới của đợt 15: MỞ KIỂU MÓN LÀ MỘT CÁCH GỠ MÓN BỊ KẸT.** Xôi ngũ sắc nằm trong kho ý tưởng đã lâu với lý do ghi rõ *"xếp vào Cơm thì hơi gượng"*. Không ai nghĩ tới việc **cái kẹt là ở bảng phân loại chứ không ở món**. Khi rà kho ý tưởng, đọc luôn phần lý do hoãn — món nào bị hoãn vì *xếp loại* thì có thể gỡ được mà chẳng tốn gì.

- **Tây Bắc** — sau gà nướng mắc khén và pa pỉnh tộp thì vùng này còn rất ít món nấu-được-ở-nhà. Đã lọc bằng luật *"nguyên liệu chính phải mua được ở chợ thường"*:
  - **Loại hẳn:** bê chao Mộc Châu (bê sữa ngoài vùng không mua được), thịt trâu gác bếp (thịt trâu khó mua, lại đụng luật khói), nộm da trâu (da trâu không mua nổi, sơ chế quá kỳ công).
  - ~~**xôi ngũ sắc**~~ — **ĐÃ SHIP ở đợt 15**, và nó gỡ được đúng vì đợt đó mở kiểu món "Xôi". Xem khung ở đầu mục này.
  - **Còn để dành:** **canh cải mèo** (dễ nấu nhưng nhạt, và hình lại là thêm một tô canh nữa).
- **Đông Bắc** (Lạng Sơn, Cao Bằng, Hà Giang) — **không mở vùng riêng**; nếu sau này làm thì gắn vào "Miền Bắc". Món đã tra sẵn: khâu nhục, vịt quay lá mắc mật, phở chua Lạng Sơn.
- **Miền Trung còn dư ý tưởng:** chả ram tôm đất Bình Định, cá nục hấp cuốn bánh tráng, bánh canh cá lóc Quảng Trị. **Đây là chỗ nên lấy trước ở đợt 16** — Miền Trung đứng nguyên 16 món suốt hai đợt và đã tụt xuống 14%.
- **Chả cá Hà Nội — HOÃN, Thái chốt 2026-08-01: *"thêm vào danh sách làm sau, có thể teaser ở trang chủ để quảng cáo, bây giờ chưa nên làm"*.** Đã đưa lên dải *"Sắp lên mâm"* ở `ComingSoon.astro`. Đã tra sẵn: cá lăng lạng lát, ướp riềng · nghệ · **mẻ** · mắm tôm, nướng rồi rán chảo mỡ với thì là và hành, ăn với bún, lạc rang, mắm tôm. Xếp vào **Chiên** (chảo mỡ là thứ dọn ra bàn) thì hợp nhất, và nó kéo họ Lửa đang mỏng.
  > ⚠️ **Còn một câu chưa chốt: TÊN MÓN.** Tên phổ biến nhất là *"chả cá Lã Vọng"*, mà **"Lã Vọng" là tên một nhân vật** (ông câu bên sông trong tích Tàu) — đụng thẳng luật *không nêu tên danh nhân trong nội dung món ăn*. Đã hỏi Thái ở đợt 15 nhưng Thái hoãn cả món nên câu này chưa có câu trả lời. Ba lựa chọn đã cân: ① **"Chả cá Hà Nội"** — tên có thật, đang dùng song song, sạch luật, nhưng người gõ *"chả cá Lã Vọng"* trên Google khó ra trang hơn; ② giữ nguyên tên gốc và coi tên riêng của món là ngoại lệ của luật; ③ tả thẳng món (*"Chả cá nghệ mẻ, chảo thì là"*) — sạch nhất mà mất hẳn tên nhận diện. **Dải teaser đang tạm dùng ① cho khỏi phạm luật khi câu hỏi còn treo — hỏi lại Thái trước khi viết bài.**
  - **Loại hẳn: cơm âm phủ Huế** — Thái chốt không làm (2026-07-30). Đã gỡ khỏi cả kho ý tưởng lẫn dải "Sắp lên mâm" ở `ComingSoon.astro`; chỗ trống trên dải thay bằng **cá nục hấp cuốn bánh tráng**. **Đừng đề xuất lại.**
- **Bún trộn** đứng ở 5 món; còn để dành **bún nem cua bể**.
- **Hai nhóm chờ mở — Thái hỏi, chốt "giữ nguyên, chờ đủ quân" 2026-08-01:** chà bông đang đứng ở "Xào" (đúng ra là món **rang khô/để dành**) và lòng heo luộc ở "Hấp" (đúng ra là **luộc**) — cả hai lệch nhãn thật nhưng mỗi nhóm mới chỉ có 1 món nên luật ≥3 chặn. **Khi catalog có thêm quân** (rang/để dành: tép rang, muối vừng, ruốc cá…; luộc: thịt ba chỉ luộc, gà luộc lá chanh…) **đủ 3 thì mở nhóm và dời món về** — nhớ bài "mở một kiểu món đụng 8–9 chỗ" + món chuyển nhóm phải soi lại hình trên nền họ màu mới.
- **Món Tây — HOÃN, chưa quyết, đừng tự làm.** Thái nêu **bò bít tết** và **mì Ý sốt cà chua** ở đợt 11 rồi chốt *"khoan tất cả các món Tây, để sau, giờ tập trung vô làm món Việt"* (2026-07-31). Hai món vẫn còn trên bàn, nhưng **phải giải xong bài toán xếp loại trước khi viết một dòng nào**:

  | | |
  |---|---|
  | **Vướng luật gì** | "Món Tây" là **xuất xứ**, mà cả 14 kiểu món hiện có đều là **cách nấu**. Chip lọc theo xuất xứ đứng lẫn giữa Kho · Xào · Nướng là lệch trục. Thêm nữa luật **≥3 món/kiểu món** cũng chưa đủ quân — mới có 2. |
  | **Tiền lệ đang có** | Site **chưa từng** mở loại theo xuất xứ: **cà ri gà** (gốc Ấn) nằm ở Kho/Miền Nam, **bò kho** ở Kho/Miền Nam, **bò lúc lắc** ở Xào/Miền Nam. Món Việt hoá thì xếp như món Việt. |
  | **Ba đường đã cân** | ① Không mở loại, **bò né** → `Chiên` (áp chảo), bỏ mì Ý — hợp tiền lệ nhất, vì bò né *là* món Việt thật (chảo gang + bánh mì + ốp la là sáng tạo của người Việt; chữ "bít tết" từ tiếng Pháp *bifteck*). ② Mở "Món Tây" 3 món, thêm **bò sốt vang** cho đủ luật ≥3. ③ Giữ cả hai, mì Ý → `Bún trộn` (đúng hình thức: sợi trộn sốt, không nước dùng) nhưng tên chip nói "Bún". |
  | **Chỗ gợn thật** | **Bò né** thì Việt rõ ràng. **Mì Ý sốt cà chua** thì chưa Việt hoá — không mắm, không rau thơm, bê gần như nguyên từ Ý; đặt lên site tên *Món Việt Ngon* là thấy cấn. Nếu làm thì nên là **mì Ý sốt bò bằm**, bản mà bếp nhà Việt thật sự nấu. |

## Lặt vặt

- ~~GitHub Actions cảnh báo Node 20 deprecated~~ — **xong 2026-07-29.** Ghi lại vì lần đầu đọc dễ hiểu sai: cảnh báo đó **không** nói về Node dùng để build (workflow vốn đã `node-version: 24` từ trước), mà nói về Node chạy code của bản thân mấy action. Và **2 trong 3 action bị nêu không nằm trong `deploy.yml`** — `setup-node` với `upload-artifact` được gọi bên trong `withastro/action`, nên sửa file mình không với tới; phải nâng chính `withastro/action`. Đã nâng `checkout` v4→v7, `withastro/action` v3→v6, `deploy-pages` v4→v5. `checkout@v7` có breaking change thật (chặn checkout code fork PR) nhưng repo này chỉ chạy trên `push` + `workflow_dispatch`, không dùng `pull_request_target`/`workflow_run` nên không dính.
- **Node build giữ ở 24, đừng nâng lên 26** dù máy đang chạy 26: Node bản chẵn tới tháng 10 của năm đó mới lên LTS, nên tới giờ 26 vẫn là Current. CI nên đứng ở LTS.

---

# 3 · Quy trình thêm một đợt món mới

0. **SOI TRÙNG TRƯỚC TIÊN** — `ls src/content/recipes/` và đọc `summary` của mấy món nghe giống. Đợt 14 có 2/10 món Thái nêu bị loại ở bước này (bún chả cá đã có; bún mắm nấu đúng nồi nước của lẩu mắm đã có). Năm giây, và nó quyết định cả đợt gồm mấy món
1. Mỗi món 1 YAML — copy `src/content/recipes/_template.yaml` (tên file = slug URL); dòng có `": "` phải quote, timer label dạng `MM:SS`, định lượng viết `[[số|đơn vị]]` để tự scale theo khẩu phần
2. **Mỗi món phải có ít nhất 1 nhãn `occasions`** — không để trống
3. Vẽ art riêng ngay từ đầu: `src/components/art/Art<Ten>.astro` + một dòng trong `ART_COMPONENT` (`src/utils/art.ts`) + giá trị mới trong enum `art` (`content.config.ts`). **Vẽ và soi trên đúng nền họ màu của món** (hình phải giống món thật, không trùng nhau, xương đúng loài). Ba ràng buộc của file art — `viewBox` phải là `0 0 520 470`, không `currentColor`/`var(--…)`, không `&` trần — `npm run qa` chặn cả ba
4. Cân lại `order` + `featured` toàn danh sách — trang chủ lấy **12 món featured đầu tiên theo order**
5. Cập nhật danh sách tease trong `ComingSoon.astro` (bỏ món đã ship, thêm từ kho ý tưởng) + ticker ở `index.astro` nếu món đáng lên
6. **`npm run qa`** trước đã — bắt bẫy YAML, `order` trùng, `id` nguyên liệu trùng, `id` art trùng chéo file (những thứ Zod không bắt được). Rồi `npm run build` để schema tự kiểm, rồi `npm run preview` mở xem từng trang mới
3b. **TRƯỚC KHI VẼ DÒNG NÀO: render CẢ HỌ MÀU** — `npm run art-png -- --sheet --fam <họ>` cho mỗi họ mà đợt này đụng tới. Đây là thứ soi từng cặp không bao giờ thấy: đợt 14 render họ teal ra mới biết **31/31 hình dùng chung đúng một khuôn** ("vật đựng đặt giữa, nhìn chếch từ trên, ba sợi khói, đạo cụ dưới chân"), và họ vàng thì **18/18 là dĩa bầu dục dẹt**. Biết vậy rồi mới chọn được khung hình chưa ai dùng, thay vì vẽ xong mới phát hiện na ná
6c. **QA nội dung trước khi ship** (chốt 2026-08-01): ① grep chéo từ khóa/thuật ngữ của bài mới trên toàn catalog — cùng khái niệm phải cùng chữ, từ chỉ xuất hiện trong đợt đang viết là nghi tự chế; ② đối chiếu QUICK ↔ ingredientGroups từng con số; ③ thời gian không nằm trong [[…]]; ④ soát bộ luật "Chính xác & trung thực" phần 4 (số bịa, trích dẫn, ngăn mát, giọng thuyết, chữ y khoa, khuôn công dụng)
6b. **Soi hình bằng PNG ghép, không chỉ contact sheet** — `npm run art-png -- --sheet <món…>` (hoặc `--cat <kiểu món>` / `--fam <họ>`) xếp hình mới **cạnh hình dễ đụng** của nó, mỗi ô 260px đúng cỡ thumbnail trên `/mon/`. Hai luật:
    - thứ gì trong tô cũng phải khác thứ bên cạnh ở **cả sắc lẫn dáng** — đổi mỗi màu mà giữ nguyên dáng thì vẫn lẫn (đợt 8)
    - **đạo cụ cũng phải khác**, không riêng món chính: hai món cùng họ màu mà cùng có lát chanh + chén chấm giống nhau thì vẫn đọc ra na ná (đợt 9)
    - **món ăn phải là MỘT KHỐI** — vẽ một path khối liền làm nền đống trước rồi mới vẽ chi tiết đè lên, miếng nào cũng chồng mép lên miếng khác; rải từng miếng cách nhau là hở nền và mắt đọc ra mấy vật lẻ (đợt 10)
    - **đúng thực tế chưa đủ, hình còn phải đọc ra MỘT MÓN ĂN** (đợt 10)
    - **đừng bày đối xứng hai bên**, và **cảm giác giòn nằm ở đường bao gồ ghề chứ không ở màu** (đợt 10)
    - **món CHUYỂN kiểu món phải soi lại trên nền họ màu MỚI** — đừng coi là "hình cũ đã duyệt rồi" (đợt 10)
7. Duyệt kỹ nội dung + hình xong mới commit / push — deploy tự động ~40 giây
8. **Xong đợt: thống kê lại toàn bộ catalog** — đếm số món theo vùng miền, kiểu món, theo dịp (kể cả số món không nhãn), độ khó, featured — để còn cân lại cho đợt sau

---

# 4 · Luật đã chốt — đừng bàn lại

Rút ra từ nhật ký bên dưới, gom lại đây cho khỏi phải đọc cả file.

**Phân loại**
- **Mỗi kiểu món mới mở phải có ≥ 3 món** — chính luật này giữ hàng chip lọc khỏi phình. Không áp ngược cho kiểu món đang có.
- *Món nước = một tô là xong bữa · Canh = món trong mâm cơm · Lẩu = nồi giữa bàn · Cháo = gạo ninh nhừ.*
- *Xôi = nếp đồ chín, **hạt còn rời**, xúc hay bốc mà ăn. · Bánh = làm từ gạo hoặc nếp rồi **tạo hình** — bột tráng, bột đổ khuôn, bột đổ chảo, hay nguyên hạt gói lá nén chặt — dù chiên, hấp hay luộc.* Ranh giới giữa hai nhóm là **tạo hình**: xôi để hạt rời và xúc từng thìa, bánh chưng cũng là nếp nhưng nén thành khối rồi cắt miếng. **Cơm lam ở lại nhóm "Cơm"** — nếp nướng trong ống rồi cắt khoanh, không phải xôi đồ. (đợt 15)
- **MỞ KIỂU MÓN LÀ MỘT CÁCH GỠ MÓN BỊ KẸT.** Xôi ngũ sắc nằm trong kho ý tưởng rất lâu, lý do hoãn ghi rõ *"xếp vào Cơm thì hơi gượng"* — tức cái kẹt nằm ở **bảng phân loại**, không ở món. Mở nhóm "Xôi" là gỡ được ngay, và món đó kéo luôn Tây Bắc 3 → 4. **Khi rà kho ý tưởng, đọc cả phần lý do hoãn**: món nào bị hoãn vì *xếp loại* thì thường gỡ được mà chẳng tốn gì. (đợt 15)
- **Mở một kiểu món đụng 8 chỗ** (bảng ở README) — **kiểm từng chỗ, đừng suy từ đợt trước.** Đợt 7 hoá ra chỉ phải sửa 4/8; đợt 8 và 9 chỉ 3/8.
- **Không mở vùng "Đông Bắc"** — gộp vào Miền Bắc. Enum vùng đứng ở 7 giá trị.
- **Mọi món phải có ≥ 1 nhãn `occasions`** — schema đã `.min(1)`, để trống là build gãy.

**Viết nội dung**
- **⭐ TẢ MÓN BẰNG CÁI NÓ CÓ, ĐỪNG TẢ BẰNG CÁI NÓ KHÔNG CÓ.** Thái chốt 2026-08-01, và **áp cho cả món cũ lẫn món sau này**. Bún ốc viết *"Bát này **không có riêu, không có đậu**"* — đúng sự thật, nhưng người đọc phải biết bún riêu là gì mới hiểu, mà phần lớn khách vào thẳng từ Google thì không có ngữ cảnh đó. Viết lại thành *"gọn trong ba thứ: con ốc giòn sần sật, nước chua thanh màu đỏ nhạt, một thìa ớt chưng nổi váng đỏ cam"* — cùng một ý, mà đọc xong là hình dung được bát bún. **Đã rà lại cả 104 món**, sửa 7 chỗ: `bun-oc` · `bun-sua-nha-trang` · `bun-oc-nguoi` · `bun-bo-nam-bo` (*"tô bún không có nước dùng"* → *"tô bún trộn khô"*) · `goi-ngo-sen-tom-thit` (*"dĩa không ra nước"* → *"dĩa ráo tới miếng cuối"*) · `cua-hap-bia` (*"không rụng càng"* → *"càng nguyên vẹn"*) · `ca-loc-nuong-trui` (*"không ướp gì"* → *"nướng mộc bằng rơm"*) · `ca-thu-sot-ca-chua` (*"gần như không có xương dăm"* → *"lành xương"*).
  > **Chỗ KHÔNG áp luật này:** câu **đính chính** dạng *"X chứ không phải Y"* thì giữ, vì nó chặn một lỗi nấu có thật — *"nấu từ xương cá, không phải xương heo"* · *"chất chua là lá giang, không phải me"* · *"nước cốt dừa, không phải nước dừa tươi"*. Khác nhau ở chỗ: đính chính nói **món này là gì**, còn *"món này không có X"* thì bắt người đọc phải biết món khác.
- **⭐ MỖI TRANG PHẢI ĐỨNG ĐƯỢC MỘT MÌNH.** Cùng buổi, cùng lý do. Bún ốc nguội mở bài bằng *"Bản 'kia' của bún ốc…"* và bún sứa mở bài bằng *"Cùng họ với bún chả cá…"* — cả hai bắt người đọc phải biết một món khác trước đã. **Phần lớn khách tìm Google rồi vào thẳng trang món, không đi qua trang chủ hay `/mon/`.** Cách đúng: `summary` và đoạn story đầu **tả thẳng món đó**; muốn trỏ sang món họ hàng thì để xuống FAQ hoặc phần dọn mâm, và chỉ một lần.
- **⭐ TỪ NGHỀ ĐÚNG VẪN LÀ TỪ KHÓ.** Đợt 15 dính lại y hệt vụ *giấm bỗng*: chữ **"đồ"** (làm chín nếp bằng hơi nước) và **"chõ"** (nồi hấp xôi) là từ có thật, dùng **25 lần trên site mà chưa từng chú giải lần nào** — và tôi còn đặt nó ngay trong `summary` lẫn `ticker`. Thái đọc xong hỏi *"đồ chung một chõ hay đổ chung một chỗ?"* — chữ này còn tệ hơn giấm bỗng ở chỗ nó **đồng âm với một chữ thường dùng khác**, nên người đọc không biết mình đang hiểu sai. Cách chữa đã thành nếp: **bỏ khỏi title/summary/ticker/bản nấu nhanh, thay bằng lời thường ("hấp"), rồi chú giải một lần ở phần chi tiết** — chỗ tự nhiên nhất là ghi chú nguyên liệu, đừng chèn vào giữa mạch kể chuyện. **Phép thử: từ nào mình phải nghĩ một giây mới chắc nghĩa thì người đọc sẽ vấp.** (đợt 15)
- **Từ khó thì chú giải NGAY LẦN ĐẦU, và đừng để ở title/summary/ticker.** `giấm bỗng` dùng **25 lần trên site mà chưa từng được chú giải lần nào** — kể cả bún riêu cua đã live từ lâu. Thái đọc bún ốc mới hỏi *"nước chua giấm bỗng là gì?"*. Đã bỏ khỏi title + summary + ticker và chú giải ở dòng nguyên liệu đầu tiên (*"bã nếp còn lại sau khi cất rượu"*).

**Chọn món**
- **Nguyên liệu chính phải mua được ở chợ thường**, dù món nổi tiếng tới đâu (luật rút ra khi gỡ bê chao Mộc Châu; cùng luật đã loại thịt trâu gác bếp và nộm da trâu).
- **Cái gì đưa lên `title` phải là chỗ chắc nhất của món** — tiêu đề không có chỗ rào đón mà lại là câu đi xa nhất (thẻ món, hero, kết quả tìm kiếm, ảnh OG).
- **Chú giải đi cùng lần xuất hiện ĐẦU TIÊN, không phải lần giải thích kỹ nhất.** Nhưng chú giải cũng phải biết dừng: cách chữa đúng thường là **đừng dùng từ khó ở `summary`**.
- **Luật "thuật ngữ phải có thật" áp cho cả TỪ TẢ KẾT CẤU, không riêng danh từ.** Đợt 13 dính: viết *"sựt răng"* — nghe rất vô hại nên không ai thấy mình đang tự chế, mà tra ra thì cả 5 chỗ dùng đều nằm trong đợt mới, còn kho từ site đã có sẵn là **"giòn sựt" (33) · "sần sật" (20) · "giòn sần sật" (17) · "sựt sựt" (4)**. **Trước khi đặt một cụm tả kết cấu, grep xem site đã có từ nào cho đúng cảm giác đó chưa** — `grep -roh "…" src/content/recipes/*.yaml | sort | uniq -c`. Từ nào chỉ xuất hiện trong đợt đang viết thì gần như chắc chắn là tự chế. Dùng lại từ đã có vừa đúng vừa giữ giọng văn cả site nhất quán.

**Chính xác & trung thực** *(chốt 2026-08-01 sau tổng kiểm định — Thái ủy quyền; lý lẽ và án lệ ở mục Nhật ký cùng ngày)*
- **Số phải đo được.** Không bịa số thống kê/phần trăm ("80% cái đắng", "90% mùi tanh", "10 người thì 7"). Số chỉ dùng cho thứ cân-đong-đo-đếm được (gam, phút, độ); mức độ thì nói bằng chữ: "phần lớn", "hầu như".
- **Trích là phải tra.** Ca dao/tục ngữ/câu nói phải tra đúng nguyên văn trước khi in (án lệ: "chén muối đĩa gừng" bị đảo vế). KHÔNG gán lời cho người hay cộng đồng khi không có nguồn ("người bản nói vui", "dân Bắc gọi vui", "nhà văn xưa viết… nhất").
- **Đồ chín để qua đêm = mặc định "ngăn mát".** Mọi hướng dẫn để nguội/làm sẵn/mang đi phải kèm chỗ trữ lạnh; mốc để-ngoài ≤ 2 giờ (trời nóng ngắn hơn). Mốc chuẩn đang dùng: cơm nguội qua đêm → ngăn mát; ruốc/chà bông 2–3 tuần khô mát · 1–2 tháng ngăn mát · ~3 tháng cấp đông; bánh chưng/tét treo 2–3 ngày trời mát, nóng thì ngăn mát.
- **Chuyện còn tranh cãi kể bằng giọng thuyết NGAY TỪ CÂU ĐẦU** ("người ta thường kể / có một thuyết…"), không khẳng-định-trước-rào-sau; và tuyệt đối không tự chế thuyết/từ nguyên. Nguồn gốc món gần như luôn thuộc diện này (phở, bò kho, chè bà ba, bún bò Nam Bộ…).
- **Cảnh báo an toàn viết bằng lý do bếp núc, không chữ y khoa.** "Đừng nồi nhôm vì canh chát, xỉn màu, mau hỏng nồi" — không "không tốt cho sức khỏe", không "(dị ứng)", không tên vi khuẩn. Thông tin giữ, chữ đổi.
- **Không khuôn câu "món X cho người/bé [tình trạng]"** — kể cả tình trạng không phải bệnh ("cho người mệt", "cho đứa nhỏ biếng ăn"): đó là khuôn công dụng. Viết bằng đặc tính món ("mềm, đứa nhỏ lười nhai cũng chịu ăn").
- **Không nêu tên tiệm/quán/thương hiệu** — mở rộng của luật nhãn hàng (án lệ: tiệm bánh mì 1958 viết "một tiệm bánh ở Sài Gòn được cho là nơi đầu tiên").
- **Nguyên liệu Sách đỏ/săn bắt nhạy cảm** (cà cuống…): nhắc như tư liệu văn hóa thì được, không viết như gợi ý săn mua; có nguồn nuôi thì nói rõ "nuôi".
- **Rượu bia trong công thức:** món gắn "Cho bé" thì phương án không cồn phải là mặc định ("nước gừng (hoặc rượu trắng)"); không câu mô tả kéo dài cuộc uống ("uống được lâu", "bia vơi hồi nào không hay").
- **Thời gian/nhiệt độ KHÔNG nằm trong markup [[…]]** — nó scale theo khẩu phần, mà "ninh 40 phút" nhân đôi lên là sai bản chất. Thời gian viết chữ thường/đậm.
- **Quick phải khớp danh mục nguyên liệu từng con số** (muối ¼ ↔ 1 muỗng; toán tôm gỏi cuốn), và **cùng một khái niệm phải cùng một chữ trên mọi trang** (thát lát, vảy, nếp cẩm, kỹ thuật ớt chưng…) — trước khi ship, grep chéo từ khóa của bài mới trên toàn catalog (bước 6c quy trình).
- **Ngoại lệ đã chốt:** "phố Nam Bộ" trong bún bò Nam Bộ được giữ (từ nguyên của tên món, phố mang tên vùng, thuyết có nguồn, kể bằng giọng thuyết); "thảo mộc"/"táo tàu" ở mặt tiền mì vịt tiềm được giữ (mùi hương/nguyên liệu thực phẩm, không phải vị thuốc); "chuẩn vị" giữ (cách nói thể loại, đồng bộ nhãn flavorNote). Ca "Lã Vọng" vẫn treo — hỏi Thái trước khi viết bài chả cá.

**Màu và hình**
- **Màu khung site không được trùng hệ với họ món đông nhất**, không thì màu đó chiếm cả hai tầng và thành màu chủ đạo cả site.
- **Thứ gì trong tô cũng phải khác thứ bên cạnh ở CẢ sắc lẫn DÁNG** — đổi mỗi màu mà giữ nguyên dáng thì ở cỡ thumbnail vẫn lẫn. **Đạo cụ cũng phải khác**, không riêng món chính.
- **Món ăn phải là MỘT KHỐI** — path khối liền làm nền đống trước, chi tiết đè lên, miếng nào cũng chồng mép.
- **Đúng thực tế chưa đủ, hình còn phải đọc ra một món ăn.** Và **đừng bày đối xứng hai bên**.
- **Vẽ hỏng thường là do chưa hiểu vật, không phải tay kém** — chữa bắt đầu bằng việc đọc lại *vật đó cấu tạo thế nào*.
- **Món CHUYỂN kiểu món phải soi lại hình trên nền họ màu MỚI** — đừng coi là "hình cũ đã duyệt rồi".
- **Dấu nhận diện phải nằm ở ĐƯỜNG BAO, đừng giấu trong chi tiết bên trong.** Chấm xương vẽ trên mặt khúc sườn thì ở 260px chỉ còn vài pixel và khối thịt đọc thành ô vuông vô nghĩa; cho đầu xương **lòi hẳn ra ngoài đường bao** là nhận ra ngay, khỏi cần nhìn vào trong. (đợt 11)
- **Kem trên kem, sẫm trên sẫm — đều mất hình.** Dĩa lát trắng ngà trên dĩa trắng ngà ra một vệt nhợt; nồi nâu sẫm trên nền họ nâu thì mất đường bao. Chữa bằng độ tương phản với thứ **ngay dưới nó**, không phải bằng đổi màu chủ đề. (đợt 11)
- **Vẽ ruột ĐỒNG TÂM trong vỏ thì ra cái vòng, không ra vật bổ đôi.** Chừa viền đều nhau bốn phía là mắt đọc thành cái nhẫn/cái đĩa viền màu. Vật bổ dọc phải **đẩy ruột lên trên, chỉ chừa vỏ dày ở đáy** — thành cái thuyền vỏ đỡ đống ruột. (đợt 11)
- **Thứ mà món mang TÊN thì phải nhìn thấy ở cỡ thumbnail.** Cà tím nướng *mỡ hành* mà hạt hành vẽ nhỏ quá thì ô hình không nói được nó là món gì. (đợt 11) — đợt 12 dính lại y hệt ở **bánh ướt tôm chấy**: sợi tôm chấy vẽ mảnh quá, ở 260px gần như mất, phải tăng nét lên gấp đôi mới đọc ra.
- **Vành tròn + chấm giữa = CÁI MẶT, ở cỡ thumbnail luôn luôn vậy.** Khúc cá thu vẽ đúng giải phẫu (mặt cắt tròn, vành da sẫm, lỗ xương sống ở giữa) mà ba ô xếp cạnh nhau thì đọc ra ba cái ống nhòm. Khoét sâu khe bụng cũng không cứu — càng giống cái cằm. Chữa bằng cách **đổi hẳn góc nhìn**: cho khúc cá nằm nghiêng, khoe viền da và thớ cá tách mảng, bỏ hẳn mặt cắt nhìn thẳng. (đợt 12)
- **Miếng thịt khối phải lộ MẶT CẮT NHIỀU TẦNG, đừng chỉ vẽ mặt trên.** Heo quay vẽ vòng 1 chỉ có mặt da quay lên → ra năm cái bánh nướng lấm tấm. Vẽ thêm mặt trước với ba dải chồng nhau (viền da vàng mỏng · mỡ trắng dày · nạc nâu hồng) là nhận ra ngay. Và **dải da phải MỎNG** — để dày bằng dải mỡ thì cả miếng ngả vàng, mất luôn cái tương phản. (đợt 12)
- **⭐ CÙNG MỘT NGUYÊN LIỆU ĐÃ VẼ ĐẠT Ở MÓN KHÁC → CHÉP NGUYÊN GLYPH, ĐỪNG NGHĨ LẠI.** Luật này có từ đợt 12 (ba ổ bánh mì) nhưng đợt 14 vẫn dính, và dính đắt: **lát bò của cơm rang dưa bò sai BA vòng liên tiếp** — tròn vo + đỏ mận → tròn vo + nâu ngả xám → dẹt dài nhẵn nhụi + nâu bóng — trong khi `ArtBoXaoThienLy` đã có sẵn một lát bò Thái duyệt từ đợt 13, cũng sau ba vòng. Chép nó sang, chỉ dẹt bớt theo chiều đứng (×0,72), là xong ngay. **Trước khi vẽ một nguyên liệu, grep xem site đã vẽ nó ở đâu chưa** — `grep -l "Beef\|Bo\b" src/components/art/*.astro` — rồi mở file đó ra chép. Vừa nhanh vừa làm cả site nhất quán: cùng con bò thì phải ra cùng một miếng.
  > **Và đây là chỗ chốt lại vì sao ba bản kia sai:** cả ba đều vẽ đường bao bằng **lệnh `C` (đường cong)**, nên ra vật nhẵn nhụi — cục thịt, rồi dăm bào. Bản đã duyệt vẽ toàn **lệnh `L` (đoạn thẳng gãy khúc)**: lát thịt mỏng gặp chảo nóng thì **co rúm**, không cạnh nào cong đều. **Đồ ăn co rúm vì nhiệt thì vẽ bằng đoạn thẳng, đừng vẽ bằng đường cong.**
- **Vật có CÁN/QUAI chìa ra thì kiểm xem có lọt khung không.** Cán chảo cơm rang chạm mép phải khung và bị cắt cụt — ở `viewBox` 520 thì mọi thứ phải nằm trong khoảng ~20…500. Cách chữa rẻ nhất là **bọc cả cụm trong một `<g transform="translate(…)">`** rồi dời, đừng đi sửa từng toạ độ. (đợt 14)
- **Vẽ SAI MÀU vì suy từ cách nấu khác.** Đợt 14 dính hai lần trong một hình: **miếng vịt LUỘC** tô nâu đỏ sẫm (Thái: *"rất không giống vịt"*) — thịt luộc phải **xám hồng nhạt, da vàng**, nâu đỏ là màu thịt kho; và **sợi măng** tô nâu (Thái: *"nhìn giống đống shit"*) — măng nấu vịt là **vàng óng**. Cả hai đều là lỗi lấy bảng màu của một cách nấu khác gán cho món này. **Tra ảnh thành phẩm thật rồi mới chọn màu**, đừng suy từ "thịt thì nâu". (đợt 14)
- **Sợi thì phải DÀI.** Sợi măng vẽ dài 48 đơn vị trong một cái tô rộng 290 — ở 260px đọc thành mấy mẩu ngắn cụt. Thứ gì mang chữ *sợi* thì chiều dài phải chiếm ít nhất **1/4 bề ngang vật đựng**, không thì nó thành hạt. (đợt 14)
- **Cắt cận và đổi góc nhìn: ĐỪNG.** Xem mục ⭐ ở đầu nhóm này.
- **⭐ ĐỔI HÌNH KHỐI CỦA MÓN LÀ ĐÒN BẨY THỨ TƯ — và là thứ mạnh nhất còn lại.** Đợt 15 nhét **tám hình mới vào một họ màu** mà không cái nào lẫn, chỉ nhờ bỏ khuôn "gò/đống đặt trong vật đựng": khối vuông (bánh chưng) · trụ nằm ngang kèm khoanh cắt (bánh tét) · hai miếng tròn xếp chồng (bánh giầy) · năm gò rời xếp vòng (xôi ngũ sắc). Nó **không phá ngữ pháp của trang** — vẫn nhìn chếch từ trên, vẫn vật đựng nguyên vẹn — nên không dính lỗi mà đổi góc nhìn đã dính ở đợt 14. (đợt 15)
  > **Cái giá đi kèm: hình khối lạ thì RẤT DỄ ĐỌC RA ĐỒ VẬT.** Đợt 15 dính **bốn lần trong một đợt**: khối vuông đỏ → *cục gạch*; khối có khía dọc → *vỏ bánh tart*; mấy miếng tròn trắng dẹt → *chồng bát đĩa sứ*; cốc thẳng trơn có vành nét dày → *cốc đong phòng thí nghiệm*. **Thuốc giải luôn là hai thứ, dùng cùng lúc:** ① **cho thấy cấu tạo bên trong** — cắt một miếng ra, bẻ đôi, lộ mặt cắt; ② **cho đường bao GỒ GHỀ GỢN HẠT**, vì cạnh thẳng tắp và mặt phẳng lì là dấu hiệu của vật cứng, không phải của đồ ăn.
- **Vòng ĐỒNG TÂM hoàn hảo + chấm tròn ở tâm = QUẢ TRỨNG ỐP LA / cái bia bắn.** Anh em ruột với luật *"vành tròn + chấm giữa = cái mặt"* của đợt 12, nhưng dính ở chỗ khác: khoanh bánh tét vẽ đúng ba vòng tròn lồng nhau thì ở 260px đọc ra cái trứng. Chữa bằng cách vẽ cho **đúng thật hơn**, không phải bịa cho khác: lớp đậu xanh nắm bằng tay nên là **hình vuông tròn góc**, miếng thịt ở tâm là **thanh chữ nhật nằm chéo** chứ không phải chấm tròn. Phá được sự đồng tâm là hết trứng. (đợt 15)
- **Chấm rải ĐỀU trên một mặt phẳng sáng = CÁI MẶT.** Ba hạt nếp cẩm rải đều trên mặt sữa chua trắng cho ra đúng một khuôn mặt (hai chấm trên thành hai con mắt). Cùng thuốc giải với viên mọc của đợt 14: **dồn LỆCH HẲN VỀ MỘT PHÍA và cho kích thước khác nhau**. Ở đây chữa bằng cách gom thành một vệt nếp cẩm đổ tràn từ mép trái — vừa hết mặt cười, vừa đúng cảnh thật. (đợt 15)
- **Chi tiết nào gợi tới ĐỒ NGỌT PHƯƠNG TÂY thì mắt chốt vào đó trước.** Khối xôi gấc thêm khía dọc quanh sườn cho ra vẻ "đóng khuôn" → đọc thành **vỏ bánh tart**; mấy nét dừa nạo kẻ dài song song trên mặt → đọc thành **đường kem rưới**. Chữa: bỏ khía, và đổi dừa nạo sang **sợi NGẮN, mảnh, nhiều, xoay lung tung**. Nét dài song song hầu như luôn đọc ra "rưới sốt". (đợt 15)
- **Tỉ lệ NGANG/DỌC quyết định vật đó là gì, không phải màu hay chi tiết.** Miếng bánh giầy vẽ bề ngang rộng và dẹt thì thành **cái đĩa**, dù đã tô đúng màu và đã kẹp lát giò hồng ở giữa; thu bề ngang còn 2/3 và tăng bề dày là ra ngay cục bánh dẻo. Cùng bài học với ly chè đậu đỏ hoá ly champagne ở đợt 13 — **sửa tỉ lệ trước, đừng sửa ruột**. (đợt 15)
- **Tách hai vật bằng TƯƠNG PHẢN SÁNG/TỐI, đừng tách bằng sắc độ.** Sợi gà xé tô be nhạt đặt trên gò xôi màu kem — đúng màu thật, mà ở 260px cả mảng dính thành một cái vòm nhợt. Chữa bằng cách **lót một lớp NÂU SẪM làm khe giữa các sợi** rồi mới đặt sợi sáng đè lên. Hai màu cùng độ sáng thì ở cỡ thumbnail là một màu, dù bảng màu có ghi khác nhau. (đợt 15)
- **Lớp sẫm lót dưới chỉ có tác dụng nếu nó CÒN HỞ RA.** Chọn đĩa men xanh sẫm cho gò xôi trắng đúng theo luật *"nền nhạt + món nhạt phải chèn lớp sẫm ở giữa"*, nhưng vẽ gò to gần bằng cái đĩa nên chỉ còn hở một vành mỏng — mất sạch tác dụng. **Món chiếm chừng 2/3 bề ngang vật đựng là vừa.** (đợt 15)
- **⭐ SỬA HÌNH XONG PHẢI RÀ LẠI CHỮ.** Xôi gấc vẽ khối vuông ở vòng 1, sang vòng 3 đổi sang khối tròn (vì vuông đọc ra cục gạch, mà bánh chưng cùng đợt đã chiếm dáng vuông) — nhưng title, summary và hai chỗ trong bài vẫn ghi *"vuông vức"*. Thái đọc là thấy ngay. Hình đi qua ba vòng thì **chữ tả cái hình cũng phải đi theo**: sau vòng vẽ cuối, grep lại mấy từ tả hình dạng (vuông · tròn · dài · khối · dĩa) trong chính file YAML của món. (đợt 15)
- **Miếng CẮT RA từ món gói lá thì vẫn còn LÁ ở mặt ngoài — đừng vẽ toàn ruột.** Miếng bánh chưng vòng 3 vẽ mặt trên trắng tinh, chẳng còn tí xanh nào; Thái hỏi đúng câu *"đâu ai cắt hẳn toàn ruột bánh ra như thế"*. Sự thật: bóc lá ra thì mặt bánh **xanh mướt vì ăn màu lá**, và một miếng bổ ra chỉ có **hai mặt vừa cắt** là lộ ruột, mấy mặt còn lại vẫn là mặt ngoài. Chữa bằng ba việc: mặt trên đổi sang nếp xanh mướt · mặt bên ngoài giữ lá · lót một mảnh lá dưới miếng bánh. Luật này áp cho mọi món gói lá — bánh tét, bánh giò, bánh nậm. (đợt 15)
- **Chi tiết quen mắt vẫn phải TRA.** Sợi lạt bánh chưng là thứ ai cũng "biết" trông ra sao, nên tôi vẽ thẳng theo trí nhớ: hai sợi bắt chéo cộng một vành ngang. Tra ra mới biết phải là **4 sợi, hai sợi mỗi chiều, chia mặt bánh thành chín ô như dấu thăng**. Luật cũ *"chưa tra thì đừng vẽ"* của đợt 12 nói về **món**; đợt 15 mở rộng: nó áp cho cả **dây buộc, cách gói, cách cắt** — tức mọi thứ mình tưởng là biết. (đợt 15)
- **Hạt/vân/gợn dưới `rx` 9 thì coi như không vẽ.** Đo ở đợt 15: texture để `rx` 6–7 biến mất hoàn toàn ở ô 260px, để 9–10 mới đọc được. Đây là con số dùng lại được cho mọi hình sau này. (đợt 15)
- **Khai `<g id="…">` PHẢI nằm trong `<defs>`.** Để ngoài thân `<svg>` thì trình duyệt vẽ luôn một bản ở gốc toạ độ — lòi ra một vệt lạ ở góc trái trên khung mà `npm run qa` không bắt (cú pháp vẫn đúng). Dính ở bún ốc nguội đợt 14, chỉ thấy khi render PNG. (đợt 14)
- **Chưa tra thì đừng vẽ.** Bốn hình của đợt 12 sai chỉ vì tôi vẽ theo trí nhớ: bánh ướt lòng gà Đà Lạt **phải có trứng gà non** cắt đôi đặt trên cùng · xôi mặn gói **lá chuối** chứ không phải hộp giấy · bánh ướt tôm chấy là **cuốn xếp thành hàng ngay ngắn** · cá nục sốt cà là cá **đã chiên vàng nâu**, tô màu xanh bạc là thành cá sống. Một lượt tra trước khi mở file art rẻ hơn hẳn một vòng duyệt. (đợt 12)
- **Món nào có "họ hàng" trên site thì mượn luôn bố cục đã duyệt, chỉ đổi RUỘT.** Ba ổ bánh mì: hai ổ dùng bố cục "ổ nằm ngang bổ dọc" thì qua ngay, ổ thứ ba tôi cố nghĩ bố cục riêng (dựng đứng nửa ổ) và bị trả lại hai lần. Phân biệt bằng **nhân**, đừng phân biệt bằng cách bày. (đợt 12)
- **Đừng vẽ path trong hệ toạ độ ĐÃ XOAY.** Vẽ ổ bánh mì bên trong `rotate(-38)` rồi canh toạ độ bằng mắt thì ổ co lại thành cục tròn — số trong path không còn khớp với chiều dài mình tưởng. Cách đúng: **vẽ vật nằm ngang cho đúng tỉ lệ trước**, rồi mới bọc một lớp `rotate` ở ngoài. (đợt 12)
- **Đồ ăn nhồi trong vỏ thì mỗi món phải khác nhau ở DÁNG CÁI VỎ, không chỉ khác ở nhân.** Ba ổ bánh mì vòng 1 đều là "khối bánh + nhân bên trong" nên nhìn na ná; tách ra được là nhờ **ba dáng vỏ khác hẳn**: ổ nằm ngang mở ngửa · ổ nằm xéo có đĩa chả nhô khỏi đường bao · nửa ổ dựng ngược lộ mặt cắt. (đợt 12)
- **Nền nhạt + món nhạt thì phải chèn một lớp SẪM ở giữa.** Gò xôi xéo vàng trên nền họ vàng: chữa bằng **lá chuối xanh lót dưới**. Và gò nhẵn thín thì đọc ra quả xoài — phải cho **hạt nếp nhô ra khỏi đường bao** mới ra đống xôi. (đợt 12)
- **Vẽ đúng tỉ lệ thật mà tỉ lệ thật quá nhỏ thì vẫn là vẽ sai.** Bông thiên lý ngoài đời chỉ chừng 1 cm nên vòng đầu tôi vẽ đúng cỡ đó — ở 260px thì chùm bông biến mất, còn lại một đống rau xanh không tên. Cách chữa gọn: **bọc chính `<g id="…">` trong `defs` bằng một lớp `transform="scale(1.35)"`** — mọi `<use>` phóng theo, khỏi sửa từng chỗ. Luật cũ *"thứ mà món mang TÊN phải nhìn thấy ở cỡ thumbnail"* thắng luật *"vẽ cho đúng thật"* mỗi khi hai cái đá nhau. (đợt 13)
- **Năm món cùng một kiểu món thì phải khác nhau ở DÁNG VẬT ĐỰNG trước đã.** Bộ năm món chè: ly cao thẳng · tô rộng nông · chén có chân đế · tô sâu lòng · ly miệng loe. Đổi ruột mà giữ chung một cái tô thì năm ô thumbnail đọc ra năm tô cháo. Cùng luật đã rút ở ba ổ bánh mì đợt 12, nhưng đợt 13 mới thấy nó **quan trọng hơn cả màu**. (đợt 13)
- **Ly thủy tinh vẽ hẹp quá thì thành ly rượu, không ra ly chè.** Chè đậu đỏ vòng 1 vẽ thân cao và thon, ở 260px đọc y như ly champagne. Chữa bằng **nới rộng miệng và hạ chiều cao** — tỉ lệ ngang/dọc mới là thứ nói ra đây là ly gì, chứ không phải cái gì đựng bên trong. (đợt 13)
- **Đạo cụ củ quả phải nằm NGỬA MẶT CẮT LÊN.** Củ khoai môn vẽ đứng nguyên củ thì ở 260px đọc thành hòn đá; bổ đôi đặt ngửa, lộ ruột, là nhận ra ngay. Và **ruột phải có màu rực** — thêm nửa củ khoai lang ruột cam bên cạnh thì cả cụm đạo cụ mới đọc được. Nhưng coi chừng: củ bổ đôi vẽ thành **hình bầu dục cân đối thì lại ra lát cam** — phải thuôn dài, hai đầu nhỏ dần và **không đầu nào giống đầu nào**. (đợt 13)
- **Lá dứa, hành lá, rau thơm vẽ rời trên bàn thì đọc thành TRÁI ỚT.** Dính hai lần trong một hình ở đợt 13. Hai cách chữa: vẽ **dải dẹt có gân song song, nằm ngang** (ra lá), hoặc **đổi hẳn sang đạo cụ khác không thể nhầm** — chè đậu xanh bột báng cuối cùng thay bó lá dứa bằng **nửa gáo dừa**, vừa hết nhầm vừa nói luôn ra vị của nồi chè. (đợt 13)
- **Món "nhúng" và món "cuốn" thì chữ ký nằm NGOÀI nồi, không nằm trong nồi.** Bảy nồi lẩu mà chỉ vẽ nồi thì tới nồi thứ tư là hết cách phân biệt. Thứ tách được chúng ra là vật đặt **cạnh** nồi: ổ bánh mì (Đà Lạt) · dĩa thịt thái lát sống (nhúng mẻ) · bếp cồn có ngọn lửa xanh (dê chao) · dĩa cuốn bánh tráng (nhúng giấm). (đợt 13)
- **⭐⭐⭐ HỎNG HAI VÒNG LIÊN TIẾP THÌ DỪNG VẼ, ĐI TÌM GLYPH ĐÃ DUYỆT.** Miếng chân giò của giả cầy đi **bốn vòng** đều bị Thái trả: "mấy viên tròn có chấm trắng" → "cục thịt nạc đặc" → "cục màu trắng phía sau là gì thế". Vòng 5 mới làm đúng thứ ROADMAP đã dặn từ đợt 12: **`grep` xem site đã vẽ nguyên liệu đó đạt ở đâu chưa rồi chép nguyên glyph**. `ArtHeoQuay` vòng 3 có sẵn miếng thịt heo có bì Thái đã duyệt — **khối hộp ba mặt vẽ toàn bằng đoạn thẳng, mặt trước chia ba dải bì · mỡ · nạc**. Chép cấu trúc đó sang, chỉ đổi ruột (bì thui nhẵn bóng thay bì quay rỗ, dải giữa là gân ngả vàng thay mỡ trắng, phủ thêm lớp ánh vàng của nước nghệ) — **xong ngay trong một vòng**.
  > **Con số đáng nhớ: 4 vòng vẽ mò = 1 vòng chép glyph.** Luật này đã có từ đợt 12 (ba ổ bánh mì) và đợt 14 (lát bò của cơm rang dưa bò, cũng sai ba vòng liên tiếp trong khi `ArtBoXaoThienLy` có sẵn bản duyệt). **Ba lần dính cùng một lỗi ⇒ nay nâng lên thành phản xạ bắt buộc: hình nào bị trả lại LẦN THỨ HAI thì việc kế tiếp KHÔNG PHẢI là vẽ lại, mà là đi tìm glyph cũ.**
  > **Và cái giá phải trả khi chép:** hai hình sẽ giống nhau ở phần glyph. Tách chúng ra bằng thứ khác — giả cầy khác heo quay ở **vật đựng** (tô sành men xám vs dĩa trắng), **nền họ màu** (nâu vs đỏ), **nước sốt** (ngập nước vàng nghệ vs không có nước), và **tư thế miếng**: heo quay chặt ra thì xếp ngay ngắn, giả cầy là món HẦM nên miếng nằm xoay lệch lộn xộn. Cái cuối cùng vừa tách được hình vừa đúng thật. (đợt 16)
- **⭐⭐ TRA MÀU THẬT CỦA MÓN TRƯỚC KHI TÔ, VÀ GHI HẲN BẢNG MÀU VÀO ĐẦU FILE ART.** Thái yêu cầu 2026-08-01 sau khi mắm chưng bị vẽ **nâu sậm** trong khi món thật **vàng óng bóng** — màu đó là lớp lòng đỏ trứng phết lên rồi hấp thêm, không phải màu mắm sống. Đây là lần thứ ba dính lỗi cùng loại (đợt 14: vịt luộc tô nâu đỏ, măng tô nâu). **Nay thành nếp bắt buộc: mỗi file art mở đầu bằng một khối `BẢNG MÀU THẬT (tra <ngày>)`** liệt kê từng thành phần và mã hex, kèm một câu vì sao nó có màu đó. Đã làm cho `ArtMamChung` · `ArtGiaCay` · `ArtMienLuon` · `ArtChaBong` · `ArtMiXaoGion`; **món sau cứ theo đó**. Lợi ích thật: đợt sau đọc file là biết ngay màu nào đã tra, khỏi suy từ "thịt thì nâu". (đợt 16)
- **MÓN CÓ CHỮ "SỢI" THÌ PHẢI VẼ SỢI RỜI CÓ KHE HỞ, ĐỪNG VẼ KHỐI ĐẶC.** Ổ mì xào giòn hai vòng đầu vẽ bằng một path khối liền rồi kẻ nét sợi đè lên — Thái: *"món này các sợi tách ra rõ ràng chứ không phải 1 đống tròn vo quện lại 1 cục"*. Vòng 3 bỏ hẳn khối nền, vẽ **hai lớp nét lệch nhau để giữa các sợi hở ra nền dĩa**, đầu sợi thò ra lởm chởm dài ngắn khác nhau. **Luật "món ăn phải là MỘT KHỐI" (đợt 10) KHÔNG áp cho món dạng sợi rời** — nó nói về việc các miếng phải chồng mép, không bắt phải bịt kín thành đống. Cùng bài học đã dùng lại cho chà bông. (đợt 16)
- **MIẾNG THỊT NGẮN + BO TRÒN = LÁT CHẢ / LÁT KHOAI.** Miếng lươn vòng 2 vẽ ngắn và bo tròn hai đầu, ở 260px đọc thành mấy lát tròn xếp chồng. Kéo dài gấp rưỡi và làm mảnh đi là ra ngay miếng lươn tước dọc thớ. Nối tiếp luật *"sợi thì phải DÀI"* của đợt 14, nhưng lần này áp cho **miếng thịt**, không riêng sợi rau. (đợt 16)
- **VẬT ĐỰNG NẰM NGHIÊNG ĐỔ RA = TAI NẠN, KHÔNG PHẢI MÓN ĂN.** Chà bông vòng 1 vẽ hũ thuỷ tinh nằm nghiêng cho chà bông tràn ra — Thái: *"nhìn cảm giác như hũ đồ ăn bị rớt ra do tai nạn"*. Chữa: **hũ đứng thẳng**, phần dọn ra để trên **một cái dĩa riêng phía trước**. Đây là ranh giới thứ hai của đòn bẩy "đổi vật đựng": **đổi được kiểu vật đựng, nhưng vật đựng phải ở TƯ THẾ BÌNH THƯỜNG của nó.** (đợt 16)
- **VẬT CHÍNH PHẢI TO HƠN ĐẠO CỤ — kể cả khi ngoài đời nó nhỏ hơn.** Kho quẹt vòng 1 vẽ đúng tỉ lệ thật (tộ bé xíu, dĩa rau to) — Thái: *"tộ kho quẹt phải bự hơn đống rau luộc nhiều chứ!"*. Vì tên món là *kho quẹt* chứ không phải *rau luộc*. Cùng luật với *"thứ mà món mang TÊN phải nhìn thấy ở cỡ thumbnail"* (đợt 11) và *"vẽ đúng tỉ lệ thật mà tỉ lệ thật quá nhỏ thì vẫn là vẽ sai"* (đợt 13). (đợt 16)
- **CHI TIẾT NHIỀU TẦNG CẦN MIẾNG TO — nếu không thì thà bỏ tầng.** Miếng chân giò giả cầy có ba tầng phải đọc được (bì vàng bóng · mỡ kem · thịt nâu hồng). Vẽ ba miếng cỡ vừa thì cả ba tầng tụt xuống dưới 4–5px và cả miếng đọc thành **một viên tròn nâu**; vẽ **hai miếng to hẳn** thì ba tầng hiện rõ ngay. Đi cùng con số của đợt 15 (*texture dưới `rx` 9 coi như không vẽ*): **chi tiết dưới ~6px bề dày thì không tồn tại ở 260px** — hoặc phóng vật lên, hoặc bỏ chi tiết đó đi. (đợt 16)
- **XƯƠNG / HẠT / LÕI NẰM TRONG LÒNG MIẾNG = CHẤM GIỮA = CÁI MẶT.** Giả cầy vòng 2 đặt mặt cắt xương trắng vào giữa khối thịt: ba miếng thành ba viên có mắt. Chữa đúng như luật đợt 11 — **cho xương thành một MẤU LÒI HẲN RA NGOÀI đường bao**, và vẽ theo dáng **khớp xương hai mấu** chứ không phải hình tròn. Anh em với bẫy hạt sen trong trái nhãn ở cùng đợt này, và với viên chè trôi nước dưới đây. (đợt 16)
- **VIÊN TRẮNG + NHÂN TRÒN Ở GIỮA = QUẢ TRỨNG.** Chè trôi nước bổ đôi vòng 1 vẽ nhân đậu xanh thành khối tròn nằm giữa vành vỏ trắng — Thái: *"nhìn giống trứng gà quá"*. Chữa bằng luật đợt 11: **đẩy ruột LÊN TRÊN, chỉ chừa vỏ dày ở ĐÁY** thành "cái thuyền vỏ đỡ đống nhân", nhân là khối **vuông tròn góc** có mép trên gồ ghề và **chạm hẳn vào mép vỏ hai bên** — hết vành trắng bao quanh là hết trứng. (đợt 16)
- **ĐỪNG KHOÁ MÓN VÀO MỘT DỤNG CỤ CỤ THỂ NẾU MÓN KHÔNG BẮT BUỘC.** Bánh bèo vòng 1 vẽ và viết hẳn *"thìa tre"* — Thái nhắc món này thìa nào cũng ăn được. Đã đổi hình sang thìa sứ thường và sửa chữ thành *"lách thìa một vòng"*, thìa tre chỉ còn là câu phụ. **Phép thử: chi tiết này có phải điều kiện để món thành công không? Không thì đừng đưa nó lên `title`/`summary`/hình.** (đợt 16)
- **⭐ ĐỔI VẬT ĐỰNG THÌ ĐƯỢC — NHƯNG ĐƯỜNG BAO PHẢI CÒN CONG. Đây là chỗ đợt 16 tìm ra ranh giới của luật đợt 14.** Miến lươn bản 1 vẽ tô **thành thẳng đứng, miệng bằng thân** để cho khác hẳn 18 tô nông miệng loe của họ teal. Kết quả ở 260px: **không còn đọc ra cái tô nữa**, mà ra một đồ vật. Trả đường bao về dạng cong (vẫn sâu hơn tô phở) là ra ngay. **Luật rút gọn: đổi được tỉ lệ, đổi được độ sâu, đổi được chất liệu và màu men — nhưng cạnh thẳng và mặt phẳng lì là dấu hiệu của đồ vật, không phải của cái bát.** Cùng họ với cái giá của đòn bẩy hình khối ở đợt 15. (đợt 16)
- **Vật đựng CÓ QUAI thì quai phải NHỎ và BÁM SÁT THÂN.** Súp cua bản 1 vẽ quai chữ C to vòng rộng cho thật khác 18 cái tô — cả cụm lập tức đọc ra **cái tách trà**. Thu quai lại còn 2/3 và kéo sát vào thân thì mới ra chén súp. Quai vẫn là đòn bẩy tốt (không tô nào trên site có quai), chỉ là **liều lượng quyết định nó là chén ăn hay là tách uống**. (đợt 16)
- **MUỖNG / ĐŨA CẮM NGHIÊNG CHĨA LÊN = CÁI QUE.** Súp cua bản 1 cắm muỗng sứ nghiêng trong chén, ở 260px cán muỗng đọc thành một cái que hoặc cây kem. Hai cách chữa đều chạy: **gác ngang miệng chén**, hoặc **đặt hẳn xuống bàn làm đạo cụ**. So với đôi đũa đang gắp của bún mọc (đợt 14, đã duyệt) thì khác ở chỗ: đũa gắp có **vật đang được gắp** ở đầu nên đọc ra động tác, còn cán muỗng trơn thì không. **Muốn dùng động tác thì phải thấy thứ đang được gắp/múc.** (đợt 16)
- **DĨA LÓT DƯỚI CHÉN: ĐỪNG.** Chè trôi nước bản 3 đặt chén trên một cái dĩa lót cho khác mấy hình chè kia. Ở 260px cái dĩa không thêm được thông tin nào về món, mà lại làm cả cụm đọc ra **"chén đặt lệch trên dĩa"** — mắt đi tìm xem chén có ngay ngắn không thay vì nhìn món. Bỏ dĩa, đổi sang **chén sâu có chân đế** là xong. **Phép thử chung: đạo cụ nào không nói được điều gì về MÓN thì nó chỉ là chỗ cho mắt vấp.** (đợt 16)
- **ĐẦU SỢI CHĨA RA ĐỀU KHẮP ĐƯỜNG BAO = CON NHÍM.** Ổ mì xào giòn bản 1 cho đầu sợi mì chĩa ra tua tủa quanh cả vòm để tả cái giòn — ra đúng con nhím. Chữa: **chỉ cho nhô ra ở HAI MÉP, thưa, và dài ngắn khác nhau**; phần còn lại tả bằng **nét sợi dài chạy ngang chồng lớp**. Anh em với luật *"chấm rải đều = cái mặt"* (đợt 14/15): thứ gì rải **đều** quanh một hình đều biến nó thành con vật. (đợt 16)
- **VỆT SỐT NHỎ GIỌT XUỐNG DƯỚI ĐÁY KHỐI = CÁI CHÂN.** Cùng hình mì xào giòn, bản 2 vẽ ba vệt sốt chảy nhỏ giọt xuống chân ổ mì cho ra vẻ sánh — ba vệt đó thành ba cái chân, cả ổ đọc ra một con vật có mai. Chữa: **bỏ hết vệt nhỏ giọt**, và cho mảng sốt **lệch hẳn sang một bên** thay vì phủ tròn giữa. **Sốt tả bằng mép gồ ghề và vệt bóng, đừng tả bằng giọt chảy.** (đợt 16)
- **LUẬT "MỘT KHỐI" ÁP CHO CẢ ĐẠO CỤ, KHÔNG RIÊNG MÓN CHÍNH.** Kho quẹt bản 1 rải từng lát rau củ luộc cách nhau quanh dĩa — ở 260px đọc thành **"mấy lát rau bay lơ lửng trên một cái dĩa trống"**, đúng lỗi đợt 10 nhưng lần này nằm ở phần đạo cụ. Chữa y hệt: **vẽ một path khối liền làm nền đống trước, rồi mới đắp từng lát lên, lát nào cũng chồng mép lát khác.** Với món mà đạo cụ mới là thứ chiếm khung (kho quẹt: tộ bé, rau nhiều) thì đây là lỗi chí mạng. (đợt 16)
- **Ly/tô có CHÂN ĐẾ CAO trong họ chè = LY RƯỢU — dính lần thứ hai.** Chè hạt sen long nhãn bản 1 vẽ tô thủy tinh có chân, y như ly chè đậu đỏ ở đợt 13. Chữa cùng một cách: **bỏ chân, hạ chiều cao, nới bề ngang, đặt hẳn xuống mặt bàn**. Ghi lại lần thứ hai vì rõ ràng luật cũ chưa đủ mạnh: **trong họ tím, hễ định vẽ chân đế là dừng lại.** (đợt 16)
- **VẬT TRONG MỜ LỒNG VẬT ĐỤC: hạt bên trong phải NHỎ và LỆCH HẲN.** Trái nhãn trong mờ có hạt sen bên trong là chữ ký của chè hạt sen long nhãn, nhưng hai bản đầu đều đọc ra **quả trứng luộc** — vì hạt vẽ to và nằm gần tâm, thành đúng "vòng tròn + chấm giữa" (luật đợt 12/15). Chữa bằng cách vẽ **đúng thật hơn**: người ta đẩy hạt sen vào qua **lỗ khoét ở cuống**, nên hạt nằm **lệch hẳn xuống một phía và ló một phần ra khỏi lỗ**, lại còn nhỏ hơn trái nhãn nhiều. Thêm mấy **hạt sen rời** nổi quanh để phá cái lưới toàn hình tròn đều nhau. (đợt 16)
- **⭐ Đổi VẬT ĐỰNG thì được. Đổi CHỖ ĐỨNG CỦA NGƯỜI XEM thì KHÔNG.** Đây là bài học lớn nhất của đợt 14, và nó bác một nửa cái kế hoạch mà chính phần 2 đã kê ra. Họ teal đã cạn cách phân biệt bằng ruột, nên đợt 14 thử **bốn** khung hình mới cùng lúc. Kết quả Thái duyệt:
  - **Đổi vật đựng — ĐẬU HẾT:** chảo gang đen (cơm rang) · ống nứa nằm ngang (cơm lam) · một miếng tròn không vật đựng (cơm cháy) · hũ thuỷ tinh có nắp (cơm rượu) · bát sành nâu (bún ốc nguội).
  - **Đổi động tác — ĐẬU:** đôi đũa đang gắp viên mọc lên (bún mọc).
  - **Đổi góc nhìn — TRẢ LẠI CẢ HAI:** nhìn thẳng từ trên (bún ốc) → *"nhìn từ trên xuống kỳ quá"*; cắt cận cho tô tràn khỏi khung (bún sứa, bún mọc) → *"cái tô bị lệch, mất cạnh bên trái"*.
  - **Vì sao:** lưới `/mon/` xếp **104 ô cạnh nhau cùng một cỡ, cùng một khuôn**. Trong ngữ cảnh đó, quy ước "vật đựng nguyên vẹn, nhìn chếch từ trên" không còn là một lựa chọn thẩm mỹ mà đã thành **ngữ pháp của cả trang**. Ô nào phá quy ước đó thì người xem không đọc ra "một góc chụp khác", mà đọc ra **"hình này bị lỗi"** — nhất là cắt cận một bên, vì mắt tìm ngay cái cạnh bị thiếu. Còn đổi vật đựng thì vẫn nằm trong ngữ pháp cũ, chỉ thay danh từ.
  - **Kết luận cho đường tới 200:** đòn bẩy thật sự còn lại là **vật đựng + động tác + ruột**, không phải góc máy. Vẫn đủ dùng — nhưng phần 2 mục 2 phải đọc theo nghĩa đã sửa này.
- **Đồ ăn TRONG MỜ phải vẽ bằng fill nửa trong, đừng vẽ bằng màu nhạt.** Miếng sứa tô trắng đục ở 260px đọc ra **hòn sỏi**; để `opacity=".64"` cho lớp rau xanh bên dưới ló qua thì lập tức ra miếng sứa. Đây là luật chung cho mọi thứ trong suốt — cùi bưởi, bánh lọt, thạch. (đợt 14)
- **Chấm tròn rải đều trên một khối tròn = CÁI BÁNH QUY; nét cong rải thưa = CÁI MẶT CƯỜI.** Viên mọc mất ba vòng mới xong: chấm tròn đều → bánh quy chấm sô-cô-la; đổi sang mấy nét cong → hai nét trên thành lông mày, nét dưới thành miệng; đổi sang **mảnh GÃY GÓC, nhiều, kích thước khác nhau, rải LỆCH hẳn về một phía** mới đọc ra viên giò trộn mộc nhĩ. Ba việc phải làm cùng lúc: **gãy góc · nhiều · lệch**. (đợt 14)
- **Đồ ăn nhô lên khỏi vành tô phải CHỒNG MÉP lên vành, đừng để nổi tự do.** Bún sứa bản 1 vẽ đống đồ lơ lửng trên vành, mấy dải sứa trắng tách khỏi khối và nổi trên nền teal — đọc thành **mấy cái lông chim bay**. Cùng luật "món ăn phải là MỘT KHỐI" của đợt 10, nhưng lần này lỗi nằm ở chỗ tiếp giáp với **vật đựng** chứ không phải giữa các miếng với nhau. (đợt 14)
- **Nắm cơm/nắm nếp vo chặt thì mặt gần NHẴN, chỉ gợn hạt.** Viên cơm rượu bản 1 mượn cách vẽ "hạt nếp nhô hẳn ra đường bao" của xôi xéo — ra **bỏng ngô**. Xôi xéo là gò xôi xới tơi nên hạt phải lởm chởm; viên cơm rượu là nắm **vo chặt trong lòng bàn tay** nên chỉ được gợn. Cùng nguyên liệu, khác cách làm ⇒ khác đường bao. (đợt 14)
- **Nhưng đạo cụ đó KHÔNG được to hơn nồi.** Lẩu bò nhúng giấm vòng 1 vẽ cái cuốn bánh tráng dài hết khung → đọc thành khúc dồi trắng; vòng 2 cho cuốn dựng đứng chổng mặt cắt lên → đọc thành mấy ống giấy. Vòng 3 mới đúng: **trả nồi về làm vật chính** như sáu nồi kia, cuốn hạ xuống cỡ đạo cụ, và **mượn đúng cách vẽ đã duyệt của `ArtGoiCuon`** (cuốn nằm ngang, nhân hiện xuyên qua vỏ, cọng rau ló ra một đầu, có giường xà lách lót dưới cho vỏ trắng khỏi chìm vào dĩa kem). Lại một lần nữa: **mượn bố cục đã duyệt rẻ hơn nghĩ bố cục mới.** (đợt 13)

**Đo đạc**
- **Đo dung lượng trên máy chủ** (`curl -H 'Accept-Encoding: gzip'`), đừng `gzip -c` ở máy — số ở máy thiếu ~2%.
- **Nhưng ĐỪNG đo lại mỗi đợt, và TUYỆT ĐỐI không đẻ một commit riêng chỉ để điền con số** (Thái nêu 2026-07-31). Vì phải deploy xong mới đo được máy chủ, thói quen cũ khiến **mỗi lần ship thành 2 commit** — đã xảy ra 5 lần (`f974a0e` · `8c5ea51` · `f9a61c6` · `aca6f38` · `31fd085`). Luật mới:
  - **Mặc định: không đi đo, không commit thêm.** Ghi thẳng số cục bộ **× 1,02** vào chính commit của đợt, và **luôn ghi rõ số đó lấy kiểu gì** ("ước từ cục bộ" / "đo trên máy chủ").
  - **Chỉ bỏ công đo thật khi con số còn nói được điều gì mới**: có thay đổi cấu trúc (thêm loại tài nguyên, nhúng lại nội dung vào trang), tới mốc tròn (100 món), hoặc khi số ước nhảy khác dự đoán.
  - **Lúc có đo thật thì gộp vào commit thực chất kế tiếp**, đừng đứng một mình.

  > **Vì sao ×1,02 là đủ — nay đã có NĂM điểm dữ liệu, luật đứng vững:** lệch cục-bộ ↔ máy-chủ luôn cùng chiều và cùng cỡ, cục bộ luôn *thấp hơn*: **+2,1% · +1,6% · +1,7% · +1,57% · +2,49%**. Hệ số thật nằm trong khoảng **1,016–1,025**, nên ×1,02 sai **luôn dưới 0,5%** về cả hai phía (đợt 14: ước 33.764 B vs đo thật 33.925 B, lệch **0,47%** — lần đầu ước THẤP hơn thật, mà vẫn trong ngưỡng). Lần thứ tư (đợt 13): cục bộ 31.183 B → ước 31.807 B → đo thật **31.674 B**, lệch **0,42%**. Con số này chỉ phục vụ đúng một luận điểm — *"dung lượng thôi tăng theo số món"* — nên sai 2% không đụng gì tới kết luận. *(Chốt thoát vẫn giữ: nếu lần nào đó số ước lệch quá 3% thì bỏ luật này, quay lại đo thật.)*
  >
  > **Cách đo ĐÚNG luật, rút ra ở đợt 13:** gộp `curl` đo dung lượng vào **cùng loạt curl kiểm production sau khi deploy** (kiểm trang 200, kiểm chip lọc, kiểm số món…). Làm vậy thì phép đo gần như miễn phí và **không đẻ ra chuyến đi riêng nào** — chỗ sinh ra thói quen 2-commit chính là coi việc đo như một việc tách rời.
- **Phân vân giữa các phương án giao diện thì dựng harness iframe rồi đo `getBoundingClientRect()`**, đừng bàn cảm tính.
- **Contact sheet không đủ để soi hình** — phải render PNG ghép ở cỡ thumbnail (`npm run art-png -- --sheet`). Đợt 7, 8, 9, 10 đều có lỗi lọt qua contact sheet.
- **⭐ `icon: plate` KHÔNG TỒN TẠI TRONG SPRITE — 7 món cũ đang render icon RỖNG.** `_template.yaml` liệt kê `plate` trong danh sách icon có sẵn, nhưng `Sprite.astro` **không có `ic-plate`**, mà `Icon.astro` thì cứ xuất `<use href="#ic-plate"/>` nên trình duyệt vẽ ra khoảng trắng. `npm run qa` không bắt (nó chỉ soi id hình, không soi id icon). Dính ở: `bun-oc-nguoi` · `ca-tim-nuong-mo-hanh` · `chao-luon-nghe-an` · `com-lam` · `xoi-ngu-sac` · `xoi-gac` · `suon-xao-chua-ngot`. **Đợt 16 đã tránh (đổi sang `bowl`/`basket`/`roll`), 7 món cũ thì CHƯA SỬA** — việc nhỏ, một dòng mỗi món. Hai cách chữa: sửa 7 món, hoặc thêm hẳn `ic-plate` vào sprite (đúng hơn, vì cái tên đó hợp lý). **Và nên thêm một phép kiểm icon vào `qa` cho khỏi tái diễn.** (đợt 16)
- **Render thử NGAY SAU NHÓM HÌNH ĐẦU TIÊN — đợt 16 đo được cái giá của việc này.** Nhóm 5 hình đầu (mắm chưng, súp cua, miến lươn, chè trôi nước, chè sen) phải đi **4 vòng** mới xong, vì mấy lỗi hệ thống (thành thẳng đứng, chân đế cao, cụm quá nhỏ so với khung) chỉ lộ ra khi render. Nhóm 6 hình sau, vẽ với mấy bài học đó trong đầu, chỉ mất **2 vòng**. Nếu vẽ hết 11 rồi mới soi thì cùng ngần ấy lỗi sẽ lặp lại ở cả 11. (đợt 16, xác nhận lại luật đợt 13)
- **Render thử NGAY SAU NHÓM HÌNH ĐẦU TIÊN, đừng vẽ hết rồi mới soi.** Đợt 13 vẽ 5 món chè rồi render liền: **4/5 sai** — trái bưởi đọc thành quả bơ có hột, củ khoai môn thành hòn đá, nồi chè quá nhạt thành bát cháo yến mạch, ly chè đậu đỏ thành ly champagne. Sửa xong mới vẽ tiếp 8 hình còn lại, và 8 hình đó chỉ còn **1 lỗi**. Vẽ hết 13 rồi mới soi thì cùng ngần ấy lỗi hệ thống sẽ lặp lại ở cả 13. (đợt 13)
- **Tiền tố id hai chữ cái là ĐỤNG, không phải có thể đụng.** Đợt 13 dính **5 lần trong một đợt**: `bb` đụng `ArtBunBo`, `bd` đụng `ArtCanhBiDo`, `cc` đụng `ArtCanhCua`. Với 99 file hình thì hai chữ cái đã hết chỗ — **đặt tiền tố 3 chữ trở lên**. `npm run qa` bắt hết cả 5 nên không có gì lọt ra, nhưng biết trước thì đỡ một vòng sửa. (đợt 13)
- **File `.svg` rời đọc bằng XML nghiêm** — chú thích cấm chứa `--`, cấm `&` trần. Endpoint tự bỏ chú thích; `qa` chặn hai lỗi kia. **Tool soi phải đọc đúng thứ endpoint xuất ra.**
- **~~Quét giá trị màu bằng tay~~ — `npm run qa` LÀM RỒI từ đợt 11.** Ký tự ngoài ASCII lọt vào mã hex (`#3E1F४8`) thì SVG vẫn parse, hình vẫn hiện, build xanh — chỉ có màu là **im lặng rơi về mặc định**; đợt 11 dính bốn lần và chỉ bắt được nhờ tình cờ soi lại. Nay `check-art-ids.mjs` chặn mọi `fill`/`stroke`/`stop-color` không phải **hex 6 · `none` · `rgb/rgba` · `url(#id)`**. Màu đặt tên (`red`, `white`) cũng bị chặn có chủ đích — bảng màu nằm ở `tokens.css`, đừng đẻ tên màu rời rạc trong hình.
- **"Nằm trên màn hình đầu" là thứ PHẢI ĐO, không được suy.** Lưới món trang chủ trông như ở gần đầu trang, thật ra hồi đó bắt đầu ở **1165px** — không ô nào lọt màn hình đầu ở mọi khung thường gặp. Một dòng `getBoundingClientRect().top` là biết, mà không đo thì đẻ ra cả một việc sai. *(Rút hero 2026-07-30 kéo xuống còn **1006px** — vẫn chưa lọt màn hình đầu; muốn lọt phải làm tiếp bản C.)*
- **Trước khi tối ưu ảnh, xem phần tử LCP có phải ảnh không.** Trang chủ có LCP là chữ `<h1>`; **`<svg>` nhúng thẳng không phải ứng viên LCP** (chỉ `<img>`, `<image>` trong svg, poster video, `background-image`, và khối chữ mới là). Ứng viên LCP do bố cục quyết định chứ không do mạng — nên kết luận đó đúng ở mọi tốc độ, dù con số mili giây đo ở máy thì vô nghĩa.
- **Khai thừa `@font-face` KHÔNG tốn request.** Trình duyệt chỉ tải những face mà nội dung thật sự khớp — khai 24 face mà chỉ dùng 15 thì vẫn chỉ tải 15. Cắt bớt danh sách nét là chuyện gọn gàng, **không phải chuyện hiệu năng**; đừng lấy "bớt request" ra biện minh.
- **Nghi hai bản khác nhau thì DỰNG CẢ HAI CẠNH NHAU rồi so chữ ký hình học**, đừng so bằng mắt và đừng so với trí nhớ. Cách làm: build bản A, `cp -R dist dist-old`, sửa, build bản B, chạy hai máy chủ hai cổng (`astro preview` và `python3 -m http.server`), rồi lấy `getBoundingClientRect()` + `getComputedStyle()` của một dãy phần tử ở cả hai bên nối thành một chuỗi mà so. Trùng khít tới 2 số lẻ thì kết thúc tranh luận. Cũng đếm luôn `[...document.fonts].filter(f => f.status === 'loaded')` — đó mới là số font **thật sự tải**, khác hẳn số face khai báo.
- **Đo bố cục thì phải NẠP HẲN FONT rồi mới đo — `document.fonts.ready` KHÔNG đủ.** Nó chỉ hứa "hết việc đang chờ", mà font Google có thể chưa kịp được yêu cầu lúc nó resolve. Đo mà không nạp hẳn thì **mỗi iframe rơi vào một trạng thái font khác nhau**, số nhảy **±16px** giữa hai lần chạy và có lần còn đảo thứ tự hai khung màn hình — tưởng là hiệu ứng bề rộng, thật ra là nhiễu. Cách đúng: `await Promise.all([...].map(f => d.fonts.load(f)))` liệt đủ các nét thật sự dùng, rồi mới `fonts.ready`, rồi mới đo. **Kiểm bằng `[...d.fonts].filter(f => f.status === 'loaded').length` — phải ra đúng 15 và giống nhau ở mọi khung.**
- **Chênh lệch giữa hai bản thì đáng tin hơn con số tuyệt đối.** Đợt hero: mockup báo 990/1293, bản ship thật đo lại ra 1006/1309 — lệch đều 16px vì nhiễu font ở trên, nhưng **phần bớt được (−158 / −315) thì trùng khít**, vì hai bản cùng đo trong một điều kiện. Khi số tuyệt đối và số chênh lệch mâu thuẫn nhau, tin số chênh lệch.
- **Soi thứ đã build, đừng gọi lại hàm sinh ra nó.** `link-audit` đọc HTML trong `dist/` chứ không gọi `relatedFor()`: gọi lại chính hàm đó rồi đo là tự chấm điểm mình, hỏng ở khâu dựng trang thì không thấy.
- **⭐ TẮT `content-visibility` TRƯỚC KHI ĐO — nếu không, mọi vị trí nằm dưới lưới món đều là mục tiêu di động.** `.rcard` để `content-visibility:auto`, nên thẻ ngoài khung nhìn chỉ mang chiều cao ước lượng của `contain-intrinsic-size`. Hệ quả: đo `top` của một mục ở cuối trang, rồi kéo iframe lên để chụp mục đó — chính cú kéo ấy đổi khung nhìn, thẻ tính lại chiều cao thật, và con số vừa đo sai ngay vài trăm px. Lần này lệch **482px**, khung chụp rơi trúng phần tiêu đề chứ không phải thứ cần xem, và mất 4 vòng mới hiểu. Chèn `.rcard{content-visibility:visible!important}` vào iframe trước khi đo là hết. Chiều cao của **bản thân** một khối thì không dính (nó tự tính), chỉ **vị trí** mới dính.
- **So hai bản build thì `src` của iframe phải mang tham số phá cache.** Build lại rồi `cp -R dist harness/moi/` nhưng `src` vẫn là `./moi/index.html` ⇒ trình duyệt trả bản cũ, và không có dấu hiệu nào báo: số đo vẫn ra đẹp, chỉ là số của bản trước. Mất một vòng đo tưởng "sửa mà không ăn thua". Thêm `?cb=<v>` vào `src`.
- **Hai bản build phục vụ từ hai thư mục con thì `/_astro/…` gãy hết.** Astro nhúng đường dẫn tuyệt đối, nên `harness/cu/index.html` đi tìm `/_astro/Base.<hash>.css` ở **gốc máy chủ**, không phải trong `cu/`. CSS 404 im lặng ⇒ đo trang **không có style**. Dấu hiệu nhận ra: số vô lý kiểu một nhóm 7 chip cao **2711px** (icon SVG về kích thước gốc). Chữa: `cp -R cu/. harness/ && cp -R moi/. harness/` — tên file có băm nên hai bản không đè nhau, chỉ file giống hệt mới trùng tên.
- **Tab của tiện ích Chrome chạy ở NỀN nên `setTimeout` bị bóp còn ~1 lần/giây.** Vòng lặp "đợi tới khi số đứng yên" 40 nhịp × 60ms tưởng là 2,4 giây, thật ra thành **40 giây mỗi khung** — 9 khung là chờ 6 phút. `getBoundingClientRect()` tự ép tính lại bố cục, nên đọc lại bằng microtask (`await Promise.resolve()`) là đủ, khỏi cần hẹn giờ. (Cùng họ với luật `scroll-behavior:smooth` ở trên: thứ gì cần rAF thì ở tab nền đều hỏng.)

**Ô tìm kiếm**
- **KHÔNG đưa `summary` vào chỉ mục tìm kiếm.** Summary là văn xuôi và cố ý nhắc tên món khác ("cùng họ với canh chua cá lóc") — gộp vào thì gõ đúng tên món này lại lòi ra món kia. Chỉ lấy **tên món · miền/kiểu món/dịp · nguyên liệu**, mỗi thứ một trường riêng.
- **Xếp hạng chứ đừng lọc.** Tiếng Việt bỏ dấu thì âm tiết ngắn và đụng nhau dày đặc ("ca" nằm trong cà/canh/cay/cải) — mọi phép bật/tắt đều sẽ ra hoặc quá nhiều hoặc quá ít. Cái quyết định chất lượng là **thứ tự**, không phải ngưỡng.
- **Khớp theo ÂM TIẾT, không theo chuỗi con.** Và chỉ chữ **cuối** — chữ đang gõ dở — mới được khớp đầu chữ; các chữ trước phải khớp trọn âm tiết, không thì "ca kho" lôi cả "canh khổ qua" về.
- **Hai trường phải bỏ dấu giống hệt nhau ở cả hai đầu** (`src/utils/search.ts` lúc build và bản chép trong `mon/index.astro` lúc chạy). Lệch một nét là tìm trật mà không có gì báo.
- **Chia nhóm bằng câu hỏi "có trúng tên món không", đừng bằng con số ngưỡng.** Đo trên 64 món: nhóm trúng tên luôn cao hơn nhóm chỉ-có-trong-nguyên-liệu **ít nhất 8 điểm**, không món nào ngoại lệ — nên phép thử thẳng vừa gọn vừa khỏi phải chỉnh tay khi thêm món.
- **Xếp lại DOM thật, đừng dùng CSS `order`** — `order` chỉ đổi chỗ về mặt nhìn, phím Tab vẫn đi theo thứ tự cũ.

**Sinh liên kết tự động**
- **Chọn bằng XOAY VÒNG, đừng lấy N món đầu khối.** Cùng một trục "cùng vùng", lấy 3 món đầu khối để lại **38/64 món mồ côi** và **44 món có dải y hệt món khác**; xoay vòng đưa cả hai về **0** mà không tốn gì. Luật này đúng cho mọi thứ sinh danh sách từ một khối đã sắp thứ tự.
- **Trộn nhiều trục, đừng dùng một trục.** Một trục thì catalog vỡ thành đảo (cùng vùng → 3 mảnh, cùng kiểu món → 7 mảnh); trộn ba trục cho một mảnh liền.
- **Nhãn phải đi theo TỪNG THẺ, không gom thành tiêu đề nhóm cứng.** Số món mỗi trục co giãn theo món (Tây Bắc chỉ 2 món nên trục vùng chỉ ra 1 thẻ) — tiêu đề nhóm cứng sẽ có lúc nói sai.
- **Vòng lần lượt qua các nhãn, đừng vét cạn nhãn đầu.** Vét cạn thì ra ba thẻ liền nhau cùng một chip, đọc như trang bị lỗi lặp; vòng lần lượt còn kéo in-degree từ 2–13 về **3–11**.

---

# 5 · Nhật ký

Chuyện đã qua, xếp theo thứ tự thời gian.

## Tổng kiểm định nội dung toàn site — 2026-08-01

**Chuyện gì:** rà cả 126 món + mọi trang (9 vòng đọc độc lập 100% từng dòng, ~120 lượt WebSearch kiểm chứng; mọi phát hiện nặng đối chiếu lại nguyên văn). Ra ~12 cụm BLOCKER · ~30 HIGH · ~45 MEDIUM · ~55 LOW; 18 món sạch tuyệt đối. **Thái ủy quyền sửa toàn bộ** — đã sửa xong trong ngày (8 vòng sửa theo nhóm + vòng chốt), các luật rút ra ghi ở phần 4 mục *"Chính xác & trung thực"*.

**BLOCKER đã sửa:** Obama trong story bún chả (luật danh nhân) · "khói than/thơm khói" ở eyebrow+ticker bún chả và title+ticker+eyebrow cơm tấm (thân bài tả kỹ thuật than hoa thì GIỮ — đó là ranh giới của luật) · "đường Nguyễn Du" trong bún bò Huế → "quanh chợ Đông Ba" · mì vịt tiềm kê "kỷ tử 10 g · trần bì 5 g" → gộp về gói tiềm + "một nhúm", chữ "vị thuốc" trong steps → "mùi túi gia vị" · 5 câu dinh dưỡng/đông y ("hạ hỏa", "'hạ nhiệt' cả người", "bù phần đạm", "đủ tinh bột đạm", "đủ đạm") · ticker trang chủ hết từ nghề trơ ("giấm bỗng", "tôm chấy cam ruộm") · **bug RSS**: `plain(title)` giữ nguyên câu quảng → `dishName(title)`; JSON-LD `name`/`keywords[0]` cũng chuyển sang tên món trần.

**Các quyết định ranh giới (Thái ủy quyền, ghi lại để khỏi cãi lại):**
- **"Phố Nam Bộ" (bún bò Nam Bộ): GIỮ như ngoại lệ có chủ đích** của luật tên phố — tên phố chính là từ nguyên của tên món, phố mang tên *vùng* chứ không phải danh nhân, thuyết có thật (Tuổi Trẻ/Znews: quán vỉa hè KS Đồng Lợi, phố Nam Bộ — nay là Lê Duẩn, thập niên 1980). Đổi sang **giọng thuyết ngay từ câu đầu** ("có một thuyết được nhắc nhiều…"), hết kiểu khẳng-định-trước-rào-sau. Ca "Lã Vọng" KHÁC ca này (tên nhân vật) — câu đó vẫn treo chờ Thái.
- **"Lành xương" bị bỏ** (cá thu, bún sứa) dù là chữ đợt 16 mới đưa vào khi sửa luật 5: không tra ra nguồn nào dùng → luật 4 thắng. Thay bằng "xương to dễ gỡ" / "ít xương" — vừa có thật vừa tả-bằng-cái-có.
- **Cảnh báo an toàn viết bằng lý do bếp núc, không chữ y khoa**: "không tốt cho sức khỏe" (canh gà lá giang — cảnh báo nồi nhôm CÓ CĂN CỨ, giữ khuyến cáo, đổi lý do thành "chát, xỉn màu, mau hỏng nồi") · "(dị ứng)" trong FAQ bún riêu → "người không ăn được cua".
- **"Thảo mộc" + "táo tàu" ở title/summary mì vịt tiềm: GIỮ** — là mùi hương/nguyên liệu thực phẩm, không phải tên vị thuốc hay công dụng; "chuẩn vị" (trang chủ + /mon/): GIỮ — cách nói thể loại, đồng bộ với nhãn flavorNote sẵn có; "Từng bước đã nấu thử" → "Từng bước viết cặn kẽ" (claim không kiểm chứng được từ repo).
- **FAQ cơm rượu**: bỏ "trẻ nhỏ ăn một hai viên thì bình thường" → nói rõ có cồn nhẹ, "tuỳ nhà cân nhắc, nếu cho nếm thì chút ít từ hũ mới ủ". Cánh gà chiên nước mắm (gắn "Cho bé"): đảo mặc định "nước gừng (hoặc rượu trắng)".
- **Biên tập nhãn/vùng**: miến xào cua `Cả nước → Miền Bắc` (cả bài neo cỗ Bắc + cua bể → Bắc 28, Cả nước 24); cơm gà Hội An `Bữa sáng → Cơm nhà` (nguồn đều tả món trưa/chiều); cơm rượu bỏ `Cỗ Tết` (món Đoan Ngọ, giữ `Ăn chơi`). **Chưa đụng**: chà bông đứng ở kiểu món "Xào", lòng heo luộc ở "Hấp" — lệch nhãn thật nhưng đổi category là việc cấu trúc (đụng họ màu/thống kê), để Thái quyết riêng.
- **Cà cuống (bánh cuốn)**: giữ như nét tư liệu hoài cổ, thêm đúng một chữ "(nay chủ yếu là cà cuống nuôi hoặc tinh dầu pha sẵn)" — cà cuống nằm trong Sách đỏ, không viết như gợi ý săn mua.

**Sai-sự-thật đáng nhớ đã chữa (để đợt sau đừng lặp):** bò nướng lá lốt **tráo thuộc tính hai mặt lá ở 6 chỗ** (mặt trên lá lốt = sẫm VÀ bóng, quay ra ngoài; mặt dưới nhạt + gân nổi mới là mặt đặt nhân — tra rồi mới tả, đừng suy "sẫm = trong") · FAQ cá lóc nướng trui xếp **cá trê** vào nhóm "có vảy" (cá trê da trơn!) · bún mọc tả sai **chả quế** (giò sống TRỘN quế rồi nướng, không phải giò lụa quét quế) · "thì là = dấu nhận biết chả cá miền Trung" (ngược — đó là chữ ký Bắc) · ca dao gà kho gừng **đảo vế** ("chén muối đĩa gừng" mới đúng) · gỏi cuốn **lệch toán tôm** (12–16 con nhưng cần 30 → 2 nửa tôm/cuốn, cỡ 18–20 con) · "nếp cẩm hạt dài" (tranh cãi cẩm/than, nguy cơ hướng dẫn mua sai) · lệ cỗ Bắc "bốn bát bốn đĩa" không có đĩa miến xào (miến nằm ở bộ BÁT, dạng nấu).

**Từ tự chế bắt được đợt này** (thêm vào án lệ "sựt răng"): "nếp bà bóng" · "đặc đà" (×2 file) · "bột bạt" · "chiên phao" (×3 chỗ, lọt cả ticker) · "mịn tưng" · "cam ruộm" (×15 chỗ, lọt cả title + ticker trang chủ) · "lành xương" (×3). Bài học: từ tự chế lan NHANH giữa các file cùng đợt — bắt ở bài đầu rẻ hơn nhiều.

## Đã hoàn thành

- [x] 35 món, mỗi món một file YAML (`src/content/recipes/`) với bản nấu nhanh, giỏ đi chợ tự tính khẩu phần, đồng hồ đếm giờ trong từng bước, bí quyết và FAQ
- [x] Hình minh họa SVG vẽ riêng cho từng món (`src/components/art/`)
- [x] Đợt lớn 2026-07-28 (14 món): phở gà, hủ tiếu Nam Vang, bún thịt nướng, phở khô Gia Lai, cơm chiên cá mặn, gỏi xoài xanh tôm khô, gỏi gà bắp cải, gà nướng mắc khén, mực xào thơm cần tây, sườn ram mặn ngọt, cà ri gà, tôm rim nước cốt dừa, bánh cuốn nóng, trứng chưng thịt nấm mèo
- [x] Mở vùng mới **Tây Bắc** + **Tây Nguyên** và kiểu món mới **"Nướng"**
- [x] Đợt 6 (2026-07-29, 6 món): miến gà, mì vịt tiềm, miến xào cua, mì xào bò, bún đậu mắm tôm, bún bò Nam Bộ — kèm đổi tên **"Món sợi" → "Món nước"** và mở kiểu món **"Bún trộn"**
- [x] Đợt 7 (2026-07-29, 6 món): lẩu mắm, lẩu gà lá é, lẩu Thái, cháo lươn Nghệ An, cháo gà, cháo lòng — mở **hai** kiểu món mới **"Lẩu" + "Cháo"**, và nâng trang chủ từ 9 lên **12 món nổi bật**
- [x] Đợt 8 (2026-07-29, 6 món): bánh tráng cuốn thịt heo Đà Nẵng, cơm hến Huế, bánh khoái Huế, mắm ruốc xào thịt ba chỉ, bún chả cá, bún mắm nêm — **không mở kiểu món mới**, kéo Miền Trung 5 → **11 món**
- [x] Đợt 9 (2026-07-29, 5 món): bún đỏ Buôn Ma Thuột, pa pỉnh tộp, bò một nắng, cá lóc nướng trui, ốc len xào dừa — **không mở kiểu món mới**, gỡ ô mỏng cuối cùng (**Nướng 1 → 4**), Miền Tây 5 → 7, Tây Nguyên 1 → 3
- [x] **Đợt 12 (2026-07-31, 11 món)** — Thái chọn món rồi giao: **bánh mì thịt · bánh mì chả cá Nha Trang · bánh mì heo quay · heo quay da giòn · xôi xéo · xôi mặn Sài Gòn · bánh ướt chả lụa · bánh ướt lòng gà Đà Lạt · bánh ướt tôm chấy Huế · cá thu sốt cà chua · cá nục sốt cà**. Mở kiểu món **"Bánh mì"** (đợt đầu tiên đụng đủ 8/8 chỗ), thêm icon `ic-bread` vào Sprite, đưa **bánh mì thịt lên trang chủ** (order 7) và bỏ featured của mì Quảng để giữ đúng 12 ô phủ 7/7 vùng.
- [x] **Đợt 13 (2026-07-31, 13 món)** — Thái nêu 10 món, rồi chốt **làm cả hai bản** ở ba chỗ; sau vòng duyệt thì bỏ 1 món và thêm 1 món khác, chốt lại 13: **chè bưởi · chè bà ba · chè Thái · chè đậu xanh bột báng · chè đậu đỏ · lẩu dê nấu chao · lẩu dê nhúng mẻ Ninh Bình · lẩu bò Đà Lạt · lẩu bò nhúng giấm · bò xào bông thiên lý · khổ qua xào trứng · canh cà chua trứng · cua hấp bia**. Catalog **82 → 95 món**, chỉ còn 5 món là tròn 100.

  **Vòng duyệt của Thái (2026-07-31) — 10 góp ý, đã xử lý hết:**
  - **Bỏ hẳn "chè đậu xanh đánh"**, thay bằng **chè Thái** (gốc Thái Lan, sang Việt Nam thì bỏ siro hoa hồng thay bằng sầu riêng + mít — cùng kiểu tiền lệ với *lẩu Thái kiểu Việt* đã có).
  - **Chè bưởi bỏ địa danh "An Giang"** khỏi tên và khỏi phần chuyện (Thái đúng: món này không riêng của An Giang, Vĩnh Long cũng nổi), slug đổi `che-buoi-an-giang` → `che-buoi`. **Nhưng KHÔNG đổi "cùi bưởi" thành "vỏ bưởi"** như Thái gợi ý — *vỏ bưởi* là cả lớp vỏ **kể cả phần xanh**, mà phần xanh chính là thứ đắng phải gọt bỏ; gọi vậy là người đọc nấu sai ngay khâu đầu. Chữa đúng chỗ Thái khó chịu là **bỏ chữ "cùi trong" khỏi title** và **chú giải "cùi = lớp trắng dày nằm giữa vỏ xanh và múi" ngay lần xuất hiện đầu tiên**.
  - **Chè bà ba: title đổi sang lối có dấu hai chấm** — *"Chè bà ba: 3 thứ khoai, một nồi cốt dừa"*, cho khỏi đọc dính hai chữ "ba". Việc này **lòi ra một lỗi có sẵn trong `dishName()`**: hàm cắt dấu phẩy/gạch cuối phần tên nhưng **không cắt dấu hai chấm**, nên thẻ món sẽ hiện "Chè bà ba:" cụt lủn. Đã thêm `:` `;` vào regex — sửa ở hàm chứ không né bằng cách đổi title.
  - **Chè bà ba bỏ khói** (tra lại: ăn nóng hay để ngăn mát ăn lạnh đều đúng — nhưng **đừng bỏ đá viên**, đá tan làm nhạt cốt dừa). Nội dung đã viết lại theo cả hai cách ăn.
  - **Chè đậu đỏ bỏ hết đoạn Thất tịch / mùng 7 tháng 7**, thay bằng chuyện kỹ thuật (rim đường trước khi chan nước).
  - **Lẩu dê nấu chao: lửa bếp cồn đổi từ XANH sang VÀNG CAM.** Lửa cồn lỏng cháy sạch thì đúng là xanh, nhưng bếp lẩu ngoài hàng dùng cồn khô, cháy vàng cam — vẽ vàng cam vừa đúng thứ người ta thấy thật vừa ăn với nền họ màu ấm.
  - **Lẩu bò Đà Lạt: đổi "sương xuống" thành mưa Đà Lạt** (Thái nêu — món này ăn trời mưa cũng ngon).
  - **Ba hình vẽ lại:** ① *chè bưởi* bỏ cây muỗng cắm giữa ly (không đứng nổi như vậy ngoài đời) và bỏ 3 viên cùi rời trên bàn (tách khỏi ngữ cảnh thì đọc thành cục vuông vô nghĩa); ② *bò xào bông thiên lý* vẽ lại lát bò — đường bao phải **gãy khúc lam nham** chứ bo tròn là ra cái hạt, cộng mép cuộn lộ mặt trong nhạt màu + vệt cháy sém; ③ *canh cà chua trứng* vân trứng vẽ lại bằng **NÉT MẢNH** thay vì khối dày — khối dày thì đọc thành miếng trứng chiên.
  - **Khổ qua xào trứng vẽ lại từ đầu sau khi tra lại thành phẩm thật** — hai lỗi gốc: (a) **sai tỉ lệ màu**, bản 1 lấy mảng trứng vàng làm khối chính, thật ra *"đĩa xào khô ráo, khổ qua giữ màu xanh mướt, quyện với trứng mềm xốp"* tức **xanh mới là chính**; (b) **sai hình lát**, bản 1 vẽ khoanh **tròn kín có lỗ giữa** nên đọc thành khoanh hành tây chiên — khổ qua xào là bổ dọc, nạo ruột, thái ngang, ra lát **lưỡi liềm HỞ một bên**.

  Ba chuyện đáng ghi lại của đợt này:

  1. **Mở kiểu món "Chè" kéo theo mở HỌ MÀU THỨ SÁU** — lần đầu một đợt đụng **9 chỗ** thay vì 8 (thêm `tokens.css`). Chè là kiểu món đầu tiên tách theo *vị* chứ không theo hình thức hay cách nấu, nên nó cũng phải là mảng màu lạc ra khỏi năm họ cũ: **"Ngọt & mát", tím sen `#5E3A6E`** — hệ màu duy nhất chưa dùng. Lý lẽ đầy đủ ở phần 1.
  2. **"Làm cả hai bản" là cách chọn món rất được.** Ba cặp (dê chao ↔ dê mẻ · bò Đà Lạt ↔ bò nhúng giấm · đậu xanh đánh ↔ đậu xanh bột báng) tra một lần dùng được hai, mỗi cặp tự nó thành một bài so sánh vùng miền, và ba bản "kia" kéo được Miền Bắc ×2 + Tây Nguyên ×1 mà không phải đi tìm món mới.
  3. **Render thử sau nhóm hình đầu tiên đã cứu cả đợt.** Vẽ xong 5 món chè, render ngay ở 260px: **4/5 sai**. Sửa xong mới vẽ 8 hình còn lại — và 8 hình đó chỉ còn 1 lỗi phải làm lại (lẩu bò nhúng giấm, mất 3 vòng). Bốn lỗi của nhóm chè đều là **lỗi hệ thống**, nếu vẽ hết 13 rồi mới soi thì chúng đã lặp ở cả 13. Luật đã ghi vào phần 4.

  Còn một chỗ **cố ý chưa chữa, để lại cho đợt sau**: bốn món cuối đợt (bò xào bông thiên lý, khổ qua xào trứng, canh cà chua trứng, cua hấp bia) đều thật sự là món **cả nước nấu**, gán vùng nào cũng là bịa — nên **"Cả nước" lên 23/95 (24%)**, chỉ còn kém Miền Nam một món. Đã ghi cảnh báo ở bảng vùng miền phần 1.

  > **Ba chỗ đáng ghi lại.** ① Bộ ba bánh ướt hoá ra nằm ở **ba vùng khác nhau** chứ không phải đều là món Nam như tưởng lúc chọn — **tôm chấy là món Huế**, lòng gà là món Đà Lạt; nhờ vậy Tây Nguyên lên 4 và Miền Trung lên 15. ② **Hình phải đi qua BA vòng duyệt** — vòng 1 tôi tự trả lại 4/11, vòng 2 Thái trả lại **9/11**, chỉ bánh mì thịt và bánh mì chả cá đi thẳng. Cả chín cái đều lọt `qa` sạch trơn vì đây là lỗi *đọc ra cái gì*, không phải lỗi cú pháp. Chỗ đáng nhớ nhất: **bốn trong chín cái sai vì tôi chưa đi tra món đó trông ra sao** — bánh ướt lòng gà thiếu hẳn **trứng gà non** (dấu nhận diện của bản Đà Lạt), xôi mặn phải gói **lá chuối** chứ không phải hộp giấy, bánh ướt tôm chấy phải là **cuốn xếp thành hàng**, cá nục phải là cá **đã chiên vàng** chứ không phải cá tươi xanh bạc. Đúng luật cũ của repo: *vẽ hỏng thường do chưa hiểu vật*. Luật rút ra nằm ở phần 4. ③ **Bẫy hex lại dính 3 lần** trong lúc vẽ (`#E3Aköz`, `#F0B košz`, `#D19madeup`) — lần này `npm run qa` chặn đúng như thiết kế từ đợt 11, không lọt cái nào ra bản build.
- [x] **Đợt 15 (2026-08-01, 11 món) — MỞ KIỂU MÓN THỨ 17 "XÔI", catalog 104 → 115.** Thái nêu 11 món; sau vòng hỏi thì **thay 1** (xôi lá cẩm → sữa chua nếp cẩm), **thêm 1** (xôi ngũ sắc), **hoãn 1** (chả cá Lã Vọng). Chốt lại 11: **xôi đậu xanh · xôi gà · xôi gấc · xôi ngũ sắc · sữa chua nếp cẩm · bánh chưng · bánh tét · bánh giầy · bánh đúc nóng · bánh đa cua · chả cá thát lát chiên**.

  **Bốn câu hỏi đưa Thái chốt trước khi viết một chữ nào** — và cả bốn đều đổi hình dạng của đợt:
  - **Nhóm "Xôi": tách hẳn** thay vì đổi tên "Cơm" thành "Cơm / xôi". Lý lẽ ở phần 1.
  - **Thêm xôi ngũ sắc** — món đang nằm trong kho ý tưởng với lý do hoãn là *xếp loại*, mở nhóm Xôi là gỡ được. Kéo **Tây Bắc 3 → 4**.
  - **Ô "nếp cẩm": chọn sữa chua nếp cẩm** thay xôi lá cẩm, vì nó rơi vào họ màu **tím** — kéo đợt bớt dồn vào họ vàng, và tránh hai gò xôi tím cạnh nhau (xôi ngũ sắc đã có cánh lá cẩm).
  - **Chả cá Lã Vọng: HOÃN** — *"thêm vào danh sách làm sau, có thể teaser ở trang chủ để quảng cáo"*. Đã lên dải "Sắp lên mâm". **Câu hỏi tên món vẫn treo**, chi tiết ở phần 2.

  **Soi trùng bắt được đúng một chỗ, và nó không dẫn tới loại món:** **xôi đậu xanh ↔ xôi xéo** cùng là nếp với đậu xanh. Soi kỹ thì khác thật — đậu **đồ chung, hạt lẫn trong nếp trắng** ↔ đậu **đồ riêng, giã, nắm, xéo lát phủ lên nếp nhuộm nghệ**. Giữ cả hai, và viết cho rõ chỗ khác ngay trong FAQ. **Soi trùng không phải để loại, mà để biết mình cần viết gì.**

  **Chuyện lớn nhất của đợt vẫn là HÌNH — 8/11 hình dồn vào một họ màu.** Render cả họ vàng trước khi vẽ (bước 3b) cho thấy 9/18 hình cũ là **đĩa trắng bầu dục dẹt**, và hai món xôi đã có đều nằm trên **lá chuối** — tức hai lối dễ nhất đều bị chiếm. Nên đợt này thử hẳn **đòn bẩy thứ tư: đổi HÌNH KHỐI của chính món ăn** (khối vuông · trụ nằm ngang · miếng tròn xếp chồng · năm gò rời xếp vòng). Đậu — và đó là kết luận đáng giá nhất của đợt, đã ghi vào phần 4 và phần 2 mục 2.

  **Render sau nhóm đầu tiên lại cứu một lần nữa** (luật đợt 13): vẽ 4 món xôi rồi soi liền — **4/4 sai**, đúng như hai đợt trước. Xôi ngũ sắc thành **biểu đồ tròn**, xôi gấc thành **cục gạch**, sợi gà của xôi gà **tan biến vào gò xôi**, đĩa men xanh của xôi đậu xanh **bị gò xôi che gần hết**. Sửa xong bốn lỗi hệ thống ấy rồi mới vẽ 7 hình còn lại.

  **Tổng cộng phải qua ba vòng render mới sạch, và bốn lỗi vòng hai đều là "hình khối lạ đọc ra ĐỒ VẬT":**

  | Hình | Vòng 1 | Vòng 2 | Vòng 3 |
  |---|---|---|---|
  | Xôi ngũ sắc | biểu đồ tròn | ✅ năm gò rời | — |
  | Xôi gấc | cục gạch | vỏ bánh tart + kem rưới | ✅ |
  | Xôi gà | sợi gà tan vào nền | ✅ lót khe nâu sẫm | — |
  | Xôi đậu xanh | đĩa bị che | ✅ thu gò còn 2/3 | — |
  | Bánh chưng | — | bánh xe pho mát | ✅ hình hộp góc nhọn |
  | Bánh tét | — | quả trứng ốp la | ✅ lớp đậu vuông tròn góc |
  | Bánh giầy | — | chồng bát đĩa sứ | ✅ thu ngang, tăng dày |
  | Sữa chua nếp cẩm | — | **cái mặt cười** | ✅ dồn hạt lệch một phía |

  Tám luật hình rút ra từ đợt này đã ghi vào phần 4, nhóm *Màu và hình* — đáng nhớ nhất là **`rx` dưới 9 thì coi như không vẽ** (con số đo được, dùng lại cho mọi hình sau) và **tách hai vật bằng tương phản sáng/tối chứ đừng tách bằng sắc độ**.

  **Ba chỗ nội dung đáng ghi:** ① **định nghĩa "Bánh" phải nới** từ *"vỏ tráng/đổ từ bột gạo"* sang *"làm từ gạo/nếp rồi tạo hình"* — bánh chưng không phải bột nên định nghĩa cũ đá nó ra ngoài. ② **Hai chỗ chính tả đã tra**: viết đúng là **"bánh giầy"** (từ điển chỉ có dạng này) và **"cá thát lát"** (không phải "thác lác"). ③ **Tích bánh chưng bánh giầy kể được mà không phạm luật không-nêu-danh-nhân** — viết *"theo tích xưa, một người con vua dâng lên hai thứ bánh"*, nêu cơ chế rồi dừng.

  **Một chỗ cố ý đi ngược lời dặn của chính file này:** ROADMAP đã ghi *"đợt sau đừng lấy thêm món nước"*, mà đợt 15 vẫn nhận **bánh đa cua** (Món nước 17 → 18, họ teal 35 → 36). Lý do: **sợi bánh đa đỏ nâu là thứ chưa tô nào trên site có** — 35 tô kia đều giấu sợi dưới nước, nên tô này không làm họ teal khó thêm mà còn mở ra một hướng phân biệt mới. **Ngoại lệ có lý do, đừng lấy làm tiền lệ chung.**
- [x] **Đợt 14 (2026-07-31, 9 món) — VƯỢT MỐC 100, catalog 95 → 104.** Thái nêu 10 món, soi trùng loại 2, thay 1: **bún măng vịt · bún sứa Nha Trang · bún mọc · bún ốc · bún ốc nguội · cơm cháy chà bông · cơm lam · cơm rang dưa bò · cơm rượu**. **Không mở kiểu món nào** — bảng 8 chỗ của README không phải sửa dòng nào (lần thứ hai, sau đợt 11).

  **Ba món bị soi ở khâu chọn, trước khi tra một chữ nào:**
  - **Bún chả cá — TRÙNG THẲNG**, đã có từ đợt 8 (`bun-cha-ca.yaml`, Miền Trung, chả chiên vàng + chả hấp trắng). Bỏ. Chỗ trống Thái chốt thay bằng **bún ốc nguội** — vừa là bản "kia" của bún ốc, vừa rơi vào **Bún trộn** nên đỡ được một tô cho họ teal.
  - **Bún mắm — Thái chốt BỎ.** Nó nấu đúng nồi **mắm cá linh + mắm cá sặc** của `lau-mam.yaml` đã có; khác mỗi chỗ dọn ra tô thay vì nồi giữa bàn. Hai bài sẽ trùng nhau nguyên đoạn nấu nước.
  - **Bún sứa Nha Trang thì GIỮ** dù cùng nồi nước cá với bún chả cá — vì thứ người ta tới ăn là **con sứa chân**, không phải miếng chả; hai bài viết chỉ giao nhau ở đoạn nấu nước, và bài bún sứa trỏ thẳng sang bún chả cá thay vì kể lại.

  **Đây là đợt đầu tiên chữa được cả hai chỗ đợt 13 để lại:** *"Cả nước"* đứng nguyên 23 món và tụt xuống **22%** (không món nào của đợt gán vùng đó), còn **Tây Bắc 2 → 3** nhờ cơm lam — lần đầu vùng này nhúc nhích kể từ đợt 9. Miền Bắc 15 → **20**.

  **Chuyện lớn nhất của đợt là HÌNH.** Render cả họ teal trước khi vẽ mới thấy: **31/31 hình dùng chung đúng một khuôn** — vật đựng đặt giữa, nhìn chếch từ trên, ba sợi khói, đạo cụ dưới chân. Thêm 4 tô nữa mà chỉ đổi ruột thì chắc chắn lẫn. Nên đợt này thử **bốn hướng đổi khung hình cùng lúc** rồi đưa Thái duyệt — và kết quả là bài học lớn nhất của đợt:

  | Hướng | Món | Thái duyệt |
  |---|---|---|
  | **Đổi vật đựng** | chảo gang đen (cơm rang) · ống nứa (cơm lam) · miếng tròn không vật đựng (cơm cháy) · hũ thuỷ tinh (cơm rượu) · bát sành nâu (bún ốc nguội) | ✅ đậu hết |
  | **Đổi động tác** | đũa đang gắp viên mọc (bún mọc) | ✅ đậu |
  | **Đổi góc nhìn** | nhìn thẳng từ trên (bún ốc) | ❌ *"nhìn từ trên xuống kỳ quá"* |
  | **Cắt cận** | tô tràn khỏi khung (bún sứa, bún mọc) | ❌ *"cái tô bị lệch, mất cạnh bên trái"* |

  **Luật rút ra — đã ghi vào phần 4:** lưới `/mon/` xếp 104 ô cùng cỡ cùng khuôn, nên quy ước "vật đựng nguyên vẹn, nhìn chếch từ trên" đã thành **ngữ pháp của cả trang**; phá nó thì người xem đọc ra *"hình lỗi"* chứ không ra *"góc chụp khác"*. Đổi vật đựng thì vẫn nằm trong ngữ pháp cũ, chỉ thay danh từ — nên đậu.

  **Render sau nhóm hình đầu tiên lại cứu một lần nữa** (luật đợt 13): vẽ 4 tô teal rồi soi liền — **4/4 sai**. Sứa bay lơ lửng như lông chim · ruột ốc thành cái nấm · viên mọc thành bánh quy · miếng vịt thành cục gạch. Riêng viên mọc mất **ba vòng** (bánh quy → mặt cười → đạt).

  **Vòng duyệt của Thái còn bắt thêm 5 lỗi "vẽ theo suy đoán, chưa tra":**
  - **Bún măng vịt** vun măng thành đống NÂU cao → *"nhìn giống đống shit"*. Tra lại: măng nấu vịt là **vàng óng** và **nằm trải** trên mặt nước, không đắp gò. Sai cả màu lẫn bố cục.
  - **Cơm cháy chà bông** xếp ba miếng chữ nhật chồng lên nhau → *"giống một đống bánh"*. Tra lại: bán ra là **một miếng TRÒN 20–25 cm**.
  - **Cơm rang dưa bò** → *"giống cái nồi hơn cái chảo"* + *"không nhìn ra miếng bò, miếng dưa"*. Chảo phải **lòng nông vành loe** (nồi thì thành cao dựng thẳng); và sợi dưa tô vàng óng thì **lẫn hẳn vào hạt cơm cũng vàng** — đổi sang **vàng ngả xanh** mới tách, mà dưa cải muối thật cũng ngả xanh ô liu.
  - **Cơm rượu** quấn dải **lá chuối xanh** quanh mỗi viên → *"cơm rượu đâu có màu xanh lá trong món ăn"*. Đúng: lá chuối là thứ dùng lúc **ủ**, tới lúc múc ra ăn đã bỏ. Bịa một màu không có thật.
  - **Cơm lam** để ống chưa bẻ nằm trên ống đã bẻ, và có một khúc dựng đứng lạc lõng. Thỏi cơm mới là món nên phải nằm trên.

  **Và 3 lỗi chữ:** *"nước chua giấm bỗng"* ở title bún ốc khó hiểu (giấm bỗng dùng **25 lần trên site mà chưa từng chú giải lần nào**, kể cả bún riêu cua — nay đã chú giải ở hai bài mới) · *"bún con"* là **tự chế**, từ chuẩn là **"bún lá"** (mỗi miếng gọi là một *vắt bún*, khác **bún rối** xới tơi vào tô) · *"sứa chân"* bỏ khỏi title và summary theo ý Thái, nhưng **giữ ở phần chọn mua** vì đó là chỗ nó còn làm việc — mua nhầm **sứa tai** thì miếng sứa mềm nhũn và nhạt.

  **Ba chỗ nội dung đáng ghi:** ① **cơm rượu xếp vào kiểu món "Chè"** — phải nới định nghĩa ở `content.config.ts` và `_template.yaml` từ *"món ngọt nấu đường"* thành *"món ngọt, ngọt do nấu đường hay do ủ men đều được"*; cơm rượu ngọt do lên men chứ không do nấu, mà cách ăn và chỗ đứng trong bữa thì giống hệt mấy nồi chè. ② **cơm lam là món đầu tiên hơi lấn luật "nguyên liệu chính phải mua được ở chợ thường"** (ống nứa) — xử bằng cách nói thẳng trong FAQ và cho hẳn cách thay bằng lá chuối + giấy bạc, kèm câu *"nói thẳng là không giống bản gốc"*. ③ **cơm rượu gắn với Tết Đoan Ngọ** nhưng **chỉ nhắc đó là ngày trong lịch**, không đụng một chữ nào tới chuyện "giết sâu bọ" — cùng cách xử đã dùng cho chè đậu đỏ và Thất tịch ở đợt 13.
- [x] Hai script QA thường trực trong `tools/` (`npm run qa`): quét bẫy YAML cả thư mục + soi trùng `id` chéo giữa các file art
- [x] **Harness render hình ra PNG** (`npm run art-png`) — chế độ `--sheet` ghép nhiều hình một tấm ở cỡ thumbnail để soi chống-đụng; thứ contact sheet không làm được
- [x] SEO: JSON-LD schema.org/Recipe, ảnh OG chia sẻ sinh lúc build, sitemap, robots.txt
- [x] **RSS + nốt phần SEO còn thiếu** (2026-07-30) — `/rss.xml`, `canonical`, `BreadcrumbList` kèm breadcrumb thật, `WebSite` + `SearchAction`; nhân tiện cắt 3 nét font xin dư
- [x] Trang bí quyết bếp (`/bi-quyet/`), trang danh mục `/mon/` có lọc theo kiểu món · theo dịp · miền
- [x] Deploy tự động lên GitHub Pages, tên miền riêng + HTTPS, dòng bản quyền footer
- [x] Đợt 10 (2026-07-30, 6 món): nem nướng Nha Trang, cá tai tượng chiên xù, ốc hấp lá gừng, gà hấp hành, gỏi ngó sen tôm thịt, cánh gà chiên nước mắm — mở kiểu món **"Bánh"** (chuyển bánh xèo · bánh cuốn · bánh khoái sang), **14 kiểu món tất cả ≥ 3**
- [x] **Tách hình ra file `.svg` riêng** — `/mon/` từ 143,8 KB gzip xuống ~30 KB và thôi tăng theo số món
- [x] **Trang 404 + liên kết chéo giữa 64 món** (2026-07-30) — xem mục ngay dưới
- [x] **Rút ngắn hero trang chủ** (2026-07-30) — thẻ món đầu tiên 1164 → **1006px** desktop, 1624 → **1309px** điện thoại, không bỏ thành phần nào
- [x] **Số món đập vào mắt ngay ở màn hình đầu** (2026-08-01) — nút vàng "Xem hết **126** món ngon" + eyebrow "Mới lên mâm — **xem cả 126 món**", tốn **0px** bố cục; xem mục ngay dưới
- [x] Đợt 11 (2026-07-31, 7 món): sườn xào chua ngọt, bún sườn nấu sấu, ốc om chuối đậu, lòng heo luộc, canh sườn khoai tây cà rốt, canh sườn bí đao, cà tím nướng mỡ hành — **không mở kiểu món mới**, kéo Miền Bắc 10 → **13**; xem mục ngay dưới

## Đợt 11 — 2026-07-31

Thái tự chọn món, không phải mình tự mở đợt. Danh sách gốc có 8 món, chốt lại còn **7**: hai món Tây bị hoãn (lý do ở phần 2, mục *"Món Tây"*), còn câu hỏi *"canh sườn nấu với gì?"* thì Thái chọn **làm cả hai** — khoai tây cà rốt và bí đao. Nấu giống hệt nhau tới phút thứ 30, chỉ khác thứ thả vào cuối, nên viết hai bài không tốn gấp đôi.

**Tên món sửa 2 chỗ:** *"bún sườn sấu"* → **"bún sườn nấu sấu"** (báo chí dùng vậy, đọc thuận hơn), *"lòng luộc"* → **"lòng heo luộc"** ("lòng luộc" trơ quá cho tiêu đề). Năm cái tên còn lại giữ nguyên vì đã là tên chuẩn.

Không mở kiểu món mới nên **bảng 8 chỗ của README không đụng dòng nào** — lần đầu một đợt đi qua mà không phải rà bảng đó.

### Bốn lỗi hình, cả bốn chỉ lộ ra ở `art-png --sheet`

Vòng vẽ đầu qua được `npm run qa` sạch và nhìn ở cỡ 520px thấy ổn hết. Render ghép 260px mới thấy hỏng. Ghi lại vì **cả bốn đều là lỗi loại "vẽ đúng mà đọc sai"**, không phải lỗi tay:

1. **Đốm xương nằm TRÊN mặt khối thì biến mất.** Ba món sườn nước (bún sườn sấu, hai canh sườn) đều vẽ khúc sườn là khối chữ nhật nâu có chấm xương tròn trắng ở mặt trước. Ở 260px chấm đó chỉ còn vài pixel — cả ba ô đọc thành **ô vuông nâu vô nghĩa**, mất sạch dấu nhận diện mạnh nhất của món. Chữa bằng cách cho **đầu xương lòi hẳn ra NGOÀI đường bao** khối thịt: lúc đó cái *bóng* của vật đã nói "có xương", khỏi cần nhìn chi tiết bên trong.
2. **Kem trên kem thì mất hình.** Dĩa lòng heo luộc toàn lát trắng ngà đặt trên dĩa cũng trắng ngà → một vệt nhợt. Chữa bằng **nền đống sẫm hơn hẳn** (#B99A66) đỡ dưới, viền từng lát đậm lên, và phóng to chén mắm tôm tím cho cả ô có một điểm màu.
3. **Vẽ ruột ĐỒNG TÂM trong vỏ thì ra cái vòng, không ra vật bổ đôi.** Cà tím nướng bổ dọc: chừa viền tím đều nhau bốn phía nên đọc thành **hai cái đĩa viền tím**, không ra trái cà. Chữa bằng **đẩy ruột lên trên, chỉ chừa vỏ dày ở đáy** — thành cái thuyền vỏ đỡ đống ruột. Cùng lỗi này còn làm mỡ hành (thứ món mang tên) nhỏ và thưa tới mức không thấy; phải phóng to hạt hành gần gấp đôi.
4. **Vật sẫm trên nền sẫm thì mất đường bao.** Nồi đất ốc om vẽ nâu #8A5730 đặt trên nền họ "Mặn đưa cơm" (#6E3512 → #421C06) — nâu trên nâu, cả ô tối om. Chữa bằng **kéo nồi sáng hẳn lên** (#B87C4C).

> Và một bẫy của chính mình, không phải của hình: **bốn lần gõ nhầm ký tự ngoài ASCII vào giá trị màu** (`#3E1F४8`, `#B79A६E`…). SVG vẫn parse, `npm run qa` vẫn sạch, chỉ có màu là im lặng rơi về mặc định. Đã dựng phép quét riêng — lọc mọi `fill`/`stroke`/`stop-color` không khớp `#` + 3 hoặc 6 ký tự hex. **Đợt sau chạy phép quét đó trước khi render.**

### Số đo sau đợt

Dung lượng `/mon/` **25,5 KB** gzip ở 71 món — **26.136 B đo trên máy chủ** sau khi deploy (`curl -H 'Accept-Encoding: gzip'`). So với 24,1 KB ở 64 món thì đúng **+0,20 KB mỗi món**, trùng khít độ dốc ~0,2 KB/món dự đoán từ đợt 10, nên **kết luận "thôi tăng theo số món" vẫn đứng**. Ở 100 món ước chừng vẫn ~31 KB.

> Con số cục bộ đo trước khi deploy là 25,1 KB, máy chủ ra 25,5 KB — **lệch ~1,6%, đúng cỡ sai số ~2% mà luật đã ghi**. Thêm một lần xác nhận: cứ đo cục bộ để ước, nhưng con số ghi vào đây phải là con số máy chủ.

Liên kết chéo tự lên **426** (71 × 6), vẫn 0 mồ côi · 0 dải trùng · **1 mảnh liền**. Featured đổi đúng một chỗ: **sườn xào chua ngọt** vào, **trứng chưng thịt nấm mèo** ra — cả hai đều "Cả nước" nên trang chủ vẫn phủ **7/7 vùng**.

**Nghiệm thu trên máy chủ (2026-07-31):** 7 trang món mới và 7 file `/art/*.svg` đều trả 200 · 6 ảnh `/anh-mon/` mẫu đều có file thật · sitemap **71 URL món** (74 tổng) · RSS **71 mục**, đủ cả 7 món mới · trang chủ đúng **12 ô**, có sườn xào chua ngọt, không còn trứng chưng.

## Trục thứ ba cho mục "Tìm món theo cách của mình" — 2026-08-01

Thái hỏi: *"phần này mới chỉ có 2 cách lọc, có nên thêm lọc theo Kiểu món không?"*

**Câu trả lời nằm sẵn trong code, không phải chuyện phải cân nhắc.** `/mon/` từ lâu đã lọc trên **ba** trục và đã đọc `?kieu=` từ URL (`PARAM` trong `src/pages/mon/index.astro`) — chỉ có trang chủ là mở đúng **hai** cửa. Thêm trục thứ ba là dựng một khối `gate-group` nữa trỏ `?kieu=`, **không đụng một dòng JS nào** ở trang đích. Đây là kiểu việc đáng soi định kỳ: *trang đích làm được gì mà lối vào chưa mời?*

**Vì sao Kiểu món đặt LÊN ĐẦU, trên cả Theo dịp và Miền:** `/mon/` xếp Kiểu món → Dịp → Miền, và bấm từ trang chủ sang thì bên đó **tự mở bảng lọc** — trục vừa bấm phải nằm đúng chỗ mắt đang chờ. Hai trang cùng một thứ tự thì không phải học lại.

**Mục này không phải bản sao của thanh lọc ở `/mon/`:** mỗi cửa ở đây kèm **số món** (Món nước 20 · Bánh mì 3), thứ thanh lọc bên kia không có. Đó là lý do giữ cả 17 cửa chứ không cắt còn 8 cửa to nhất — cắt là cắt đúng phần thông tin riêng.

**Rồi cái lưới có sẵn lòi ra là vấn đề thật.** Thái xem bản đầu và nhận xét: *"chỗ thì theo phương ngang, chỗ thì theo phương dọc, chỗ thì vừa ngang vừa dọc"* — đúng. `.gates` vốn là `auto-fit minmax(300px,1fr)`; ở 1280px nó dựng **3 làn**, nhóm 17 cửa trải hết cả ba còn Dịp và Miền bị ép vào cột **315px** nên 7 chip xuống dòng lỗ chỗ, hàng 2 cái hàng 1 cái. **Ba nhịp đọc trong một khối.** Lỗi này có sẵn từ trước — hồi hai nhóm thì `auto-fit` gộp lại còn 2 làn 494px nên không ai thấy; **nhóm thứ ba chỉ làm nó lộ ra**.

**Chữa: bỏ hẳn việc chia cột** — `.gates{display:grid;gap:26px}`, mỗi trục là một dải ngang xếp chồng, cả ba cùng rộng 1032px ở 1280.

| | Đang chạy (2 trục) | Bản chia cột (bỏ) | **Đã ship** |
|---|---:|---:|---:|
| Khối chip ở 1280px | 191px | 522px | **403px** |
| Bề rộng làn của Dịp / Miền | 494px | 315px | **1032px** |
| Cả mục ở 768px | 614px | 835px | **882px** |
| Cả mục ở 390px | 935px | 1376px | **1368px** |

Tức so với bản chia cột thì **ngắn hơn 119px ở 1280** và **dài hơn 47px ở 768** — trả 47px lấy một nhịp đọc thống nhất. Điện thoại gần như không đổi (vốn đã một cột). So với trang đang chạy thật thì mục này cao thêm **433px ở 390** và **268px ở 768**, toàn bộ là chỗ của 17 cửa mới; mục bắt đầu ở ~7950px trên điện thoại nên người cuộn tới đây là người đang tìm, không phải người lướt qua.

**Bài học chung — thêm phần tử vào một lưới `auto-fit` là đổi cả số làn, không chỉ thêm một ô.** `auto-fit` gộp làn trống lại, nên bố cục hai nhóm và bố cục ba nhóm là hai bố cục khác nhau về chất. Nhìn thấy "ngang dọc lẫn lộn" thì đừng chữa nhóm mới — soi cái lưới.

**Nghiệm thu trên production (`46d39d4`, deploy xanh):** trang chủ trả về **17** liên kết `/mon/?kieu=…`, CSS thật đang chạy là `.gates{gap:26px;display:grid}`. Bấm thử `/mon/?kieu=Chè` ra đúng **9 món**, bảng lọc tự mở, chip `cat=Chè` sáng.

## Số món phải đập vào mắt ngay — 2026-08-01

Thái hỏi: *"có nên đưa 'Xem tất cả xx món' lên phía trên hơn không, sợ người xem thấy có mấy món ở trang chủ rồi bỏ đi?"* Đo trước khi sửa, và **số đo đổi luôn cách chữa**.

**Chẩn đoán.** Lối vào `/mon/` thì đã nằm ở màn hình đầu rồi (nút vàng ở **624px** trên điện thoại, 462 desktop) — thứ thiếu không phải cái nút mà là **con số** đi cùng nó. Máy 390×844 chỉ hở **~745px** cho trang sau khi trừ thanh địa chỉ và thanh dưới, mà dòng *"126 món và đang thêm hoài"* bắt đầu ở **775px** ⇒ **màn hình đầu của điện thoại vốn không có con số nào**. Còn nút *"Xem tất cả 126 món"* cuối lưới ở **6565px** — **7,8 màn hình cuộn** mới tới (desktop 2811px, 3,1 màn).

**Bốn chỗ đặt, đo cái giá bằng "thẻ món đầu bị đẩy xuống bao nhiêu":**

| Phương án | ĐT 390 | Desktop 1440 |
|---|---:|---:|
| **P1 — số vào nút vàng hero** | **0** | **0** |
| **P4 — nhét vào dòng eyebrow "Mới lên mâm"** | **0** | **0** |
| P3 — số chèn vào câu dẫn dưới h2 | +28 | +29 |
| P2 — nút "Xem tất cả" cạnh h2 | +63 | +2 |

**P2 chính là cách Thái hình dung, mà lại đắt nhất trên điện thoại** — nút không đủ chỗ nằm cạnh h2 nên xuống dòng, đẩy cả lưới xuống 63px. Hai chỗ **không tốn pixel nào** đều là chỗ **đã có sẵn chữ**: nút vàng và dòng eyebrow. Đây là bài học chung, không riêng lần này — **muốn thêm thông tin mà không đội bố cục thì tìm dòng chữ đã có, đừng thêm hàng mới**.

**Đã ship P1 + P4** (giữ nguyên nút cuối lưới):

- Nút vàng: *"Xem hết món ngon"* → **"Xem hết 126 món ngon"**. Nút rộng 210 → **241px**, vẫn một dòng, cao y nguyên 53px.
- Eyebrow: *"Mới lên mâm"* → **"Mới lên mâm — xem cả 126 món"** (chữ sau là liên kết sang `/mon/`). Vẫn gọn **một dòng ở khung 390**, cao y nguyên 43px. Bản dài hơn thử trước đó (*"12 món mới lên mâm — …"*) thì xuống dòng, tốn +43px — nên chọn bản này.
- `base.css`: `.eyebrow a` dày nét gạch chân 1,5px + cách chữ 3px, hover đổi màu ớt. Nét script mảnh, không có gạch chân rõ thì không ai nhận ra bấm được.

**Nghiệm thu trên bản build thật, hai lượt trùng khít:** thẻ món đầu **1310 / 1007** — **y hệt trước khi sửa**; eyebrow vẫn 43px; nút cuối lưới vẫn 6565 / 2811; `pageH` không đổi. Tức thêm hai chỗ báo số mà **bố cục không xê dịch một pixel**.

**Ba mẹo harness học được lần này, đã chép lên phần 4:**

- **Đổi chỗ (`appendChild`) một `<iframe>` là nó TẢI LẠI** — mọi mutation và style `.reveal` chèn vào bị xoá sạch mà không báo gì. Dựng khung ở đúng chỗ cần rồi mới sửa ruột.
- **`.row` flex thì `<iframe>` bị co**: đặt `width="1440"` mà cửa sổ hẹp hơn thì khung teo lại và **mọi số đo là số của bề rộng khác**. Luôn `flex:none`.
- **`scroll-behavior:smooth` + tab chạy nền = không cuộn được**: `scrollTo` trả về `scrollY` vẫn 0 vì hiệu ứng cuộn cần rAF. Chèn `html{scroll-behavior:auto!important}` vào iframe trước khi cuộn.
- **Vùng `zoom` của tiện ích Chrome tính theo toạ độ ẢNH chụp (đã thu nhỏ), không phải px CSS.** Cửa sổ 1440 → ảnh 840, tức hệ số ~0,583; đòi vùng `[0,0,830,780]` là đòi gần 1423px CSS, ra ảnh thừa mảng trắng to.

## Trang 404 và liên kết chéo — 2026-07-30

Hai chỗ cuối cùng mà người đọc cảm nhận được liền, làm cùng một buổi.

### Trang 404

Làm bằng `src/pages/404.astro` chứ không phải `public/404.html` như dự tính ban đầu — đi qua `Base.astro` thì được luôn header, footer, nút đổi giao diện, không phải chép tay một bản HTML thứ hai rồi để nó mốc dần.

**Kiểm cái bẫy đã lo:** Astro có xử lý riêng cho `404.astro` nên nó ra thẳng `dist/404.html`, **không** bị `trailingSlash` đẩy thành `dist/404/index.html`. Đã kiểm tận nơi (`ls dist/404.html` có, `dist/404/` không có) — nhưng **kiểm lại sau mỗi lần nâng Astro**, vì sai chỗ đó thì trang im lặng không bao giờ được dùng, mà ở máy vẫn thấy bình thường.

Hai thứ ghi lại cho lần sau:

- **`astro preview` CÓ phục vụ 404.html cho đường dẫn lạ** — trái với điều đã tưởng, soi thử ở máy được. Nhưng nó vẫn là máy chủ khác GitHub Pages, nên **nghiệm thu thật vẫn phải trên máy chủ** sau khi deploy: `curl -sI https://www.monvietngon.com/khong-ton-tai/` phải trả **404**, không phải 200.
- **KIỂM XEM `astro preview` THẬT SỰ ĐỨNG Ở CỔNG NÀO — đừng mặc định 4321.** Phiên này có một `astro dev` bỏ quên từ hôm trước vẫn đang giữ 4321, nên mọi lần `npm run preview` **âm thầm nhảy sang 4322/4323** mà không báo gì ầm ĩ, còn mọi lệnh gõ `localhost:4321` lại rơi vào máy chủ dev đó. Cách kiểm: đọc dòng `localhost:<cổng>` trong log của chính lệnh preview, hoặc `lsof -ti:4321`.
  > Một kết luận sai đã sinh ra từ đây và **đã sửa**: bản ghi đầu tiên viết *"`astro preview` phục vụ theo danh mục lúc build, file thả thêm vào `dist/` sau khi build thì trả 404"*. **Không đúng** — thử lại đàng hoàng thì preview trả **200** cho file mới thả vào `dist/`. Cái trả 404 hôm đó là `astro dev`, vốn phục vụ từ `public/` + `src/` chứ không đụng `dist/`.

Trang chưa gắn `noindex`: GitHub Pages trả đúng mã 404 cho đường dẫn lạ, sitemap không liệt kê nó, và không chỗ nào trong site trỏ tới `/404.html`. Muốn chắc hơn thì phải thêm prop vào `Base.astro` — đụng mọi trang cho một chuyện chưa xảy ra.

### Liên kết chéo — đo 6 phương án rồi mới chọn

Từ 0 liên kết lên **384** (64 món × 6). Ba trục có sẵn trong schema, **không thêm field nào**.

Đo trước khi code, mỗi phương án một dòng (mốc 64 món, 3 gợi ý/món):

| Phương án | mồ côi | qua lại | dải trùng | in-deg | mảnh |
|---|---:|---:|---:|---:|---:|
| Cùng vùng, lấy 3 món đầu khối | **38** | 34 | **44 món** | 0–15 | 3 |
| Cùng vùng, xoay vòng | 0 | 4 | 0 | 1–6 | **3** |
| Cùng kiểu món, xoay vòng | 0 | 4 | 0 | 2–6 | **7** |
| Cùng nhãn theo dịp, xoay vòng | 4 | 0 | 0 | 0–9 | 1 |
| **Trộn ba trục** | 0 | 9 | 0 | 1–6 | 1 |
| Điểm tổng hợp có trọng số | 8 | **61** | 10 món | 0–11 | 1 |

Ba điều rút ra, đã chép lên phần *Luật đã chốt*:

- **Cách chọn quan trọng ngang cái trục chọn.** Hai dòng đầu cùng là "cùng vùng", khác mỗi chỗ xoay vòng: 38 món mồ côi → 0, 44 dải trùng → 0.
- **Trục đơn cắt catalog thành đảo** — 3 mảnh với vùng, 7 mảnh với kiểu món. Không phải lỗi crawl (sitemap và `/mon/` vẫn trỏ đủ 64), mà là **người đọc lang thang tới đó là hết đường**.
- **Điểm tổng hợp nhìn thông minh nhưng dồn cục:** 61 cặp qua lại = 122/192 liên kết là vòng A↔B, bấm sang rồi bấm về đúng chỗ cũ.

**Thái chốt trộn ba trục, và gấp đôi lên 6 món (2+2+2).** Đo lại bản 6: mồ côi 0 · dải trùng 0 · 1 mảnh · nhãn đúng 100% — giữ nguyên mọi thứ đáng giá, chỉ có cặp qua lại 9 → 37. Chấp nhận được vì ở dải 6 ô một cặp qua lại chỉ ăn 1/6 lối ra thay vì 1/3.

**Một chỗ sửa sau khi nhìn tận mắt.** Bản đầu vét cạn nhãn hiếm nhất trước khi sang nhãn sau, nên pa pỉnh tộp ra **ba thẻ liền nhau cùng đeo chip "Hợp Nhậu lai rai"** — đúng nhưng đọc như trang bị lỗi lặp. Đổi sang vòng lần lượt qua từng nhãn, mỗi lượt một món: cả 64 trang giờ **không trang nào có quá 2 chip giống nhau liền nhau**, và in-degree còn đều hơn (2–13 → **3–11**).

Dựng thêm `tools/link-audit.mjs` (`npm run link-audit`) — đọc HTML trong `dist/`, canh bốn con số. Chạy sau mỗi đợt món: thêm món là thế cân của dải gợi ý đổi.

### Đo LCP trang chủ — và gỡ lại việc `eager`

Việc "cho 3 ô đầu `eager`" đã làm, đã ship, rồi **gỡ ra cùng ngày** sau khi đo. Ghi lại đầy đủ vì cái sai nằm ở chỗ khó thấy: giả định *"2–3 ô nằm trên màn hình đầu"* nghe hợp lý tới mức không ai nghĩ tới việc kiểm.

**Đo 1 — mép trên thẻ featured đầu tiên** (iframe ở đúng bề rộng thật):

| khung | cao màn hình | mép trên ô đầu |
|---|---:|---:|
| 1440×900 · 1366×768 · 1280×800 | 900 / 768 / 800 | **1165** |
| 414×896 | 896 | **1531** |
| 390×844 | 844 | **1626** |

Hero cao quá: hình canh chua hết ở 615px, rồi ticker, rồi `.section` đệm 88px + eyebrow + h2 + câu dẫn — 1165px mới tới thẻ đầu. **Phải có cửa sổ cao hơn 1165px** (màn 1440p mở toàn màn hình) thì hàng đầu mới ló vào.

**Đo 2 — LCP là gì:** `LCP = 284 ms · phần tử <h1> · không phải ảnh` (trùng luôn FCP). Và chỗ quyết định: **hình hero là `<svg>` nhúng thẳng, toàn `<path>`, không `<img>`/`<image>` nào** — SVG nhúng **không phải ứng viên LCP** theo đặc tả. Nên trên trang chủ **không tấm ảnh nào có thể là phần tử LCP**, mạng nhanh hay chậm cũng vậy.

Kết luận: `eager` **không thể** cải thiện LCP ở đây; nó chỉ kéo 3 lượt tải vào cửa sổ trước LCP (bắt đầu 182ms, LCP ở 284ms), mạng chậm thì giành băng thông với stylesheet Google Fonts vốn đã chặn render. Đã gỡ.

**Một chuyện lòi ra bên lề:** cả 12 file art đều được tải dù 9 cái để `lazy` — ngưỡng lazy của Chrome trên mạng nhanh là ~1250px mà ô đầu ở 1165px. Ở desktop `lazy` vốn cũng không tiết kiệm mấy; chỗ nó có ích thật là mạng chậm, khi ngưỡng nới rộng.

**Cùng thuộc tính đó ở trang món thì ĐÚNG — giữ nguyên.** Hero trang chi tiết là `<img loading="eager">` thật, **mép trên 231px, cao 398px**, nằm gọn trên màn hình đầu và là ứng viên LCP đàng hoàng. Cùng một thuộc tính, sai ở trang chủ mà đúng ở trang món — chỉ có đo mới phân biệt được. *(Chưa chộp được phần tử LCP của trang món: API chỉ ghi khi tab đang hiện.)*

**Việc mọc ra từ số đo này:** muốn lưới món thật sự nằm trên màn hình đầu thì phải **rút ngắn hero trang chủ**, chứ không phải chỉnh thuộc tính `loading`. → **Đã làm 2026-07-30**, xem mục *"Rút ngắn hero trang chủ"* ngay dưới. Con số 1165px ở bảng trên là mốc **trước** khi rút; nay là 1006px.

⚠️ 284ms đo trên máy, mạng nhanh — **con số tuyệt đối vô nghĩa với người dùng thật**, thứ đáng tin là *phần tử nào là LCP* vì cái đó do bố cục quyết định. Chưa có số bóp băng thông từ bên thứ ba: PSI API trả 429 vì không có API key, muốn thì mở `pagespeed.web.dev` gõ tay.

### RSS + SEO — 2026-07-30

Bốn việc "đều rẻ" trong phần SEO cùng với RSS, làm một lượt.

- **`/rss.xml`** — 64 món, sắp theo `pubDate` **mới nhất trước** chứ không theo `order`: `order` là thứ tự bày trên trang (gom theo kiểu món, cân cho lưới đẹp), người theo dõi feed thì chỉ muốn biết bếp mới ra món gì. Món thiếu `pubDate` thì **bỏ qua chứ không lấy ngày hôm nay** — đặt ngày giả là mỗi lần build feed lại đảo lộn, ai theo dõi cũng tưởng có bài mới. (Hiện đủ 64 nên không món nào rớt.)
- **`canonical`** — mọi trang trừ 404. Máy chủ vốn đã 301 dạng thiếu `/` và dạng không `www` (đã kiểm), nên **canonical ở đây lo phần redirect KHÔNG lo được: tham số truy vấn.** `/mon/?kieu=Kho`, `/mon/?q=bún` và link chia sẻ dính `?fbclid=` đều là cùng một trang.
- **`BreadcrumbList` + breadcrumb nhìn thấy được** trong hero trang món. Hai thứ này phải đi cùng nhau — Google chỉ hiện đường dẫn phân cấp thay cho URL trần **khi trang có breadcrumb thật**. Mắt xích cuối không có `item` vì đó là trang đang đọc.
- **`WebSite` + `SearchAction`** ở trang chủ, trỏ `/mon/?q=`. Khai được vì trang **có tìm kiếm thật** — form GET thuần, không JS vẫn chạy.

**Nhân tiện cắt 3 nét font xin dư.** Đếm ra thì CSS chỉ dùng `700` (21 chỗ), `600` (18 chỗ), `400` (1 chỗ) và **không một chỗ nào nghiêng**, mà URL đang xin cả `Be Vietnam Pro 500`, `nghiêng 400` và `Dancing Script 700`. Đã bỏ. Cũng sửa một chỗ khai `font-weight:800` trong khi không xin nét 800 — trình duyệt đang tự bôi đậm giả; đổi về `700` cho thật.

**Giá của đợt SEO này: `/mon/` 30.232 → 30.275 byte gzip (+43 byte), tức 29,52 → 29,57 KB.** Ba thẻ mới trong `<head>` của mọi trang: `canonical`, `og:url`, và `<link rel="alternate">` trỏ RSS. Mốc trong bảng trạng thái đã sửa từ 29,5 lên 29,6 KB cho khớp.

> **Cách kiểm lại khi đổi font:** `grep -oh "font-weight:[0-9]*" src/styles/*.css | sort | uniq -c` và `grep -rn "font-style\|<em>" src/`.
>
> ⚠️ **Đính chính — việc cắt này KHÔNG bớt được request font nào.** Bản ghi đầu tiên ở đây viết "xin thừa một nét là thừa một request font"; dựng hai bản cạnh nhau đo lại thì **sai**: trình duyệt chỉ tải những face mà nội dung thật sự khớp, nên bản cũ khai **24 `@font-face` cũng vẫn chỉ tải đúng 15 file** — y hệt bản mới. Chữ ký hình học của 10 phần tử **trùng khít tới 2 số lẻ**. Lợi ích thật chỉ là file CSS của Google nhỏ đi vài trăm byte và khai báo khớp thực tế. **Đừng dùng lý do "bớt request" để biện minh cho việc chỉnh danh sách nét.**

### Số đo dung lượng

| | |
|---|---|
| `/mon/` | **không đổi một byte** — 149.389 thô cả trước lẫn sau, nên **29,5 KB gzip trên máy chủ giữ nguyên**. Việc này không đụng trang danh mục. |
| Trang chi tiết món | **+4,35 KB thô · ~+570 B gzip** cho 6 liên kết (ước ở máy). **Đo lại trên máy chủ 2026-07-30: 16.699 byte gzip = 16,3 KB** cho `/mon/canh-chua-ca-loc/` — số tuyệt đối, đã gồm cả 6 liên kết. |
| `/404.html` | 23,4 KB thô |

## Ảnh món cho công cụ tìm kiếm — 2026-07-30

Khởi từ thư Search Console báo 4 vấn đề Recipe. Kết luận sau khi tra tài liệu Google: **ba trong bốn cái không được sửa, cái thứ tư không đáng** — bảng lý do nằm ở phần 2, mục *"Bốn cảnh báo Recipe"*. Nhưng lần soi đó lòi ra chỗ hỏng thật mà **Search Console không hề báo**, vì trường vẫn có giá trị hợp lệ: `image` trỏ vào thẻ chữ `/og/`.

**Bài học chung, đáng nhớ hơn cả việc đã làm:** báo cáo của Search Console chỉ soi *có hay không có trường*, nó **không soi trường đó đựng gì**. Trường bắt buộc đựng sai thứ thì im lặng tuyệt đối. Đừng lấy "0 lỗi critical" làm bằng chứng đánh dấu đang tốt.

**Đã làm:**

- **`src/pages/anh-mon/[shot].jpg.ts`** — 64 món × 3 tỉ lệ = **192 ảnh, 8,5 MB, ~44 KB/ảnh**, build thêm ~7 s (24,6 s tổng). Hình lấy từ chính file art của món, đặt trên nền gradient họ màu + quầng `--art-halo`, chiếm 86% khung, canh giữa.
- **JPEG chứ không PNG.** Đo thật: nền gradient mượt làm PNG phình lên **201 KB/ảnh → cả site ~38 MB**; JPEG q84 xuống **~44 KB** mà mắt không phân biệt được (hình vẽ phẳng, không có chữ nhỏ để lộ artifact). WebP còn nhẹ hơn nhưng JPEG là thứ **mọi** bot đều đọc — Google, Bing, Facebook, Pinterest. Ảnh này sinh ra chỉ để bot xem, người đọc không bao giờ tải nó, nên `dist/` nặng thêm 8,5 MB **không ảnh hưởng gì tới tốc độ trang** (và `dist/` vốn gitignore, không phình repo).
- **Khoá theo `slug` chứ không theo `kind`** như `/art/`: nền phải mang màu họ của chính món đó, mà họ suy từ `category` của món chứ không từ tên hình.
- **`sharp` khai thẳng vào `devDependencies`.** Trước đó nó chỉ là dep bắc cầu của Astro — dùng ké thì một ngày nâng Astro là build gãy.
- **Gom chỗ rút mã SVG vào `src/utils/art-src.ts`** — hai endpoint (`/art/*.svg` cho web, `/anh-mon/*.jpg` cho bot) cùng cần "rút `<svg>` + bỏ chú thích", nhưng bơm CSS khác nhau: bản web có animation khói, bản render ảnh thì không (resvg không chạy animation, mà thiếu luật `.steam` thì **mọi path khói đổ fill đen**).
- **`npm run seo-audit`** (`tools/check-seo-images.mjs`) — chạy sau build, cạnh `link-audit`. Parse JSON-LD trong `dist/` rồi đi tìm file thật cho từng URL ảnh.

**Kiểm đã làm:** `qa` sạch · `link-audit` sạch · ghép 64 ảnh 1:1 thành một tấm rồi **nhìn bằng mắt** (khói ra nét sáng chứ không đen, đủ 5 nền họ màu, không ô nào trắng) · diff `/art/*.svg` mới build với **bản đang chạy trên máy chủ** → giống hệt từng byte, tức việc gom `art-src.ts` không đổi hình nào · thử xoá 1 ảnh và cắt cụt 1 ảnh để chắc `seo-audit` **bắt được thật** chứ không phải phép kiểm luôn xanh.

> **Vì sao `seo-audit` tách riêng khỏi `link-audit`:** `link-audit` có một việc và tự giới thiệu rõ ở đầu file là soi **liên kết chéo**; nhét thêm phép kiểm ảnh vào đó là làm mờ nó đi.

## Làm lại ô tìm kiếm `/mon/` — 2026-07-30

Thái báo "tìm kiếm work rất tệ, kết quả không ăn khớp từ khoá gì cả". Đúng, và đo ra thì tệ hơn tưởng.

**Bản cũ sai ở đâu.** `searchText()` gộp tên món + `summary` + miền + kiểu món + dịp + **mọi** nguyên liệu thành một chuỗi bỏ dấu, rồi client làm đúng một phép `haystack.includes(query)`. Bốn hệ quả, đo trên đúng 64 món đang có:

| Gõ | Ra |
|---|---|
| `hanh` | **60/64 món** — "hành" ở gần hết nguyên liệu, "t**hanh**" trong summary cũng dính |
| `ca` | **58/64** — "ca" nằm trong cà, canh, cay, cải; chỉ 14 món có trong tên |
| `cha` | **54/64** — dính cả "nước c**hấm**" |
| `canh chua ca loc` | ra **cả Canh gà lá giang** — summary món đó viết "cùng họ với canh chua cá lóc" |
| `loc ca`, `kho bo`, `cha bun` | **0 món** — đảo thứ tự chữ là trắng bảng |

Và **không có xếp hạng nào cả**: gõ `ca` thì "Cá kho tộ" nằm thứ 6, sau Canh chua cá lóc / Phở bò / Bún chả Hà Nội. Đây mới là thứ làm nó *cảm thấy* hỏng — mấy món khớp thật bị chôn giữa đám khớp nhầm.

**Đã làm.** Tách `data-search` thành ba trường (`data-n` tên món · `data-m` miền/kiểu/dịp · `data-i` nguyên liệu), bỏ hẳn `summary`. Client chấm điểm theo trường — trúng nguyên âm tiết trong tên 12đ, meta 6đ, nguyên liệu 4đ, trúng nguyên cụm trong tên +30đ; thiếu một chữ là loại (AND). Rồi xếp theo điểm và **xếp lại DOM thật**. Món trúng tên hiện ngay, món chỉ dính ở nguyên liệu gom sau nút *"Còn N món có … trong nguyên liệu — xem thêm"*.

| Gõ | Cũ | Mới |
|---|---|---|
| `hanh` | 60 | **1** — Gà hấp hành |
| `ca` | 58, Cá kho tộ thứ 6 | **14**, Canh chua cá lóc → Cá kho tộ → Bún chả cá |
| `pho bo` | 2 (lẫn Phở gà) | **1** |
| `loc ca` | 0 | **4** |
| `bun b` (gõ dở) | 27 lộn xộn | **9**, Bún bò Huế đứng đầu |
| `nuoc mam` | 44 | **1** hiện + 44 sau nút xem thêm |

- **Đã cân nhắc rồi bỏ: ngưỡng "40% điểm cao nhất".** Đó là đề xuất ban đầu, nhưng đo phân bố điểm thì thấy không cần con số nào — hai nhóm cách nhau ít nhất 8 điểm ở mọi truy vấn thử. Một phép thử thẳng ("mọi chữ có trúng tên món không") cho đúng kết quả đó mà không đẻ ra hằng số phải chỉnh tay.
- **Ba trường chỉ xuất ở `/mon/`** — `RecipeCard` nhận prop `search`; trang chủ với dải "món cùng họ" không có ô tìm nên khỏi gánh. Bỏ `summary` + tách trường làm **`/mon/` nhẹ đi 5.591 byte**: **30.275 → 24.684 byte gzip, tức 29,6 → 24,1 KB (−18,5%)**, đo trên máy chủ sau khi deploy. Bảng trạng thái và `README.md` đã sửa theo. (Số đo ở máy trước đó là 23,6 KB — lại thiếu ~2% so với máy chủ, đúng như luật đã ghi.)
- **Bẫy đã dính:** phép thử chia nhóm lúc đầu lỏng hơn phép chấm điểm (cho khớp-đầu-chữ ở *mọi* chữ chứ không riêng chữ cuối), làm khoảng cách hai nhóm ở `ca kho` ra **−2 điểm** và suýt kết luận nhầm là "ngưỡng không đáng tin". Sửa cho khớp thì ra +36. **Hai chỗ cùng một luật khớp thì phải viết cùng một luật.**
- **Chỗ dễ quên:** `.finder__more[hidden]{display:none}` — `display:` của class đè `[hidden]`, y như bài học cũ ở `.finder__toggle__n`.

**Kiểm đã làm:** `qa` sạch · `build` sạch · `link-audit` sạch · `seo-audit` sạch · chạy `astro preview` rồi bắn 20 truy vấn qua chính ô input thật trên trình duyệt, đọc lại DOM để so số món và thứ tự · thử nút xem thêm/thu gọn (`tom`: 7 ⇄ 16, ranh giới đúng ở món thứ 8) · thử chip lọc + gõ cùng lúc (`Canh` + `ga` → 1 món) · thử trạng thái rỗng (`xyzzy`) · thử vào thẳng `?q=tôm` có dấu.

## Rút ngắn hero trang chủ — 2026-07-30

Việc mọc ra từ đợt đo LCP: lưới món không nằm trên màn hình đầu, mà cách chữa là **rút hero** chứ không phải chỉnh thuộc tính `loading`.

**Dựng 6 phương án rồi mới chọn.** Không vẽ mockup rời — sửa thẳng `dist/index.html` **đã build** thành 6 bản, để mọi con số là số của trang thật. Đo trong iframe đúng bề rộng cần đo.

| Bản | Bỏ gì | thẻ đầu desktop | điện thoại |
|---|---|---:|---:|
| **A** hiện tại | — | 1164 | 1624 |
| **B** gọn chữ | không bỏ gì | **1006** | 1396 |
| **F** B + thu hình điện thoại | không bỏ gì | 1006 | **1309** |
| **C** bỏ phần trùng | 2 nút CTA + 3 pill | 870 | 1139 |
| **D** lưới lên thẳng | thêm eyebrow + câu dẫn khối | 758 | 998 |
| **E** D + thu hình | thêm câu "Thương nhau mời…" | 758 | 843 |

*(Cột C/D/E là số đo trong harness mockup, chưa nạp hẳn font nên thấp giả ~16px — xem luật ở phần 4. Cột A/B/F là số đo lại đàng hoàng trên hai bản build thật.)*

**Thái chốt B + phần điện thoại của F** — nhánh không đánh đổi nội dung nào. Đã ship:

- Đoạn giới thiệu hero rút còn **2 câu**; câu dẫn khối món rút còn 1 dòng.
- Đệm hero **76/100 → 52/72px**, khung hẹp **56/88 → 28/44px**; `.home-hero__sub` **26 → 20px**.
- Hình hero ở khung hẹp **78% → 54%** bề rộng.
- `#mon-noi-bat{padding-top:56px}` và `#mon-noi-bat .section__lead{margin-bottom:28px}` — **cố ý khoá theo id**, không đụng `.section`/`.section__lead` toàn cục vì hai class đó còn dùng ở `/mon/`, `/bi-quyet/`, trang món và dải gợi ý.

**Kết quả, đo lại trên hai bản build thật (stash → build → đo → pop → build → đo):**

| | trước | sau | |
|---|---:|---:|---|
| Thẻ món đầu, desktop (1440 và 1366 như nhau) | 1164 | **1006** | −158 |
| Thẻ món đầu, 390×844 | 1624 | **1309** | −315 |
| Chiều cao hero, desktop | 738 | **649** | −89 |
| Chiều cao hero, điện thoại | 1142 | **899** | −243 |

Quãng cuộn trên điện thoại từ **1,9 màn xuống 1,2 màn**. Chưa lọt màn hình đầu ở khung nào — chuyện đó cần bản C, mà C đang chờ GA4.

**Đã live 2026-07-30** (`3662bc6`). Nghiệm thu trên máy chủ: chữ mới có, câu cũ *"Không quảng cáo, không màu mè"* **0 lần**, và cả bốn giá trị CSS đều nằm trong `/_astro/Base.*.css` đã deploy. Dung lượng gzip đo trên máy chủ trước và sau:

| | trước | sau | |
|---|---:|---:|---|
| Trang chủ | 13.117 B | **13.048 B** | −69 B |
| `/mon/` | 24.684 B | 24.684 B | không đụng tới |
| Trang món | 16.699 B | 16.698 B | không đụng tới |

Rút hero là chuyện bố cục, không phải chuyện dung lượng — 69 byte chỉ là hệ quả của việc bớt chữ. Ghi lại để lần sau khỏi tưởng đây là một việc tối ưu tốc độ.

**Ba thứ rút ra, đã chép lên phần 4:**

- **`document.fonts.ready` không đủ để đo bố cục.** Lần đo đầu ra 990/1006 rồi lần sau **đảo ngược đúng hai khung** — tưởng là hiệu ứng bề rộng, hoá ra mỗi iframe rơi vào một trạng thái font khác nhau. Phải `fonts.load()` từng nét rồi mới đo, và kiểm `[...d.fonts].filter(f => f.status === 'loaded').length === 15`.
- **Số chênh lệch đáng tin hơn số tuyệt đối.** Mockup báo 990/1293, bản thật 1006/1309 — lệch đều 16px, nhưng **phần bớt được thì trùng khít**.
- **"Thủ phạm là cái hình" là đoán sai.** Ai cũng nghĩ hero điện thoại dài vì hình tô canh chua. Đo ra: thu hình chỉ bớt **103px**, còn bỏ 2 nút + gộp 3 pill bớt **273px**.

**Một chỗ ghi lại cho khỏi lặp:** bản mockup mô tả là *"câu dẫn 4 dòng → 2 dòng"*. Sai — đo ra là **4 → 3 dòng** ở desktop (và 4 dòng ở khung điện thoại vì cột hẹp hơn). Số đo thì đúng, chỉ lời mô tả sai; sửa lại đây cho khớp.

**Kiểm đã làm:** `qa` sạch · `build` sạch · `link-audit` sạch (384 liên kết, 0 mồ côi, 1 mảnh) · `seo-audit` sạch (192 URL ảnh) · đo lại 2 lượt liên tiếp ra **y hệt nhau** ở cả 3 khung · kiểm `scrollWidth` không tràn ngang ở khung 390 · chụp lại hero desktop + điện thoại nhìn tận mắt.

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

- [x] Dựng **contact sheet** (`node tools/contact-sheet.mjs`) — render mọi hình trên đúng nền họ màu của nó. Công cụ này ở lại làm QA thường trực cho mọi đợt món sau; mapping art đọc thẳng từ nguồn sự thật nên không lệch khi thêm món (`RecipeArt.astro` hồi đó; **từ đợt 10 là `src/utils/art.ts`**).
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
> Muốn cắt thật dung lượng thì phải **đưa hình ra file `.svg` riêng, gọi bằng `<img loading="lazy">`** — trình duyệt mới bỏ qua được hình ngoài màn hình và cache lại từng hình. Cái giá: CSS ngoài không với vào trong `<img>` được, nên luật `.steam path` phải nhúng vào từng file svg. ✅ **Đã làm ở đợt 10** — và luật `.steam` bơm một lần trong endpoint chứ không chép vào 68 file; chi tiết + số đo ở mục *"Tách hình ra file `.svg` riêng"*.

> ~~Chưa soi tận mắt bố cục ở bề rộng điện thoại~~ — **đã soi và đã sửa**, xem mục *"Đã sửa: giao diện trên điện thoại"* ngay dưới. Cách soi khi công cụ đổi kích thước cửa sổ không ăn: dựng iframe `width="414"`.

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

# ✅ PHẦN II HOÀN TẤT — 29 món mới (35 → 64)

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

## 📊 Catalog sau đợt 8 — 53 món

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

> ✅ **Đã làm ở đợt 10, sớm hơn dự tính** — vì đo lại trên máy chủ thật thì mốc ~150 KB rơi vào khoảng món thứ 60 chứ không phải 70. Con số ước "~34 KB, không đổi theo số món" ở bảng trên hoá ra khá sát: thực tế **29 KB gzip ở 64 món**.

| Nhãn mới | Nghĩa |
|---|---|
| **Cơm nhà** | Món dọn cùng cơm trắng trong bữa cơm gia đình (canh · mặn · rau) |
| **Bữa sáng** | Món điểm tâm, ăn hàng buổi sáng |
| **Cỗ Tết** | Mâm cỗ Tết – giỗ chạp |

Đồng thời **gỡ "Đãi khách" khỏi 4 món** vốn là món ăn hàng chứ không phải món đãi tiệc: phở gà, mì Quảng, bún bò Huế, canh gà lá giang. Sau khi gắn lại: Cơm nhà 14 · Đãi khách 11 · Bữa sáng 10 · Ăn chơi 7 · Nhậu lai rai 5 · Cho bé 4 · Cỗ Tết 4 · **trống nhãn 0**.

> **Cách làm:** làm thẳng trên `main`, nhưng **chỉ push khi cả phần I xong**. Header, footer và thẻ món dùng chung nên deploy nửa vời sẽ ra trang nửa cũ nửa mới.

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

> **Việc để dành:** trục "Theo dịp" thiếu thật một nhãn kiểu **"Quà chiều"**. Ứng viên không ít — bún đỏ, ốc len, bún đậu, bánh xèo, cháo lòng. Nhưng mở một giá trị mới thì phải **rà gắn lại nhãn cho cả 64 món** chứ không chỉ món mới, nên tách ra làm một việc riêng, đừng nhét vào một đợt món.

**Không nêu tên con đường bún đỏ** ở Buôn Ma Thuột — chỉ viết "một khúc phố", đúng luật không đưa tên đường vào nội dung món ăn. Câu tục ngữ tiếng Thái về pa pỉnh tộp cũng chỉ **diễn đạt bằng lời thường** ("đem gà tới biếu cũng không quý bằng đem cho nhau con pa pỉnh tộp") chứ không chép nguyên văn tiếng Thái, vì chỉ tra được một nguồn duy nhất cho cách phiên âm.

## 📊 Catalog sau đợt 9 — 58 món

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

> ⚠️ **Đính chính sau khi deploy: máy đo THIẾU so với thứ máy chủ trả về.** Cột gzip ở trên đo bằng `gzip -c` trên máy. Đo lại bằng `curl -sI -H 'Accept-Encoding: gzip'` trên www.monvietngon.com thì `/mon/` là **147.301 byte = 143,8 KB**, tức **hơn 2,9 KB (+2,1%)** so với 140,9 KB đo ở máy — GitHub Pages nén ở mức khác. **Con số đáng dùng là con số của máy chủ**, vì đó mới là thứ người đọc tải về.
>
> ⚠️ **Chiếu lại theo số thật: mốc ~150 KB rơi vào khoảng món thứ 60**, tức là **ngay món thứ hai hoặc ba của đợt 10**, không phải món thứ 62 như ước lúc chưa deploy. Nghĩa là việc **tách hình ra `.svg` riêng** (endpoint `src/pages/art/[kind].svg.ts` theo khuôn `og/[slug].png.ts`, chi tiết ở mục đính chính bên dưới) nên làm **TRƯỚC khi viết món nào của đợt 10**.
>
> Bài học đo đạc: **đo dung lượng thì đo trên máy chủ thật, đừng đo `gzip -c` ở máy** — cùng một lỗi họ hàng với vụ "mọi con số trước đây đều là chưa nén" ở mục đính chính bên dưới.

## ✅ Ô "Chiên" — đã vá bằng cách 1 (Thái chốt 2026-07-29)

Bê chao Mộc Châu bị gỡ khỏi đợt 9 nên gom "Bánh" xong thì *Chiên* chỉ còn chả
giò + cá tai tượng = 2. Ba đường đã cân:

| Cách | Kết quả | |
|---|---|---|
| **1. Đợt 10 lên 6 món, thêm một món *Chiên*** | 64 món · 14 kiểu · mọi ô ≥ 3 | ✅ **đã chọn** |
| 2. Hoãn gom "Bánh" sang đợt 11 | 63 món · 13 kiểu — mọi ô ≥ 3 mà thiếu kiểu món thứ 14 | |
| 3. Kéo cơm chiên cá mặn sang *Chiên* | 63 món · 14 kiểu, nhưng món cơm xếp vào Chiên thì ai lọc chip "Cơm" không thấy nó | |

**Món bù là cánh gà chiên nước mắm** (Cả nước · Dễ). Chọn nó vì ba lẽ: nguyên
liệu chợ nào cũng có (đúng luật rút ra từ vụ bê chao), nổi tiếng khắp nước, và
dáng hình tách được khỏi 6 hình họ *Lửa* còn lại — đống cánh gấp khúc bóng
caramel đối lại con gà ép dẹt nguyên con của gà nướng mắc khén.

**Cái giá đã biết trước và chấp nhận: bức tranh sau cùng thành 64 món chứ không
tròn 63.** Đổi lại không ô nào dưới 3, tức là luật "mỗi kiểu ≥ 3 món" — thứ giữ
cho hàng chip lọc khỏi phình — vẫn nguyên vẹn.

### ✅ Đợt 10 — LIVE 2026-07-30 · 6 món · mở kiểu món "Bánh"

| Món | Vùng | Kiểu món | Độ khó | Theo dịp |
|---|---|---|---|---|
| Nem nướng Nha Trang | Miền Trung | Cuốn | Vừa | Ăn chơi · Đãi khách |
| Cá tai tượng chiên xù | Miền Tây | Chiên | Vừa | Đãi khách · Nhậu lai rai |
| Ốc hấp lá gừng | Miền Bắc | Hấp | Vừa | Đãi khách · Nhậu lai rai |
| Gà hấp hành | Cả nước | Hấp | Dễ | Cơm nhà · Đãi khách · Cỗ Tết |
| Gỏi ngó sen tôm thịt | Miền Nam | Gỏi | Dễ | Đãi khách · Cỗ Tết · Nhậu lai rai |
| **Cánh gà chiên nước mắm** | Cả nước | Chiên | Dễ | Cơm nhà · Nhậu lai rai · Cho bé |

**Mở kiểu món "Bánh"** — chuyển **bánh xèo miền Tây** (từ Chiên), **bánh cuốn
nóng** (từ Hấp), **bánh khoái Huế** (từ Chiên). Định nghĩa đã chép vào
`content.config.ts`: *Bánh = vỏ tráng/đổ từ bột gạo, dù rồi đem chiên hay đem
hấp — xếp theo THỨ LÀM RA chứ không theo cách làm chín.*

#### Đây là đợt đầu tiên CHUYỂN món chứ không chỉ thêm — và chuyển thì đổi cả họ màu

Ba món trên đổi kiểu món nên đổi luôn **họ màu: đỏ/nâu → vàng**. Soi lại cả ba
trên nền vàng thì bắt được một lỗi thật:

> **Bánh khoái Huế** tô viền vỏ bánh bằng `#A9700F` — gần như **trùng khít mã
> nền vàng `#A8801A`**. Trên nền đỏ cũ thì không sao, chuyển sang nền vàng là
> mất hẳn đường bao, hai cái bánh nhoè vào nền. Hạ viền xuống `#7A4A08` (đúng
> sắc đã dùng cho cạnh dày của bánh) là xong. Bánh xèo và bánh cuốn sống tốt —
> cả hai đều nằm trên dĩa sứ trắng nên có sẵn đường bao.

Cùng loại lỗi với vụ *tộ đất nâu trên nền nâu* ở Phần I. **Luật: món chuyển kiểu
thì phải soi lại hình trên nền họ màu MỚI, không được coi là "hình cũ đã duyệt rồi".**

`SLUG_RECAT` trong `contact-sheet.mjs` đã gỡ (để rỗng) — ba món ấy giờ mang
`category: Bánh` thật nên đọc thẳng từ YAML là đủ.

#### Mở kiểu món đụng **8 chỗ**, không phải 7 — bảng ở README đã sai

Kiểm từng chỗ chứ không suy từ đợt trước, và phát hiện bảng README thiếu một
dòng: `tools/art-png.mjs` cũng có bảng `FAMILIES` riêng, thêm từ đợt 9 mà quên
ghi vào bảng. Đã sửa README thành 8 chỗ.

| Chỗ | Đợt 10 |
|---|---|
| `content.config.ts` enum `category` · `utils/art.ts` `BY_CATEGORY` · `_template.yaml` · ROADMAP | **phải thêm** |
| `utils/family.ts` · `CAT_ORDER` · `contact-sheet.mjs` `FAMILIES` · `art-png.mjs` `FAMILIES` | **đã có sẵn** từ Phần I và đợt 9 |

**Đổi số `order` 34 file**, dồn lại 1–64. Khối "Bánh" chèn ngay trước "Chiên"
theo đúng `CAT_ORDER`. Vẫn dùng script có **chốt an toàn** như đợt 9: đối chiếu
danh sách slug viết tay với danh sách file thật, lệch một cái là dừng, không sửa
file nào.

**Hai bẫy YAML lại dính, `npm run qa` bắt trước khi build:** `- Nấu tương: phi
hành tỏi…` trong `quick.steps` (chuỗi chứa `": "` bị nuốt thành object) và
`storyTitle: Cọng ngó sen và **hai kẻ thù của nó**: khí trời và muối` — cùng một
bẫy nhưng ở `storyTitle`, chỗ trước giờ chưa dính bao giờ. Thêm một lỗi cú pháp
định lượng `[[1/2|củ]]` (phải là `[[0.5|củ|frac]]`).

#### Hình: **ba hình phải vẽ lại vì vẽ sai cơ chế của vật**

Đợt 9 rút ra "vẽ hỏng thường là do chưa hiểu món". Đợt 10 lặp lại y nguyên, ba lần:

| Hình | Bản đầu đọc ra cái gì | Sai ở đâu | Chữa bằng cách hiểu lại vật |
|---|---|---|---|
| **ốc hấp lá gừng** | cây nấm, rồi con bọ, rồi quả thông | vỏ vẽ thành quả trứng sẫm có một cái lỗ (mất chóp xoắn); gắn thêm cục tròn lên đỉnh thì thành cái đầu; thêm vân dọc cắt ngang đường xoắn thì mặt vỏ thành tấm lưới | vỏ ốc nhồi là **một khối giọt nước**, chóp thuôn LIỀN từ thân lên chứ không phải quả cầu gắn thêm. Ba nét là đủ: dáng giọt · **đường xoắn** vòng quanh thân · **miệng vỏ** ô-van có vành môi sáng. Bỏ hẳn vân dọc |
| **gà hấp hành** | củ khoai luộc, rồi lát củ cải | bản 1 vẽ mỗi miếng là khối ô-van vàng trơn (toàn da); bản 2 lật hẳn sang mặt cắt thịt trắng có vòng xương nhỏ giữa → thành lát cắt củ quả | miếng gà chặt **không phẳng như lát cắt**: mặt trên là **da vàng có nếp**, mặt cắt thịt trắng chỉ lộ ở **mép dưới trước**, và bao giờ cũng có **mẩu xương chìa ra**. Thêm hai cái **đùi gà** nguyên chiếc, xương chìa dài có khớp tròn |
| **cá tai tượng** | cái mặt côn trùng có hai chân, rồi trái thơm | vẽ **hai mắt đối xứng** và hai sợi vây chìa hai bên — nhưng con cá dọn nghiêng thì người xem thấy BỀ HÔNG, chỉ thấy **một** mắt và **một** sợi vây; vảy xếp đều tăm tắp kín cả mình thì thành trái thơm | một mắt, một sợi vây; bỏ bớt hàng vảy và thêm **mảng sáng dọc sống lưng** cắt ngang lưới vảy cho vỡ nhịp lặp; đuôi chẻ hai thùy có khe giữa |

Còn một lỗi thuộc loại khác — **hai vật khác nhau mà tô cùng sắc cùng dáng**:

> **Nem nướng**: que tre xiên nem vẽ dày, màu kem, gần trùng khít với **ống bánh
> tráng chiên** nằm cạnh → hai thứ đọc ra cùng một loại vật, cả dĩa thành mấy
> cái que. Chữa bằng cách đẩy hai thứ ra hai đầu: que **mảnh và sẫm hẳn**
> (`#A8834A`, dày 6.8 thay vì 10), ống bánh tráng **mập và sáng hẳn** (dày 32,
> vẽ rõ **miệng ống rỗng** sẫm). Đúng luật đợt 8: khác cả sắc lẫn dáng.
>
> **Gỏi ngó sen**: bánh phồng tôm vẽ thành ô-van nhọn hai đầu → đọc ra quả trứng.
> Bánh phồng tôm thật là **miếng tròn cong vênh, mép lượn sóng, mặt rỗ lỗ khí**.

#### Vòng duyệt thứ hai: **bốn hình phải vẽ lại vì BỐ CỤC**, không phải vì vật

Thái xem bản đầu và trả lại bốn hình với cùng một nhận xét — *"rời rạc, mảnh này
mảnh kia, không giống một món ăn thống nhất"*. Đây là lớp lỗi khác hẳn lớp trên:
từng miếng vẽ đúng cả, hỏng ở **cách bày**.

| Hình | Nhận xét | Chữa |
|---|---|---|
| **cá tai tượng** | "con cá dựng đứng nhìn kỳ quá, dù biết là nó dựng đứng lúc ăn" | Cho cá **NẰM** trên dĩa oval. Chống đụng cá lóc nướng trui bằng thân **dẹp bè** (cao/dài ≈ 0,6 so với 0,3), sắc **vàng rơm** so với cháy đen, dĩa sứ so với lá chuối. Thêm **một miếng thịt đã gỡ** và **một cuốn đã cuốn xong** trên dĩa cho ra "món đang ăn" |
| **gà hấp hành** | "chỉ là mấy cục thịt, nhìn rời rạc" | Một **khối hành lá liền** lấp kín lòng dĩa, miếng gà xếp **chồng mép** thành gò, đùi gà lên đỉnh. Bỏ 4 mẩu xương phụ — mỗi mẩu chỉ lộ một đoạn giữa hai miếng nên đọc ra **cây bông gòn** |
| **gỏi ngó sen** | "rời rạc… mà đối xứng hai bên nhìn kỳ" | **Vun thành gò** bằng một path khối liền như gỏi xoài; bánh phồng tôm còn **một** miếng đặt lệch; tôm vẽ lại thành **thân cong đặc có khía đốt** (bản đầu là chữ C rỗng → hai cái móc đỏ) |
| **cánh gà** | "nhìn ko có cánh gà, chỉ thấy mấy cục dài dài lẻ tẻ, không cảm nhận được sự giòn" | Ba lỗi tách riêng: (a) khối chữ V là dáng tự bịa → vẽ đúng **tỏi gà** (đùi tí hon) và **cánh giữa** (dẹp, chìa **hai** đầu xương); (b) xương vẽ trước khối thịt nên bị đè mất → chuyển ra vẽ **sau**, chìa dài hẳn; (c) giòn nằm ở **đường bao gồ ghề** → chuỗi cục vụn bột vẽ **trước** khối thịt để chỉ nhô ra ở mép |

**Bốn luật dùng lâu dài, đã ghi vào README:** món ăn phải là **một khối** (path
khối liền trước, chi tiết đè lên, miếng nào cũng chồng mép) · **đúng thực tế chưa
đủ, hình còn phải đọc ra món ăn** · **đừng bày đối xứng hai bên** · **cảm giác
giòn nằm ở đường bao gồ ghề, không ở màu**.

> Nhân vòng này bắt được một chỗ **tool và bản ship đọc khác nhau**: endpoint bỏ
> chú thích khi xuất `.svg`, nhưng `art-png.mjs` và `contact-sheet.mjs` thì không
> — nên một chú thích chứa `--` làm **tool gãy** trên đúng cái file vẫn ship ra
> web bình thường. Đã cho cả hai tool bỏ chú thích y như endpoint.

**Chống đụng đã soi cạnh nhau bằng PNG ghép** (`npm run art-png -- --sheet`),
không đoán: 3 món *Cuốn* + chả giò · 3 món *Gỏi* · 3 món *Hấp* + ốc len xào dừa ·
3 món *Chiên* · 3 con cá của họ *Lửa* · 4 món gà (gà hấp · gà nướng · gà kho ·
cơm gà). Nhóm phải soi mà suýt bỏ sót là **ốc hấp vs ốc len** — cùng là "ốc",
cùng nền nâu, mà một con vỏ tròn một con vỏ chóp.

*Nem nướng Nha Trang làm đúng **bản gốc cuốn bánh tráng** (không phải bản tô bún
kiểu Sài Gòn), và bài nói rõ chỗ khác nhau đó. Chén chấm là **tương** — sốt nấu
sánh đục màu cam nâu — chứ không phải nước mắm chua ngọt; **ống bánh tráng chiên
phồng** giấu trong cuốn là chữ ký của bản Ninh Hòa.*

*Ốc hấp lá gừng phân biệt kỹ **ốc nhồi (ốc bươu đen)** với **ốc bươu vàng** ngay
ở phần nguyên liệu — hai thứ bày cạnh nhau ngoài chợ, mua nhầm là thịt bở và
mất hẳn cái sần sật vốn là điểm của món.*

*Cá tai tượng chiên xù dặn kỹ **"để nguyên vảy, chỉ mổ bụng"** — hàng cá quen tay
đánh vảy sạch trước khi đưa, mà đánh vảy rồi thì không còn gì để gọi là "chiên xù".*

## 📊 Catalog sau đợt 10 — 64 món

| Kiểu món | | | Vùng miền | sau đợt 9 → nay | | Theo dịp | |
|---|---:|---|---|---:|---|---|---:|
| Món nước | 12 | | Miền Nam | 15 → **16** · 25% | | Đãi khách | 26 |
| Kho · Xào | 7 mỗi loại | | **Cả nước** | 11 → **13** · 20% | | Ăn chơi · Cơm nhà | 18 mỗi nhãn |
| Canh | 5 | | **Miền Trung** | 11 → **12** · 19% | | Bữa sáng · Nhậu lai rai | 17 mỗi nhãn |
| Bún trộn · Cơm · Nướng | 4 mỗi loại | | **Miền Bắc** | 9 → **10** · 16% | | Cho bé | 9 |
| **Bánh** · Cháo · **Chiên** · **Cuốn** | 3 mỗi loại | | **Miền Tây** | 7 → **8** · 13% | | Cỗ Tết | 7 |
| **Gỏi** · **Hấp** · Lẩu | 3 mỗi loại | | Tây Nguyên | 3 · 5% | | **trống nhãn** | **0** |
| | | | Tây Bắc | 2 · 3% | | | |

**Độ khó:** Vừa 33 (52%) · Dễ 24 (38%) · Kỳ công 7 (11%).
**Họ màu:** Chan & húp 23 · Mặn đưa cơm 17 · Cuốn & trộn 10 · **Cơm & bánh 7** · **Lửa 7**.

**Lần đầu tiên không ô nào dưới 3.** 14 kiểu món, ô mỏng nhất có đúng 3 món, và
sáu ô cùng ở mức đó (Bánh · Cháo · Chiên · Cuốn · Gỏi · Hấp · Lẩu). Đây là mốc
mà cả Phần II hướng tới — luật "mỗi kiểu ≥ 3 món" giữ hàng chip lọc khỏi phình
giờ đã đúng ở mọi ô, không còn chỗ nào phải chữa gấp.

**Sáu món đợt 10 rơi vào sáu ô khác nhau**, nên mọi vùng trừ Tây Nguyên và Tây
Bắc đều nhích lên một bậc mà tỷ lệ gần như không đổi. Miền Nam vẫn tụt tiếp
26% → 25% dù *thêm* một món.

## Featured: đổi **một ô** ở đợt 10 — trang chủ lần đầu phủ **7/7 vùng**

Tây Nguyên vắng mặt trang chủ từ đầu (ghi nợ ở đợt 9). Đợt này trả được bằng
đúng một nước đi, và là nước đi **không đụng trục nào khác**:

| Vào | Ra |
|---|---|
| **Phở khô Gia Lai** (Món nước · Tây Nguyên · Vừa) | Bún chả cá (Món nước · Miền Trung · Vừa) |

Cùng kiểu món, cùng độ khó, cùng họ màu — nên 12 ô giữ y nguyên **họ** 5·2·2·2·1,
**độ khó** 3 Dễ / 6 Vừa / 3 Kỳ công, và **không kiểu món nào quá 3**. Chỉ trục
vùng đổi: Miền Trung 3 → 2, **Tây Nguyên 0 → 1**.

> Đã cân cả việc đưa một món đợt 10 lên trang chủ. Không nước nào đi được mà
> không phá một trục: gỏi ngó sen thay bánh tráng cuốn thì *Cuốn* biến mất khỏi
> trang chủ (vừa đưa lên ở đợt 8); nem nướng thay bún đậu thì *Bún trộn* về 0 và
> Miền Bắc tụt còn 1. **Featured là chỗ để món mạnh nhất, không phải chỗ trưng
> món mới.**

## ✅ Tách hình ra file `.svg` riêng — làm ở đợt 10, TRƯỚC khi viết món

Việc hoãn từ Phần I, tới đây thì buộc phải làm: `/mon/` đã 143,8 KB gzip ở 58
món, mà mốc ~150 KB rơi vào khoảng món thứ 60 — tức món thứ hai hoặc ba của
chính đợt này.

**Cách làm** (đúng khuôn `og/[slug].png.ts` đã có):

| File | Việc |
|---|---|
| `src/utils/art.ts` *(mới)* | nguồn sự thật duy nhất: `ART_COMPONENT` (tên art → file), `BY_CATEGORY`, `artKind()` |
| `src/pages/art/[kind].svg.ts` *(mới)* | đọc raw file art bằng `import.meta.glob('…?raw')`, rút `<svg>`, **bơm luật `.steam` một lần trong code**, xuất `/art/<kind>.svg` |
| `src/components/art/ArtImg.astro` *(mới)* | `<img loading="lazy" width="520" height="470">` |
| `RecipeCard.astro` · `mon/[slug].astro` | gọi `ArtImg`; hero trang món dùng `loading="eager"` |
| `home.css` · `recipe.css` | `svg` → `img`, thêm `height:auto;display:block` |
| `RecipeArt.astro` | **xóa** — nó chỉ còn là bảng tra. 3 tool đọc bảng từ `utils/art.ts` qua `tools/art-map.mjs` |

**Kết quả đo được** (`/mon/`, gzip):

| | thô | gzip máy | **máy chủ (đo thật)** |
|---|---:|---:|---:|
| 58 món, hình nhúng thẳng | 634 KB | 141 KB | **143,8 KB** |
| **64 món, hình ra file riêng** | **149 KB** | **29 KB** | **29,5 KB** |

> Đo lại sau khi deploy 2026-07-30: `/mon/` **30.232 byte = 29,5 KB** — sát con
> số ước 29,8 KB, tức hệ số ×1,021 giữa máy và máy chủ vẫn đúng. Trang chủ
> **15,1 KB**, trang chi tiết món mới **13,0 KB**. GitHub Pages **có nén cả
> file `.svg`** (`content-encoding: gzip`, `cache-control: max-age=600`), nên
> chỗ dùng chung hình giữa ba trang là ăn thật.

**Giảm 79,5% (143,8 → 29,5 KB), và quan trọng hơn: dung lượng trang thôi tăng
theo số món.** Thêm
một món giờ chỉ thêm phần chữ của cái thẻ. Trang chủ 36,8 → 14,9 KB gzip; trang
chi tiết món 19,0 → 16,8 KB. Cả bộ 68 hình cộng lại 161 KB gzip nhưng **tải theo
nhu cầu** (`loading="lazy"` bỏ qua hình ngoài màn hình) và **dùng chung cho cả
ba trang** — trước đây mỗi trang tải lại y hình đó từ đầu.

### Ba cái bẫy chỉ lộ ra khi tách, không cái nào làm build đỏ

| Bẫy | Chuyện gì xảy ra | Chữa |
|---|---|---|
| **Chú thích chứa `--`** | File `.svg` rời đọc bằng bộ phân tích XML **nghiêm**, khác HTML dễ dãi. `ca-kho.svg` có chú thích nhắc `--art-halo` → **cả hình chết**, build vẫn xanh, chỉ mất đúng một thẻ trên `/mon/` | Endpoint **bỏ hết chú thích** khi xuất — chữa tận gốc cả lớp lỗi này, bản gốc `.astro` vẫn giữ nguyên chú thích |
| **Dấu `&` trần** | Cùng loại, cũng chết cả hình mà không báo | `check-art-ids.mjs` soi trên đúng thứ endpoint xuất ra (đã bỏ chú thích) |
| **`viewBox` lệch** | `ArtImg` đặt cứng `width`/`height` 520×470; hình nào lệch tỉ lệ là méo | `check-art-ids.mjs` chặn |

> Bẫy thứ nhất bắt được **không phải bằng đọc code mà bằng mở trang ra đếm**:
> `document.querySelectorAll('img')` lọc `complete && naturalWidth===0` → đúng 1
> hình hỏng trong 58. Sau khi sửa, kiểm lại bằng cách parse XML cả 68 file.

**Đã kiểm cả ba nơi hiện hình** sau khi đổi: `/mon/` 64 `<img>` · trang chủ 12 ·
trang chi tiết 1, không hình nào hỏng, và **cỡ hiển thị đo được y hệt trước khi
tách** (196×177 px trên thẻ) nên bố cục không đổi một pixel nào.

**Một chỗ đổi hành vi có chủ ý:** trước đây `<svg role="img" aria-label="…">` nằm
trong thẻ nên trình đọc màn hình đọc cả câu mô tả hình vào giữa nội dung thẻ.
Giờ `<img>` mang `alt="Minh họa <tên món>"` — ngắn hơn, đỡ nhiễu; câu mô tả dài
vẫn còn nguyên trong chính file `.svg`.

## Hạ tầng còn để dành (sau phần I & II)

- ~~Tách hình ra `.svg` riêng~~ — **xong ở đợt 10**.
- ~~**RSS feed**~~ — **xong 2026-07-30**, `/rss.xml`.
- ~~**Thống kê truy cập nhẹ — GoatCounter**~~ — **đã bỏ ý này.** Thái chốt dùng **Google Analytics 4** (2026-07-30); lý do và cái giá phải trả ghi ở **phần 2, mục "Hạ tầng" số 1**. Dòng cũ ở đây giữ lại chỉ để khỏi ai đọc lướt rồi tưởng GoatCounter vẫn là kế hoạch.
