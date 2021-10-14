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

// handle keys

const videoObserver = new IntersectionObserver((entries, observer) => {

	entries.forEach(entry => {

		if (entry.isIntersecting) document.addEventListener('keypress', activeKeys);
		else {
			document.removeEventListener('keypress', activeKeys);
		}
	});
})

videoObserver.observe(player);

function activeKeys(event) {
	let rate;

	if (event.key === '>') {
		rate = video.playbackRate;
		rate = (rate + 0.2 > 4) ? 4 : rate + 0.2;
		video.playbackRate = rate.toFixed(1)
	}
	else if (event.key === '<') {
		rate = video.playbackRate;
		rate = (rate - 0.2 < 0) ? 0 : rate - 0.2;
		video.playbackRate = rate.toFixed(1)
	}
	switch (event.code) {
		case 'Space':
			event.preventDefault();
			togglePlay();
			break;
		case 'KeyM':
			toggleVolume();
			break;
		case 'KeyF':
			toggleFullScreen();
			break;
	}
}

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

const galleryObserver = new IntersectionObserver((entries, observer) => {

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
arr.forEach(img => {
	galleryObserver.observe(img);
})

// MAP

mapboxgl.accessToken = 'pk.eyJ1IjoibmF0NiIsImEiOiJja3VwaDdvMGgwb2trMnBtZHZoNGlrYXg3In0.Q6bH6qz2dgxVBkgoVlLzgw';
const map = new mapboxgl.Map({
	container: 'map',
	center: [2.3361, 48.86111],
	zoom: 15.8,
	style: 'mapbox://styles/mapbox/streets-v11'
});

map.addControl(new mapboxgl.NavigationControl());
new mapboxgl.Marker({ color: '#000000' }).setLngLat([2.33638, 48.860845]).addTo(map);
new mapboxgl.Marker({ color: '#727272' }).setLngLat([2.3333, 48.86014]).addTo(map);
new mapboxgl.Marker({ color: '#727272' }).setLngLat([2.33965, 48.86064]).addTo(map);
new mapboxgl.Marker({ color: '#727272' }).setLngLat([2.333, 48.86184]).addTo(map);
new mapboxgl.Marker({ color: '#727272' }).setLngLat([2.33648, 48.86243]).addTo(map);

console.log(
	`Добрый день! Спасибо за ожидание :)

	Оценка: 108 баллов
	
	- Слайдер в секции Welcome +24

	- Слайдер в секции видео +18 (частично реализован 'клик по кнопке Pause' - видео не останавливается, если кликнуть по другому слайду (-1). частично реализована зацикленность - нет динамической подгрузки новых фреймов, при клике на стрелку на последнем слайде происходит переход на первый(-1))

	- Кастомный видеоплеер +36

	- Слайдер в секции Explore +10 (иногда подвисает, нужно обновить страницу)

	- Анимация в секции Galery +8

	- Карта в секции Contacts +12`
)


// VIDEO SLIDER


const videoSlider = document.querySelector('.video__more_container');

const videoSlides = Array.from(document.querySelectorAll('.video__more_frame'));
const videoDots = Array.from(document.querySelectorAll('.pagination__dot'));

function handleDotsVideo(index) {
	videoDots.forEach(dot => dot.classList.remove('video__pagination_active'));
	videoDots[index].classList.add('video__pagination_active');
}

function currentSlideVideo(index) {
	videoSlides.forEach(video => video.classList.remove('frame_active'));
	videoSlides[index].classList.add('frame_active');
}

const srcVideo = ['assets/video/video3.mp4',
	'assets/video/video1.mp4',
	'assets/video/video2.mp4',
	'assets/video/video0.mp4',
	'assets/video/video4.mp4']

const posterVideo = ['assets/video/poster3.jpg',
	'assets/video/poster1.jpg',
	'assets/video/poster2.jpg',
	'assets/video/poster0.jpg',
	'assets/video/poster4.jpg']

function updateVideo(index) {
	video.src = srcVideo[index];
	video.poster = posterVideo[index];
}

function switchVideo(event) {
	const index = videoDots.indexOf(event.target);
	const videoWidth = videoSlides[0].width;
	videoSlider.style.left = -(videoWidth * index + (50 * index)) + 'px';

	updateVideo(index);
	currentSlideVideo(index);
	handleDotsVideo(index);
}

videoDots.forEach(dot => dot.addEventListener('click', (event) => switchVideo(event)));





const sliderContainer = document.querySelector('.video__slider_container');



function slideVideo(event) {
	const currentVideo = document.querySelector('.frame_active');

	let index = videoSlides.indexOf(currentVideo);
	const videoWidth = videoSlides[0].width;

	if (event.target.id == 'slider__button_left') {
		(index == 0) ? (index = videoSlides.length - 1) : (index--);
		videoSlider.style.left = -(videoWidth * index + (50 * index)) + 'px';

	}
	else if (event.target.id == 'slider__button_right') {

		(index == videoSlides.length - 1) ? (index = 0) : (index++);
		videoSlider.style.left = -(videoWidth * index + (50 * index)) + 'px';
	}
	updateVideo(index);
	currentSlideVideo(index);
	handleDotsVideo(index);
}

sliderContainer.addEventListener('click', (event) => slideVideo(event));

document.addEventListener('click', (event) => one(event));



const videos = document.querySelectorAll('iframe');
const close = document.querySelector('.close');

function stopVideo(event) {
	const target = event.target;

	if (target.id == 'slider__button_right' || target.id == 'slider__button_left' || target.classList.contains('pagination__dot')) {
		videos.forEach(i => {
			i.src = i.src;
		});
	}
}

sliderContainer.addEventListener('click', (event) => stopVideo(event));