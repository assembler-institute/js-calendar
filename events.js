let reminders = [];
let allEvents = [];

function loadEvents() {
  allEvents = getStorage("events") ? getStorage("events") : [];
  allEvents.forEach((event) => {
    event.remind ? reminders.push({
      id: event.id,
      title: event.title,
      initDate: event.initDate,
      endDate: event.endDate,
      time: event.time,
      description: event.description,
      type: event.type,
      remind: event.remind,
      finished: event.finished,
    }) : null;
    chooseDateEventAndPaint(event);
  });
}

const addEvent = (e) => {
  e.preventDefault();
  const monthEvent = new Date(initDate.value).getMonth();
  if (monthEvent === navigator) {
    const startDate = setDateFormValues(initDate.value, extractTime(initTime.value));
    const finalDate = setDateFormValues(endDate.value, extractTime(endTime.value));
    if (finalDate.getMonth() - startDate.getMonth() <= 1) {
      if (startDate < finalDate) {
        if (startDate.getTime() + 600000 > new Date().getTime()) {
          const event = createEvent(startDate, finalDate);
          time.value && reloadReminderEvents(event);
          reloadEvents(event);
          saveStorage("events", allEvents);
          chooseDateEventAndPaint(event);
          initModalEvent();
          form.reset();
          document.querySelector("#addModal.is-visible").classList.remove(isVisible);
          document.body.style.overflow = "auto";
        } else openError(1);
      } else openError(2);
    } else openError(3);
  } else openError(4);
}

function createEvent(startDate, finalDate) {
  const event = {
    id: `id_${Date.now()}`,
    title: title.value,
    initDate: toIsoString(startDate),
    endDate: toIsoString(finalDate),
    time: time.value ? time.value : "",
    description: description.value ? description.value : "",
    type: type.value ? type.value : "",
    remind: time.value ? true : undefined,
    finished: false
  }
  return event;
}

function chooseDateEventAndPaint(event) {
  const month = new Date(event.initDate).getMonth();
  const monthEnd = new Date(event.endDate).getMonth();
  const { totalDays, daysInMonth1 } = getDaysOfEvent(event.initDate, event.endDate);
  totalDays.forEach((day, i) => {
    let daySquare;
    if (monthEnd - month > 0) {
      if (i <= daysInMonth1) {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
      } else {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${monthEnd}"]`);
      }
    } else {
      daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
    }
    if (totalDays.length === 1) paintEvent(event, daySquare, true, true);
    else {
      if (i === 0) paintEvent(event, daySquare, true, false);
      else if (i === totalDays.length - 1) paintEvent(event, daySquare, false, true);
      else paintEvent(event, daySquare);
    }
  });
}

function paintEvent(event, daySquare, paintInit, paintEnd) {
  const newDomEvent = document.createElement("div");
  const strTimeInit = getFullTimeFromString(event.initDate);
  const strTimeEnd = getFullTimeFromString(event.endDate);
  newDomEvent.innerHTML = `<p event-id=${event.id}>${event.title}<p/>`;
  newDomEvent.innerHTML += `<p event-id=${event.id}>${paintInit ? strTimeInit : ''}${paintInit && paintEnd ? ' - ' : ''}${paintEnd ? strTimeEnd : ''}</p>`;
  newDomEvent.innerHTML += `<p event-id=${event.id}>${paintInit || paintEnd ? event.type : ''}</p>`;
  newDomEvent.innerHTML += `<p event-id=${event.id}>${paintInit ? event.description : ''}</p>`;
  newDomEvent.classList.add("day-event");
  newDomEvent.setAttribute('event-id', event.id);
  newDomEvent.addEventListener("click", (e) => openEvent(e));
  newDomEvent.setAttribute('data-open', 'eventModal');

  if (event.remind === false) newDomEvent.style.backgroundColor = 'orange';
  if (event.finished) newDomEvent.style.backgroundColor = 'rgb(203 55 55)';

  daySquare.append(newDomEvent);
}

const removeEvent = (e) => {
  e.preventDefault();
  allEvents = arrayRemove(allEvents, idEvent.value);
  removeStorage("events");
  saveStorage("events", allEvents);

  const month = new Date(initEventDate.value).getMonth();
  const monthEnd = new Date(endEventDate.value).getMonth();
  const { totalDays, daysInMonth1 } = getDaysOfEvent(initEventDate.value, endEventDate.value);

  totalDays.forEach((day, i) => {
    let daySquare;
    if (monthEnd - month > 0) {
      if (i <= daysInMonth1) {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
      } else {
        daySquare = document.querySelector(`div[data-day="${day}"][data-month="${monthEnd}"]`);
      }
    } else {
      daySquare = document.querySelector(`div[data-day="${day}"][data-month="${month}"]`);
    }
    Array.from(daySquare.children).forEach(el => {
      if (idEvent.value === el.getAttribute("event-id")) el.remove();
    });
  });
  document.querySelector("#eventModal.is-visible").classList.remove(isVisible);
  document.body.style.overflow = 'auto';
}

function getDaysOfEvent(initDate, endDate) {
  const dateStart = new Date(initDate);
  const dateFinal = new Date(endDate);;
  const year = dateStart.getFullYear();
  const dayInit = dateStart.getDate();
  const dayFinal = dateFinal.getDate();
  const monthInit = dateStart.getMonth();
  const monthEnd = dateFinal.getMonth();
  let totalDays = [];

  if (monthEnd - monthInit > 0) {
    const daysInMonth = new Date(year, monthInit, 0).getDate();
    const daysInMonth1 = (daysInMonth - dayInit);
    const daysInMonth2 = dayFinal;
    const numberDays = daysInMonth1 + daysInMonth2;
    for (let i = 0; i <= numberDays; i++) {
      if (i <= daysInMonth1) totalDays.push(i + dayInit);
    }
    for (let x = 1; x <= (numberDays - daysInMonth1); x++) {
      totalDays.push(x);
    }
    const objectToReturn = {
      totalDays: totalDays,
      daysInMonth1: daysInMonth1,
    }
    return objectToReturn;

  } else {
    const numberDays = dayFinal - dayInit;
    for (let i = 0; i <= numberDays; i++) {
      totalDays.push(i + dayInit);
    }
    return { totalDays: totalDays };
  }
}

function disableEvent(task) {
  openAlert(task, "end");
  removeStorage("events");
  allEvents.find(event => event.id === task.id).finished = true;
  saveStorage("events", allEvents);
  setTimeout(() => {
    if (document.querySelector("#endAlert.is-visible")) {
      document.querySelector("#endAlert.is-visible").classList.remove(isVisible);
    }
  }, 5000);
}

function remindEvent(task) {
  openAlert(task, "remind");
  removeStorage("events");
  allEvents.find(event => event.id === task.id).remind = false;
  saveStorage("events", allEvents);
  setTimeout(() => {
    if (document.querySelector("#remindAlert.is-visible")) {
      document.querySelector("#remindAlert.is-visible").classList.remove(isVisible);
    }
  }, 5000);
}