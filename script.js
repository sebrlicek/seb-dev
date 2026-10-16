const menu = document.querySelector('#menu');
const links = document.querySelector('#nav-links');
const navWrap = document.querySelector('.nav-wrap');
const modal = document.querySelector('#contact-modal');
const form = document.querySelector('#contact-form');
let lastFocusedElement = null;

const closeMenu = () => {
  links.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
};

const openModal = () => {
  lastFocusedElement = document.activeElement;
  closeMenu();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-lock');
  modal.querySelector('input').focus();
};

const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-lock');
  if (lastFocusedElement) lastFocusedElement.focus();
};

menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.querySelectorAll('[data-open-contact]').forEach(button => button.addEventListener('click', openModal));
document.querySelectorAll('[data-close-contact]').forEach(button => button.addEventListener('click', closeModal));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const body = `Jméno a příjmení: ${data.get('name')}\nTelefonní číslo: ${data.get('phone')}\nE-mail: ${data.get('email')}\n\nZpráva:\n${data.get('message')}`;
  window.location.href = `mailto:petr.sebrle@sebrlicek.cz?subject=${encodeURIComponent('Zpráva z webu sebrlicek.cz')}&body=${encodeURIComponent(body)}`;
  closeModal();
  form.reset();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const updateNav = () => navWrap.classList.toggle('scrolled', window.scrollY > 24);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}
