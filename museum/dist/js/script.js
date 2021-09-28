function shuffleGallary() {
	const picturesContainer = document.querySelector('.gallery__pictures_container');

	const src = ["assets/img/gallery/gallery1.jpg",
		"assets/img/gallery/gallery2.jpg",
		"assets/img/gallery/gallery3.jpg",
		"assets/img/gallery/gallery4.jpg",
		"assets/img/gallery/gallery5.jpg",
		"assets/img/gallery/gallery6.jpg",
		"assets/img/gallery/gallery7.jpg",
		"assets/img/gallery/gallery8.jpg",
		"assets/img/gallery/gallery9.jpg",
		"assets/img/gallery/gallery10.jpg",
		"assets/img/gallery/gallery111.jpg",
		"assets/img/gallery/gallery12.jpg",
		"assets/img/gallery/gallery13.jpg",
		"assets/img/gallery/gallery14.jpg",
		"assets/img/gallery/gallery15.jpg",
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