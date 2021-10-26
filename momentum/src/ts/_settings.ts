import returnLang from "./_language";

const settings = (<HTMLElement> document.querySelector('.settings'));
const settingsButton = document.querySelector('.settings-button');

const settingsPlayerBox = (<HTMLElement> document.querySelector('#settings-player'));
const settingsWeatherBox = (<HTMLElement> document.querySelector('#settings-weather'));
const settingsTimeBox = (<HTMLElement> document.querySelector('#settings-time'));
const settingsDateBox = (<HTMLElement> document.querySelector('#settings-date'));
const settingsGreetingBox = (<HTMLElement> document.querySelector('#settings-greeting'));
const settingsQuoteBox = (<HTMLElement> document.querySelector('#settings-quote'));
const settingsTodoBox = (<HTMLElement> document.querySelector('#settings-todo'));
const settingsControlsBox = (<HTMLElement> document.querySelector('#settings-controls'));
const settingsImgBox = (<HTMLElement> document.querySelector('#settings-img'));


let displaySettings = false;


function showSettings() {

  if (displaySettings === false) {
    settings.style.visibility = 'visible';
    settings.style.opacity = '1';
    displaySettings = true;
  } else {
    settings.style.opacity = '0';
    settings.style.visibility = 'hidden';
    displaySettings = false;
  }

}
settingsButton?.addEventListener('click', showSettings);


export default function changeSettingLang() {
  let lang = returnLang();

  if (lang == 'ru') {
    settings.style.width = '400px';
    settingsImgBox.textContent = 'Источник изображений';
    settingsPlayerBox.textContent = 'Плеер';
    settingsWeatherBox.textContent = 'Погода';
    settingsTimeBox.textContent = 'Время';
    settingsDateBox.textContent = 'Дата';
    settingsGreetingBox.textContent = 'Приветствие';
    settingsQuoteBox.textContent = 'Цитата';
    settingsTodoBox.textContent = 'Список дел';
    settingsControlsBox.textContent = 'Управление';
  }

  else {
    settings.style.width = '360px';
    settingsImgBox.textContent = 'Source of images';
    settingsPlayerBox.textContent = 'Player';
    settingsWeatherBox.textContent = 'Weather';
    settingsTimeBox.textContent = 'Time';
    settingsDateBox.textContent = 'Date';
    settingsGreetingBox.textContent = 'Greeting';
    settingsQuoteBox.textContent = 'Quote';
    settingsTodoBox.textContent = 'ToDo';
    settingsControlsBox.textContent = 'Controls';
  }
}