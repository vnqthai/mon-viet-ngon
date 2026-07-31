/**
 * KHO HÌNH MINH HỌA — bảng tra duy nhất: tên art -> file component.
 *
 * Hình KHÔNG còn nhúng thẳng vào HTML. Endpoint src/pages/art/[kind].svg.ts đọc
 * file component ở đây rồi xuất ra /art/<kind>.svg, còn thẻ món gọi bằng
 * <img loading="lazy"> (src/components/art/ArtImg.astro).
 *
 * Vì sao đổi: nhúng thẳng thì dung lượng /mon/ tăng theo số món (~2,6 KB gzip
 * mỗi món) và cùng một hình bị tải lại ở cả ba trang. Tách ra file riêng thì
 * dung lượng trang đứng yên dù bao nhiêu món, trình duyệt bỏ qua hình ngoài màn
 * hình và cache lại từng hình để ba trang dùng chung.
 *
 * THÊM HÌNH MỚI = 3 việc: file Art<Ten>.astro · một dòng ở đây · một giá trị
 * trong enum art của content.config.ts. `npm run qa` soi cả ba chỗ có khớp không.
 *
 * Ràng buộc của file art (check-art-ids.mjs kiểm): viewBox PHẢI là
 * "0 0 520 470" — ArtImg đặt cứng width/height theo đó để trang khỏi nhảy khi
 * hình tải xong; và không được dùng currentColor hay var(--…) vì CSS ngoài
 * không với vào trong <img> được.
 */

/** Tên art -> tên file trong src/components/art/ (không kèm đuôi .astro) */
export const ART_COMPONENT: Record<string, string> = {
  'canh-chua':            'CanhChuaArt',
  'com-tam':              'ArtComTam',
  'cha-gio':              'ArtChaGio',
  'bo-kho':               'ArtBoKho',
  'kho-qua':              'ArtKhoQua',
  'pho-bo':               'ArtPhoBo',
  'bun-bo':               'ArtBunBo',
  'banh-xeo':             'ArtBanhXeo',
  'ca-kho':               'ArtCaKhoTo',
  'thit-kho':             'ArtThitKho',
  'canh-bi-do':           'ArtCanhBiDo',
  'bun-cha':              'ArtBunCha',
  'mi-quang':             'ArtMiQuang',
  'ga-kho':               'ArtGaKhoGung',
  'canh-cua':             'ArtCanhCua',
  'bun-rieu':             'ArtBunRieu',
  'com-ga':               'ArtComGaHoiAn',
  'bo-luc-lac':           'ArtBoLucLac',
  'ga-la-giang':          'ArtGaLaGiang',
  'pho-ga':               'ArtPhoGa',
  'hu-tieu':              'ArtHuTieu',
  'bun-thit-nuong':       'ArtBunThitNuong',
  'pho-kho':              'ArtPhoKho',
  'com-chien':            'ArtComChien',
  'goi-xoai':             'ArtGoiXoai',
  'goi-ga':               'ArtGoiGa',
  'ga-nuong':             'ArtGaNuong',
  'muc-xao':              'ArtMucXao',
  'suon-ram':             'ArtSuonRam',
  'ca-ri-ga':             'ArtCaRiGa',
  'tom-rim':              'ArtTomRim',
  'banh-cuon':            'ArtBanhCuon',
  'trung-chung':          'ArtTrungChung',
  'goi-cuon':             'ArtGoiCuon',
  'rau-muong':            'ArtRauMuong',
  'mien-ga':              'ArtMienGa',
  'mi-vit-tiem':          'ArtMiVitTiem',
  'mien-xao-cua':         'ArtMienXaoCua',
  'mi-xao-bo':            'ArtMiXaoBo',
  'bun-dau':              'ArtBunDau',
  'bun-bo-nam-bo':        'ArtBunBoNamBo',
  'lau-mam':              'ArtLauMam',
  'lau-ga-la-e':          'ArtLauGaLaE',
  'lau-thai':             'ArtLauThai',
  'chao-luon':            'ArtChaoLuon',
  'chao-ga':              'ArtChaoGa',
  'chao-long':            'ArtChaoLong',
  'bun-cha-ca':           'ArtBunChaCa',
  'bun-mam-nem':          'ArtBunMamNem',
  'com-hen':              'ArtComHen',
  'banh-khoai':           'ArtBanhKhoai',
  'banh-trang-cuon':      'ArtBanhTrangCuon',
  'mam-ruoc-xao':         'ArtMamRuocXao',
  'bun-do':               'ArtBunDo',
  'bo-mot-nang':          'ArtBoMotNang',
  'ca-loc-nuong-trui':    'ArtCaLocNuongTrui',
  'pa-pinh-top':          'ArtPaPinhTop',
  'oc-len-xao-dua':       'ArtOcLenXaoDua',
  'nem-nuong':            'ArtNemNuong',
  'ca-tai-tuong':         'ArtCaTaiTuong',
  'oc-hap-la-gung':       'ArtOcHapLaGung',
  'ga-hap-hanh':          'ArtGaHapHanh',
  'goi-ngo-sen':          'ArtGoiNgoSen',
  'canh-ga-chien':        'ArtCanhGaChien',
  'suon-xao-chua-ngot':   'ArtSuonXaoChuaNgot',
  'bun-suon-sau':         'ArtBunSuonSau',
  'oc-chuoi-dau':         'ArtOcChuoiDau',
  'long-luoc':            'ArtLongLuoc',
  'canh-suon-bi-dao':     'ArtCanhSuonBiDao',
  'canh-suon-khoai-tay':  'ArtCanhSuonKhoaiTay',
  'ca-tim-nuong':         'ArtCaTimNuong',
  'banh-mi-thit':         'ArtBanhMiThit',
  'banh-mi-cha-ca':       'ArtBanhMiChaCa',
  'banh-mi-heo-quay':     'ArtBanhMiHeoQuay',
  'heo-quay':             'ArtHeoQuay',
  'xoi-xeo':              'ArtXoiXeo',
  'xoi-man':              'ArtXoiMan',
  'banh-uot-cha-lua':     'ArtBanhUotChaLua',
  'banh-uot-long-ga':     'ArtBanhUotLongGa',
  'banh-uot-tom-chay':    'ArtBanhUotTomChay',
  'ca-thu-sot-ca':        'ArtCaThuSotCa',
  'ca-nuc-sot-ca':        'ArtCaNucSotCa',
  'bowl':                 'ArtBowl',
  'claypot':              'ArtClaypot',
  'plate':                'ArtPlate',
  'rolls':                'ArtRolls',
};

/** Món chưa có hình vẽ riêng thì suy từ kiểu món. */
export const BY_CATEGORY: Record<string, string> = {
  'Canh':     'bowl',
  'Kho':      'claypot',
  'Xào':      'plate',
  'Nướng':    'plate',
  'Chiên':    'plate',
  'Bánh':     'plate',
  'Bánh mì':  'plate',
  'Cuốn':     'rolls',
  'Gỏi':      'rolls',
  'Hấp':      'bowl',
  'Cơm':      'plate',
  'Món nước': 'bowl',
  'Bún trộn': 'bowl',
  'Lẩu':      'claypot',
  'Cháo':     'bowl',
};

/** Món -> tên hình. Kiểu món lạ thì rơi về 'bowl' cho khỏi vỡ giao diện. */
export function artKind(art: string | undefined, category: string): string {
  return art ?? BY_CATEGORY[category] ?? 'bowl';
}
