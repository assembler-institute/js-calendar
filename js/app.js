import calendarEventFormDisplayListener from "./events/calendarEventFormDisplayListener.js";
import calendarEventFormCloseListener from "./events/calendarEventFormCloseListener.js";
import updateCalendarEvent from "./events/updateCalendarEvent.js";

import updateCalendar from "./views/updateCalendar.js";
import asideEventsDisplayListener from "./events/asideEventsDisplayListener.js";

asideEventsDisplayListener();
calendarEventFormDisplayListener();
calendarEventFormCloseListener();
updateCalendarEvent();

/* Inicialización testing */

sessionStorage.calendarDateISO = new Date().toISOString();

console.log(new Date(sessionStorage.calendarDateISO).getFullYear());
console.log(new Date(sessionStorage.calendarDateISO).getMonth() + 1);

updateCalendar(new Date(sessionStorage.calendarDateISO).getFullYear(), new Date(sessionStorage.calendarDateISO).getMonth() + 1);
