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

/* ---------- Giao diện sáng / tối ---------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current =
      root.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('mvn:theme', next);
  });
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
