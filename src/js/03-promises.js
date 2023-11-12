import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let promiseDelay = Number(delay.value);
  const delayStep = Number(step.value);
  const promisesAmount = Number(amount.value);

  for (let i = 1; i <= promisesAmount; i++) {
    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        iziToast.success({
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          message: `❌ Rejected promise ${position} in ${delay}ms`,
        });
      });

    promiseDelay += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
