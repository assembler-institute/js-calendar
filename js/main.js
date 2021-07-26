import { navigate } from "./router.js";
import { setNewEvents, setPreSaved } from "./events.js";
import { setCounter } from "./functions.js";
import { setMonth } from "./views/month.js";

var wrapper = document.getElementById("calendar");

function start() {
	location.hash = "";
	setPreSaved();
	setNewEvents();
	setCounter();
	setMonth();
	navigate();
}

start();

window.addEventListener("hashchange", navigate);

export { wrapper, start };
