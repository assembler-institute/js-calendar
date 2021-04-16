const now = new Date();
const todayYear = now.getFullYear();
const todayMonth = now.getMonth() + 1;
const todayMonthDay = now.getDate();
const todayReminders = [];

function closeReminder(event) {
    event.target.parentElement?.remove();
}

function showReminder(reminderEvent) {
    document.getElementById("beep")?.play();
    reminderTime = reminderEvent.startDate.split('T')[1];
    const reminderContent = (document.querySelector('#reminderTemplate')).content.cloneNode(true);
    newReminder = document.createElement('div');
    newReminder.id = 'reminderContainer';
    newReminder.classList.add('reminderContainer');
    reminderContent.children[0].textContent = `The event: '${reminderEvent.title}'`;
    reminderContent.children[1].textContent = `will start today at ${reminderTime}`;
    newReminder.appendChild(reminderContent);
    document.getElementById('remindersSection').appendChild(newReminder);
}

function setTodayReminder(reminder) {
    todayReminders.forEach(reminder => {
        clearTimeout(reminder);
    });
    reminderEvent = eventsById[reminder];
    timeToReminder = new Date(reminderEvent.startDate) - now - (parseInt(reminderEvent.reminder) * 60000);
    if (timeToReminder > 0) {
        todayReminders.push(setTimeout(showReminder, timeToReminder, reminderEvent));
    }
}

function setTodayReminders() {
    remindersByDate[`${todayYear}-${todayMonth}-${todayMonthDay}`].forEach(reminder => {
        setTodayReminder(reminder);
    });
};

function checkTodayReminders() {
    if (!!remindersByDate[`${todayYear}-${todayMonth}-${todayMonthDay}`]) {
        setTodayReminders();
        return true;
    }
    return false;
}