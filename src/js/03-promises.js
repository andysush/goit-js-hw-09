import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayInputEl = document.querySelector('input[name=delay]');
const stepInputEl = document.querySelector('input[name=step]');
const amountItemEl = document.querySelector('input[name=amount]');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelay = Number(firstDelayInputEl.value);
  const stepNumber = Number(stepInputEl.value);
  const amountPromises = Number(amountItemEl.value);
  if (firstDelay < 0 || stepNumber < 0 || amountPromises <= 0) {
    Notify.failure('insert only positive numbers');
    return;
  }
  for (let index = 0; index < amountPromises; index += 1) {
    delay = firstDelay + stepNumber * index;

    createPromise(index, delay);
  }
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
