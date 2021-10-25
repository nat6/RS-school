const settings = (<HTMLElement> document.querySelector('.settings'));
const settingsButton = document.querySelector('.settings-button');

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


