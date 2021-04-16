//
import { calendarEvent } from "./_events.js";

/* Dynamic render of month */
export function renderMonth(year, month) {
    /* Get the first day of month and number of days in month */
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /* Variable declarations for loop */
    let weekDay = firstDay;
    let weekCount = 1;
    let rowCont = 1;
    let whiteClone = document.querySelector('.calendar__month div:first-child').cloneNode(true);
    /* Loop to fill calendar */
    for (let x = 1; x < daysInMonth + 1; x++) {
        /* Fill the calendar divs with day number */
        try { 
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = '<span class="spanDay">' + x + '</span>';
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').setAttribute("id",x);
        }
        catch(err) {
            /* Create the week clone to show in calendar */
            let workClone = whiteClone.cloneNode(true);
            rowCont++;
            workClone.setAttribute("data-row",rowCont);
            document.querySelector('.calendar__month').appendChild(workClone)
            /* Fill the clone for first time */
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = '<span class="spanDay">' + x + '</span>';
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').setAttribute("id",x);
        };
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
    }
    /* Adapts the height of the week rows to the total */
    document.querySelectorAll('.calendar__week').forEach((row)=> {
        row.style.height = 'calc((100% - 25px) / ' + rowCont + ')'
    });
}

/* Render events in the month of parameter */
export function renderEvents(year, month) {
    const d = document;
    let allEvents = calendarEvent.fromLocalStorage();

    if (allEvents) {
    let monthEvents = allEvents.filter ((ev) => new Date(ev["init-date"]).getFullYear() === year && new Date(ev["init-date"]).getMonth() === month);

    /* Create the events in calendar and set its HTML attributes */
    monthEvents.forEach(function (monthEvents){
        if(d.querySelector(`[data-eventid="event${monthEvents.id}"]`)) {
            d.querySelector(`[data-eventid="event${monthEvents.id}"]`).remove()
        }
        let eventDiv = document.createElement("div");
        eventDiv.setAttribute("data-eventid","event" + monthEvents.id);
        eventDiv.setAttribute("class","event event__type--" + monthEvents["select-event"]);
        eventDiv.innerHTML = monthEvents.title;
        if (!d.querySelector(`[data-eventid="event${monthEvents.id}"]`)) {
            d.getElementById(new Date(monthEvents["init-date"]).getDate()).appendChild(eventDiv);
        }
    });
}
}

/* Update month and year to use normally */
export function updateDate(year,month) {
    if (month === 12) {
        year++;
    } else if (month===-1){
        year--;
    }
    month+=12;
    month%=12;
    return {year : year,month : month};
}

/* Add year and month in the calendar nav bar */
export function addTag(year, month) {
    let monthTag = document.getElementById('nav__tag');
    let yearTag = document.getElementById('nav__year');
    let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    monthTag.innerHTML = monthList[month];
    yearTag.innerHTML = year;
}

/* Give a class to today to highlight */
export function highlightToday(year, month){
    let date = new Date();
    if (year === date.getFullYear() && month===date.getMonth()) {
        document.getElementById((new Date()).getDate()).className += 'today';
        document.getElementById((new Date()).getDate()).childNodes[0].innerHTML = date.getDate();
    }
}