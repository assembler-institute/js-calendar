//
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
        try { document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x }
        catch(err) {
            /* Create the week clone to show in calendar */
            let workClone = whiteClone.cloneNode(true);
            rowCont++;
            workClone.setAttribute("data-row",rowCont);
            document.querySelector('.calendar__month').appendChild(workClone)
            /* Fill the clone for first time */
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x
        };
        /*
        *executar funcio per colocar events al month
        *handleEvent()
        */
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
    }
}

/* blablabla */
export function handleEvent(){

}