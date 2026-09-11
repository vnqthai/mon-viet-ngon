/* Tương tác dùng chung mọi trang: theme, thanh cuộn, hiện dần, toast */

export const store = {
  get(k, fb) {
    try {
      const v = localStorage.getItem(k);
      return v === null ? fb : JSON.parse(v);
    } catch (e) {
      return fb;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  },
  remove(k) {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  },
};

let toastTimer = null;
export function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-show'), 4200);
}

/* ---------- Giao diện 3 trạng thái: theo hệ thống (mặc định) → sáng → tối ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  const LABELS = {
    auto: 'Giao diện: theo hệ thống',
    light: 'Giao diện: sáng',
    dark: 'Giao diện: tối',
  };
  const NEXT = { auto: 'light', light: 'dark', dark: 'auto' };
  const mode = () => root.dataset.theme || 'auto';

  function paintThemeBtn() {
    themeBtn.title = LABELS[mode()] + ' — bấm để đổi';
    themeBtn.setAttribute('aria-label', LABELS[mode()] + ', bấm để đổi');
  }
  themeBtn.addEventListener('click', () => {
    const next = NEXT[mode()];
    if (next === 'auto') {
      delete root.dataset.theme;      // quay về theo hệ điều hành
      store.remove('mvn:theme');
    } else {
      root.dataset.theme = next;
      store.set('mvn:theme', next);
    }
    paintThemeBtn();
  });
  paintThemeBtn();
}

/* ---------- Nút in ---------- */
const printBtn = document.getElementById('printBtn');
if (printBtn) printBtn.addEventListener('click', () => window.print());

/* In: mở hết các mục hỏi-đáp, in xong trả lại như cũ */
let openedForPrint = [];
window.addEventListener('beforeprint', () => {
  openedForPrint = [...document.querySelectorAll('.faq details')].filter((d) => !d.open);
  openedForPrint.forEach((d) => (d.open = true));
});
window.addEventListener('afterprint', () => {
  openedForPrint.forEach((d) => (d.open = false));
  openedForPrint = [];
});

/* ---------- Thanh tiến độ cuộn ---------- */
const scrollBar = document.getElementById('scrollProgress');
if (scrollBar) {
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Hiện dần khi cuộn tới ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-in'));
}

/* ---------- Nút lên đầu trang ---------- */
const toTop = document.getElementById('toTop');
if (toTop) {
  const SHOW_AFTER = 900; // hiện sau khi cuộn qua chừng một màn hình rưỡi
  const sync = () => { toTop.hidden = window.scrollY < SHOW_AFTER; };
  window.addEventListener('scroll', sync, { passive: true });
  sync();
  toTop.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}

/* ---------- Thống kê (Google Analytics 4) — CHỈ sau khi khách bấm "Đồng ý" ----------
   Ngoại lệ duy nhất của luật "Tài sản & bên thứ ba" (ROADMAP phần 4), và có điều
   kiện: chưa bấm Đồng ý thì trang không tải một byte nào từ Google ("basic consent
   mode"). Luật VN 91/2025 + NĐ 356/2025 (hiệu lực 01/01/2026) lẫn GDPR đều đòi xin
   phép TRƯỚC khi đặt cookie thống kê, nên hỏi MỌI khách chứ không riêng EU.
   Lựa chọn lưu localStorage `mvn:consent` = 'yes' | 'no', hỏi đúng một lần; đổi ý
   ở /gioi-thieu/#thong-ke. Chỉ đo trên đúng miền thật — dev, preview và harness đo
   giao diện không bao giờ bắn hit. Ô hỏi (#consent) nằm ở layouts/Base.astro. */
const GA_ID = 'G-DDLS1WV3MC';
const CONSENT_KEY = 'mvn:consent';
const LIVE_HOST = 'www.monvietngon.com';
let gaLoaded = false;

function startAnalytics() {
  if (location.hostname !== LIVE_HOST) return;
  window['ga-disable-' + GA_ID] = false; // gỡ chốt chặn nếu vừa bấm Không rồi đổi ý
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
}

/* Rút lại đồng ý: chặn gtag ngay trên trang này (cờ ga-disable là API chính thức)
   và xoá hai cookie GA4 đã đặt (_ga và _ga_<ID>) — GA đặt ở miền gốc nên xoá cả
   hai dạng miền cho chắc. */
function stopAnalytics() {
  window['ga-disable-' + GA_ID] = true;
  const names = ['_ga', '_ga_' + GA_ID.replace(/^G-/, '')];
  const domains = ['', '; domain=.monvietngon.com', '; domain=' + location.hostname];
  for (const n of names) {
    for (const d of domains) document.cookie = `${n}=; Max-Age=0; path=/${d}`;
  }
}

const consentBar = document.getElementById('consent');
function decideConsent(choice) {
  store.set(CONSENT_KEY, choice);
  if (consentBar) consentBar.hidden = true;
  if (choice === 'yes') startAnalytics();
  else stopAnalytics();
}
document.getElementById('consentYes')?.addEventListener('click', () => decideConsent('yes'));
document.getElementById('consentNo')?.addEventListener('click', () => decideConsent('no'));
/* Nút "Đổi lựa chọn thống kê" ở /gioi-thieu/ — xoá lựa chọn cũ, mở lại dải hỏi */
document.getElementById('consentChange')?.addEventListener('click', () => {
  store.remove(CONSENT_KEY);
  if (consentBar) {
    consentBar.hidden = false;
    consentBar.querySelector('button')?.focus();
  }
});

const consentChoice = store.get(CONSENT_KEY, null);
if (consentChoice === 'yes') startAnalytics();
else if (consentChoice === null && consentBar) consentBar.hidden = false;
