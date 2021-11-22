let nav = 0;
let clicked = null;
let events = localStorage.getItem("events") ?
    JSON.parse(localStorage.getItem("events")) : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const newEventModalGlobal = document.getElementById("newEventModalGlobal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const eventTitleInputGlobal = document.getElementById("eventTitleInputGlobal");
let initialDateGlobal = document.getElementById("initialDateGlobal");
let endDateGlobal = document.getElementById("EndDateGlobal")
let descriptiontGlobal = document.getElementById("descriptiontGlobal")
let eventTypeGlobal = document.getElementById("eventTypeGlobal")
let timeAdviseGlobal = document.getElementById("timeAdviseGlobal")

let initialDate = document.getElementById("initialDate")
let endDate = document.getElementById("endDate")
let eventType = document.getElementById("eventType")
let description = document.getElementById("description")
let timeAdvise = document.getElementById("timeAdvise")
const alertModal = document.getElementById("alertModal")
let counter = 0;

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let yearGlobal = 0;

function eventCheckFntion(m, element, x, z) {
    let today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let time = today.getTime();
    let AlertArray = timeAdviseGlobal.value;
    let timeMinutes = time / 60000;
    let a = x.split("/")
    let b = a.reverse();
    let l = b[0] + "/" + b[1] + "/" + b[2]

    let s = l + " " + z
    let y = new Date(s)
    let todayTime = timeMinutes.toString().split(".")
    let dayHour = y.getTime() / 60000;
    let currentFtime = parseInt(todayTime[0])
    let warningTime = dayHour - AlertArray


    setInterval(() => {
        console.log(currentFtime + "Current")
        if (currentFtime === warningTime) {
            if (counter < 1) {
                callAlertModal(AlertArray)
                counter++;
            }
        }
    }, 5000);




}


function callAlertModal(AlertArray) {
    let para = document.createElement("p");
    para.innerText = "Your evenet is about to start in " + AlertArray + " minutes!"
    alertModal.appendChild(para)

    let deleteM = document.createElement("button")
    deleteM.innerText = "x"
    alertModal.appendChild(deleteM)

    deleteM.addEventListener("click", (e) => {
        alertModal.removeChild(para);
        alertModal.removeChild(deleteM);
    })
}


function alerts() {


    let cd = new Date();
    const day = cd.getDate();
    const month = cd.getMonth();
    const year = cd.getFullYear();
    const hour = cd.getHours();
    const minutes = cd.getMinutes();

    let arrayFormat = `${day}/${month + 1}/${year}`;

    events.forEach(element => {
        let x = element.date
        let z = element.hour

        let m = z.split(":")
        let format = m[0] + "/" + m[1];
        let correctFormat = x + "/" + format

        const eventCheck = events.find((e) => e.date === arrayFormat)
        if (eventCheck) {
            eventCheckFntion(m, element, x, z)

        }

    });


}



function openModal(date) {
    clicked = date;
    const eventForDay = events.find((e) => e.date === clicked);
    if (eventForDay) {
        if (eventForDay.title) {
            document.getElementById("titleText").innerText = eventForDay.title;
            deleteEventModal.style.display = "block";
        }
        if (eventForDay.date) {
            document.getElementById("timeText1").innerText = "Event starts on " + eventForDay.date + ", " + eventForDay.hour
        }
        if (eventForDay.eventEndDate.inner = "Invalid Date") {
            document.getElementById("timeText2").style.display = "none"
        }
        if (eventForDay.eventEndDate != "Invalid Date") {
            document.getElementById("timeText2").style.display = "block"
            document.getElementById("timeText2").innerText = "Event finishes on " + eventForDay.eventEndDate
        }
        if (eventForDay.eventDescription) {
            document.getElementById("descriptionText").innerText = "Description: " + eventForDay.eventDescription
        }
        if (eventForDay.eventEventType) {
            document.getElementById("typeText").innerText = "Type of event: " + eventForDay.eventEventType
        }
    } else {
        newEventModal.style.display = "block";
    }
    backDrop.style.display = "block";
}

function changeYear(number) {
    nav = 0;
    nav = nav + 12 * number;
    load();
}

function showYear() {
    var table = document.getElementById("tableyear");
    var counter = -12;
    for (var i in table.rows) {
        var row = table.rows[i];
        for (var j in row.cells) {
            if (isNaN(j)) break;
            var col = row.cells[j];
            var actualYear = yearGlobal + counter;
            col.innerHTML =
                "<button class='buttonYear' value='" +
                counter +
                "' onclick='changeYear(value)'>" +
                actualYear +
                "</button>";
            counter = counter + 1;
        }
    }
}

function OpenModalGlobal() {
    backDrop.style.display = "block";
    newEventModalGlobal.style.display = "block";
}

function load() {
    const dt = new Date();
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const hour = dt.getHours();
    const minutes = dt.getMinutes();

    const firstDayOfNMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfNMonth.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    let weekdayStrings = firstDayOfNMonth.toLocaleDateString("en-GB", {
        weekday: "long",
    });

    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
    document.getElementById("monthDisplay").innerText = dt.toLocaleDateString(
        "en-GB", {
            month: "long"
        }
    );

    var yearDiv = document.getElementById("yearDisplay");
    yearDiv.innerText = year;
    yearGlobal = year;
    yearDiv.addEventListener("click", showYear);

    calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");

        const dayString = `${i - paddingDays}/${month + 1}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find((e) => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = "currentDay";
            }

            if (eventForDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener("click", () => openModal(dayString));
        } else {
            daySquare.classList.add("padding");
        }
        calendar.appendChild(daySquare);

    }
    alerts()
}



function closeModal() {
    eventTitleInput.classList.remove("error");
    newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    newEventModalGlobal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = "";
    description.value = ''
    clicked = null;
    load();
}

document.addEventListener('keydown', function (esc) {
    if (esc.key === "Escape") {
        closeModal()
    }
})

function saveEvent() {
    let finishDate = endDate.value


    let b = new Date(finishDate)


    let finishDateFormat = b.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    })

    if (eventTitleInput.value) {
        eventTitleInput.classList.remove("error");

        events.push({
            date: clicked,
            title: eventTitleInput.value,
            hour: initialDate.value,
            eventEndDate: finishDateFormat,
            eventDescription: description.value,
            eventEventType: eventType.value,
            timeAdviseEvent: timeAdvise.value

        });

        localStorage.setItem("events", JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add("error");
    }
}

function endDateDisplay() {
    document.getElementById("endDate").classList.toggle("displayBlock")
}

function endDateDisplayGlobal() {
    document.getElementById("EndDateGlobal").classList.toggle("displayBlock")
}


function saveEventGlobal() {
    let inputDate = initialDateGlobal.value;
    let endDates = endDateGlobal.value;

    let z = new Date(endDates)
    let x = new Date(inputDate)

    let endDateFormat = z.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    })

    let dateFormat = x.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    })

    let r = dateFormat.split(", ")
    console.log(r)

    const day = x.getDate();
    const month = x.getMonth();
    const year = x.getFullYear();

    const correctDate = `${day}/${month + 1}/${year}`

    console.log(correctDate)


    if (dateFormat) {
        eventTitleInputGlobal.classList.remove("error")

        events.push({
            date: correctDate,
            title: eventTitleInputGlobal.value,
            hour: r[1],
            eventEndDate: endDateFormat,
            eventDescription: descriptiontGlobal.value,
            eventEventType: eventTypeGlobal.value,
            timeAdviseEvent: timeAdviseGlobal.value
        })


        localStorage.setItem("events", JSON.stringify(events))
        closeModal()
    } else {
        eventTitleInputGlobal.classList.add("error")
    }


}

function deleteEvent() {
    events = events.filter((e) => e.date !== clicked);
    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById("nextButton").addEventListener("click", () => {
        nav++;
        load();
    });

    document.getElementById("backButton").addEventListener("click", () => {
        nav--;
        load();
    });




    //event listeners


    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document
        .getElementById("saveButton2")
        .addEventListener("click", saveEventGlobal);
    document.getElementById("cancelButton").addEventListener("click", closeModal);
    document
        .getElementById("cancelButton2")
        .addEventListener("click", closeModal);

    document
        .getElementById("deleteButton")
        .addEventListener("click", deleteEvent);
    document.getElementById("closeButton").addEventListener("click", closeModal);

    document
        .getElementById("eventGlobal")
        .addEventListener("click", OpenModalGlobal);
}

initButtons();

load();

console.log()