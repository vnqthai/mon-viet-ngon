import { KIEU_SLUG, MIEN_SLUG, DIP_SLUG } from './truc-slug.mjs';

/**
 * NỘI DUNG 31 TRANG TRỤC LỌC — /kieu/… · /mien/… · /dip/… (SEO.md §5).
 *
 * Mỗi trang: title cho <title> (chỗ `{n}` được thay bằng số món lúc build —
 * ĐỪNG ghi số cứng, catalog còn lớn), h1 hiển thị, và intro 2–3 câu.
 *
 * Luật cho intro — đã soát theo bộ "Chính xác & trung thực" (ROADMAP §4):
 *   · chỉ nhắc món CÓ THẬT trong catalog (sai tên là link-audit không cứu được)
 *   · KHÔNG ghi số lượng món trong câu chữ (số nằm ở title qua {n})
 *   · không hứa công dụng, không chữ dinh dưỡng, không tên danh nhân
 *   · CÂU ĐẦU phải đứng một mình được — nó là meta description của trang
 *
 * Title KHÔNG mang đuôi "— Món Việt Ngon": cùng lý do với trang món (SEO.md §4)
 * — Google hiện tên site thành dòng riêng, giữ đuôi chỉ tổ vượt ngân sách ký tự.
 */
export type TrucId = 'kieu' | 'mien' | 'dip';

export interface TrangTruc {
  truc: TrucId;
  value: string; // đúng giá trị enum trong content.config.ts
  slug: string;
  title: string; // cho <title> — chứa {n}
  h1: string;
  intro: string;
}

const K = (value: string, title: string, h1: string, intro: string): TrangTruc =>
  ({ truc: 'kieu', value, slug: (KIEU_SLUG as any)[value], title, h1, intro });
const M = (value: string, title: string, h1: string, intro: string): TrangTruc =>
  ({ truc: 'mien', value, slug: (MIEN_SLUG as any)[value], title, h1, intro });
const D = (value: string, title: string, h1: string, intro: string): TrangTruc =>
  ({ truc: 'dip', value, slug: (DIP_SLUG as any)[value], title, h1, intro });

export const TRANG_TRUC: TrangTruc[] = [
  /* ---------- 17 kiểu món ---------- */
  K('Món nước', 'Các món nước ngon — {n} công thức phở, bún, mì, hủ tiếu',
    'Các món nước — một tô là xong bữa',
    'Tuyển các món nước Việt có hướng dẫn từng bước: phở bò, bún bò Huế, hủ tiếu Nam Vang, miến gà và nhiều tô khác. Món nước ở bếp này nghĩa là một tô ra đủ bữa — sợi, nước dùng, thịt thà và rau ăn kèm. Tô nào cũng có bản nấu nhanh để đọc 30 giây nắm cả món, rồi hẵng thong thả ninh nồi nước dùng.'),
  K('Bún trộn', 'Các món bún trộn ngon — {n} công thức đủ vị chua ngọt',
    'Bún trộn — sợi ráo, chan mắm, trộn đều',
    'Các món bún không chan nước lèo: bún chả Hà Nội, bún thịt nướng, bún đậu mắm tôm, bún bò Nam Bộ. Sợi bún để ráo, đồ mặn xếp lên trên, chén mắm rưới vào rồi trộn đều tay — mỗi miền một kiểu mắm, một thức kèm. Trang nào cũng có phần pha nước chấm cho đúng vị.'),
  K('Canh', 'Các món canh ngon dễ nấu — {n} công thức cho mâm cơm',
    'Canh — nồi nước ngọt lành giữa mâm',
    'Những nồi canh quen mặt trong mâm cơm Việt: canh chua cá lóc, canh cua rau đay, canh sườn bí đao, canh khổ qua nhồi thịt. Canh là món đứng cạnh chén cơm trắng — nước ngọt từ thịt cá và rau củ, nêm vừa miệng cơm nhà. Mỗi trang có giỏ đi chợ tự tính lượng theo số người ăn.'),
  K('Lẩu', 'Các món lẩu ngon — {n} công thức nồi lẩu tại nhà',
    'Lẩu — nồi sôi giữa bàn, nhúng tới đâu ăn tới đó',
    'Cách nấu các nồi lẩu quen thuộc: lẩu Thái chua cay, lẩu mắm miền Tây, lẩu gà lá é, lẩu bò nhúng giấm. Lẩu là nồi đặt giữa bàn — nước dùng nấu sẵn, đồ nhúng xếp quanh, đông người mới vui. Mỗi trang ghi rõ phần nước, phần nhúng và chén chấm hợp với nồi đó.'),
  K('Cháo', 'Các món cháo ngon — {n} công thức hạt gạo ninh nhừ',
    'Cháo — gạo ninh nhừ, húp tới đáy tô',
    'Những nồi cháo ninh kỹ tới nhừ: cháo gà gạo rang, cháo lòng, cháo lươn Nghệ An cay ấm. Cháo ngon nằm ở hạt gạo nở bung và nồi nước ngọt tự nhiên, nên bước ninh, bước khuấy đều ghi thời gian kèm đồng hồ đếm ngay trong trang.'),
  K('Kho', 'Các món kho ngon đậm đà — {n} công thức hao cơm',
    'Món kho — lửa liu riu, nước sánh màu cánh gián',
    'Các món kho đậm đà đưa cơm: thịt kho hột vịt, cá kho tộ, bò kho, kho quẹt. Kho là chuyện của lửa nhỏ và thời gian — nước màu thắng tới, nêm rồi để nồi tự sánh lại. Bước thắng nước màu, chỉnh lửa được ghi rõ từng chặng, có đồng hồ đếm cho chặng nào cần canh.'),
  K('Xào', 'Các món xào ngon — {n} công thức chảo nóng ra dĩa',
    'Món xào — chảo nóng già, đảo nhanh tay',
    'Các món xào cho bữa cơm lẫn bữa tiệc nhỏ: bò lúc lắc, sườn xào chua ngọt, rau muống xào tỏi, mì xào giòn. Xào ngon là chuyện của chảo đủ nóng và bỏ đồ vào đúng lượt — thứ lâu chín đi trước, rau thơm sau cùng. Trang nào cũng có bản nấu nhanh cho người muốn vô bếp liền.'),
  K('Hấp', 'Các món hấp ngon — {n} công thức chín bằng hơi nước',
    'Món hấp — hơi nước làm hết phần việc',
    'Các món hấp và chưng: gà hấp hành, cua hấp bia, trứng chưng thịt nấm mèo, mắm chưng thịt trứng. Hấp là cách nấu nương vào hơi nước — đồ ăn chín trong hơi, vị ngọt giữ lại trong thớ thịt. Canh lửa và canh giờ là hai thứ quyết định, nên bước nào cần đồng hồ đều có sẵn nút bấm.'),
  K('Cơm', 'Các món cơm ngon — {n} công thức từ cơm tấm tới cơm lam',
    'Món cơm — hạt gạo đứng vai chính',
    'Các món lấy hạt cơm làm vai chính: cơm tấm sườn nướng, cơm gà Hội An, cơm hến, cơm rang dưa bò, cả cơm lam nướng ống. Mỗi món một kiểu hạt — tấm vụn, tẻ tơi, nếp dẻo — và một thức ăn kèm riêng. Định lượng trong trang tự tính lại khi đổi số người ăn.'),
  K('Xôi', 'Các món xôi ngon — {n} công thức nếp đồ dẻo thơm',
    'Xôi — nếp đồ chín, hạt căng còn rời',
    'Các thức xôi cho quà sáng và mâm cỗ: xôi gấc đỏ cam, xôi xéo, xôi ngũ sắc, xôi mặn Sài Gòn. Xôi đạt là nếp đồ chín tới, hạt căng bóng mà còn rời — không nát, không sượng. Ngâm nếp bao lâu, đồ mấy lượt, từng trang đều dặn kỹ.'),
  K('Bánh', 'Các món bánh Việt — {n} công thức từ bánh xèo tới bánh chưng',
    'Bánh — bột gạo và nếp tạo hình trăm kiểu',
    'Các món bánh làm từ gạo và nếp: bánh xèo giòn rụm, bánh cuốn tráng mỏng, bánh bèo chén, bánh chưng bánh tét gói lá. Cùng một hạt gạo mà ra trăm dáng — tráng, đổ khuôn, đổ chảo, gói lá nén chặt. Món nào cần khuôn hay đồ nghề riêng đều ghi rõ ở phần đi chợ.'),
  K('Bánh mì', 'Bánh mì kẹp kiểu Việt — {n} công thức tại nhà',
    'Bánh mì — ổ giòn kẹp nhân, cầm tay mà đi',
    'Những ổ bánh mì kẹp làm tại nhà: bánh mì thịt đủ tầng nhân, bánh mì heo quay, bánh mì chả cá Nha Trang chan sốt hành. Ổ giòn, nhân nóng, đồ chua giòn tan — mỗi trang chỉ cách làm từng lớp nhân và cách hâm ổ bánh giòn lại như mới.'),
  K('Chiên', 'Các món chiên ngon — {n} công thức vàng giòn',
    'Món chiên — dầu sôi đúng độ, vàng đều từng mặt',
    'Các món chiên vàng giòn: chả giò cuốn chặt tay, cánh gà chiên nước mắm, cá tai tượng chiên xù, chả cá thát lát. Chiên đạt nằm ở nhiệt dầu và độ ráo của đồ đem chiên — hai thứ từng trang đều dặn trước khi bắc chảo, kèm bản nấu nhanh để nắm trình tự.'),
  K('Nướng', 'Các món nướng ngon — {n} công thức xém cạnh thơm lừng',
    'Món nướng — xém cạnh ngoài, mọng bên trong',
    'Các món nướng của ba miền: bò nướng lá lốt, gà nướng mắc khén, cá lóc nướng trui, heo quay da giòn làm được bằng lò nhà. Nướng ngon là canh được chỗ xém — cạnh sém thơm mà thớ thịt bên trong còn mọng. Cách ướp, thời gian trở mặt, từng trang ghi đủ.'),
  K('Cuốn', 'Các món cuốn — {n} công thức cuốn chấm tại bàn',
    'Món cuốn — trải bánh tráng, xếp rau, cuốn chặt tay',
    'Các món cuốn bánh tráng: gỏi cuốn tôm thịt, bánh tráng cuốn thịt heo, nem nướng Nha Trang. Món cuốn dọn cả mâm ra bàn để ai nấy tự cuốn phần mình — cái vui nằm ở khâu quây quần. Bí quyết thật nằm ở chén nước chấm, và trang nào cũng chỉ cách pha cho hợp món.'),
  K('Gỏi', 'Các món gỏi ngon — {n} công thức trộn chua giòn',
    'Gỏi — chua ngọt kéo nhau, giòn tới miếng cuối',
    'Các món gỏi trộn: gỏi xoài xanh tôm khô, gỏi ngó sen tôm thịt, gỏi gà bắp cải. Gỏi ngon phải ráo — rau củ vắt kỹ, nước trộn pha đậm rồi mới áo vào, trộn xong dĩa không đọng nước. Mấy chuyện vắt, ngâm, thứ tự trộn đều được dặn từng bước.'),
  K('Chè', 'Các món chè ngon — {n} công thức nấu tại nhà',
    'Chè — ngọt thanh, mát miệng',
    'Các món chè và món ngọt tráng miệng: chè bưởi, chè trôi nước, chè hạt sen long nhãn, sữa chua nếp cẩm. Chè ngon đứng ở chữ thanh — ngọt vừa tới, nước cốt dừa béo mà không ngấy. Định lượng đường, nước cốt trong trang tự tính lại theo số người ăn.'),

  /* ---------- 7 vùng ---------- */
  M('Miền Bắc', 'Món ngon miền Bắc — {n} công thức từ phở bò tới bún chả',
    'Món Bắc — nước dùng trong, nêm nếm thanh',
    'Các món miền Bắc có hướng dẫn tại bếp: phở bò, bún chả Hà Nội, bún riêu cua, bánh cuốn nóng, chân giò nấu giả cầy. Nếp nấu Bắc chuộng vị thanh — nước dùng trong, chua nhẹ kiểu quả sấu, rau thơm đúng loại cho đúng món. Chọn một tô quen hay thử món ít gặp như bún ốc nguội đều có sẵn ở đây.'),
  M('Miền Trung', 'Món ngon miền Trung — {n} công thức đậm vị Huế, Quảng, Nha Trang',
    'Món Trung — đậm đà, cay nồng, khéo tay',
    'Các món miền Trung từ Huế vào tới Nha Trang: bún bò Huế, mì Quảng, bánh bèo chén, cơm hến, bún chả cá. Dải đất này nêm đậm và cay hơn hai đầu đất nước, lại nổi tiếng khéo ở mấy món bánh nhỏ xinh. Món dùng ruốc, mắm nêm thì đọc kỹ phần đi chợ để chọn cho đúng.'),
  M('Miền Nam', 'Món ngon miền Nam — {n} công thức từ cơm tấm tới hủ tiếu',
    'Món Nam — nêm ngọt rõ ràng, ăn là thấy vui',
    'Các món miền Nam trong kho: cơm tấm sườn nướng, hủ tiếu Nam Vang, bò kho, canh khổ qua nhồi thịt, chè Thái. Vị Nam nêm ngọt rõ, chuộng nước dừa và đậu phộng rang. Từ bữa cơm nhà tới mâm đãi khách đều tìm được món hợp ở đây.'),
  M('Miền Tây', 'Món ngon miền Tây — {n} công thức đậm chất sông nước',
    'Món miền Tây — sản vật sông nước, nêm đậm dạn tay',
    'Các món miền Tây sông nước: canh chua cá lóc, lẩu mắm, cá lóc nướng trui, kho quẹt, chè bà ba. Bếp miền Tây nấu từ thứ có quanh mình — cá đồng, con ốc, trái dừa và hũ mắm — nêm đậm mà hào phóng. Phần đi chợ của từng món dặn thêm cách chọn cá, chọn mắm.'),
  M('Tây Bắc', 'Món Tây Bắc nấu tại nhà — {n} công thức',
    'Món Tây Bắc — mắc khén dẫn lối',
    'Món Tây Bắc nấu được ở bếp nhà: gà nướng mắc khén, pa pỉnh tộp, xôi ngũ sắc, cơm lam. Nhóm này còn gọn — bếp chỉ nhận món mà nguyên liệu tìm mua được, thứ nào khó tìm ngoài vùng thì trang món nói thẳng kèm cách thay. Hạt mắc khén tê tê đầu lưỡi là hồn vị của mấy món nướng ở đây.'),
  M('Tây Nguyên', 'Món ngon Tây Nguyên — {n} công thức phố núi',
    'Món Tây Nguyên — đậm đà kiểu phố núi',
    'Các món gắn với cao nguyên: bún đỏ Buôn Ma Thuột, phở khô Gia Lai, lẩu bò Đà Lạt, bánh ướt lòng gà, bò một nắng chấm muối kiến vàng. Mỗi món mang đúng nết ăn xứ mình — tô bún ăn màu điều, phở dọn hai tô, chén muối kiến vàng khó lẫn. Nhóm còn gọn và sẽ dày thêm.'),
  M('Cả nước', 'Món Việt quen thuộc cả nước — {n} công thức quen mặt mọi nhà',
    'Món quen cả nước — mâm nào cũng từng gặp',
    'Những món không của riêng vùng nào, nhà nào cũng nấu và mỗi nhà một nết: canh cà chua trứng, rau muống xào tỏi, sườn xào chua ngọt, cháo gà, chè đậu đỏ. Đây là chỗ bắt đầu dễ nhất cho người mới vào bếp — nguyên liệu chợ nào cũng có, các bước đều quen tay.'),

  /* ---------- 7 dịp ---------- */
  D('Cơm nhà', 'Món ngon cơm nhà — {n} công thức dễ nấu mỗi ngày',
    'Cơm nhà — món mặn, tô canh, dĩa xào đủ mâm',
    'Các món cho mâm cơm thường ngày: cá kho tộ, canh chua cá lóc, rau muống xào tỏi, trứng chưng thịt nấm mèo, thịt kho hột vịt. Nấu cơm nhà cần nhất là gọn việc — nên món nào cũng có bản nấu nhanh, giỏ đi chợ tự tính lượng và đồng hồ cho mấy bước phải canh.'),
  D('Bữa sáng', 'Món ăn sáng kiểu Việt — {n} công thức tại nhà',
    'Bữa sáng — dậy sớm một chút, ăn cho tử tế',
    'Các món quà sáng nấu được tại nhà: phở, bún riêu cua, bánh cuốn nóng, xôi xéo, bánh mì thịt. Nhiều món quen mặt ở hàng quán, nhưng làm ở nhà thì chỉnh được vị theo ý mình. Món nào ninh lâu thì xem bản nấu nhanh trước để liệu đường nấu từ tối hôm trước.'),
  D('Đãi khách', 'Món ngon đãi khách — {n} công thức nở mặt gia chủ',
    'Đãi khách — dọn lên là có tiếng trầm trồ',
    'Các món để bày mâm mời khách: gà hấp hành, heo quay da giòn, lẩu Thái, gỏi ngó sen tôm thịt, chè hạt sen long nhãn. Chọn theo mạch một món mặn đứng bàn, một nồi giữ nhiệt, một dĩa gỏi khai vị, một chén ngọt kết bữa là tròn mâm. Bản nấu nhanh giúp lượng sức trước khi nhận lời nấu.'),
  D('Nhậu lai rai', 'Món nhậu ngon — {n} công thức lai rai tại nhà',
    'Nhậu lai rai — đồ mặn đậm đà, câu chuyện kéo dài',
    'Các món hợp cho bữa lai rai ở nhà: ốc len xào dừa, cánh gà chiên nước mắm, bò một nắng, lòng heo luộc, gỏi xoài xanh tôm khô. Món nhậu đạt là món đậm vị, ăn chậm được, càng nhâm nhi càng ra chuyện. Chén chấm nào đi với món nào, trong trang có chỉ rõ.'),
  D('Ăn chơi', 'Món ăn chơi — {n} công thức quà vặt ba miền',
    'Ăn chơi — lưng lửng bụng mà vui miệng',
    'Các món ăn chơi, quà vặt cho buổi xế hay cuối tuần: bánh bèo chén, bánh xèo, gỏi cuốn, chè bưởi, cơm cháy chà bông. Không phải bữa chính nên cứ thong thả — làm một mẻ nhỏ, rủ thêm người cuốn cùng tráng cùng. Định lượng tự chia lại khi chỉnh số người ăn.'),
  D('Cho bé', 'Món ngon cho bé — {n} công thức mềm, dễ ăn',
    'Cho bé — mềm, thơm, không cay',
    'Các món cả nhà ăn chung mà bé cũng gắp được: cháo gà, canh bí đỏ thịt bằm, trứng chưng thịt nấm mèo, sườn ram mặn ngọt. Điểm chung là mềm, không cay, vị quen dễ gần. Khi nấu phần cho bé, nêm nhẹ tay hơn công thức một chút là vừa.'),
  D('Cỗ Tết', 'Món Tết — {n} công thức cho mâm cỗ đủ đầy',
    'Cỗ Tết — mâm đủ đầy, năm mới ấm nhà',
    'Các món cho mâm cỗ Tết: bánh chưng, bánh tét, thịt kho hột vịt, canh khổ qua nhồi thịt, xôi gấc, chè trôi nước. Bắc gói bánh chưng, Nam nấu nồi thịt kho — mỗi miền một nếp mà mâm nào cũng đủ đầy. Món gói, món ninh lâu đều ghi rõ thời gian để canh lịch nấu trước Tết.'),
];
