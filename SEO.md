# Kế hoạch SEO — Món Việt Ngon

_Lập 2026-08-01 từ một vòng phân tích toàn site + hai vòng nghiên cứu có dẫn nguồn (thị trường tìm kiếm tiếng Việt · luật Google 2025–2026). File này là **nguồn sự thật cho mọi việc SEO** — phiên làm việc mới đọc **§0** rồi nhảy vào việc đang mở; xong việc nào thì cập nhật trạng thái ở §0 và mục tương ứng. Mọi nội dung viết ra theo kế hoạch này vẫn phải qua bộ luật "Chính xác & trung thực" (ROADMAP §4) và bước QA 6c._

**Chú giải trạng thái:** ✅ xong · 🔧 đang làm · 🔶 chờ Thái duyệt · ⬜ chưa bắt đầu · 👤 việc tay Thái (cần tài khoản Google).

---

# 0 · Bảng trạng thái

| # | Việc | Tầm tác động | Trạng thái |
|---|---|---|---|
| 1 | Title/description theo ý định tìm kiếm ("cách nấu/cách làm") | **LỚN** — sửa đúng chỗ người Việt gõ | 🔶 spec ở **§4**, chờ duyệt |
| 2 | ~31 trang trục lọc (17 kiểu món · 7 vùng · 7 dịp) | **LỚN** — mở cả họ query "các món X ngon" đang bằng 0 | 🔶 kiến trúc ở **§5**, chờ duyệt |
| 3 | Lớp tin cậy: trang giới thiệu + liên hệ + tác giả | VỪA — E-E-A-T + AI Mode cards | 🔶 chờ Thái quyết mức lộ danh, **§6** |
| 4 | Fix kỹ thuật nhỏ (4 cái) | NHỎ nhưng rẻ | ✅ 2026-08-01, đo trên dist — **§7** |
| 5 | Checklist Search Console | NHỎ | 👤 ~15 phút tay Thái — **§8** |
| 6 | Theo dõi + kỳ vọng thời gian | — | đọc **§9** trước khi sốt ruột |

**Thứ tự làm đề xuất:** duyệt §4 → làm (nửa ngày code + một buổi gán verb) → duyệt §5 → làm khung (1 ngày) → viết 31 intro (đợt nội dung riêng) → §6 khi Thái chốt. §8 làm lúc nào cũng được, càng sớm càng tốt.

---

# 1 · Nền đã có — ĐỪNG làm lại

Kiểm 2026-08-01, mọi thứ dưới đây đã đúng và đã đo trên production:

- 301 đủ ba tầng: http→https, không-www→www, thiếu `/`→có `/`. Canonical + `og:url` mọi trang (trừ 404 — đúng).
- JSON-LD `Recipe` đủ ruột (ingredient, HowToStep, totalTime, keywords, dates) + ảnh 1200px **ba tỉ lệ** 1:1/4:3/16:9 ở `/anh-mon/` · `BreadcrumbList` + breadcrumb nhìn thấy được · `WebSite`.
- sitemap-index + robots.txt trỏ đúng · RSS `/rss.xml` · 404 thật trả 404 · `lang=vi` · `og:locale` vi_VN.
- Trang nhẹ (LCP là chữ h1, CLS an toàn vì art có width/height) — nhanh hơn mọi đối thủ đã soi.
- GSC đã verify, đã nhận báo cáo Recipe. **4 cảnh báo Recipe (aggregateRating · nutrition · video · ảnh từng bước) đã chốt ĐỂ NGUYÊN** — lý do ở ROADMAP §2, nghiên cứu 2026 xác nhận chốt đúng: bịa rating là ăn manual action, nutrition phạm luật site vĩnh viễn.
- FAQ trên trang **không có** FAQPage schema — hóa ra đúng: Google khai tử FAQ rich results hoàn toàn 5/2026.

---

# 2 · Kết luận nghiên cứu — khỏi tra lại

## 2a · Thị trường tìm kiếm công thức tiếng Việt (8/2026)

**SERP công thức Việt do site KHÔNG chuyên đồ ăn thống trị — và cửa đang mở.** Soi 6 query mẫu ("cách nấu phở bò", "cách làm bánh xèo", "công thức thịt kho trứng"…):

| Ai đang thắng | Điểm mạnh | Điểm yếu khai thác được |
|---|---|---|
| [dienmayxanh.com/vao-bep](https://www.dienmayxanh.com/vao-bep/cach-nau-pho-bo-ha-noi-chuan-vi-nuoc-dung-ngot-thanh-don-gian-22475) — 6/6 query | Recipe schema đủ, 22 ảnh bước/bài | Trang **890 KB** đầy tracker quảng cáo; văn khuôn máy, bài phở tồn tại để bán nồi; traffic cả domain tụt 27,8M → 8M/tháng từ 2021 |
| eva.vn (Bếp Eva) — 5/6 | Domain báo lớn, bài dài | **KHÔNG có Recipe schema** (chỉ NewsArticle — không ăn được rich result), 76 script quảng cáo |
| huongnghiepaau.com — 5/6 | Bài sâu nhất (~6.100 chữ), trường nghề thật | Schema **rỗng ruột** (chỉ khai sao 4,22/77 vote, không ingredient/instruction); mọi trang gò về bán khóa học |
| monngonmoingay.com (Ajinomoto) | Schema giáo khoa, 2.000+ món | **Bài học cảnh tỉnh:** chỉ ~122K visit/tháng — schema + số lượng không tự ra hạng khi thiếu link/chủ đích |

Không có site công thức thuần nào mạnh. Một site tĩnh nhanh, schema thật, giọng người thật, vùng miền sâu — đúng hồ sơ ăn được long-tail từ đám khổng lồ đang mục.

**Người Việt gõ thế nào:** mọi title thắng cuộc đều mở bằng **"Cách nấu X"** (món nước/ninh/chan) hoặc **"Cách làm X"** (món ghép/chiên/bánh). Cả với query "công thức thịt kho trứng", 8/9 title đang thắng vẫn viết "Cách làm/Cách nấu…" — dân sống bằng traffic này đã "bỏ phiếu" hộ mình. Đuôi long-tail chứng minh có volume: _tại nhà · đơn giản · chuẩn vị · như ngoài hàng · đậm đà · hao cơm_ + biến thể vùng (miền Tây/Hà Nội/kiểu miền Nam). Họ query "X bao nhiêu calo" là lãnh địa site tã sữa/nhà thuốc — **luật site cấm vĩnh viễn, không bén mảng.**

**SERP features:** rich result công thức có render ở VN (mọi tay chơi nghiêm túc đều nuôi schema); PAA "Mọi người cũng hỏi" phổ biến; **AI Overviews chạy tiếng Việt từ cuối 2024** ([soha](https://soha.vn/tinh-nang-tim-kiem-bang-ai-cua-google-sap-co-mat-tai-viet-nam-198241031141236713.htm)) — không cần tối ưu gì riêng (xem 2b), giữ snippet mở là đủ điều kiện được trích.

**Kênh ngoài Google** ([DataReportal Digital 2026 Vietnam](https://datareportal.com/reports/digital-2026-vietnam)): Google chiếm **95,95%** search VN ([StatCounter 7/2026](https://gs.statcounter.com/search-engine-market-share/all/viet-nam)), Cốc Cốc 3,38%, Bing 0,37%. Mạng xã hội: Facebook 79M · Zalo 78M · TikTok 76M · YouTube 62M · Instagram 11,7M · **Pinterest vắng hẳn khỏi bảng** — playbook food-blog Mỹ (Pinterest-first) KHÔNG áp được cho VN; kênh chia sẻ tự nhiên là nhóm nấu ăn Facebook. TikTok là "máy tìm kiếm thứ hai" của Gen Z cho công thức — khoảng trống video là có thật nhưng là câu chuyện khác (§9). Ghi chú hay: monngonmoingay có 15,4% traffic từ Mỹ — **khán giả kiều bào đọc công thức tiếng Việt là có thật.**

## 2b · Luật Google 2025–2026 dính tới site công thức

- **Recipe schema** ([doc chính thức](https://developers.google.com/search/docs/appearance/structured-data/recipe)): bắt buộc chỉ `name` + `image` (3 tỉ lệ, ≥50.000 pixel — site vượt xa). **Hình minh họa HỢP LỆ** — không chỗ nào bắt "ảnh chụp"; yêu cầu là "image of the completed dish" + không đánh lừa. Rủi ro thật duy nhất: **CTR thumbnail** khi đứng cạnh ảnh đồ ăn thật — theo dõi bằng số ở GSC, đừng quyết bằng cảm tính. Lưu ý 6/2025: ảnh trong schema chỉ phục vụ rich result/carousel; thumbnail của kết quả text thường đi theo image-SEO thường.
- `prepTime`+`cookTime` là cặp **recommended** (site mới có `totalTime`) — đáng thêm dần, không gấp.
- **Đã chết, đừng tốn công:** sitelinks search box / `SearchAction` ([Google gỡ 11/2024](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)) — đã xóa khỏi site phiên này; **FAQ rich results chết hẳn 5/2026** ([SEJ](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)); HowTo standalone chết 2023 (⚠️ `HowToStep` **bên trong** Recipe không liên quan — đang dùng đúng, giữ).
- **AI Mode recipe cards — mặt trận mới 2026:** từ 3/2026 AI Mode gắn thẻ món bấm được, 6/2026 ghim **3–4 card lên ĐẦU câu trả lời**, hiện _tên tác giả · điểm sao · số nguyên liệu · ảnh_ — đọc thẳng từ Recipe schema ([SEL](https://searchengineland.com/google-ai-mode-updates-recipe-results-to-better-connect-people-with-recipe-creators-470811), [SEJ](https://www.searchenginejournal.com/google-puts-recipe-links-at-top-of-ai-mode-responses/581149/)). ⇒ schema sạch + trường `author` giờ đáng tiền hơn trước; khoảng trống aggregateRating có giá nhìn thấy được (§9).
- **Discover:** tự đủ điều kiện khi được index, nhưng card ảnh lớn cần ảnh ≥1200px + **`max-image-preview:large`** ([doc](https://developers.google.com/search/docs/appearance/google-discover)) — đã thêm phiên này. Cộng đồng đo: domain mới hầu như không có Discover trước ~6 tháng. Đừng chờ gì từ đây năm 2026.
- **E-E-A-T** ([helpful content doc](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)): "trust là quan trọng nhất"; câu hỏi Who/How/Why; quality rater được dặn tính cả **"everyday expertise"** — người nấu thật không cần bằng cấp. Cần: trang giới thiệu + đường liên hệ + author khớp giữa schema và trang (§6).
- **Domain mới:** cộng đồng đồng thuận (Google không xác nhận) ~**3–6 tháng bị nén** trên query cạnh tranh; long-tail nhúc nhích tháng 2–4. Tăng tốc discovery: sitemap trong GSC (ping endpoint chết rồi), `lastmod` **thật** ("Google uses the lastmod value if it's consistently and verifiably accurate"), **RSS nộp làm sitemap phụ** (feed được crawl dày hơn XML), Request Indexing tay. **IndexNow: Google KHÔNG dùng** (chỉ Bing/Yandex/Naver/Seznam); WebSub: không ai đọc; **llms.txt: bỏ** — [Ahrefs đo 137K domain: 97% file không có lấy một request](https://ahrefs.com/blog/llmstxt-study/), Google nói thẳng không hỗ trợ.
- **Link trắng cho site solo 2026:** cộng đồng food-blog, nhóm Facebook VN, để hình minh họa "lạ" tự kiếm coverage. HARO chết; hệ thay thế (Source of Sources, Qwoted) thiên tiếng Anh — góc "ẩm thực Việt" là niche trích dẫn được, không ưu tiên. **Tuyệt đối không mua link/guest-post farm** — spam update 8/2025 nhắm đúng chỗ đó, còn chính sách site reputation abuse thì đang dọn hộ mình đám báo lớn cho thuê chuyên mục.
- **AI Overviews ăn click là có thật** (food/drink là ngành AIO nở mạnh nhất; Ahrefs đo −34,5% click; các blog Mỹ mất 30–80% mùa lễ 2025) — nhưng [doc Google](https://developers.google.com/search/docs/appearance/ai-features): "no additional requirements… nor other special optimizations" — cứ SEO nền + schema đúng + đừng chặn snippet. Nghiên cứu 2026: food blog thật vẫn thắng AI về độ tin công thức — lợi thế của bài nấu thật, đo thật.
- **Core Web Vitals:** bộ ba LCP ≤2,5s · INP ≤200ms · CLS ≤0,1 (p75) — không đổi từ 2024, là yếu tố phụ. Site tĩnh này đã vượt cả làng WordPress-nặng-ads; thứ chặn render còn lại duy nhất là stylesheet Google Fonts (việc tự host đã nằm ở ROADMAP §2, làm lúc nào cũng được).

---

# 3 · ĐỪNG LÀM — chốt cứng, khỏi bàn lại

1. **Đừng thêm FAQPage schema** (chết 5/2026) và **đừng thêm HowTo standalone** (chết 2023). FAQ nội dung trên trang thì GIỮ — nó ăn long-tail và PAA.
2. **Đừng bịa `aggregateRating`/`nutrition`** — manual action + luật site cấm vĩnh viễn (đã chốt từ trước, nghiên cứu xác nhận).
3. **Đừng làm llms.txt**, đừng WebSub, đừng IndexNow-cho-Google.
4. **Đừng theo playbook Pinterest** — Pinterest không có mặt ở VN.
5. **Đừng mua link, đừng guest-post farm, đừng "5 cách làm X" listicle nhồi** — ngược cả thuật toán lẫn giọng site.
6. **Đừng nổ tổ hợp trang giao trục** (kiểu × vùng = 119 trang mỏng) — chỉ 31 trang trục đơn; giao trục chỉ mở khi GSC chứng minh có demand (§5).
7. **Đừng gắn lại SearchAction** — đã gỡ vì Google khai tử, không phải vì quên.

---

# 4 · Việc 1 — Title & description theo ý định tìm kiếm 🔶 CHỜ DUYỆT

**Nguyên tắc bất di bất dịch: `<h1>` trên trang GIỮ NGUYÊN 100%** — giọng thương hiệu là của người đọc. Chỉ đổi `<title>` + (giai đoạn 2) meta description — thứ chỉ Google và người đang lướt SERP nhìn thấy. JSON-LD `name` giữ tên trần như hiện tại (đúng chuẩn).

## Công thức title trang món

```
Cách {động từ} {tên món trần} — {hook}
```

- **tên món trần** = `dishName(d.title)` (util sẵn có).
- **hook** = phần `**…**` của `title` trong YAML — cả 126 title đều theo khuôn `Tên món **hook**` nên extract tự động được.
- **động từ** = field YAML mới `seoVerb: nấu | làm` (optional), thiếu thì lấy default theo kiểu món:

| Default **nấu** | Default **làm** |
|---|---|
| Món nước · Canh · Lẩu · Cháo · Chè · Cơm · Xôi | Bánh · Bánh mì · Cuốn · Gỏi · Chiên · Nướng · Xào · Hấp · Bún trộn · **Kho** |

  Kho để default "làm" ("cách làm cá kho tộ" là dạng phổ biến nhất trên SERP) nhưng nhóm này lệch nhiều — **bò kho phải override `seoVerb: nấu`** ("cách nấu bò kho"), thịt kho trứng thì cả hai dạng đều chạy. Cơm cũng vậy (cơm rang → làm). **Phân vân verb nào thì WebSearch "cách {verb} {tên món}" xem dạng nào đang thắng** — cùng tinh thần luật "thuật ngữ phải có thật".

**Ví dụ (đo ký tự):**

| Hiện tại | Đề xuất | Ký tự |
|---|---|---|
| Phở gà nước trong ngọt dịu, thơm nức lá chanh — Món Việt Ngon | Cách nấu phở gà — nước trong ngọt dịu, thơm nức lá chanh | 56 ✓ |
| Bánh bèo Huế chén nhỏ lõm giữa, tôm chấy đỏ gạch — Món Việt Ngon | Cách làm bánh bèo Huế — chén nhỏ lõm giữa, tôm chấy đỏ gạch | 59 ✓ |
| Cá kho tộ lửa liu riu keo sánh — Món Việt Ngon | Cách làm cá kho tộ — lửa liu riu keo sánh | 41 ✓ |

**Điểm chờ duyệt số 1 — bỏ đuôi "— Món Việt Ngon" trên trang món.** Lý do: Google hiện tên site thành dòng riêng trong SERP (lấy từ `WebSite` schema — có sẵn — và `og:site_name` — vừa thêm), còn giữ đuôi thì title vượt ~70 ký tự và bị cắt đúng vào hook. Trang gộp (chủ, /mon/, bí quyết) giữ đuôi như cũ.

**Điểm chờ duyệt số 2 — ngân sách ký tự:** đích ≤ **62 ký tự**; món nào vượt thì rút hook bằng field override `seoTitle` (ghi đè nguyên chuỗi, dùng cho ca đặc biệt).

## Việc code (nửa ngày)

1. `content.config.ts`: thêm `seoVerb: z.enum(['nấu', 'làm']).optional()` + `seoTitle: z.string().optional()`.
2. `src/utils/seo.ts`: hàm `seoTitleFor(d)` — bảng default verb + extract hook + ghép chuỗi; export thêm cho RSS/nơi khác nếu cần.
3. `src/pages/mon/[slug].astro`: `title={d.seoTitle ?? seoTitleFor(d)}` cho `<Base>`. **Không đụng** h1, JSON-LD name, breadcrumb, RSS.
4. `_template.yaml`: 2 dòng chú thích field mới.
5. `tools/check-recipes.mjs`: cảnh báo (không chặn) title SEO > 62 ký tự; chặn thật nếu title YAML không extract được hook.
6. Gán `seoVerb` cho món lệch default (~1 buổi rà 126 món, chủ yếu nhóm Kho/Cơm/Xôi).

## Meta description — giai đoạn 2, làm dần theo đợt

Description hiện tại (summary) hay nhưng không có cụm ý định. Công thức khi viết lại (~140–160 ký tự):

```
Cách {verb} {tên món} {định vị vùng}: {2–3 lời hứa cụ thể từ chính bài}. {tổng thời gian}, cho {khẩu phần} người ăn.
```

**Đừng auto-ghép** (máy ghép dễ ra câu thọt); viết tay theo đợt như mọi nội dung khác, field mới `seoDescription` optional, thiếu thì fallback summary như cũ. Ưu tiên 12 món featured + món có impressions sớm trong GSC.

Title trang gộp, tiện sửa cùng đợt: `/mon/` → "Kho công thức món Việt: {n} món ba miền — Món Việt Ngon"; trang chủ đang ổn, không đụng.

---

# 5 · Việc 2 — ~31 trang trục lọc 🔶 CHỜ DUYỆT

**Vấn đề:** mọi lọc kiểu món/vùng/dịp đang là JS client-side trên `/mon/`; `?kieu=Kho` canonical về `/mon/` (đúng kỹ thuật). Hệ quả: Google chỉ thấy MỘT trang catalog — site không thể xếp hạng cho cả họ query danh sách: _"các món kho ngon dễ làm" · "món ngon miền Tây" · "món ăn đãi khách" · "mâm cỗ Tết nấu gì" · "các món chè ngon"_. Đây là structural gap lớn nhất của site.

**Giải:** 31 trang tĩnh = 17 kiểu món + 7 vùng + 7 dịp. Giá trị + số món đọc từ collection lúc build, không hardcode.

## URL — chờ Thái chọn một trong hai

| Phương án | Dạng | Được | Mất |
|---|---|---|---|
| **A (đề xuất)** | `/kieu/kho/` · `/mien/mien-tay/` · `/dip/co-tet/` | Ngắn, ba trục rõ ràng, không đụng namespace `/mon/<slug>/` | Ba prefix mới ở root |
| C | `/mon/kieu/kho/` · `/mon/mien/mien-tay/` · `/mon/dip/co-tet/` | Gọn dưới một mái `/mon/` (route `[slug]` chỉ khớp 1 đoạn nên không đụng) | URL dài hơn một cấp |

Slug bỏ dấu, một nguồn sự thật trong data file: kiểu món `mon-nuoc bun-tron canh lau chao kho xao hap com xoi banh banh-mi chien nuong cuon goi che` · vùng `mien-bac mien-trung mien-nam mien-tay tay-bac tay-nguyen ca-nuoc` · dịp `com-nha bua-sang dai-khach nhau-lai-rai an-choi cho-be co-tet`.

## Giải phẫu một trang trục

- `<title>` viết TAY từng trang (đừng máy móc một khuôn 31 lần): _"Các món kho ngon đậm đà cơm nhà — 12 công thức"_, _"Món ngon miền Tây — 13 công thức chuẩn vị sông nước"_… (số món chèn tự động lúc build).
- `<h1>` + **intro 40–80 chữ, giọng site, UNIQUE từng trang** — 31 intro là việc nội dung thật, qua đủ QA 6c. ⚠️ Trang "Cho bé" và "Cỗ Tết" đặc biệt dễ trượt vào hứa hẹn sức khỏe — luật cấm bệnh tật/dinh dưỡng áp nguyên.
- Grid thẻ món tái dùng `RecipeCard`, thứ tự `order` như `/mon/`.
- **JSON-LD `ItemList`** ({position, url} từng món) — đúng khuôn "summary page" Google đòi cho **host carousel**, thứ `/mon/` một-trang không bao giờ ăn được.
- `BreadcrumbList` + crumb nhìn thấy: Trang chủ › Món ngon › {tên trang}.
- Cuối trang: dải link sang các trang cùng trục (17 chip kiểu món…) — mesh nội bộ.
- Canonical + sitemap: tự có qua `Base` và `@astrojs/sitemap` (trang Astro thường).

## Nối vào site

1. **3 cửa trục ở trang chủ** đổi href `/mon/?kieu=…` → trang tĩnh tương ứng (anchor text = tên trục, đúng thứ Google cần).
2. **Badge vùng/kiểu/dịp trên hero trang món** → thành link về trang trục (hiện là span trơ).
3. `/mon/` GIỮ NGUYÊN chip lọc JS — hai hệ song song là ĐÚNG: chip cho người đang lọc nhanh, trang tĩnh cho máy và cho link chia sẻ (cùng triết lý `/og/` vs `/anh-mon/`).

**Để giai đoạn sau, đừng làm cùng lúc:** thêm cấp kiểu món vào breadcrumb trang món (đụng crumb nhìn thấy — việc riêng); trang giao trục ("các món chè miền Nam") — CHỈ mở khi GSC cho thấy query đó có impressions thật.

**Effort:** khung code ~1 ngày (3 template + data file `src/data/trang-truc.ts` map giá trị → {slug, title, intro}) · 31 intro ~1–2 buổi viết + QA. **Đo sau khi live:** GSC Performance lọc query chứa "các món" / "món ngon miền" — đó là KPI của việc này; `link-audit` mở rộng đếm trang trục.

---

# 6 · Việc 3 — Lớp tin cậy 🔶 CHỜ THÁI QUYẾT

Google hỏi thẳng "Is it self-evident who authored your content?", và AI Mode recipe cards giờ in **tên tác giả** lên card. Site hiện chưa có trang giới thiệu, chưa có đường liên hệ, `author` là Organization.

**Việc làm được ngay khi Thái chốt:** trang `/gioi-thieu/` (bếp này là ai, công thức được nấu-thử thế nào — đúng ba câu Who/How/Why; "everyday expertise" được tính, không cần bằng cấp) + email liên hệ + link ở footer.

**Câu Thái phải chốt trước:**
1. Mức lộ danh: **(A)** giữ thương hiệu "Món Việt Ngon" làm tác giả (card AI hiện tên bếp — sạch, đủ) hay **(B)** Person hóa — tên người thật/bút danh, `author` Person trong schema, byline trên trang (mạnh hơn cho E-E-A-T)?
2. Email công khai nào cho trang liên hệ?
3. Có kể chuyện bếp thật (ảnh, quê quán…) không, hay giữ ẩn danh?

---

# 7 · Fix kỹ thuật nhỏ — ✅ làm 2026-08-01, CHƯA COMMIT

| Fix | File | Vì sao |
|---|---|---|
| `<meta name="robots" content="max-image-preview:large">` | `src/layouts/Base.astro` | Điều kiện Google ghi rõ cho card ảnh lớn ở Discover; ảnh đã đạt chuẩn 1200px từ trước |
| `og:site_name` | `src/layouts/Base.astro` | Thiếu; rẻ; đỡ lưng cho việc bỏ đuôi brand ở §4 |
| `<lastmod>` trong sitemap | `astro.config.mjs` | Google chỉ tin lastmod thật — của mình thật: trang món lấy `updatedDate ?? pubDate` của chính món; `/` và `/mon/` lấy ngày mới nhất catalog (hai trang dựng từ dữ liệu món); trang không có ngày thật thì không ghi |
| Xóa khối `SearchAction` (giữ `WebSite`) | `src/pages/index.astro` | Google khai tử sitelinks search box 11/2024 — mã chết |

Nghiệm thu: build sạch, `dist/sitemap-0.xml` có lastmod, trang món có đủ hai meta mới, `dist/index.html` hết SearchAction, `link-audit` + `seo-audit` xanh. **Việc để dành cùng nhóm (chưa làm, giá trị thấp):** `prepTime`/`cookTime` cho 126 YAML (cặp recommended — thêm dần theo đợt); Bing Webmaster + IndexNow; Cốc Cốc submit sitemap.

---

# 8 · Checklist Search Console — 👤 tay Thái, ~15 phút

1. **Sitemaps:** kiểm `sitemap-index.xml` trạng thái Success; **nộp thêm `https://www.monvietngon.com/rss.xml`** làm sitemap phụ (feed được crawl dày hơn XML — nguồn ở §2b).
2. **URL Inspection → Request indexing:** trang chủ, `/mon/`, và ~12 món featured (mỗi ngày Google cho quota ít, làm rải vài hôm).
3. **Enhancements → Recipe:** theo dõi số item hợp lệ bò từ 4 → ~126 (site mới, bò dần là bình thường — đã ghi ở ROADMAP). 4 cảnh báo recommended: kệ.
4. **Pages (indexing report):** sẽ thấy URL đời chủ cũ của domain (`/tag/…`, `/mon-diem-tam/`) báo 404 — **đúng và kệ**; không tìm thấy backlink sống nào đáng redirect (đã tra 2026-08-01).
5. Khi gắn GA4 (đã chốt ở ROADMAP §2): nối GA4 ↔ Search Console.
6. _(Tùy chọn, 5 phút, giá trị thấp)_ Bing Webmaster Tools import từ GSC; Cốc Cốc nộp sitemap.

---

# 9 · Theo dõi & kỳ vọng — đọc trước khi sốt ruột

- **Nhịp xem số:** GSC Performance mỗi tuần một lần là đủ. Nhìn query nào bắt đầu có impressions — **đó là danh sách "chỗ thắng sớm" tự lộ ra**, ưu tiên viết description tay (§4 giai đoạn 2) cho đúng các món đó.
- **Mốc thời gian thực tế** (domain sống 2026-07-27): tháng 9–10/2026 long-tail bắt đầu nhúc nhích; **đừng kết luận gì về query cạnh tranh trước ~tháng 12/2026** — 3–6 tháng nén là consensus cộng đồng cho domain mới. Chỗ nhúc nhích đầu tiên nhiều khả năng là brand + đặc sản ít cạnh tranh (bún đỏ Buôn Ma Thuột · pa pỉnh tộp · bánh khoái Huế · phở khô Gia Lai…) — đúng lợi thế vùng miền của catalog.
- **Ảnh minh họa vs ảnh chụp:** hợp lệ 100%, rủi ro chỉ ở CTR. Khi trang món có impressions kha khá, so CTR với hàng xóm cùng vị trí trong GSC — **quyết bằng số đo, đúng nếp nhà.** Đừng đổi chiến lược ảnh trước khi có số.
- **aggregateRating:** AI Mode card của đối thủ có sao, mình không — khoảng trống nhìn thấy được nhưng site tĩnh không bịa được. Ghi nhận; nếu ngày nào đó đáng làm thì đó là dự án backend nhỏ riêng, đừng mở ở đây.
- **Video:** TikTok/YouTube giữ head terms công thức ở VN; cảnh báo `video` trong GSC cũng chỉ tắt được bằng quay thật. Khoảng trống chiến lược — chưa có lời giải, đừng quên nó tồn tại.
- **Khi thêm đợt món mới:** mọi món mới tự ăn toàn bộ hạ tầng này (schema, sitemap+lastmod, trang trục tự cập nhật số). Việc SEO duy nhất phát sinh theo đợt: gán `seoVerb`, viết `seoDescription` nếu tới lượt, và Request Indexing món mới trong GSC.

---

_Nghiên cứu gốc: hai báo cáo agent 2026-08-01 (thị trường SERP Việt · best practices 2026) — kết luận đã cô đọng hết vào §2; nguồn dẫn inline. Phân tích on-site đo trực tiếp trên production cùng ngày._
