const intro = document.getElementById('intro');
const introOpen = intro?.querySelector('.intro-open');

function openInvitation() {
  if (!intro || intro.classList.contains('is-open')) return;
  intro.classList.add('is-open');
  document.body.classList.remove('intro-locked');
  document.body.classList.add('revealed'); // triggers the hero fly-in animations
  intro.addEventListener('transitionend', (event) => {
    if (event.target === intro && event.propertyName === 'opacity') {
      intro.hidden = true;
    }
  });
}

introOpen?.addEventListener('click', openInvitation);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const form = document.querySelector('.rsvp-form');
const message = document.querySelector('.form-message');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = new FormData(form).get('name');
  message.textContent = `Thank you, ${name}! Your RSVP has been received.`;
  form.reset();
});
