import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let currentTime = new Date(); 
let selectedTime; 
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  btn: document.querySelector('button[data-start]'), 
};
refs.btn.disabled = true; 
const pickedDate = flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

      if (selectedDates[0] <= currentTime) {
          Notiflix.Report.warning(
                "Please choose a date in the future"
            );
    } else {
      refs.btn.disabled = false;
    }
    selectedTime = selectedDates[0];
  },
});

refs.btn.addEventListener('click', () => {
  function pad(value) {
    return String(value).padStart(2, '0');
  }
  let updateTimer = setInterval(() => {
    let currentTime = new Date();
    const newTimer = selectedTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(newTimer);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }, 1000);

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
});