const form = document.querySelector<HTMLFormElement>('#trip-search')!;
const from = document.querySelector<HTMLSelectElement>('#from')!;
const to = document.querySelector<HTMLSelectElement>('#to')!;
const date = document.querySelector<HTMLInputElement>('#travel-date')!;
const cards = [...document.querySelectorAll<HTMLElement>('.route-card')];
const error = document.querySelector<HTMLElement>('#search-error')!;
const summary = document.querySelector<HTMLElement>('#result-summary')!;
const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Yekaterinburg', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
const part = (type: string) => parts.find(p => p.type === type)!.value;
const today = `${part('year')}-${part('month')}-${part('day')}`;
date.min = today;
date.value = today;

function dateLabel(value: string) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}

function render(scroll = false) {
  error.hidden = true;
  if (from.value && from.value === to.value) {
    error.textContent = 'Выберите разные города отправления и назначения.';
    error.hidden = false;
    to.focus();
    return;
  }
  date.min = today;
  if (!date.validity.valid || !date.value || date.value < today) {
    error.textContent = 'Выберите сегодняшнюю или будущую дату поездки.';
    error.hidden = false;
    date.focus();
    return;
  }
  let count = 0;
  cards.forEach(card => {
    const matches = (!from.value || card.dataset.from === from.value) && (!to.value || card.dataset.to === to.value);
    card.hidden = !matches;
    if (matches) count++;
  });
  const journey = `${from.value || 'Любой город'} → ${to.value || 'Все направления'}`;
  summary.textContent = `${journey}. План поездки на ${dateLabel(date.value)}. Направлений: ${count}.`;
  document.querySelector<HTMLElement>('#empty-state')!.hidden = count > 0;
  const context = document.querySelector<HTMLElement>('#call-context')!;
  context.hidden = !(from.value && to.value);
  document.querySelector<HTMLElement>('#call-context-text')!.textContent = `${journey}, ${dateLabel(date.value)}. Назовите удобное время и количество пассажиров.`;
  document.querySelectorAll<HTMLButtonElement>('[data-destination]').forEach(button => button.setAttribute('aria-pressed', String(from.value === 'Сибай' && to.value === button.dataset.destination)));
  const url = new URL(location.href);
  for (const [key, value] of [['from', from.value], ['to', to.value], ['date', date.value]]) {
    if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
  }
  history.replaceState(null, '', url);
  if (scroll) document.querySelector('#schedule')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

// Unknown URL values are ignored; all displayed strings use textContent.
const query = new URLSearchParams(location.search);
for (const [name, select] of [['from', from], ['to', to]] as const) {
  const value = query.get(name);
  if (value !== null && [...select.options].some(option => option.value === value)) select.value = value;
}
const requestedDate = query.get('date');
if (requestedDate && /^\d{4}-\d{2}-\d{2}$/.test(requestedDate) && requestedDate >= today) {
  date.value = requestedDate;
  if (!date.value || !date.validity.valid) date.value = today;
}
if (from.value && from.value === to.value) to.value = '';
render();
form.addEventListener('submit', event => { event.preventDefault(); render(true); });
document.querySelector('#swap')!.addEventListener('click', () => { [from.value, to.value] = [to.value, from.value]; render(); });
document.querySelector('#show-all')!.addEventListener('click', () => { from.value = ''; to.value = ''; render(); });
document.querySelectorAll<HTMLButtonElement>('[data-destination]').forEach(button => button.addEventListener('click', () => { from.value = 'Сибай'; to.value = button.dataset.destination!; render(); }));

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const menu = document.querySelector<HTMLElement>('#mobile-nav')!;
function closeMenu() { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Открыть меню'); }
menuButton.addEventListener('click', () => {
  const open = menu.hidden;
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
