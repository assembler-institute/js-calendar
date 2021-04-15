function displayEventsInMonth(currentMonthDisplay, eventsCalendar){
    for (date in eventsCalendar){
        if(currentMonthDisplay == date.split("/")[1] && year == date.split("/")[0]){
            eventsCalendar[date].forEach((element) => {
                displayEventInDate(date, element.eventTitle, element.id, element.eventType);
            });
        }
    }
}

function displayEventInDate(dateID,eventTitle, eventId,eventType) {
    let displayedEvent = document.createElement("p");
    setColorTypeOfEvent(displayedEvent,eventType)
    displayedEvent.classList.add(eventId);
    let eventTitleTextNode = document.createTextNode(eventTitle);
    displayedEvent.appendChild(eventTitleTextNode);
    displayedEvent.classList.add('event-text');
    document.getElementById(dateID).parentNode.lastChild.appendChild(displayedEvent);
}




function initRemindersList(){
    nextRemindersList=[];
    pastRemindersList=[];
        for (reminderID in reminders){
            let reminder = reminders[reminderID];
            reminder['id'] = reminderID;
            if(Date.parse(reminder.reminderDate)>Date.now()){
                nextRemindersList.push(reminder);
            }else{
                pastRemindersList.push(reminder);
            }
        }
        sortRemindersList(nextRemindersList,1);
        sortRemindersList(pastRemindersList,-1);
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }
        startNextAlarmTimeout();
}
function sortRemindersList(remindersList, sign){
  remindersList.sort(function (a, b) {
        if (a['reminderDate'] > b['reminderDate']) {
          return 1*sign;
        }
        if (a['reminderDate'] < b['reminderDate']) {
          return -1*sign;
        }
        // a must be equal to b
        return 0;
      });
}

function startNextAlarmTimeout(){
    if(nextRemindersList.length){
        let timeLeft = Date.parse(nextRemindersList[0].reminderDate) - Date.now();
        currentTimeout = setTimeout(function(){
            let id = nextRemindersList[0].id;
            let title = nextRemindersList[0].eventTitle;
            let initialDate = nextRemindersList[0].initialDate.split('T');
            initialDate = `${initialDate[0]} ${initialDate[1]}`
            modalForReminders(title, initialDate, id);

            pastRemindersList.unshift(nextRemindersList.shift());
            loadPastRemindersWarningCounter();
            startNextAlarmTimeout();
        }, timeLeft);
    }
}

//Color for event types
function setColorTypeOfEvent(displayedEvent,eventType){
    displayedEvent.classList.add(eventType);
}

function loadPastRemindersWarningCounter(){
    let warningBoxbtn = document.querySelector(".warningBox-btn");
    if(pastRemindersList.length){
        warningBoxbtn.innerHTML= '!'+ pastRemindersList.length;
        warningBoxbtn.className+= " warningBox-btn-alert";
    }else{
        warningBoxbtn.innerHTML= 0;
        warningBoxbtn.className = "warningBox-btn";

    }
}
function displayEventsInYearCalendar(year,eventsCalendar){
    for (element in eventsCalendar){
        if(year == element.split("/")[0]){
            let divDisplayEventsInYearCalendar = document.createElement("div");
            divDisplayEventsInYearCalendar.classList.add('event-year-view');
            document.querySelector('[id="' + element + '"]').appendChild(divDisplayEventsInYearCalendar);
        }
    }
}
