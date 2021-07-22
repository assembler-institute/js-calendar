import displayAsideEvents from "../views/displayAsideEvents.js";

export default function asideEventsDisplayListener() {
	document.addEventListener("click", (e) => {
		if (e.target.matches("[data-action='display-event-list']")) displayAsideEvents(e.target.dataset.day);
	});
}