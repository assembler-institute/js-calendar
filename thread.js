function threadRemindTasks() {
  setInterval(() => {
    reminders.forEach(task => {
      if (task.remind) {
        const now = new Date();
        const end = new Date(task.endDate);
        const timeRemind = end.getTime() - (task.time * 60 * 1000);
        const reminded = now > new Date(timeRemind);

        if (reminded) {
          remindEvent(task);
          task.remind = false;
        }
      }
    })
  }, 1000)
}

function threadPendingTasks() {
  setInterval(() => {
    allEvents.forEach((task) => {
      if (!task.finished) {
        const init = new Date(task.initDate);
        const end = new Date(task.endDate);
        const now = new Date(Date.now());
        if (now > end) {
          disableEvent(task);
          task.finished = true;
        }
      }
    })
  }, 1000);
}