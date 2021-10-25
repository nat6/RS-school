const visibilityButtons = (document.querySelectorAll('.visibility-button'));

const blocks = {
  player: (<HTMLElement> document.querySelector('.player')),
  weather: (<HTMLElement> document.querySelector('.weather')),
  time: (<HTMLElement> document.querySelector('.time')),
  date: (<HTMLElement> document.querySelector('.date')),
  greeting: (<HTMLElement> document.querySelector('.greeting-container')),
  quote: (<HTMLElement> document.querySelector('.quote-wrapper')),
  controls: (<HTMLElement> document.querySelector('.slider-icons')),
  todo: (<HTMLElement> document.querySelector('.todo-wrapper')),
}


function switchVisibility(event) {
  const name = event.target.id.split('-')[1]; // remove unnecessary class characters
  const element = blocks[name];

  if (event.target.checked == true) {
    element.style.visibility = 'visible';
    element.style.opacity = '1';
  } else {
    element.style.opacity = '0';
    element.style.visibility = 'hidden';
  }
}
visibilityButtons.forEach(button => button.addEventListener('click', (event => switchVisibility(event))));