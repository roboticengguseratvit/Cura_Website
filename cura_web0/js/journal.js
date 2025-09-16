const form = document.getElementById('journalForm');
const entryList = document.getElementById('entryList');

const moodLabels = ['Depressed', 'Sad', 'Neutral', 'Happy', 'Excited'];

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
      <div style="font-size:0.98rem;color:#333;">
        <strong>${formatDateTime(e.date)}</strong>
      </div>
      <div style="margin-bottom:4px;">
        <span style="color:#7fb3c8;"><strong>Mood:</strong> ${moodLabels[e.mood]}</span>
        <span style="margin-left:12px;color:#c06;"><strong>Day Rating:</strong> ${e.rating}/10</span>
      </div>
      <div>${escapeHtml(e.text)}</div>
    `;
    entryList.appendChild(div);
  });
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
}

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  // Format: DD Month YYYY, HH:mm
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const date = d.toLocaleDateString(undefined, options);
  const time = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
}

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const text = document.getElementById('entry').value.trim();
  const mood = parseInt(document.getElementById('moodometer').value, 10);
  const rating = document.getElementById('rating') ? parseInt(document.getElementById('rating').value, 10) : 5;
  if (!text) return;
  const list = loadEntries();
  list.push({
    text,
    mood,
    rating,
    date: new Date().toISOString()
  });
  saveEntries(list);
  form.reset();
  // Reset sliders to default values
  document.getElementById('moodometer').value = 2;
  if (document.getElementById('rating')) document.getElementById('rating').value = 5;
  render();
});

render();