const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

const setHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 36);
};

setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

const plans = {
  santai: [
    ['Jalan santai di tepi pantai', 'Nikmati udara pagi saat pantai masih sejuk dan tenang.'],
    ['Berteduh & foto bersama', 'Cari tempat nyaman di bawah kelapa untuk rehat sejenak.'],
    ['Kuliner pesisir', 'Cicipi seafood dan minuman khas Tuban di area kuliner.'],
    ['Menutup hari di dermaga', 'Nikmati angin sore dan panorama laut sebelum pulang.'],
  ],
  keluarga: [
    ['Main pasir bersama', 'Awali hari saat matahari belum terlalu terik.'],
    ['Kolam renang & wahana anak', 'Pilih aktivitas sesuai usia dan selalu dampingi si kecil.'],
    ['Makan siang keluarga', 'Istirahat di area kuliner yang nyaman dan teduh.'],
    ['Foto keluarga di dermaga', 'Abadikan momen sebelum meninggalkan pantai.'],
  ],
  seru: [
    ['Pemanasan di garis pantai', 'Nikmati pagi sambil menentukan wahana yang ingin dicoba.'],
    ['ATV atau flying fox', 'Pacu adrenalin dengan pilihan aktivitas yang tersedia.'],
    ['Isi energi dengan seafood', 'Berhenti sejenak untuk makan dan minum khas lokal.'],
    ['Lanjut camping', 'Dengan reservasi, tutup hari di camping ground tepi laut.'],
  ],
};

document.querySelectorAll('[data-mood]').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedPlan = plans[button.dataset.mood];
    if (!selectedPlan) return;

    document.querySelectorAll('[data-mood]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    selectedPlan.forEach(([title, copy], index) => {
      const titleNode = document.querySelector(`[data-plan-title="${index}"]`);
      const copyNode = document.querySelector(`[data-plan-copy="${index}"]`);
      const row = titleNode?.closest('li');
      if (titleNode) titleNode.textContent = title;
      if (copyNode) copyNode.textContent = copy;
      row?.classList.remove('plan-updated');
      requestAnimationFrame(() => row?.classList.add('plan-updated'));
    });
  });
});

document.querySelectorAll('[data-accordion] button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const panel = item?.querySelector('.accordion-panel');
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('[data-accordion] .accordion-item').forEach((otherItem) => {
      otherItem.classList.remove('open');
      const otherButton = otherItem.querySelector('button');
      const otherPanel = otherItem.querySelector('.accordion-panel');
      otherButton?.setAttribute('aria-expanded', 'false');
      if (otherPanel) otherPanel.hidden = true;
    });

    if (!isOpen && item && panel) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));

const yearNode = document.querySelector('[data-year]');
if (yearNode) yearNode.textContent = new Date().getFullYear();
