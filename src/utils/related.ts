/**
 * LIÊN KẾT CHÉO GIỮA CÁC MÓN — dải "Nấu gì tiếp đây?" ở cuối trang chi tiết.
 *
 * Sinh ra 6 món gợi ý cho từng món, lấy từ BA TRỤC có sẵn trong schema
 * (region · category · occasions) — không thêm field nào:
 *
 *   2 món cùng vùng  +  2 món cùng kiểu món  +  2 món cùng nhãn theo dịp
 *
 * Hai luật làm nên chất lượng của dải này, cả hai đều đo được (số đo lấy ở mốc
 * 64 món, 384 liên kết — chạy `node tools/link-audit.mjs` để đo lại):
 *
 * 1. CHỌN BẰNG XOAY VÒNG, ĐỪNG LẤY N MÓN ĐẦU KHỐI. Đứng ở chỗ của mình trong
 *    khối rồi lấy mấy món KẾ TIẾP, hết thì vòng lại đầu. Cách ngây thơ "sắp
 *    khối theo order rồi lấy 3 món đầu" để lại **38/64 món mồ côi** (không ai
 *    trỏ tới), dồn 15 lượt trỏ vào cơm tấm, và **44 món có dải y hệt món khác**.
 *    Xoay vòng đưa cả ba con số đó về **0** mà không tốn gì.
 *
 * 2. TRỘN BA TRỤC, ĐỪNG DÙNG MỘT TRỤC. Chỉ "cùng vùng" thì catalog vỡ thành 3
 *    đảo, chỉ "cùng kiểu món" thì vỡ thành 7 — đứng ở món kho lang thang mãi
 *    cũng chỉ tới được 10 món. Trộn ba trục cho **một mảnh liền 64 món**.
 *
 * Nhãn theo dịp lấy NHÃN HIẾM NHẤT của món trước: "Đãi khách" có 26 món, để nó
 * đứng đầu thì mấy nhãn nhỏ như "Cỗ Tết" không bao giờ được dùng tới.
 *
 * Số món mỗi trục KHÔNG cứng 2+2+2. Tây Bắc chỉ có 2 món nên pa pỉnh tộp lấy
 * được đúng 1 món cùng vùng, phần thiếu trôi sang trục sau — nó ra 1 vùng · 3
 * kiểu món · 2 dịp. Vì vậy lý do phải đi kèm TỪNG THẺ (chip trên thẻ) chứ không
 * gom thành ba tiêu đề nhóm cứng: nhóm cứng sẽ có lúc nói sai.
 */
import { familyOf, FAMILIES } from './family';

export interface RelatedItem {
  entry: any;
  reason: string;
}

const PER_AXIS = 2;
const TOTAL = PER_AXIS * 3;

/* Chip lý do. Viết ra thành hàm vì "Cả nước" không đọc được theo khuôn
   "Cùng <vùng>", còn kiểu món thì có cái đã mang sẵn chữ "Món". */
const regionReason = (r: string) => (r === 'Cả nước' ? 'Khắp cả nước' : `Cùng ${r}`);
const catReason = (c: string) =>
  c.startsWith('Món') ? `Cũng ${c.toLowerCase()}` : `Cũng món ${c.toLowerCase()}`;

/**
 * Lấy các món KẾ TIẾP mình trong khối, hết khối thì vòng lại đầu.
 * `upTo` là tổng số món muốn có sau lượt này, không phải số món lượt này thêm.
 */
function cycle(block: any[], selfId: string, upTo: number, picked: RelatedItem[], reason: string) {
  const n = block.length;
  if (!n) return;
  let start = block.findIndex((e) => e.id === selfId);
  if (start < 0) start = 0; // khối không chứa chính nó (chỉ xảy ra ở khối dự phòng)
  for (let step = 1; step <= n && picked.length < upTo; step++) {
    const cand = block[(start + step) % n];
    if (cand.id === selfId) continue;
    if (picked.some((p) => p.entry.id === cand.id)) continue;
    picked.push({ entry: cand, reason });
  }
}

/** 6 món gợi ý cho `recipe`, kèm lý do của từng món. */
export function relatedFor(recipe: any, all: any[]): RelatedItem[] {
  const ordered = [...all].sort((a, b) => a.data.order - b.data.order);
  const d = recipe.data;
  const picked: RelatedItem[] = [];

  // Số món của từng nhãn theo dịp — để xếp nhãn hiếm lên trước.
  const occSize = new Map<string, number>();
  for (const e of ordered) for (const o of e.data.occasions) occSize.set(o, (occSize.get(o) ?? 0) + 1);

  // 1 · cùng vùng
  cycle(
    ordered.filter((e) => e.data.region === d.region),
    recipe.id, PER_AXIS, picked, regionReason(d.region)
  );

  // 2 · cùng kiểu món
  cycle(
    ordered.filter((e) => e.data.category === d.category),
    recipe.id, PER_AXIS * 2, picked, catReason(d.category)
  );

  // 3 · cùng nhãn theo dịp, nhãn hiếm nhất trước.
  // Vòng lần lượt qua từng nhãn, MỖI LƯỢT LẤY MỘT MÓN — đừng vét cạn nhãn đầu
  // rồi mới sang nhãn sau. Vét cạn thì món hai nhãn như pa pỉnh tộp ra ba thẻ
  // liền nhau cùng đeo chip "Hợp Nhậu lai rai", đọc như trang bị lỗi lặp.
  const occs = [...d.occasions].sort(
    (a: string, b: string) => (occSize.get(a) ?? 0) - (occSize.get(b) ?? 0)
  );
  const occBlocks = occs.map((o: string) => ({
    o,
    block: ordered.filter((e) => e.data.occasions.includes(o)),
  }));
  while (picked.length < TOTAL) {
    const before = picked.length;
    for (const { o, block } of occBlocks) {
      if (picked.length >= TOTAL) break;
      cycle(block, recipe.id, picked.length + 1, picked, `Hợp ${o}`);
    }
    if (picked.length === before) break; // mọi nhãn đã cạn món chưa lấy
  }

  // Dự phòng — ở mốc 64 món KHÔNG dùng tới ô nào (đo được), nhưng catalog còn
  // lớn tiếp và có thể mở vùng/kiểu món mỏng, nên để đây cho dải luôn đủ 6 ô.
  const fam = familyOf(d.category);
  cycle(
    ordered.filter((e) => familyOf(e.data.category) === fam),
    recipe.id, TOTAL, picked, `Cùng họ ${FAMILIES[fam].name}`
  );
  cycle(ordered, recipe.id, TOTAL, picked, 'Món khác của bếp');

  return picked;
}
