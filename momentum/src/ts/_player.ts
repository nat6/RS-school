import audioInfo from './_playList';
import formatTime from './_formatTime';

const audio = new Audio();
let isPlay = false;
let currentTime = 0;
let playNum = 0;

const playList = document.querySelector('.play-list');
const playerInfo = (<HTMLElement> document.querySelector('.player-info'));

const playPrevButton = document.querySelector('.play-prev');
const playButton = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');

const audioNameBox = document.querySelector('.song-name');
const audioDurationBox = document.querySelector('.song-duration');
const audioTimeBox = document.querySelector('.song-time');

const controlsProgress = (<HTMLElement> document.querySelector('.range-wrapper'));
const progressBar = (<HTMLElement> document.querySelector('.controls-bar'));

const volumeButton = document.querySelector('.volume');
const volumeRange = (<HTMLInputElement> document.querySelector('.controls-volume'));


// add playlist
audioInfo.forEach(obj => {
  const item = document.createElement('li');
  item.classList.add('play-item');
  item.textContent = `${obj.title}`;

  playList?.append(item);
});

const audioItems = Array.from(document.querySelectorAll('.play-item'));


function playAudio() {
  // show current audio
  if (playerInfo) playerInfo.style.opacity = '1';
  updateAudioInfo();
  audio.src = audioInfo[playNum].src;

  // add styles
  controlsProgress.style.cursor = 'pointer';
  handleAudio();

  // play / pause
  if(!isPlay) {
    audio.currentTime = currentTime;
    isPlay = true;
    audio.play();
  } else {
    isPlay = false;
    audio.pause();
  }

  // update button
  togglePlayButton();
  toggleSongButton();
}

playButton?.addEventListener('click', playAudio);


// add active class
function handleAudio() {
  audioItems.forEach(item => {
    item.classList.remove('item-active');
  });
  audioItems[playNum].classList.add('item-active');
}


// update play button
function togglePlayButton() {
  if(!isPlay) playButton?.classList.remove('pause');
  else playButton?.classList.add('pause');
}


// small song button
function toggleSongButton() {
  audioItems.forEach(item => {
    item.classList.remove('item-pause');
  });

  const active = document.querySelector('.item-active');
  if (!isPlay) active?.classList.remove('item-pause');
  else active?.classList.add('item-pause');
}


// audio output basic
function updateAudioInfo() {
  if(audioNameBox) audioNameBox.textContent = `${audioInfo[playNum].title}`;

  const duration = formatTime(audio.duration);
  if(audioDurationBox) audioDurationBox.textContent = `${duration}`;
}
audio.addEventListener('loadeddata', updateAudioInfo);


// play new audio
function updateAudio() {
  isPlay = false;
  currentTime = 0;
  playAudio();
}


// previous audio
function getAudioPrev() {
  playNum = (playNum <= 0) ? (audioInfo.length - 1) : (playNum - 1);
  updateAudio();
}
playPrevButton?.addEventListener('click', getAudioPrev);


// next audio
function getAudioNext() {
  playNum = (playNum >= (audioInfo.length - 1)) ? 0 : (playNum + 1);
  updateAudio();
}
playNextButton?.addEventListener('click', getAudioNext);

// auto switch audio
audio.addEventListener('ended', getAudioNext);


// audio current time output
function handleAudioTime() {
  const time = formatTime(currentTime);
  if (audioTimeBox) audioTimeBox.textContent = `${time}`;
}


// progress bar output
function handleProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  if (progressBar) progressBar.style.width = `${percent}%`;

  currentTime = (audio.currentTime == 0) ? currentTime : audio.currentTime;
  handleAudioTime();
}
audio.addEventListener('timeupdate', handleProgress);


// change current time
function changeTime(event) {
  const progressTime = (event.offsetX / controlsProgress.offsetWidth) * audio.duration;
  audio.currentTime = progressTime;
  currentTime = audio.currentTime;
}
controlsProgress.addEventListener('click', (event) => changeTime(event));


// switch to new song
function switchAudio(event) {
  const active = document.querySelector('.item-active');
  if(active == event.target) {
    playAudio();
  } else {
    const index = audioItems.indexOf(event.target);
    playNum = index;
    updateAudio();
  }
}
audioItems.forEach(item => item.addEventListener('click', event => switchAudio(event)));


// update volume button
function updateButtonVolume() {
  if (volumeRange && volumeButton) {
    (+volumeRange.value * 100 === 0) ? volumeButton.classList.add('mute') : volumeButton.classList.remove('mute');
  }
}

// change volume
function handleVolume() {
  audio.volume = +volumeRange.value;
  const value = +volumeRange.value * 100;

  volumeRange.style.background = `linear-gradient(to right, var(--main-color) 0%, var(--main-color) ${value}%, var(--gray-color) ${value}%, var(--gray-color) 100%)`;
  updateButtonVolume();
}

volumeRange.addEventListener('change', handleVolume);
volumeRange.addEventListener('mousemove', handleVolume);
volumeRange.addEventListener('input', handleVolume);


// mute / unmute
function toggleVolume() {
  if (volumeRange && volumeButton) {
    volumeRange.value = (+volumeRange.value * 100 === 0) ? '0.5' : '0';
  }

  handleVolume();
  updateButtonVolume();
}
volumeButton?.addEventListener('click', toggleVolume);



