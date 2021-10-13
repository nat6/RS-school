function shuffleGallary() {
	const picturesContainer = document.querySelector('.gallery__pictures_container');

	const src = ["assets/img/gallery/gallery1.webp",
		"assets/img/gallery/gallery2.webp",
		"assets/img/gallery/gallery3.webp",
		"assets/img/gallery/gallery4.webp",
		"assets/img/gallery/gallery5.webp",
		"assets/img/gallery/gallery6.webp",
		"assets/img/gallery/gallery7.webp",
		"assets/img/gallery/gallery8.webp",
		"assets/img/gallery/gallery9.webp",
		"assets/img/gallery/gallery10.webp",
		"assets/img/gallery/gallery11.webp",
		"assets/img/gallery/gallery12.webp",
		"assets/img/gallery/gallery13.webp",
		"assets/img/gallery/gallery14.webp",
		"assets/img/gallery/gallery15.webp",
	]

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	shuffle(src).map(item => {
		const img = document.createElement('img');
		img.classList.add('gallery__img')
		img.src = item;
		img.alt = ``;
		// img.loading = 'lazy';
		picturesContainer.append(img);
	})
}

shuffleGallary();


function showModalWin() {

	let darkLayer = document.createElement('div');
	darkLayer.id = 'shadow';
	document.body.appendChild(darkLayer);

	let formBuy = document.getElementById('form-buy')
	formBuy.style.display = 'block';

	let formClose = document.querySelector('.form-buy__close');
	formClose.onclick = function () {
		darkLayer.parentNode.removeChild(darkLayer);
		formBuy.style.display = 'none';
		return false;
	};
	darkLayer.onclick = function () {
		darkLayer.parentNode.removeChild(darkLayer);
		formBuy.style.display = 'none';
		return false;
	};
}

const buttonBook = document.querySelector('.button__book')

buttonBook.addEventListener('click', function (e) {
	const x = e.clientX
	const y = e.clientY

	const buttonTop = this.getBoundingClientRect().top;
	const buttonLeft = this.getBoundingClientRect().left;

	const xInside = x - buttonLeft
	const yInside = y - buttonTop

	const circle = document.createElement('span')
	circle.classList.add('circle')
	circle.style.top = yInside + 'px'
	circle.style.left = xInside + 'px'

	this.appendChild(circle)

	setTimeout(() => circle.remove(), 500)
})


const welcome = document.querySelector('.welcome__container');
const welcomeCont = document.querySelector('.welcome__content');
const navList = document.querySelector('.nav__list');
const navBtn = document.querySelector('#nav-button');



navBtn.addEventListener('change', function () {
	if (this.checked) {
		welcomeCont.style.display = 'none';
		navList.style.left = '35px';
		navList.style.transition = '1s linear';
		welcome.classList.add('welcome_hidden');
	} else {
		navList.style.left = '-200px';
		navList.style.transition = '1s linear';

		function initial() {
			welcomeCont.style.display = 'initial';

		}
		function remove() {
			welcome.classList.remove('welcome_hidden');
		}
		setTimeout(initial, 500);
		setTimeout(remove, 1000);
	}
})

// explore slider

function initComparison() {
	const overlay = document.querySelector('.explore__item_overlay');

	function compareImages(img) {
		let clicked = 0;

		w = img.offsetWidth;
		h = img.offsetHeight;
		img.style.width = (w / 2) + 'px';

		const slider = document.createElement('div');
		slider.setAttribute('class', 'explore__controls');
		slider.style.top = 0;
		slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

		img.parentElement.insertBefore(slider, img);

		function getCursorPos(e) {
			let a, x = 0;
			e = e || window.event;
			a = img.getBoundingClientRect();
			x = e.pageX - a.left;
			x = x - window.pageXOffset;
			return x;
		}

		function slide(x) {
			img.style.width = x + "px";
			slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
		}

		function slideMove(e) {
			if (clicked === 0) return false;

			let pos = getCursorPos(e);
			if (pos < 0) pos = 0;
			if (pos > w) pos = w;

			slide(pos);
		}

		function slideReady(e) {
			e.preventDefault();
			clicked = 1;

			window.addEventListener("mousemove", slideMove);
			window.addEventListener("touchmove", slideMove);
		}

		function slideFinish() {
			clicked = 0;
		}

		slider.addEventListener("mousedown", slideReady);
		window.addEventListener("mouseup", slideFinish);

		slider.addEventListener("touchstart", slideReady);
		window.addEventListener("touchstop", slideFinish);
	}

	compareImages(overlay);
}

initComparison();



// CUSTOM PLAYER

const player = document.querySelector('.video__main');
const video = player.querySelector('.video__item_main');

const playButton = player.querySelector('.controls_play');
const videoButton = player.querySelector('.video__button');

// play button

function updateBtnPlay() {
	(video.paused || video.currentTime == video.duration) ? playButton.classList.remove('controls_pause') : playButton.classList.add('controls_pause');
}

// video button

function updateBtnVideo() {
	videoButton.style.display = (video.paused || video.currentTime == video.duration) ? 'block' : 'none';
}

// play

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
	updateBtnPlay();
	updateBtnVideo();
}

playButton.addEventListener('click', togglePlay);
videoButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// volume button

const volumeButton = player.querySelector('.controls_audio');

function updateBtnVolume() {
	(volumeRange.value * 100 === 0) ? volumeButton.classList.add('controls_mute') : volumeButton.classList.remove('controls_mute');
}

// update volume

const volumeRange = player.querySelector('.controls_volume');

function handleVolume() {
	video.volume = volumeRange.value;
	const value = volumeRange.value * 100;
	volumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
	updateBtnVolume();
}

volumeRange.addEventListener('change', handleVolume);
volumeRange.addEventListener('mousemove', handleVolume);
volumeRange.addEventListener('input', handleVolume);

function toggleVolume() {
	(volumeRange.value * 100 === 0) ? volumeRange.value = 0.5 : volumeRange.value = 0;
	handleVolume();
	updateBtnVolume();
}

volumeButton.addEventListener('click', toggleVolume);

// fullscreen

const fullscreen = player.querySelector('.controls_fullscreen');

function updateBtnFullSreen() {
	!document.fullscreenElement ? fullscreen.classList.add('controls_exit') : fullscreen.classList.remove('controls_exit');
}

function stopVideo() {
	video['pause']();
	updateBtnPlay();
	updateBtnVideo();
}

function moveToVideo() {
	document.location.href = "#video-item";
}

const body = document.querySelector('body');

function toggleFullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
		body.classList.add('body_fullscreen');
	} else {
		document.exitFullscreen();
		body.classList.remove('body_fullscreen');
		stopVideo();
		setTimeout(moveToVideo, 100);
	}
	updateBtnFullSreen();
}

fullscreen.addEventListener('click', toggleFullScreen);

const progress = player.querySelector('.controls_progress');
const progressBar = player.querySelector('.controls_bar');

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.width = `${percent}%`;
	updateBtnPlay();
	updateBtnVideo();
}

video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', (e) => {
	const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = progressTime;
})

console.log(
	`Добрый день! Не успела всё доделать. Если не сложно, оставьте, пожалуйста, контакты. Либо проверьте в четверг. Спасибо!

	Оценка: 68 баллов
	
	- Слайдер в секции Welcome +24
	- Кастомный видеоплеер +26 
	- Слайдер в секции Explore +10
	- Анимация в секции Galery +8`
)

// WATCH SLIDER

const welcomeSlider = welcome.querySelector('.welcome__slider_container');
const welcomeOutput = welcome.querySelector('#controls__output');

const welcomeSlides = Array.from(welcome.querySelectorAll('.welcome__img'));
const welcomeDots = Array.from(welcome.querySelectorAll('.pagination_square'));


function handleOutput(index) {
	welcomeOutput.value = `0${index + 1}`;
}

function handleDots(index) {
	welcomeDots.forEach(dot => dot.classList.remove('pagination_square_active'));
	welcomeDots[index].classList.add('pagination_square_active');
}

function currentSlide(index) {
	welcomeSlides.forEach(img => img.classList.remove('welcome__img_active'));
	welcomeSlides[index].classList.add('welcome__img_active');
}

function switchImg(event) {
	const index = welcomeDots.indexOf(event.target);
	const imgWidth = welcomeSlides[0].width;
	welcomeSlider.style.left = -(imgWidth * index) + 'px';

	currentSlide(index);
	handleDots(index);
	handleOutput(index);
}

welcomeDots.forEach(dot => dot.addEventListener('click', (event) => switchImg(event)));


const welcomeButtons = welcome.querySelector('.controls__buttons');



function slideImg(event) {
	const currentImg = welcome.querySelector('.welcome__img_active');
	let index = welcomeSlides.indexOf(currentImg);
	const imgWidth = welcomeSlides[0].width;

	if (event.target.id == 'welcome__prev') {
		(index == 0) ? (index = welcomeSlides.length - 1) : (index--);
		welcomeSlider.style.left = -(imgWidth * index) + 'px';

	}
	else if (event.target.id == 'welcome__next') {

		(index == welcomeSlides.length - 1) ? (index = 0) : (index++);
		welcomeSlider.style.left = -(imgWidth * index) + 'px';
	}
	currentSlide(index);
	handleDots(index);
	handleOutput(index);
}

welcomeButtons.addEventListener('click', (event) => slideImg(event));


let posInit = 0,
	posX1 = 0,
	posX2 = 0,
	posFinal = 0,
	posThreshold = welcomeSlides[0].width * .25;

getEvent = function () {
	return (event.type.search('touch') !== -1) ? event.touches[0] : event;
}

function swipeStart() {
	let event = getEvent();
	posInit = posX1 = event.clientX;

	welcome.addEventListener('touchmove', swipeAction);
	welcome.addEventListener('mousemove', swipeAction);
	welcome.addEventListener('touchend', swipeEnd);
	welcome.addEventListener('mouseup', swipeEnd);
}

function swipeAction() {
	let event = getEvent();

	posX2 = posX1 - event.clientX;
	posX1 = event.clientX;
}

function swipeEnd() {
	const currentImg = welcome.querySelector('.welcome__img_active');
	let index = welcomeSlides.indexOf(currentImg);
	const imgWidth = welcomeSlides[0].width;

	posFinal = posInit - posX1;

	welcome.removeEventListener('touchmove', swipeAction);
	welcome.removeEventListener('mousemove', swipeAction);
	welcome.removeEventListener('touchend', swipeEnd);
	welcome.removeEventListener('mouseup', swipeEnd);

	if (Math.abs(posFinal) > posThreshold) {
		if (posInit < posX1) {
			(index == 0) ? (index = welcomeSlides.length - 1) : (index--);
			welcomeSlider.style.left = -(imgWidth * index) + 'px';
		}
		else if (posInit > posX1) {
			(index == welcomeSlides.length - 1) ? (index = 0) : (index++);
			welcomeSlider.style.left = -(imgWidth * index) + 'px';
		}
		currentSlide(index);
		handleDots(index);
		handleOutput(index);
	}
};

document.addEventListener('touchstart', swipeStart);
document.addEventListener('mousedown', swipeStart);

// GALLERY

const galleryImages = document.querySelectorAll('.gallery__img');
const test2 = document.querySelector('.gallery');
const test = document.querySelector('.gallery__img');


const options = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1
}

const observer = new IntersectionObserver((entries, observer) => {

	entries.forEach(entry => {

		if (entry.isIntersecting) {
			entry.target.classList.add('gallery__img_active');
		}
		else {
			entry.target.classList.remove('gallery__img_active');
		}
	})
}, options)

const arr = Array.from(document.querySelectorAll('.gallery__img'))
arr.forEach(i => {
	observer.observe(i);
})