# Kế hoạch SEO — Món Việt Ngon

_Lập 2026-08-01 từ một vòng phân tích toàn site + hai vòng nghiên cứu có dẫn nguồn (thị trường tìm kiếm tiếng Việt · luật Google 2025–2026). File này là **nguồn sự thật cho mọi việc SEO** — phiên làm việc mới đọc **§0** rồi nhảy vào việc đang mở; xong việc nào thì cập nhật trạng thái ở §0 và mục tương ứng. Mọi nội dung viết ra theo kế hoạch này vẫn phải qua bộ luật "Chính xác & trung thực" (ROADMAP §4) và bước QA 6c._

**Chú giải trạng thái:** ✅ xong · 🔧 đang làm · 🔶 chờ Thái duyệt · ⬜ chưa bắt đầu · 👤 việc tay Thái (cần tài khoản Google).

---

# 0 · Bảng trạng thái

| # | Việc | Tầm tác động | Trạng thái |
|---|---|---|---|
| 1 | Title/description theo ý định tìm kiếm ("cách nấu/cách làm") | **LỚN** — sửa đúng chỗ người Việt gõ | ✅ title **LIVE `4f70049`** — **§4**; meta description = giai đoạn 2, làm dần |
| 2 | ~31 trang trục lọc (17 kiểu món · 7 vùng · 7 dịp) | **LỚN** — mở cả họ query "các món X ngon" đang bằng 0 | ✅ **LIVE `4f70049`**, URL phương án A — **§5** |
| 3 | Lớp tin cậy: trang giới thiệu + liên hệ + tác giả | VỪA — E-E-A-T + AI Mode cards | ✅ **LIVE `4f70049`** — brand-only, ẩn danh; email liên hệ thêm 2026-08-02 — **§6** |
| 4 | Fix kỹ thuật nhỏ (4 cái) | NHỎ nhưng rẻ | ✅ 2026-08-01, **đã live** (`a745ff2`, curl kiểm production) — **§7** |
| 5 | Checklist Search Console | NHỎ | 👤 mục 1–3 ✅ 2026-08-01; lịch rải 03–07/08 ✅ xong, mục 5 chờ GA4 — **§8** |
| 5b | Đọc báo cáo "Page indexing" (44 URL gắn cờ 05/08) | NHỎ | ✅ mổ xong 2026-08-08: **1 bug thật đã sửa + đo**, 3 ngày request tay còn lại, phần lớn là CHỜ — **§8b** |
| 6 | Theo dõi + kỳ vọng thời gian | — | đọc **§9** trước khi sốt ruột |

> ✅ **CẢ BA VIỆC ĐÃ LIVE — `4f70049`, 2026-08-01, deploy xanh, đã curl kiểm production:** title mới trên trang món · `/kieu/kho/` trả 200 kèm ItemList · `/gioi-thieu/` hết lỗi dính chữ · cửa trục trang chủ + badge trang món trỏ trang tĩnh · sitemap 161 URL. Site giờ **162 trang**. Còn mở: **rải nốt Request Indexing** (§8, vài hôm) · **GA4** (ROADMAP §2 — mở khoá §8 mục 5 + quyết định hero C) · **meta description giai đoạn 2** (§4, làm dần theo GSC). Mọi đợt món mới tự ăn hạ tầng này — việc SEO phát sinh mỗi đợt chỉ là gán `seoVerb` nếu lệch default (QA sẽ réo title dài) và Request Indexing món mới.

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
- **Đã chết, đừng tốn công:** sitelinks search box / `SearchAction` ([Google gỡ 11/2024](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)) — đã gỡ khỏi site 2026-08-01 (`a745ff2`); **FAQ rich results chết hẳn 5/2026** ([SEJ](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/)); HowTo standalone chết 2023 (⚠️ `HowToStep` **bên trong** Recipe không liên quan — đang dùng đúng, giữ).
- **AI Mode recipe cards — mặt trận mới 2026:** từ 3/2026 AI Mode gắn thẻ món bấm được, 6/2026 ghim **3–4 card lên ĐẦU câu trả lời**, hiện _tên tác giả · điểm sao · số nguyên liệu · ảnh_ — đọc thẳng từ Recipe schema ([SEL](https://searchengineland.com/google-ai-mode-updates-recipe-results-to-better-connect-people-with-recipe-creators-470811), [SEJ](https://www.searchenginejournal.com/google-puts-recipe-links-at-top-of-ai-mode-responses/581149/)). ⇒ schema sạch + trường `author` giờ đáng tiền hơn trước; khoảng trống aggregateRating có giá nhìn thấy được (§9).
- **Discover:** tự đủ điều kiện khi được index, nhưng card ảnh lớn cần ảnh ≥1200px + **`max-image-preview:large`** ([doc](https://developers.google.com/search/docs/appearance/google-discover)) — đã thêm 2026-08-01 (`a745ff2`). Cộng đồng đo: domain mới hầu như không có Discover trước ~6 tháng. Đừng chờ gì từ đây năm 2026.
- **E-E-A-T** ([helpful content doc](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)): "trust là quan trọng nhất"; câu hỏi Who/How/Why; quality rater được dặn tính cả **"everyday expertise"** — người nấu thật không cần bằng cấp. Cần: trang giới thiệu + đường liên hệ + author khớp giữa schema và trang (§6).
- **Domain mới:** cộng đồng đồng thuận (Google không xác nhận) ~**3–6 tháng bị nén** trên query cạnh tranh; long-tail nhúc nhích tháng 2–4. Tăng tốc discovery: sitemap trong GSC (ping endpoint chết rồi), `lastmod` **thật** ("Google uses the lastmod value if it's consistently and verifiably accurate"), **RSS nộp làm sitemap phụ** (feed được crawl dày hơn XML), Request Indexing tay. **IndexNow: Google KHÔNG dùng** (chỉ Bing/Yandex/Naver/Seznam); WebSub: không ai đọc; **llms.txt: bỏ** — [Ahrefs đo 137K domain: 97% file không có lấy một request](https://ahrefs.com/blog/llmstxt-study/), Google nói thẳng không hỗ trợ.
- **Link trắng cho site solo 2026:** cộng đồng food-blog, nhóm Facebook VN, để hình minh họa "lạ" tự kiếm coverage. HARO chết; hệ thay thế (Source of Sources, Qwoted) thiên tiếng Anh — góc "ẩm thực Việt" là niche trích dẫn được, không ưu tiên. **Tuyệt đối không mua link/guest-post farm** — spam update 8/2025 nhắm đúng chỗ đó, còn chính sách site reputation abuse thì đang dọn hộ mình đám báo lớn cho thuê chuyên mục.
- **AI Overviews ăn click là có thật** (food/drink là ngành AIO nở mạnh nhất; Ahrefs đo −34,5% click; các blog Mỹ mất 30–80% mùa lễ 2025) — nhưng [doc Google](https://developers.google.com/search/docs/appearance/ai-features): "no additional requirements… nor other special optimizations" — cứ SEO nền + schema đúng + đừng chặn snippet. Nghiên cứu 2026: food blog thật vẫn thắng AI về độ tin công thức — lợi thế của bài nấu thật, đo thật.
- **Core Web Vitals:** bộ ba LCP ≤2,5s · INP ≤200ms · CLS ≤0,1 (p75) — không đổi từ 2024, là yếu tố phụ. Site tĩnh này đã vượt cả làng WordPress-nặng-ads; stylesheet Google Fonts — thứ chặn render bên-thứ-ba cuối cùng — **đã tự host xong 2026-08-02** (15 woff2 nội bộ, đo chữ ký hình học trùng khít, xem ROADMAP §2 mục 3); site không còn request ra ngoài.

---

# 3 · ĐỪNG LÀM — chốt cứng, khỏi bàn lại

1. **Đừng thêm FAQPage schema** (chết 5/2026) và **đừng thêm HowTo standalone** (chết 2023). FAQ nội dung trên trang thì GIỮ — nó ăn long-tail và PAA.
2. **Đừng bịa `aggregateRating`/`nutrition`** — manual action + luật site cấm vĩnh viễn (đã chốt từ trước, nghiên cứu xác nhận).
3. **Đừng làm llms.txt**, đừng WebSub, đừng IndexNow-cho-Google.
4. **Đừng theo playbook Pinterest** — Pinterest không có mặt ở VN.
5. **Đừng mua link, đừng guest-post farm, đừng "5 cách làm X" listicle nhồi** — ngược cả thuật toán lẫn giọng site.
6. **Đừng nổ tổ hợp trang giao trục** (kiểu × vùng = 119 trang mỏng) — chỉ 31 trang trục đơn; giao trục chỉ mở khi GSC chứng minh có demand (§5).
7. **Đừng gắn lại SearchAction** — đã gỡ vì Google khai tử, không phải vì quên.
8. **Đừng gắn tài nguyên bên thứ ba / tài sản không-free** — mọi thứ tự host, free có giấy tờ kiểm ở chính file; luật đầy đủ + lệnh kiểm nhanh ở ROADMAP §4 *"Tài sản & bên thứ ba"* (chốt 2026-08-02, sau khi tự host font xóa bên-thứ-ba cuối cùng). GA4 nếu gắn (§2 mục 1 bên ROADMAP) là ngoại lệ phải quyết riêng vì kéo theo cookie + dải xin phép.
9. **Đừng "sửa" mấy bucket lành trong báo cáo Page indexing** — 3 URL `http://` / không-www là 301 của chính mình (đúng, và sẽ nằm đó vĩnh viễn), `rss.xml` là feed nên không bao giờ được index như một trang. Đi sửa chúng là tự tạo việc. Cách đọc báo cáo cho đúng: **§8b**.

---

# 4 · Việc 1 — Title & description theo ý định tìm kiếm — ✅ TITLE LIVE `4f70049`

> **Đã ship đúng spec dưới đây, Thái duyệt cả hai điểm chờ (bỏ đuôi brand + ngân sách 62).** Ba điều chỉnh so với bản nháp, ghi lại vì là quyết định thật:
> 1. **Cơm chuyển sang cột "làm"** — đo trên catalog: 6/7 món Cơm là món ghép/chiên/nướng (cơm tấm, cơm rang, cơm cháy, cơm lam…); chỉ cơm gà Hội An là nồi nấu thật → món đó override `seoVerb: nấu`. Bảng dưới đã sửa theo.
> 2. **Máy tự cắt hook theo vế phẩy khi vượt 62 ký tự** (hook nhà này viết vế mạnh đứng trước nên cắt đuôi an toàn) — nhờ vậy 42 title vượt ngân sách chỉ còn 3 phải rút tay.
> 3. **12 override trên 11 file YAML** (sữa chua nếp cẩm mang cả hai): 4 `seoVerb` (bò kho, cơm gà Hội An, cơm rượu, sữa chua nếp cẩm) + 8 `seoTitle` (giả cầy — tên chứa "nấu"; lòng heo luộc — động từ thật là LUỘC; heo quay — giữ đuôi "nồi chiên không dầu"; bánh khoái + bánh ướt lòng gà — hook có gạch ngang; chè hạt sen, cơm tấm, sữa chua — hook một vế không tự cắt được). Mỗi override có chú thích lý do ngay trong YAML.
>
> Code nằm ở: `src/utils/seo-title.mjs` (khuôn ghép — .mjs trần để trang món + QA dùng chung) · `content.config.ts` (2 field mới) · `[slug].astro` · `check-recipes.mjs` (chặn title mất hook, réo title >62). `/mon/` cũng đổi title thành "Kho công thức món Việt: {n} món ba miền". **Meta description giai đoạn 2 vẫn chưa làm** — làm dần theo đợt, ưu tiên món có impressions trong GSC.

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
| Món nước · Canh · Lẩu · Cháo · Chè · Xôi | Bánh · Bánh mì · Cuốn · Gỏi · Chiên · Nướng · Xào · Hấp · Bún trộn · **Kho** · **Cơm** |

  Kho và Cơm về "làm" dù trực giác nói khác: "cách làm cá kho tộ" là dạng phổ biến nhất trên SERP, còn nhóm Cơm thì 6/7 món của catalog là món ghép/chiên (cơm tấm, cơm rang, cơm cháy, cơm lam…). Món lệch chiều thì override: **bò kho → `seoVerb: nấu`** (món hầm, "cách nấu bò kho"), **cơm gà Hội An → nấu** (nồi nấu thật duy nhất của nhóm Cơm). **Phân vân verb nào thì WebSearch "cách {verb} {tên món}" xem dạng nào đang thắng** — cùng tinh thần luật "thuật ngữ phải có thật".

**Ví dụ (đo ký tự):**

| Trước | Sau (đang live) | Ký tự |
|---|---|---|
| Phở gà nước trong ngọt dịu, thơm nức lá chanh — Món Việt Ngon | Cách nấu phở gà — nước trong ngọt dịu, thơm nức lá chanh | 56 ✓ |
| Bánh bèo Huế chén nhỏ lõm giữa, tôm chấy đỏ gạch — Món Việt Ngon | Cách làm bánh bèo Huế — chén nhỏ lõm giữa, tôm chấy đỏ gạch | 59 ✓ |
| Cá kho tộ lửa liu riu keo sánh — Món Việt Ngon | Cách làm cá kho tộ — lửa liu riu keo sánh | 41 ✓ |

**Đã chốt ① (Thái duyệt 2026-08-01) — bỏ đuôi "— Món Việt Ngon" trên trang món.** Lý do: Google hiện tên site thành dòng riêng trong SERP (lấy từ `WebSite` schema + `og:site_name`), còn giữ đuôi thì title vượt ~70 ký tự và bị cắt đúng vào hook. Ba trang gộp sẵn có (chủ, `/mon/`, bí quyết) giữ đuôi; **31 trang trục theo lối trang món — không đuôi** (lý do ghi ở đầu `trang-truc.ts`).

**Đã chốt ② — ngân sách ≤ 62 ký tự:** máy tự cắt hook theo vế phẩy; món nào vẫn vượt thì rút tay bằng `seoTitle` (QA réo danh sách, không chặn build).

## Việc code — ✅ đã làm đủ, khác bản nháp đúng một chỗ

Sáu đầu việc của bản nháp (2 field schema · hàm ghép · `[slug].astro` · `_template.yaml` · QA check · gán verb toàn catalog) làm đủ cả. Khác biệt duy nhất: hàm ghép nằm ở **`src/utils/seo-title.mjs`** chứ không phải `seo.ts` như nháp — file .mjs trần để `check-recipes.mjs` (chạy ngoài Astro) import chung, khỏi chép logic hai nơi. Bước "rà 126 món gán verb" làm bằng script dump toàn bộ title tự ghép ra bảng rồi soi một lượt — kết quả là 12 override ở khung trên. Đã kiểm trên dist: **126/126 trang món mang title "Cách …"**.

## Meta description — giai đoạn 2, làm dần theo đợt

Description hiện tại (summary) hay nhưng không có cụm ý định. Công thức khi viết lại (~140–160 ký tự):

```
Cách {verb} {tên món} {định vị vùng}: {2–3 lời hứa cụ thể từ chính bài}. {tổng thời gian}, cho {khẩu phần} người ăn.
```

**Đừng auto-ghép** (máy ghép dễ ra câu thọt); viết tay theo đợt như mọi nội dung khác, field mới `seoDescription` optional (⚠️ field này **CHƯA khai trong schema** — khai lúc bắt đầu giai đoạn 2), thiếu thì fallback summary như cũ. Ưu tiên 12 món featured + món có impressions sớm trong GSC.

Title trang gộp: `/mon/` → "Kho công thức món Việt: {n} món ba miền — Món Việt Ngon" — ✅ đã đổi cùng `4f70049`; trang chủ giữ nguyên như dự tính.

---

# 5 · Việc 2 — 31 trang trục lọc — ✅ LIVE `4f70049`

> **Đã dựng đủ 31 trang theo phương án A** (`/kieu/…` `/mien/…` `/dip/…`), Thái duyệt spec 2026-08-01. Hiện trạng: một route động `src/pages/[truc]/[slug].astro` + nội dung tay ở `src/data/trang-truc.ts` (31 bộ title/h1/intro — intro theo đúng luật ở đầu file đó) + slug ở `src/data/truc-slug.mjs` (một nguồn cho route, trang chủ, badge, lastmod). Đã nối đủ ba mối: cửa trục trang chủ → trang tĩnh, badge hero trang món → trang tĩnh, dải chip "cùng trục" cuối mỗi trang. ItemList + BreadcrumbList + crumb thật + lastmod theo nhóm đều có, đo trên dist. **LIVE `4f70049` — Thái đã duyệt intro trước khi đẩy.**

**Vấn đề:** mọi lọc kiểu món/vùng/dịp đang là JS client-side trên `/mon/`; `?kieu=Kho` canonical về `/mon/` (đúng kỹ thuật). Hệ quả: Google chỉ thấy MỘT trang catalog — site không thể xếp hạng cho cả họ query danh sách: _"các món kho ngon dễ làm" · "món ngon miền Tây" · "món ăn đãi khách" · "mâm cỗ Tết nấu gì" · "các món chè ngon"_. Đây là structural gap lớn nhất của site.

**Giải:** 31 trang tĩnh = 17 kiểu món + 7 vùng + 7 dịp. Giá trị + số món đọc từ collection lúc build, không hardcode.

## URL — ✅ Thái chọn phương án A (2026-08-01)

| Phương án | Dạng | Được | Mất |
|---|---|---|---|
| **A — ĐÃ CHỌN** | `/kieu/kho/` · `/mien/mien-tay/` · `/dip/co-tet/` | Ngắn, ba trục rõ ràng, không đụng namespace `/mon/<slug>/` | Ba prefix mới ở root |
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

1. ✅ **3 cửa trục ở trang chủ** đổi href `/mon/?kieu=…` → trang tĩnh tương ứng (anchor text = tên trục, đúng thứ Google cần).
2. ✅ **Badge vùng/kiểu/dịp trên hero trang món** từ span trơ → thành link về trang trục.
3. `/mon/` GIỮ NGUYÊN chip lọc JS — hai hệ song song là ĐÚNG: chip cho người đang lọc nhanh, trang tĩnh cho máy và cho link chia sẻ (cùng triết lý `/og/` vs `/anh-mon/`).

**Để giai đoạn sau, đừng làm cùng lúc:** thêm cấp kiểu món vào breadcrumb trang món (đụng crumb nhìn thấy — việc riêng); trang giao trục ("các món chè miền Nam") — CHỈ mở khi GSC cho thấy query đó có impressions thật.

**Đo sau khi live:** GSC Performance lọc query chứa "các món" / "món ngon miền" — đó là KPI của việc này. Còn để mở: `link-audit` mở rộng đếm trang trục **(chưa làm — tùy hứng, không chặn gì)**.

---

# 6 · Việc 3 — Lớp tin cậy — ✅ LIVE `4f70049`, Thái đã chốt cả ba câu

> **Chốt: (A) brand-only** — "Món Việt Ngon" đứng tên tác giả, **giữ ẩn danh**, email liên hệ **`monvietngon.bep@gmail.com`** (Thái tạo riêng cho site 2026-08-02, đã lên trang). `/gioi-thieu/` đã dựng (`src/pages/gioi-thieu.astro`) + link footer. **Thái đã duyệt và RÚT GỌN câu chữ 2026-08-01**: bỏ các câu tự kể về luật nội dung (bịa số liệu/công dụng/dinh dưỡng), chuyện bản vùng miền + nguyên liệu thay thế, chuyện không quảng cáo/ngày cập nhật, và câu hứa hòm thư — trang chỉ còn ba ý: kho công thức là gì, nguyên tắc "chính xác và trung thực", hình vẽ riêng từng món. `author` trong Recipe schema giữ Organization như cũ (khớp lựa chọn A). Nếu sau này đổi sang (B) Person hóa thì mở lại mục này.

Bối cảnh lúc lập kế hoạch: Google hỏi thẳng "Is it self-evident who authored your content?", AI Mode recipe cards in **tên tác giả** lên card — mà site khi đó chưa có trang giới thiệu, chưa có đường liên hệ. "Everyday expertise" được quality rater tính, không cần bằng cấp.

**Ba câu đã hỏi — Thái trả lời 2026-08-01:**
1. Mức lộ danh **(A) brand-only hay (B) Person hóa** → **A**: thương hiệu "Món Việt Ngon" đứng tên, `author` Organization trong schema giữ nguyên, card AI hiện tên bếp.
2. Email công khai cho trang liên hệ → lúc chốt là **chưa có**; **cập nhật 2026-08-02: Thái tạo `monvietngon.bep@gmail.com`** (địa chỉ riêng cho site — không dùng mail cá nhân, giữ đúng ẩn danh) — đã lên `/gioi-thieu/`. Gmail là đủ cho E-E-A-T (Google cần ĐƯỜNG liên hệ hoạt động, không chấm điểm domain của email); muốn đẹp hơn sau này thì forwarding miễn phí `lienhe@monvietngon.com` → Gmail (Cloudflare Email Routing/Zoho), sửa trang một dòng. **Cố ý không đưa email vào JSON-LD** — không thêm gì cho rank, chỉ thêm mồi scraper.
3. Kể chuyện bếp thật hay ẩn danh → **ẩn danh**.

---

# 7 · Fix kỹ thuật nhỏ — ✅ LIVE `a745ff2` (2026-08-01, đã curl kiểm production)

| Fix | File | Vì sao |
|---|---|---|
| `<meta name="robots" content="max-image-preview:large">` | `src/layouts/Base.astro` | Điều kiện Google ghi rõ cho card ảnh lớn ở Discover; ảnh đã đạt chuẩn 1200px từ trước |
| `og:site_name` | `src/layouts/Base.astro` | Thiếu; rẻ; đỡ lưng cho việc bỏ đuôi brand ở §4 |
| `<lastmod>` trong sitemap | `astro.config.mjs` | Google chỉ tin lastmod thật — của mình thật: trang món lấy `updatedDate ?? pubDate` của chính món; `/` và `/mon/` lấy ngày mới nhất catalog; **31 trang trục lấy ngày mới nhất của đúng nhóm món** (mở rộng ở `4f70049`); trang không có ngày thật (bi-quyet, gioi-thieu) thì không ghi |
| Xóa khối `SearchAction` (giữ `WebSite`) | `src/pages/index.astro` | Google khai tử sitelinks search box 11/2024 — mã chết |

Nghiệm thu: build sạch, `dist/sitemap-0.xml` có lastmod, trang món có đủ hai meta mới, `dist/index.html` hết SearchAction, `link-audit` + `seo-audit` xanh. **Việc để dành cùng nhóm (chưa làm, giá trị thấp):** `prepTime`/`cookTime` cho 126 YAML (cặp recommended — thêm dần theo đợt); Bing Webmaster + IndexNow; Cốc Cốc submit sitemap.

---

# 8 · Checklist Search Console — 👤 tay Thái, ~15 phút

> ✅ **Mục 1–3 Thái làm xong 2026-08-01; 2026-08-02 quota đã cạn.** Phần rải tiếp lên **lịch 5 ngày dưới đây — mỗi ngày đúng 10 URL**, và đã đặt **5 lời nhắc tự động** trên claude.ai (routines, ~9:00 sáng mỗi ngày 03–07/08, lời nhắc chứa sẵn URL của ngày đó). **Hết 07/08 thì DỪNG request tay** — sitemap + liên kết nội bộ lo nốt ~96 trang món còn lại, đừng tốn quota. Mục 4 chỉ là "biết để khỏi hết hồn", mục 5 chờ GA4, mục 6 tùy hứng. *(Cập nhật 2026-08-08: lịch 5 ngày đã chạy xong. Sau đó GSC chỉ đúng tên 25 URL đang tắc, nên có thêm **3 ngày rải CÓ NHẮM** — bảng ở **§8b**; hết 10/08 là dừng thật.)*
>
> | Ngày | 10 URL (prefix `https://www.monvietngon.com`) |
> |---|---|
> | **03/08** | `/kieu/kho/` · `/kieu/mon-nuoc/` · `/kieu/xao/` · `/kieu/canh/` · `/kieu/lau/` · `/kieu/banh/` · `/kieu/che/` · `/kieu/com/` · `/kieu/nuong/` · `/kieu/chien/` |
> | **04/08** | `/kieu/xoi/` · `/kieu/hap/` · `/kieu/bun-tron/` · `/kieu/chao/` · `/kieu/cuon/` · `/kieu/goi/` · `/kieu/banh-mi/` · `/mien/mien-bac/` · `/mien/mien-trung/` · `/mien/mien-nam/` |
> | **05/08** | `/mien/mien-tay/` · `/mien/tay-bac/` · `/mien/tay-nguyen/` · `/mien/ca-nuoc/` · `/dip/com-nha/` · `/dip/bua-sang/` · `/dip/dai-khach/` · `/dip/nhau-lai-rai/` · `/dip/an-choi/` · `/dip/co-tet/` |
> | **06/08** | `/dip/cho-be/` · `/gioi-thieu/` · `/mon/pho-ga/` · `/mon/bun-bo-hue/` · `/mon/bun-cha-ha-noi/` · `/mon/thit-kho-hot-vit/` · `/mon/banh-xeo-mien-tay/` · `/mon/bo-kho/` · `/mon/com-ga-hoi-an/` · `/mon/heo-quay-da-gion/` |
> | **07/08** | `/mon/banh-cuon-nong/` · `/mon/bun-rieu-cua/` · `/mon/goi-cuon-tom-thit/` · `/mon/lau-thai/` · `/mon/canh-kho-qua-nhoi-thit/` · `/mon/sup-cua/` · `/mon/xoi-gac/` · `/mon/banh-mi-heo-quay/` · `/mon/hu-tieu-nam-vang/` · `/mon/che-troi-nuoc/` |
>
> Món ở hai ngày cuối là món KHÔNG featured (12 món featured đã request 01/08), chọn theo query mạnh.

1. ~~**Sitemaps:** kiểm `sitemap-index.xml` trạng thái Success; **nộp thêm `https://www.monvietngon.com/rss.xml`** làm sitemap phụ~~ — ✅ 2026-08-01.
2. ~~**URL Inspection → Request indexing:** trang chủ, `/mon/`, và ~12 món featured~~ — ✅ đợt đầu 2026-08-01; **còn rải tiếp các hôm tới** (xem khung trên).
3. ~~**Enhancements → Recipe:** theo dõi số item hợp lệ bò từ 4 → ~126~~ — ✅ đã xem 2026-08-01; số bò dần là bình thường, 4 cảnh báo recommended: kệ.
4. **Pages (indexing report):** sẽ thấy URL đời chủ cũ của domain (`/tag/…`, `/mon-diem-tam/`) báo 404 — **đúng và kệ**; không tìm thấy backlink sống nào đáng redirect (đã tra 2026-08-01).
5. Khi gắn GA4 (đã chốt ở ROADMAP §2): nối GA4 ↔ Search Console.
6. _(Tùy chọn, 5 phút, giá trị thấp)_ Bing Webmaster Tools import từ GSC; Cốc Cốc nộp sitemap.

---

# 8b · Báo cáo "Page indexing" 05/08/2026 — 44 URL gắn cờ, chỉ 6 cái là bug

> **Mổ xong 2026-08-08.** Ba bucket, 44 URL. Kết luận: **một bug thật (đã sửa, đã đo) · một việc tay cho Thái · còn lại là CHỜ.** Đừng đọc 44 con số này thành 44 chỗ hỏng — hai bucket lớn nhất là trạng thái bình thường của một domain 12 ngày tuổi.

## Bucket 1 — "Page with redirect" (9 URL): 3 cái đúng, 6 cái là bug đã sửa

**3 URL phải để nguyên VĨNH VIỄN:** `http://monvietngon.com/` · `http://www.monvietngon.com/` · `https://monvietngon.com/`. `curl` cả ba: `301` sạch về `https://www.monvietngon.com/`. Báo cáo đang khen 301 của mình chạy đúng — **đừng bấm "Validate fix", đừng đi sửa**; chúng sẽ nằm trong bucket này mãi.

**6 URL còn lại là bug thật** (`/mon/?mien=Cả nước` · `?dip=Cho bé` · `?mien=` Miền Trung / Tây Nguyên / Miền Nam / Tây Bắc): máy chủ trả **200** kèm canonical đúng về `/mon/`. Cái "redirect" nằm ở phía client — `syncUrl()` ghép lại query bằng `URLSearchParams.toString()`, mà hàm đó **viết dấu cách thành `+`**. Vào trang bằng `?mien=C%E1%BA%A3%20n%C6%B0%E1%BB%9Bc` là bị `replaceState` sang `?mien=C%E1%BA%A3+n%C6%B0%E1%BB%9Bc` — cùng một bộ tham số mà URL vẫn đổi. Googlebot render xong thấy URL khác lúc tải về nên xếp thành "Page with redirect".

**Chữ ký của bug khớp 100%, không phải suy đoán:** cả 6 URL bị gắn cờ đều là giá trị **có dấu cách** (7/7 giá trị `mien` và 7/7 giá trị `dip` đều có dấu cách), và **không một URL `?kieu=` nào bị gắn cờ** — giá trị kiểu món là một chữ (`Kho`, `Xào`) nên chuỗi ghép lại trùng khít từng byte, không có gì đổi. 6 gắn cờ / 6 có dấu cách / 0 `kieu`.

**Đo trên production** (headless Chrome + CDP `/json/list` để đọc URL thật của tab): URL tự đổi sau **~1,5 giây**.

**Đã sửa** — `src/pages/mon/index.astro`, hàm `syncUrl()`: so **semantic** rồi mới ghi, `new URLSearchParams(location.search).toString() === qs` thì thoát sớm. Nghiệm thu 6 ca trên bản build mới:

| URL vào | Trước | Sau |
|---|---|---|
| `?mien=Cả%20nước` | URL tự đổi | **đứng im** |
| `?dip=Cho%20bé` | URL tự đổi | **đứng im** |
| `?kieu=Kho` | đứng im | đứng im |
| `?fbclid=abc123` | → `/mon/` | **→ `/mon/`** (giữ nguyên nết dọn tham số rác) |
| `/mon/` trơn | — | đứng im |
| `?mien=Miền+Nam` | — | đứng im |

**Đừng kỳ vọng sai về phần thưởng:** 6 URL đó KHÔNG được index sau khi sửa — chúng *không nên* được index. Sửa chỉ đẩy chúng sang bucket lành "Alternate page with proper canonical tag" và thôi ăn crawl. Lợi ích nhỏ; nhưng URL tự đổi dưới chân Googlebot thì đúng là thứ không nên có.

**Cố ý KHÔNG dựng chốt QA cho cái này** — bắt được nó cần Chrome headless trong CI, đắt quá so với giá trị. Ghi lý do ngay cạnh code là đủ. Đây là quyết định, không phải bỏ sót.

## Bucket 2 — "Discovered – currently not indexed" (25 URL): chờ + 3 ngày request tay

`Last crawled: N/A` — Google **chưa từng tải** 25 trang này. Đã kiểm: cả 25 đều có trong sitemap.

**Đã thử giả thuyết "món mới nên chưa kịp crawl" — và LOẠI được bằng cách đếm:** nếu vậy thì 25 món phải dồn vào đợt mới nhất. Đếm thật thì chúng **rải đều theo tỉ lệ** khắp cả sáu ngày `pubDate` (10 món từ đợt 33-món ngày 31/07 · 4 từ 01/08 · 4 từ 30/07 · 4 từ 29/07 · 2 từ 28/07 · 1 từ 27/07). Rải đều ⇒ không phải lỗi nội dung hay cấu trúc, chỉ là **Google đang bóp nhịp crawl** trên domain mới. Không có gì để sửa bằng code.

**👤 Việc tay đáng làm — 3 ngày × 10 URL.** §8 chốt "hết 07/08 thì DỪNG", và lúc đó chốt vậy là đúng — nhưng đó là quyết định lúc chưa biết gì. Giờ GSC **chỉ đúng tên 25 URL đang tắc**, tức quota đã có chỗ nhắm chính xác thay vì rải theo phỏng đoán; đây đúng là công dụng sách vở của Request Indexing. Rải nốt rồi dừng thật:

> | Ngày | URL (prefix `https://www.monvietngon.com/mon/`) |
> |---|---|
> | **08/08** | `banh-mi-heo-quay/` · `banh-tet/` · `bo-nuong-la-lot/` · `bun-thit-nuong/` · `ca-loc-nuong-trui/` · `ca-nuc-sot-ca-chua/` · `ca-tai-tuong-chien-xu/` · `ca-thu-sot-ca-chua/` · `ca-tim-nuong-mo-hanh/` · `che-ba-ba/` |
> | **09/08** | `che-dau-do/` · `che-dau-xanh-bot-bang/` · `che-hat-sen-long-nhan/` · `che-thai/` · `cua-hap-bia/` · `lau-bo-da-lat/` · `lau-bo-nhung-giam/` · `mien-ga/` · `mien-xao-cua/` · `muc-xao-thom-can-tay/` |
> | **10/08** | `oc-om-chuoi-dau/` · `pa-pinh-top/` · `rau-muong-xao-toi/` · `sua-chua-nep-cam/` · `suon-xao-chua-ngot/` |
>
> Mở URL Inspection trước từng cái: **đã "Indexed" thì bỏ qua** — danh sách này chụp ngày 05/08 nên vài món có thể đã tự được crawl. **Hết 10/08 là dừng hẳn**, sitemap + liên kết nội bộ lo phần còn lại.

## Bucket 3 — "Crawled – currently not indexed" (10 URL): chờ, không sửa gì

- **`rss.xml`** — bình thường và **vĩnh viễn**. Feed nộp làm sitemap phụ; Google không index feed như một trang. Kệ nó.
- **7 trang trục** (`/kieu/chao/` `/kieu/xoi/` `/kieu/cuon/` `/kieu/hap/` `/mien/mien-nam/` `/mien/tay-nguyen/` `/dip/bua-sang/`) — cả 7 crawl ngày **05/08**, mà báo cáo cũng chốt ngày **05/08**: quyết định index chưa kịp rơi. **24/31 trang trục không có trong danh sách.** Đã thử giả thuyết "trang mỏng nên bị loại" và **LOẠI được bằng số đo**: `/dip/bua-sang/` **2.445 chữ** bị gắn cờ, còn `/kieu/kho/` **814 chữ** thì không — dài/ngắn không phải thứ phân loại ở đây.
- **2 trang món** (`cha-ca-that-lat-chien` · `lau-thai`) — đo trong `dist`, xếp thứ **83/126** và **110/126** từ ngắn tới dài (median 2.665 chữ), tức thuộc nhóm DÀI. Không có gì hỏng.

**Chốt kỹ thuật kiểm cùng lúc:** không một chữ `noindex` nào trong `dist` · `max-image-preview:large` phục vụ đúng · sitemap 161 URL, `lastmod` thật, không lẫn URL query. Về kỹ thuật site sạch — hai bucket lớn là **tuổi domain**, không phải lỗi.

## Việc nội dung mọc ra từ đây — ưu tiên thấp, đừng làm ngay

`/kieu/chao/` (3 món, 298 chữ) và `/kieu/cuon/` (3 món, 270 chữ) là hai trang yếu nhất site về cấu trúc. **Không làm gì riêng bây giờ** — đường tới 200 món tự làm dày chúng. Chỉ cần biết **trang trục 3 món là đáy**, thêm một lý do để mỗi đợt ngó qua mấy ô mỏng (ROADMAP §2 *"Đường tới 200 món"*).

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
