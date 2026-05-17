// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// ── Mobile Nav Toggle ──
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ── Contact Form ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    const status = document.getElementById('formStatus');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch('https://portfolio-website-dqza.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          message: document.getElementById('message').value
        })
      });
      if (res.ok) {
        status.className = 'form-status success';
        status.textContent = '✦ Message sent! I\'ll get back to you soon.';
        e.target.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.className = 'form-status error';
      status.textContent = 'Something went wrong. Email me directly at fatimanoor.se22@gmail.com';
    }
    btn.textContent = 'Send Message ✦';
    btn.disabled = false;
  });
}