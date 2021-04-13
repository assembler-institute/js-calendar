//
import * as render from "./_month_render.js";
import { swapTemplate } from "./_templates.js";
import { handleDocumentEvents } from "./_handlers.js";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const d = document;

/* Initialize calendar */
showCalendar(currentYear, currentMonth);

function showCalendar(year, month) {
  swapTemplate("month", "calendar");
  render.addTag(year, month);
  render.renderMonth(year, month);
  render.highlightToday(year, month);
  // Listeners
  handleDocumentEvents();
  /*
   * call function to add events to the month here
   */
}
