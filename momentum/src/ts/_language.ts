
const languageButton = (<HTMLInputElement> document.querySelector('#language'));

const ru = (<HTMLElement> document.querySelector('.language-ru'));
const en = (<HTMLElement> document.querySelector('.language-en'));


function switchLanguage() {
  toggleRadioClass();
}

function toggleRadioClass() {
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



// Создайте объект greetingTranslation, 
// укажите его ключами языки, на которое будет переводиться ваше приложение, 
// в качестве значений укажите текст приветствия. 



// Параметром функции, отображающей приветствие, 
// укажите язык отображения страницы по умолчанию, в качестве свойства textContent указываем не текст, 
// а значение объекта greetingTranslation с соответствующим текущему языку ключом. П
// ри переключении языка вызваем функцию ещё раз с соответствующим параметром.
