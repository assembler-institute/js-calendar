import updateCalendar from "../views/updateCalendar.js";

export default function updateCalendarEvent() {
	document.addEventListener("click", (e) => {
		if (e.target.matches("[data-action~='update-calendar']")) {
			const calendarDate = new Date(sessionStorage.calendarYear, sessionStorage.calendarMonth);

			if (e.target.matches("[data-action~='add-month']")) calendarDate.setMonth(calendarDate.getMonth() + 1);
			if (e.target.matches("[data-action~='sub-month']")) calendarDate.setMonth(calendarDate.getMonth() - 1);

			sessionStorage.calendarYear = calendarDate.getFullYear();
			sessionStorage.calendarMonth = calendarDate.getMonth() + 1;

			updateCalendar(sessionStorage.calendarYear, sessionStorage.calendarMonth);
		}
	});
}