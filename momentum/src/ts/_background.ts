import getTimeOfDay from "./_getTime";

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const source = (<HTMLInputElement> document.querySelector('.images-source'));
const queryInput = (<HTMLInputElement> document.querySelector('#source-query'));

let backgroundNum:number;
let backgroundFlickr:number = 0;
let queryTag:string = 'dogs';


function getBackgroundNum(max:number) {
  const num = Math.floor(Math.random() * max + 1);
  backgroundNum = num;
}
getBackgroundNum(20);


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
  switch(source.value) {
    case 'github':
      backgroundNum = (backgroundNum >= 20) ? 1 : (backgroundNum + 1);
      setBackground();
      break;
    case 'unsplash':
      getLinkUnsplash();
      break;
    case 'flickr':
      backgroundFlickr = (backgroundFlickr >= 20) ? 1 : (backgroundFlickr + 1);
      getLinkFlickr();
      break;
  }
}
slideNext?.addEventListener('click', getSlideNext);


function getSlidePrev() {
  switch(source.value) {
    case 'github':
      backgroundNum = (backgroundNum <= 1) ? 20 : (backgroundNum - 1);
      setBackground();
      break;
    case 'unsplash':
      getLinkUnsplash();
      break;
    case 'flickr':
      backgroundFlickr = (backgroundFlickr <= 1) ? 20 : (backgroundFlickr - 1);
      getLinkFlickr();
      break;
  }
}
slidePrev?.addEventListener('click', getSlidePrev);


function switchSource() {
  switch(source.value) {
    case 'github':
      setBackground();
      break;
    case 'unsplash':
      getLinkUnsplash();
      break;
    case 'flickr':
      getLinkFlickr();
      break;
  }
}
source.addEventListener('change', switchSource);


async function getLinkUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${queryTag}&client_id=xFh_rKw7HXm7v2pOVtkvDKOyR-5nThDdHqEg7TraBXY`;
  const res = await fetch(url);
  const data = await res.json();
  const link = data.urls.regular;

  const img = new Image();
  img.src = link;

  img.onload = () => {
    if (body) body.style.backgroundImage = `url(${img.src})`;
  };
}


async function getLinkFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=42ad0deacee4ad90419254c408bc2327&tags=${queryTag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const link = data.photos.photo[backgroundFlickr].url_l;

  const img = new Image();
  img.src = link;

  img.onload = () => {
    if (body) body.style.backgroundImage = `url(${img.src})`;
  };
}


function updateQuery() {
  queryTag = queryInput.value;
  switchSource();
}
queryInput.addEventListener('change', updateQuery);


function setLocalStorageBackground() {
  localStorage.setItem('background', source.value);
  if (queryInput.value) localStorage.setItem('query', queryInput.value);
}
window.addEventListener('beforeunload', setLocalStorageBackground);


function getLocalStorageBackground() {
  let currentBackground = localStorage.getItem('background');
  if (localStorage.getItem('background')) source.value = `${currentBackground}`;

//   if (localStorage.getItem('query')) queryTag = localStorage.getItem('query') || 'dogs';
// console.log('тег: ' + queryTag);
// console.log('local: ' + localStorage.getItem('query'))

  // if (query && localStorage.getItem('query')) query = localStorage.getItem('query')?.toString();

  switchSource();
}
window.addEventListener('load', getLocalStorageBackground);

