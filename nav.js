let navigator;
const previousBtn = document.querySelector('#previousMonth');
const nextBtn = document.querySelector('#nextMonth');
const monthDisplay = document.querySelector("#monthDisplay");

function changeMonth(action) {
  const domMonth = document.getElementById(navigator);
  changeStyles("off", domMonth);
  let newDate;

  if (action === 'up') {
    navigator++;
    setVisibility('visible', previousBtn);
    if (navigator === 11) setVisibility("hidden", nextBtn);

  } else {
    navigator--;
    setVisibility('visible', nextBtn);
    if (navigator === 0) newDate = new Date(currentYear, navigator, currentMonth);
    if (navigator === 0) setVisibility("hidden", previousBtn);
  }
  newDate = new Date(currentYear, navigator, 1, 12, 00, 00);
  monthDisplay.innerHTML = `<p>${getStrDisplayDate(newDate, userLang)}</p>`;
  changeStyles("on", domMonth, navigator);
}

function initMonthButtons() {
  setVisibility("hidden", previousBtn);
  previousBtn.addEventListener('click', () => changeMonth('down'));
  nextBtn.addEventListener('click', () => changeMonth('up'));
}
