const chatForm = document.getElementById('chatForm');
const messages = document.getElementById('messages');
const input = document.getElementById('messageInput');

function appendMessage(text, who = 'bot') {
  const el = document.createElement('div');
  el.className = 'msg ' + (who === 'user' ? 'user' : 'bot');
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

const canned = [
  "I hear you — that sounds really tough right now.",
  "Take a deep breath with me: in...2...3... out...2...3.",
  "It's okay to feel this way. Small steps are still progress.",
  "Would you like a grounding exercise or a calm breathing prompt?",
  "I'm here. Tell me more if you want to.",
];

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  input.value = '';
  // placeholder "thinking" indicator
  const thinking = document.createElement('div');
  thinking.className = 'msg bot';
  thinking.textContent = 'Cura is typing...';
  messages.appendChild(thinking);
  messages.scrollTop = messages.scrollHeight;
  setTimeout(() => {
    thinking.remove();
    const resp = canned[Math.floor(Math.random() * canned.length)];
    appendMessage(resp, 'bot');
  }, 800 + Math.random() * 900);
});

// welcome
appendMessage("Hi — I'm Cura. If you want to share how you're feeling today, I'm listening.");