import getTimeOfDay from "./_getTime";

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

let backgroundNum:number;


function getRandomNum(max:number) {
  const num = Math.floor(Math.random() * 20 + 1);
  backgroundNum = num;
}
getRandomNum(20);


function setBackground() {
  const img = new Image();
  const timeOfDay = getTimeOfDay();
  const num = backgroundNum.toString().padStart(2, '0');
  const backgroundUrl = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${num}.jpg`;
  img.src = backgroundUrl;

  img.onload = () => {
    if (body) body.style.backgroundImage = `url(${img.src})`;
  }; 
}
setBackground();


function getSlideNext() {
  backgroundNum = (backgroundNum >= 20) ? 1 : (backgroundNum + 1);
  setBackground();
}
if(slideNext) slideNext.addEventListener('click', getSlideNext);


function getSlidePrev() {
  backgroundNum = (backgroundNum <= 1) ? 20 : (backgroundNum - 1);
  setBackground();
}
if(slidePrev) slidePrev.addEventListener('click', getSlidePrev);


