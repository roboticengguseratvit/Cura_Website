const contactForm = document.getElementById('contactForm');
const status = document.getElementById('contactStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    status.textContent = 'Please fill all fields.';
    return;
  }
  // placeholder: no backend — just show success and clear
  status.textContent = 'Thanks — your message has been noted locally. (No backend in this prototype.)';
  contactForm.reset();
  setTimeout(() => status.textContent = '', 6000);
});