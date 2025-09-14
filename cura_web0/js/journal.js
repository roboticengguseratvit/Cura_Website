const form = document.getElementById('journalForm');
const entryList = document.getElementById('entryList');

function loadEntries() {
  const raw = localStorage.getItem('cura_journal');
  return raw ? JSON.parse(raw) : [];
}

function saveEntries(list) {
  localStorage.setItem('cura_journal', JSON.stringify(list));
}

function render() {
  const entries = loadEntries();
  entryList.innerHTML = '';
  if (entries.length === 0) {
    entryList.innerHTML = '<p class="muted">No entries yet.</p>';
    return;
  }
  entries.slice().reverse().forEach(e => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <div class="muted">${new Date(e.date).toLocaleString()}</div>
      <p>${escapeHtml(e.text)}</p>
      <div class="muted">Mood: ${escapeHtml(e.mood)}</div>
    `;
    entryList.appendChild(div);
  });
}

function escapeHtml(s) {
  return s.replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;');
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const text = document.getElementById('entry').value.trim();
  const mood = document.getElementById('mood').value;
  if (!text) return;
  const list = loadEntries();
  list.push({ text, mood, date: new Date().toISOString() });
  saveEntries(list);
  form.reset();
  render();
});

render();