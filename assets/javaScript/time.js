function displayHour() {
    hourUpdate = setInterval(() => {
        time = new Date();
        hour = time.getHours();
        minute = pad(time.getMinutes())
        seconds = pad(time.getSeconds());
        houtMin= `${hour}: ${minute}: ${seconds}`
        var fisrsRow= document.querySelector("#calendarprueba")
        fisrsRow.textContent=houtMin
    }, 1000);
}
function pad(value) {
    if(value < 10) {
        return '0' + value;
    } else {
        return value;
    }
}
displayHour()