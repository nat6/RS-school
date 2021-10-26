import { getTimeOfDay, getGreetingRu } from "./_getTime";
import returnLang from "./_language";

const greetingBox = document.querySelector('.greeting');
const nameBox = (<HTMLInputElement> document.querySelector('.name'));

const languageButton = (<HTMLInputElement> document.querySelector('#language'));



function setLang() {
  const lang = returnLang();
  return lang;
}
languageButton?.addEventListener('click', setLang);

export default function showGreeting() {
  let lang = returnLang();

  if (lang == 'en') {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    if (greetingBox) greetingBox.textContent = greetingText;
  }
  else if (lang == 'ru') {
    const greetingText = getGreetingRu();
    if (greetingBox) greetingBox.textContent = greetingText;
  }
}


function setLocalStorageGreeting() {
  localStorage.setItem('name', nameBox.value);
}
window.addEventListener('beforeunload', setLocalStorageGreeting);


function getLocalStorageGreeting() {
  let currentName:any = localStorage.getItem('name');
  if (localStorage.getItem('name')) nameBox.value = currentName;
}
window.addEventListener('load', getLocalStorageGreeting);