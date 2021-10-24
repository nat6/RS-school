import getTimeOfDay from "./_getTime";

const greetingBox = document.querySelector('.greeting');
const nameBox = (<HTMLInputElement> document.querySelector('.name'));


export default function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  if (greetingBox) greetingBox.textContent = greetingText;
}


function setLocalStorage() {
  localStorage.setItem('name', nameBox.value);
}
window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
  let currentName:any = localStorage.getItem('name');
  if (localStorage.getItem('name')) nameBox.value = currentName;
}
window.addEventListener('load', getLocalStorage);