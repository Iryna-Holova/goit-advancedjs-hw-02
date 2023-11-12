import getRandomHexColor from './helpers/get-random-hex-color';

const elements = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

elements.start.addEventListener('click', handleColorChangeStart);
elements.stop.addEventListener('click', handleColorChangeStop);
elements.stop.disabled = true;

let intervalId;

function handleColorChangeStart() {
  elements.body.style.backgroundColor = getRandomHexColor();

  intervalId = setInterval(() => {
    elements.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  elements.start.disabled = true;
  elements.stop.disabled = false;
}

function handleColorChangeStop() {
  clearInterval(intervalId);
  elements.stop.disabled = true;
  elements.start.disabled = false;
}
