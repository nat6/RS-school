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
		img.loading = 'lazy';
		picturesContainer.append(img);
	})
}

shuffleGallary();

const progress = document.querySelector('.controls_progress');

progress.addEventListener('input', function () {
	const value = this.value;
	this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

const volume = document.querySelector('.controls_volume');

volume.addEventListener('input', function () {
	const value = this.value;
	this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})


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