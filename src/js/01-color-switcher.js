function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const BtnStartEl = document.querySelector('[data-start]');
const BtnStopEl = document.querySelector('[data-stop]');
const onBodyEl = document.querySelector('body');
BtnStopEl.disabled = true;

const colorChanger = {
  intervalId: null,
  startChangeBgColor() {
    this.intervalId = setInterval(() => {
      onBodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);

    BtnStartEl.disabled = true;
    BtnStopEl.disabled = false;
  },

  stopChangeBgColor() {
    clearInterval(this.intervalId);
    BtnStartEl.disabled = false;
    BtnStopEl.disabled = true;
  },
};

BtnStartEl.addEventListener('click', () => {
  colorChanger.startChangeBgColor();
});

BtnStopEl.addEventListener('click', () => {
  colorChanger.stopChangeBgColor();
});
