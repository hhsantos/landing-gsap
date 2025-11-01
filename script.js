const body = document.body;
const buttons = document.querySelectorAll('[data-scroll]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.scroll;
    const target = document.getElementById(id);

    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 60 },
        ease: 'power3.inOut',
      });
    }
  });
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.set('.hero__orb', { scale: 0.8, opacity: 0 });
gsap.to('.hero__orb', {
  scale: 1,
  opacity: 1,
  duration: 2.4,
  ease: 'elastic.out(1, 0.8)',
});

gsap.from('.hero__content > *', {
  y: 40,
  opacity: 0,
  stagger: 0.12,
  delay: 0.3,
  duration: 1,
  ease: 'power3.out',
});

gsap.utils.toArray('.section').forEach((section, index) => {
  const elements = section.querySelectorAll('.section__header, .card, .project-card, .about p');

  gsap.from(elements, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
  });

  if (section.classList.contains('section--dark')) {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
        end: 'bottom 20%',
        scrub: true,
      },
      backgroundPosition: '50% 20%',
      ease: 'none',
    });
  }
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
  const overlay = card.querySelector('.project-card__overlay');

  card.addEventListener('mouseenter', () => {
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
    gsap.to(card, {
      scale: 1.03,
      duration: 0.6,
      ease: 'power2.out',
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
    gsap.to(card, {
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    });
  });
});

gsap.to(body, {
  backgroundPosition: '80% 20%',
  ease: 'none',
  scrollTrigger: {
    trigger: 'main',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  },
});

if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  document.body.appendChild(cursor);
  gsap.set(cursor, { autoAlpha: 0, scale: 0.8 });

  window.addEventListener('pointermove', (event) => {
    gsap.to(cursor, {
      x: event.clientX - 40,
      y: event.clientY - 40,
      autoAlpha: 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  });
}
