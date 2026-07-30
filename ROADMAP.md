# Lộ trình Món Việt Ngon

Kho công thức món Việt tại [www.monvietngon.com](https://www.monvietngon.com) — mục tiêu dài hạn: **~100 món** phủ đủ ba miền, món nào cũng được chăm chút như món nào.

_Cập nhật 2026-07-30. Site đang **64 món / 7 vùng / 14 kiểu món**, không kiểu món nào dưới 3._

**Cách đọc file này:** bốn phần đầu là **thứ còn dùng** — trạng thái, việc còn lại, quy trình, luật đã chốt. Phần **Nhật ký** ở cuối là **chuyện đã qua**, giữ lại vì phần lý lẽ đằng sau mỗi quyết định mới là chỗ đáng giá; đừng đọc nó như chỉ dẫn, và vài con số trong đó chỉ đúng ở thời điểm viết.

---

# 1 · Trạng thái hôm nay

| | |
|---|---|
| **Nội dung** | 64 món · 7 vùng · 14 kiểu món · 7 nhãn Theo dịp · **0 món trống nhãn** |
| **Giao diện** | Hướng "Khăn rằn": nền thẻ mã hóa theo 5 họ màu, trang chi tiết mang màu họ của chính nó |
| **Trang chủ** | 12 món nổi bật, phủ **7/7 vùng** |
| **Dung lượng** | `/mon/` **24,1 KB** gzip (đo trên máy chủ) và **không tăng theo số món** — hình nằm ở file `.svg` riêng |
| **Liên kết chéo** | Mỗi trang món có dải **6 món** cuối trang — 0 mồ côi, 0 dải trùng, catalog liền **1 mảnh** |
| **QA** | `npm run qa` (bắt buộc trước mỗi build) · `npm run link-audit` + `npm run seo-audit` (sau build) · `npm run art-png -- --sheet` · `npm run contact-sheet` |
| **SEO** | JSON-LD `Recipe` · `BreadcrumbList` + breadcrumb thật · `WebSite` + `SearchAction` · `canonical` + `og:url` · sitemap · **RSS** `/rss.xml` |
| **Ảnh tìm kiếm** | `/anh-mon/<slug>-{1x1,4x3,16x9}.jpg` — hình món trên nền họ màu, sinh lúc build. **Khác `/og/`**: `/og/` là thẻ chữ để chia sẻ, `/anh-mon/` là ảnh cho bot |
| **Hạ tầng** | JSON-LD Recipe · ảnh OG sinh lúc build · sitemap · robots.txt · deploy tự động GitHub Pages + HTTPS |

## Catalog hôm nay

**Kiểu món (14 nhóm, tất cả ≥ 3 món):**

| | | | |
|---|---:|---|---:|
| Món nước | 12 | Bánh | 3 |
| Kho | 7 | Cháo | 3 |
| Xào | 7 | Chiên | 3 |
| Canh | 5 | Cuốn | 3 |
| Bún trộn | 4 | Gỏi | 3 |
| Cơm | 4 | Hấp | 3 |
| Nướng | 4 | Lẩu | 3 |

*64 chứ không tròn 63: đợt 10 lên 6 món để vá ô **Chiên** sau vụ gỡ bê chao — xem mục *"Ô Chiên"* trong phần Nhật ký.*

**Vùng miền:**

| Vùng | Trước đợt 6 | Sau đợt 9 (58 món) | **Nay (64 món)** |
|---|---:|---:|---:|
| Miền Nam | 14 (40%) | 15 (26%) | **16 (25%)** |
| Miền Trung | 3 (9%) | 11 (19%) | **12 (19%)** |
| Cả nước | 6 | 11 | **13 (20%)** |
| Miền Bắc | 6 | 9 | **10 (16%)** |
| Miền Tây | 4 | 7 | **8 (13%)** |
| Tây Nguyên | 1 | 3 | **3 (5%)** |
| Tây Bắc | 1 | 2 | **2 (3%)** |

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
5. **Nhãn "Quà chiều"** cho trục Theo dịp. Ứng viên: bún đỏ, ốc len, bún đậu, bánh xèo, cháo lòng. Mở một giá trị enum mới là phải **rà gắn lại cả 64 món** chứ không chỉ món mới — nên phải là việc riêng, **đừng nhét vào một đợt món**.

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

> **"~150 KB gzip" giờ vô nghĩa, đừng dùng lại.** Từ đợt 10 độ dốc xuống còn ~0,2 KB/món (chỉ còn phần chữ của cái thẻ) thay vì 2,6 KB/món, nên ở 100 món `/mon/` ước chừng **31 KB** — chưa đo, suy từ **24,1 KB** đo trên máy chủ ở 64 món. **Không còn rào dung lượng nào chặn đường lên 100 món.** *(Con số ước cũ ghi 37 KB vì suy từ mốc 29,5 KB trước khi làm lại ô tìm kiếm — mốc đó đã hết hiệu lực.)*

## Việc lớn nhất, và nó cần Thái

64 → ~100 món là **còn ~36 món**, mà kho ý tưởng dưới đây chỉ có ~11 món đã tra sẵn. Tức là việc lớn nhất còn lại của dự án là **ngồi chọn thêm chừng 25 món** — không tự mở đợt được. Hai ô mỏng nhất là Tây Bắc (2 món) và Tây Nguyên (3), nhưng Tây Bắc đã cạn món nấu-được-ở-nhà (xem kho ý tưởng).

> **Nếu chỉ làm một thứ:** ~~trang 404 + liên kết chéo~~ — đã làm 2026-07-30. Việc còn lại mà người đọc cảm nhận được liền thì hết; những gì còn trong danh sách đều là hạ tầng hoặc SEO, không ai nhìn thấy.

## Kho ý tưởng để dành — **chưa xếp vào đợt nào**

> **Không có đợt 11 nào được xếp lịch.** Phần I + Phần II là toàn bộ chương trình đã lên kế hoạch và cả hai đã xong; mục tiêu dài hạn ~100 món thì vẫn còn đó. Muốn làm tiếp phải ngồi chọn món trước, đừng tự mở đợt.

- **Tây Bắc** — sau gà nướng mắc khén và pa pỉnh tộp thì vùng này còn rất ít món nấu-được-ở-nhà. Đã lọc bằng luật *"nguyên liệu chính phải mua được ở chợ thường"*:
  - **Loại hẳn:** bê chao Mộc Châu (bê sữa ngoài vùng không mua được), thịt trâu gác bếp (thịt trâu khó mua, lại đụng luật khói), nộm da trâu (da trâu không mua nổi, sơ chế quá kỳ công).
  - **Còn để dành:** **xôi ngũ sắc** (nhuộm bằng lá cẩm · nghệ · gấc · lá dứa, mua được hết; xếp vào kiểu món *Cơm* thì hơi gượng nên chưa làm), **canh cải mèo** (dễ nấu nhưng nhạt, và hình lại là thêm một tô canh nữa).
- **Đông Bắc** (Lạng Sơn, Cao Bằng, Hà Giang) — **không mở vùng riêng**; nếu sau này làm thì gắn vào "Miền Bắc". Món đã tra sẵn: khâu nhục, vịt quay lá mắc mật, phở chua Lạng Sơn.
- **Miền Trung còn dư ý tưởng:** cơm âm phủ Huế, chả ram tôm đất Bình Định, cá nục hấp cuốn bánh tráng, bánh canh cá lóc Quảng Trị.
- **Bún trộn** đã đủ quân; nếu mở rộng thì có bún ốc nguội, bún nem cua bể.

## Lặt vặt

- ~~GitHub Actions cảnh báo Node 20 deprecated~~ — **xong 2026-07-29.** Ghi lại vì lần đầu đọc dễ hiểu sai: cảnh báo đó **không** nói về Node dùng để build (workflow vốn đã `node-version: 24` từ trước), mà nói về Node chạy code của bản thân mấy action. Và **2 trong 3 action bị nêu không nằm trong `deploy.yml`** — `setup-node` với `upload-artifact` được gọi bên trong `withastro/action`, nên sửa file mình không với tới; phải nâng chính `withastro/action`. Đã nâng `checkout` v4→v7, `withastro/action` v3→v6, `deploy-pages` v4→v5. `checkout@v7` có breaking change thật (chặn checkout code fork PR) nhưng repo này chỉ chạy trên `push` + `workflow_dispatch`, không dùng `pull_request_target`/`workflow_run` nên không dính.
- **Node build giữ ở 24, đừng nâng lên 26** dù máy đang chạy 26: Node bản chẵn tới tháng 10 của năm đó mới lên LTS, nên tới giờ 26 vẫn là Current. CI nên đứng ở LTS.

---

# 3 · Quy trình thêm một đợt món mới

1. Mỗi món 1 YAML — copy `src/content/recipes/_template.yaml` (tên file = slug URL); dòng có `": "` phải quote, timer label dạng `MM:SS`, định lượng viết `[[số|đơn vị]]` để tự scale theo khẩu phần
2. **Mỗi món phải có ít nhất 1 nhãn `occasions`** — không để trống
3. Vẽ art riêng ngay từ đầu: `src/components/art/Art<Ten>.astro` + một dòng trong `ART_COMPONENT` (`src/utils/art.ts`) + giá trị mới trong enum `art` (`content.config.ts`). **Vẽ và soi trên đúng nền họ màu của món** (hình phải giống món thật, không trùng nhau, xương đúng loài). Ba ràng buộc của file art — `viewBox` phải là `0 0 520 470`, không `currentColor`/`var(--…)`, không `&` trần — `npm run qa` chặn cả ba
4. Cân lại `order` + `featured` toàn danh sách — trang chủ lấy **12 món featured đầu tiên theo order**
5. Cập nhật danh sách tease trong `ComingSoon.astro` (bỏ món đã ship, thêm từ kho ý tưởng) + ticker ở `index.astro` nếu món đáng lên
6. **`npm run qa`** trước đã — bắt bẫy YAML, `order` trùng, `id` nguyên liệu trùng, `id` art trùng chéo file (những thứ Zod không bắt được). Rồi `npm run build` để schema tự kiểm, rồi `npm run preview` mở xem từng trang mới
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
- *Món nước = một tô là xong bữa · Canh = món trong mâm cơm · Lẩu = nồi giữa bàn · Cháo = gạo ninh nhừ · Bánh = vỏ tráng/đổ từ bột gạo, dù chiên hay hấp.*
- **Mở một kiểu món đụng 8 chỗ** (bảng ở README) — **kiểm từng chỗ, đừng suy từ đợt trước.** Đợt 7 hoá ra chỉ phải sửa 4/8; đợt 8 và 9 chỉ 3/8.
- **Không mở vùng "Đông Bắc"** — gộp vào Miền Bắc. Enum vùng đứng ở 7 giá trị.
- **Mọi món phải có ≥ 1 nhãn `occasions`** — schema đã `.min(1)`, để trống là build gãy.

**Chọn món**
- **Nguyên liệu chính phải mua được ở chợ thường**, dù món nổi tiếng tới đâu (luật rút ra khi gỡ bê chao Mộc Châu; cùng luật đã loại thịt trâu gác bếp và nộm da trâu).
- **Cái gì đưa lên `title` phải là chỗ chắc nhất của món** — tiêu đề không có chỗ rào đón mà lại là câu đi xa nhất (thẻ món, hero, kết quả tìm kiếm, ảnh OG).
- **Chú giải đi cùng lần xuất hiện ĐẦU TIÊN, không phải lần giải thích kỹ nhất.** Nhưng chú giải cũng phải biết dừng: cách chữa đúng thường là **đừng dùng từ khó ở `summary`**.

**Màu và hình**
- **Màu khung site không được trùng hệ với họ món đông nhất**, không thì màu đó chiếm cả hai tầng và thành màu chủ đạo cả site.
- **Thứ gì trong tô cũng phải khác thứ bên cạnh ở CẢ sắc lẫn DÁNG** — đổi mỗi màu mà giữ nguyên dáng thì ở cỡ thumbnail vẫn lẫn. **Đạo cụ cũng phải khác**, không riêng món chính.
- **Món ăn phải là MỘT KHỐI** — path khối liền làm nền đống trước, chi tiết đè lên, miếng nào cũng chồng mép.
- **Đúng thực tế chưa đủ, hình còn phải đọc ra một món ăn.** Và **đừng bày đối xứng hai bên**.
- **Vẽ hỏng thường là do chưa hiểu vật, không phải tay kém** — chữa bắt đầu bằng việc đọc lại *vật đó cấu tạo thế nào*.
- **Món CHUYỂN kiểu món phải soi lại hình trên nền họ màu MỚI** — đừng coi là "hình cũ đã duyệt rồi".

**Đo đạc**
- **Đo dung lượng trên máy chủ** (`curl -H 'Accept-Encoding: gzip'`), đừng `gzip -c` ở máy — số ở máy thiếu ~2%.
- **Phân vân giữa các phương án giao diện thì dựng harness iframe rồi đo `getBoundingClientRect()`**, đừng bàn cảm tính.
- **Contact sheet không đủ để soi hình** — phải render PNG ghép ở cỡ thumbnail (`npm run art-png -- --sheet`). Đợt 7, 8, 9, 10 đều có lỗi lọt qua contact sheet.
- **File `.svg` rời đọc bằng XML nghiêm** — chú thích cấm chứa `--`, cấm `&` trần. Endpoint tự bỏ chú thích; `qa` chặn hai lỗi kia. **Tool soi phải đọc đúng thứ endpoint xuất ra.**
- **"Nằm trên màn hình đầu" là thứ PHẢI ĐO, không được suy.** Lưới món trang chủ trông như ở gần đầu trang, thật ra hồi đó bắt đầu ở **1165px** — không ô nào lọt màn hình đầu ở mọi khung thường gặp. Một dòng `getBoundingClientRect().top` là biết, mà không đo thì đẻ ra cả một việc sai. *(Rút hero 2026-07-30 kéo xuống còn **1006px** — vẫn chưa lọt màn hình đầu; muốn lọt phải làm tiếp bản C.)*
- **Trước khi tối ưu ảnh, xem phần tử LCP có phải ảnh không.** Trang chủ có LCP là chữ `<h1>`; **`<svg>` nhúng thẳng không phải ứng viên LCP** (chỉ `<img>`, `<image>` trong svg, poster video, `background-image`, và khối chữ mới là). Ứng viên LCP do bố cục quyết định chứ không do mạng — nên kết luận đó đúng ở mọi tốc độ, dù con số mili giây đo ở máy thì vô nghĩa.
- **Khai thừa `@font-face` KHÔNG tốn request.** Trình duyệt chỉ tải những face mà nội dung thật sự khớp — khai 24 face mà chỉ dùng 15 thì vẫn chỉ tải 15. Cắt bớt danh sách nét là chuyện gọn gàng, **không phải chuyện hiệu năng**; đừng lấy "bớt request" ra biện minh.
- **Nghi hai bản khác nhau thì DỰNG CẢ HAI CẠNH NHAU rồi so chữ ký hình học**, đừng so bằng mắt và đừng so với trí nhớ. Cách làm: build bản A, `cp -R dist dist-old`, sửa, build bản B, chạy hai máy chủ hai cổng (`astro preview` và `python3 -m http.server`), rồi lấy `getBoundingClientRect()` + `getComputedStyle()` của một dãy phần tử ở cả hai bên nối thành một chuỗi mà so. Trùng khít tới 2 số lẻ thì kết thúc tranh luận. Cũng đếm luôn `[...document.fonts].filter(f => f.status === 'loaded')` — đó mới là số font **thật sự tải**, khác hẳn số face khai báo.
- **Đo bố cục thì phải NẠP HẲN FONT rồi mới đo — `document.fonts.ready` KHÔNG đủ.** Nó chỉ hứa "hết việc đang chờ", mà font Google có thể chưa kịp được yêu cầu lúc nó resolve. Đo mà không nạp hẳn thì **mỗi iframe rơi vào một trạng thái font khác nhau**, số nhảy **±16px** giữa hai lần chạy và có lần còn đảo thứ tự hai khung màn hình — tưởng là hiệu ứng bề rộng, thật ra là nhiễu. Cách đúng: `await Promise.all([...].map(f => d.fonts.load(f)))` liệt đủ các nét thật sự dùng, rồi mới `fonts.ready`, rồi mới đo. **Kiểm bằng `[...d.fonts].filter(f => f.status === 'loaded').length` — phải ra đúng 15 và giống nhau ở mọi khung.**
- **Chênh lệch giữa hai bản thì đáng tin hơn con số tuyệt đối.** Đợt hero: mockup báo 990/1293, bản ship thật đo lại ra 1006/1309 — lệch đều 16px vì nhiễu font ở trên, nhưng **phần bớt được (−158 / −315) thì trùng khít**, vì hai bản cùng đo trong một điều kiện. Khi số tuyệt đối và số chênh lệch mâu thuẫn nhau, tin số chênh lệch.
- **Soi thứ đã build, đừng gọi lại hàm sinh ra nó.** `link-audit` đọc HTML trong `dist/` chứ không gọi `relatedFor()`: gọi lại chính hàm đó rồi đo là tự chấm điểm mình, hỏng ở khâu dựng trang thì không thấy.

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
- [x] **RSS + nốt phần SEO còn thiếu** (2026-07-30) — `/rss.xml`, `canonical`, `BreadcrumbList` kèm breadcrumb thật, `WebSite` + `SearchAction`; nhân tiện cắt 3 nét font xin dư
- [x] Trang bí quyết bếp (`/bi-quyet/`), trang danh mục `/mon/` có lọc theo kiểu món · theo dịp · miền
- [x] Deploy tự động lên GitHub Pages, tên miền riêng + HTTPS, dòng bản quyền footer
- [x] Đợt 10 (2026-07-30, 6 món): nem nướng Nha Trang, cá tai tượng chiên xù, ốc hấp lá gừng, gà hấp hành, gỏi ngó sen tôm thịt, cánh gà chiên nước mắm — mở kiểu món **"Bánh"** (chuyển bánh xèo · bánh cuốn · bánh khoái sang), **14 kiểu món tất cả ≥ 3**
- [x] **Tách hình ra file `.svg` riêng** — `/mon/` từ 143,8 KB gzip xuống ~30 KB và thôi tăng theo số món
- [x] **Trang 404 + liên kết chéo giữa 64 món** (2026-07-30) — xem mục ngay dưới
- [x] **Rút ngắn hero trang chủ** (2026-07-30) — thẻ món đầu tiên 1164 → **1006px** desktop, 1624 → **1309px** điện thoại, không bỏ thành phần nào

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
