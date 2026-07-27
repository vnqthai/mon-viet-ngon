/* Bí quyết bếp Việt dùng chung — hiện ở trang /bi-quyet/.
   Thêm mẹo mới: thêm 1 phần tử vào mảng này. */
export interface Meo {
  icon: string;
  title: string;
  text: string; // được phép dùng **đậm**
}

export const MEO_BEP: Meo[] = [
  {
    icon: 'bottle',
    title: 'Chọn nước mắm cho đáng đồng tiền',
    text: 'Nhìn **độ đạm trên nhãn**: 25–30 độ đủ xài nêm nếm, 40 độ trở lên để chấm và ướp. Mắm ngon lắc chai thấy sánh nhẹ, màu cánh gián trong, không gắt cổ.',
  },
  {
    icon: 'jar',
    title: 'Thắng nước màu không bị đắng',
    text: 'Đường + 1 muỗng nước, **lửa vừa, không khuấy** — chỉ nghiêng chảo. Sôi tới màu cánh gián thì tắt bếp liền và chế nước nóng vào: màu sẽ đậm thêm một nhịp nữa nhờ nhiệt còn lại.',
  },
  {
    icon: 'garlic',
    title: 'Phi tỏi vàng ươm chứ không cháy',
    text: 'Dầu vừa nóng tới là cho tỏi, **lửa vừa**, đảo đều tay. Tỏi chớm vàng là vớt ra ngay — nhiệt trong dầu sẽ "chín nốt" phần còn lại. Đợi vàng đẹp mới vớt là trễ mất 10 giây.',
  },
  {
    icon: 'fish',
    title: 'Khử tanh cá đúng bài',
    text: 'Muối hột chà xát + nước cốt chanh, hoặc nước ấm khoảng 70°C dội qua rồi cạo nhớt. **Cá sạch nhớt là hết 90% mùi tanh** — mẹo này ăn tiền hơn mọi loại rượu gừng.',
  },
  {
    icon: 'sprout',
    title: 'Luộc rau xanh giòn như nhà hàng',
    text: 'Nước thiệt sôi + **chút muối và vài giọt dầu ăn** rồi mới thả rau, luộc nhanh không đậy nắp, vớt ra **ngâm ngay nước đá**. Màu xanh giữ nguyên, cọng rau giòn rụm.',
  },
  {
    icon: 'meat',
    title: 'Ướp thịt theo trật tự mặn – ngọt – thơm',
    text: 'Nêm **mặn trước** (mắm, muối) cho thấm sâu, **ngọt sau** (đường, hạt nêm), sát giờ nấu mới tới **thơm** (tỏi, hành, tiêu) để không cháy khét khi chiên xào. Tối thiểu 15 phút mới kịp thấm.',
  },
  {
    icon: 'pot',
    title: 'Nêm canh: đường trước, mắm sau, mắm lúc sôi',
    text: 'Đường cần thời gian tan và ngấm nên vô trước. Nước mắm chế **khi nồi đang sôi** cho dậy mùi thơm rồi bớt gắt. Nêm lúc nguội, mắm nổi mùi tanh — canh dở đi một bậc.',
  },
  {
    icon: 'herb',
    title: 'Giữ rau thơm tươi cả tuần',
    text: 'Rửa sạch, **vẩy thiệt ráo**, cuộn trong khăn giấy hơi ẩm rồi bỏ hộp kín ngăn mát. Ngò, húng, ngò om để được 5–7 ngày vẫn xanh — khỏi ngày nào cũng chạy ra chợ.',
  },
  {
    icon: 'rice',
    title: 'Cơm dẻo thơm không cần nồi xịn',
    text: 'Vo gạo 2 lần nhẹ tay, nước nấu **xâm xấp một lóng tay** trên mặt gạo. Cơm chín để yên 10 phút không mở nắp rồi mới xới — hột cơm ráo, dẻo, không nhão đáy.',
  },
  {
    icon: 'chili',
    title: 'Pha nước mắm chấm "thần thánh"',
    text: 'Tỉ lệ dễ nhớ: **1 mắm : 1 đường : 1 chanh : 4–5 nước**, khuấy tan đường trước rồi mới cho tỏi ớt băm — tỏi ớt sẽ nổi lên mặt nhìn đẹp mê. Chấm gì cũng đỉnh.',
  },
  {
    icon: 'claypot',
    title: 'Món kho ngon nhờ "hai lửa"',
    text: 'Kho lần một cho chín, **tắt bếp để nguội vài tiếng** (hoặc qua đêm ngăn mát), rồi kho lại lần hai. Lúc nguội gia vị mới ngấm sâu vô thớ thịt cá — bí mật của nồi kho bà ngoại.',
  },
  {
    icon: 'lime',
    title: 'Vắt chanh không đắng',
    text: 'Lăn trái chanh trên mặt bàn vài vòng rồi mới cắt, vắt **nghiêng tay tránh ép phần vỏ trắng**. Nêm chanh khi món đã bớt nóng già — nước cốt chanh gặp nhiệt cao là dậy vị đắng.',
  },
];
