import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import convertMs from './helpers/convert-ms';
import addLeadingZero from './helpers/add-leading-zero';

const elements = {
  picker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

elements.startBtn.addEventListener('click', handleCountdownStart);
elements.startBtn.disabled = true;

let selectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setDate(selectedDates[0]);
  },
};

flatpickr(elements.picker, options);

function setDate(date) {
  if (date < Date.now()) {
    elements.startBtn.disabled = true;
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topCenter',
    });
  } else {
    elements.startBtn.disabled = false;
    selectedDate = date;
  }
}

function handleCountdownStart() {
  elements.startBtn.disabled = true;
  elements.picker.disabled = true;
  setValues();

  intervalId = setInterval(() => {
    if (selectedDate < Date.now()) {
      clearInterval(intervalId);
      return;
    }

    setValues();
  }, 1000);
}

function setValues() {
  const data = convertMs(selectedDate - Date.now());
  Object.keys(data).forEach(key => {
    elements[key].textContent = addLeadingZero(data[key]);
  });
}
