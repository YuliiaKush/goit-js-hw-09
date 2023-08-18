import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let currentTime = new Date(); 

const input = document.querySelector('#datetime-picker');
const timerDays = document.querySelector('span[data-days]');
const timerHour = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

startBtn.disabled = true;

const fp = flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() - currentTime.getTime() < 0) {
            Notiflix.Report.wa(
                "Please choose a date in the future"
            );
        } else {
            startBtn.disabled = false;
            startBtn.addEventListener('click', () => {
                const timerId = setInterval(() => {
                    const currentTime = new Date();
                    const ms = selectedDates[0].getTime() - currentTime.getTime();
                    timerDays.textContent = addLeadingZero(convertMs(ms).days);
                    timerHour.textContent = addLeadingZero(convertMs(ms).hours);
                    timerMinutes.textContent = addLeadingZero(convertMs(ms).minutes);
                    timerSeconds.textContent = addLeadingZero(convertMs(ms).seconds);
                }, 1000);
            });
        }
    },
});


    
    

   