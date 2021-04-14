let timeoutArr = [];

//Function to get a filtered list of elements from the localStorage

function reminderArr() {
     const eventData = localStorage.getItem("events");
     console.log(eventData);
     return JSON.parse(eventData).filter(calendarEvents => calendarEvents.reminder == 'on');
}

// Function that sets the alarm for the reminders
// that have to execute on the next hour

export function setReminder() {
     let actualDate = new Date();
     if (localStorage.length) {
          let objArray = reminderArr();

          objArray.forEach(obj => {
               let differenceTime = new Date(obj["init-date"]) - actualDate;
               let remindingTime = differenceTime - (obj["select-time"] * 60000);
               console.log(remindingTime);
               if (remindingTime < 60000 && remindingTime > -60000) {
                    alert(`El evento  ${obj["title"]}`);
               }
          });
     }
}
setReminder();
setInterval(setReminder, 60000);