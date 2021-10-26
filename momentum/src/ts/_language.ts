import showGreeting from "./_greeting";
import getWeather from "./_weather";
import getQuotes from "./_quotes";
import changeSettingLang from "./_settings";

const languageButton = (<HTMLInputElement> document.querySelector('#language'));
const ru = (<HTMLElement> document.querySelector('.language-ru'));
const en = (<HTMLElement> document.querySelector('.language-en'));

let lang = 'en';


function switchLanguage() {
  toggleRadioClass();
  showGreeting();
  getWeather();
  getQuotes();
  changeSettingLang();
}


function toggleRadioClass() {
  lang = (languageButton.checked) ? 'en' : 'ru';
  if (languageButton.checked === true) {
    ru.classList.add('settings-item_disable');
    en.classList.remove('settings-item_disable');
  } else {
    en.classList.add('settings-item_disable');
    ru.classList.remove('settings-item_disable');
  }
}

function chooseRu() {
  if (languageButton) languageButton.checked = false;
  toggleRadioClass();
}
ru?.addEventListener('click', chooseRu);


function chooseEn() {
  if (languageButton) languageButton.checked = true;
  toggleRadioClass();
}
en?.addEventListener('click', chooseEn)

languageButton?.addEventListener('click', switchLanguage);


export default function returnLang() {
  return lang;
}
