addCero = function (num) {
  return (num < 10 ? '0' : '') + num;
};

// STORAGE
function saveStorage(key, el) {
  localStorage.setItem(key, JSON.stringify(el));
}
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function removeStorage(key) {
  localStorage.removeItem(key);
}
function reloadEvents(event) {
  allEvents.push(event);
}
function reloadReminderEvents(event) {
  reminders.push(event);
}

// UTIL
function arrayRemove(arr, id) {
  return arr.filter(event => {
    return event.id !== id;
  });
}
function getEmptyDaysInMonth(year, month, day, lang) {
  const date = new Date(year, month, day);
  const dateStr = date.toLocaleDateString(lang, {
    weekday: "long",
  });
  return weekDays.indexOf(dateStr);
}
function changeStyles(action, element, nav) {
  if (action === 'on') {
    document.getElementById(nav).style.opacity = '1';
    document.getElementById(nav).style.height = 'auto';
    document.getElementById(nav).style.lineHeight = 'inherit';
    document.getElementById(nav).style.overflow = 'visible';
  } else {
    element.style.opacity = '0';
    element.style.height = '0';
    element.style.lineHeight = '0';
    element.style.overflow = 'hidden';
  }
}
function setVisibility(action, element) {
  element.style.visibility = action;
}

// DATETIME

// impresión de fecha en pantalla
function getStrDisplayDate(date, lang) {
  return Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(date);
}
// impresión en pantalla
function getStrDisplayDateTime(date, lang) {
  options = {
  weekday: 'long',
  year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
  hour12: false,
};
  return Intl.DateTimeFormat(lang, options).format(date);
}
// Extraer horas y minutos a partir inputs "time"
function extractTime(time) {
  if (time) {
    const data = time.split(':');
    const hours = data[0];
    const minutes = data[1];
    return { hours, minutes };
  } else {
    return { hours: "21", minutes: "30" }
  }
}
// 14:56 extraer horas y minutos ahora
function getTimeNow() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return { hours, minutes };
}
// Configurar valores de formulario al abrir modal  -> initModalCreation
function getFormValues(date) {

  const strDate = date.getFullYear() +
    '-' + addCero(date.getMonth() + 1) +
    '-' + addCero(date.getDate());
  const strTimeInit = addCero(date.getHours()) +
    ':' + addCero(date.getMinutes());
  const strTimeEnd = addCero(date.getHours() + 2) +
    ':' + addCero(date.getMinutes());

  return { strDate, strTimeInit, strTimeEnd };
}
// Crear fecha a partir de los valores del formulario -> addEvent
function setDateFormValues(date, { hours, minutes }) {
  const dateOnly = new Date(date);
  return new Date(dateOnly.getFullYear(), dateOnly.getMonth(), dateOnly.getDate(), hours, minutes);
}
// Crear string de fecha para guardar en JSON
function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function (num) {
      return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    dif + pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' + pad(Math.abs(tzo) % 60);
}
// Crear string de hora con zeros a partir de un string de fecha
function getFullTimeFromString(str) {
  const date = new Date(str);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${addCero(hour)}:${addCero(minute)}`;
}
