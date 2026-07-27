/* Tương tác trang món ăn: khẩu phần, giỏ đi chợ, tiến độ bước, đếm giờ.
   Trạng thái lưu localStorage theo từng món: mvn:<slug>:servings|ing|steps */
import { store, showToast } from './site.js';
import { fmtQty } from '../utils/qty.ts';

const rootEl = document.getElementById('recipe-root');
if (rootEl) {
  const slug = rootEl.dataset.slug;
  const baseServings = parseInt(rootEl.dataset.servingsBase, 10) || 4;
  const servingsUnit = 'người';
  const key = (part) => `mvn:${slug}:${part}`;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  /* ---------- Khẩu phần & định lượng ---------- */
  let servings = store.get(key('servings'), baseServings);

  function renderServings() {
    const servNum = $('#servNum');
    if (servNum) servNum.textContent = `${servings} ${servingsUnit}`;
    const meta = $('#metaServings');
    if (meta) meta.textContent = `${servings} ${servingsUnit} ăn`;
    const k = servings / baseServings;
    $$('[data-base]').forEach((el) => {
      el.textContent = fmtQty(
        parseFloat(el.dataset.base),
        el.dataset.unit,
        Boolean(el.dataset.frac),
        k
      );
    });
    store.set(key('servings'), servings);
  }
  const down = $('#servDown');
  const up = $('#servUp');
  if (down) down.addEventListener('click', () => { if (servings > 2) { servings -= 2; renderServings(); } });
  if (up) up.addEventListener('click', () => { if (servings < 12) { servings += 2; renderServings(); } });
  renderServings();

  /* ---------- Giỏ đi chợ ---------- */
  const ingBoxes = $$('.ing input[type=checkbox]');
  const savedIng = store.get(key('ing'), []);
  ingBoxes.forEach((box) => { if (savedIng.includes(box.id)) box.checked = true; });
  function renderMarket() {
    const done = ingBoxes.filter((b) => b.checked).length;
    const count = $('#marketCount');
    const fill = $('#marketFill');
    if (count) count.textContent = `${done}/${ingBoxes.length} món`;
    if (fill) fill.style.width = (done / ingBoxes.length) * 100 + '%';
    store.set(key('ing'), ingBoxes.filter((b) => b.checked).map((b) => b.id));
    if (done === ingBoxes.length && done > 0) showToast('Giỏ đầy đủ hết rồi — vô bếp thôi!');
  }
  ingBoxes.forEach((box) => box.addEventListener('change', renderMarket));
  if (ingBoxes.length) renderMarket();

  /* ---------- Tiến độ các bước ---------- */
  const stepBoxes = $$('[data-step-check]');
  const savedSteps = store.get(key('steps'), []);
  stepBoxes.forEach((box, i) => {
    if (savedSteps.includes(i)) {
      box.checked = true;
      box.closest('.step').classList.add('is-done');
    }
  });
  let celebrated = false;
  function renderSteps() {
    let done = 0;
    stepBoxes.forEach((box) => {
      box.closest('.step').classList.toggle('is-done', box.checked);
      if (box.checked) done++;
    });
    const count = $('#stepsCount');
    const fill = $('#stepsFill');
    if (count) count.textContent = `${done}/${stepBoxes.length} bước`;
    if (fill) fill.style.width = (done / stepBoxes.length) * 100 + '%';
    store.set(
      key('steps'),
      stepBoxes.map((b, i) => (b.checked ? i : -1)).filter((i) => i >= 0)
    );
    if (done === stepBoxes.length && done > 0 && !celebrated) {
      celebrated = true;
      showToast('Xong rồi! Chúc cả nhà ngon miệng!');
    }
    if (done < stepBoxes.length) celebrated = false;
  }
  stepBoxes.forEach((box) => box.addEventListener('change', renderSteps));
  if (stepBoxes.length) renderSteps();

  /* ---------- Chuông báo (WebAudio) ---------- */
  function ring() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      [0, 0.25, 0.5].forEach((t, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = i % 2 === 0 ? 880 : 660;
        gain.gain.setValueAtTime(0.001, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.22);
      });
    } catch (e) {}
  }

  /* ---------- Đồng hồ đếm giờ ---------- */
  const two = (n) => (n < 10 ? '0' + n : String(n));
  $$('.timer-btn').forEach((btn) => {
    const total = parseInt(btn.dataset.secs, 10);
    let left = total;
    let ticking = null;
    const labelEl = btn.querySelector('span');
    const resetBtn = btn.parentElement.querySelector('.timer-reset');

    function paint() {
      labelEl.textContent =
        two(Math.floor(left / 60)) + ':' + two(left % 60) + (ticking ? '' : ' (tạm dừng)');
    }
    function stopTick() {
      clearInterval(ticking);
      ticking = null;
    }
    function finish() {
      stopTick();
      btn.classList.remove('is-running');
      btn.classList.add('is-done-timer');
      labelEl.textContent = 'Hết giờ!';
      ring();
      showToast(btn.dataset.step || 'Hết giờ rồi!');
    }
    function reset() {
      stopTick();
      left = total;
      btn.classList.remove('is-running', 'is-done-timer');
      labelEl.textContent = btn.dataset.label;
      resetBtn.classList.remove('is-visible');
    }
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-done-timer')) { reset(); return; }
      if (ticking) { stopTick(); paint(); return; }
      btn.classList.add('is-running');
      resetBtn.classList.add('is-visible');
      ticking = setInterval(() => {
        left--;
        if (left <= 0) finish();
        else paint();
      }, 1000);
      paint();
    });
    resetBtn.addEventListener('click', reset);
  });
}
