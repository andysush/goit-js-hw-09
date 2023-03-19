import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secsEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;

new flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = Date.now();
    const targetData = selectedDates[0].getTime();
    if (targetData <= currentDate) {
      return Notify.warning('Please choose a date in the future');
    } else {
      startBtnEl.disabled = false;
      startBtnEl.addEventListener('click', () => {
        const intervalId = setInterval(() => {
          currentDate = Date.now();
          const timeDifference = targetData - currentDate;
          console.log(timeDifference);
          const timerTime = convertMs(timeDifference);
          insertTimeInDom(timerTime);
          if (timeDifference < 1000) {
            clearInterval(intervalId);
            Notify.success(`Timer is finished`);
          }
        }, 1000);
        startBtnEl.disabled = true;
        inputEl.disabled = true;
      });
    }
  },
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function insertTimeInDom(timerTime) {
  daysEl.textContent = timerTime.days;
  hoursEl.textContent = timerTime.hours;
  minsEl.textContent = timerTime.minutes;
  secsEl.textContent = timerTime.seconds;
}
