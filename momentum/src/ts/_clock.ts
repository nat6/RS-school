import showGreeting from "./_greeting";

const timeBox = document.querySelector('.time');
const dateBox = document.querySelector('.date');


function showDate() {
  const date = new Date();
  const options:any = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  if (dateBox) dateBox.textContent = currentDate;
}


function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  if (timeBox) timeBox.textContent = currentTime;

  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

