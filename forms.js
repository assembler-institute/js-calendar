const checkboxEndDate = document.querySelector("#existEndDate");
const checkboxExpiration = document.querySelector("#expiration");
const containerPreviousTime = document.querySelector("#previousTime");
const containerEndDate = document.querySelector("#showEndDate");
const initDate = document.querySelector("#initDate");
const initTime = document.querySelector("#initTime");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const type = document.querySelector("#type");
const endDate = document.querySelector("#endDate");
const endTime = document.querySelector("#endTime");
const time = document.querySelector("#time");
const containerExpiration = document.querySelector("#showExpiration");

function initForm() {
  checkboxEndDate.addEventListener("change", showEndDate);
  checkboxExpiration.addEventListener("change", showPreviousTime);
  form.addEventListener("submit", addEvent);
  formEvent.addEventListener("submit", removeEvent);
}

const showEndDate = () => {
  if (checkboxEndDate.checked) {
    containerEndDate.classList.add(isVisible);
    containerExpiration.classList.add(isVisible);
    checkboxExpiration.checked = true;
    containerPreviousTime.classList.add(isVisible);
    endDate.required = true;
    endTime.required = true;
    time.required = true;

  } else {
    containerEndDate.classList.remove(isVisible);
    containerExpiration.classList.remove(isVisible);
    endDate.required = false;
    endTime.required = false;
    time.required = false;
  }
};

function hideEndDateAndRemind() {
  containerEndDate.classList.remove(isVisible);
  containerExpiration.classList.remove(isVisible);
  checkboxEndDate.checked = false;
  checkboxExpiration.checked = false;
  endDate.required = false;
  endTime.required = false;
  time.required = false;
}

function setDatesInForm(date, timeInit, timeEnd) {
  initDate.value = date;
  initTime.value = timeInit;
  endDate.value = date;
  endTime.value = timeEnd;
  title.value = '';
  description.value = '';
  type.value = '';
}

function setEventData(event) {
  document.querySelector("#titleEvent").textContent = event.title;
  document.querySelector("#startDate").textContent = getStrDisplayDateTime(new Date(event.initDate), userLang);
  document.querySelector("#finalDate").textContent = getStrDisplayDateTime(new Date(event.endDate), userLang);
  document.querySelector("#descriptionEvent").textContent = event.description ? event.description : "Not Selected";
  document.querySelector("#timeEvent").textContent = event.time ? event.time + " minutes" : "Not Selected";
  document.querySelector("#typeEvent").textContent = event.type ? event.type : "Not Selected";
  document.querySelector("#typeEvent").style.textTransform = "capitalize";
  document.querySelector("#initEventDate").value = toIsoString(new Date(event.initDate));
  document.querySelector("#endEventDate").value = toIsoString(new Date(event.endDate));
  document.querySelector("#idEvent").value = event.id;
}

const showPreviousTime = () => {
  if (checkboxExpiration.checked) {
    containerPreviousTime.classList.add(isVisible);
    time.required = true;

  } else {
    containerPreviousTime.classList.remove(isVisible);
    time.required = false;
    time.value = '';
  }
};