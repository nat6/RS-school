import './card.scss';

class Card {
  readonly name!: string;

  readonly num!: string;

  readonly count!: string;

  readonly year!: string;

  readonly shape!: string;

  readonly color!: string;

  readonly size!: string;

  readonly favorite!: boolean;

  constructor(
    name: string,
    num: string,
    count: string,
    year: string,
    shape: string,
    color: string,
    size: string,
    favorite: boolean,
  ) {
    this.name = name;
    this.num = num;
    this.count = count;
    this.year = year;
    this.shape = shape;
    this.color = color;
    this.size = size;
    this.favorite = favorite;
  }

  createCard(): HTMLElement {
    const card = document.createElement('div');
    card.className = 'toys__card';
    card.id = this.num;
    card.innerHTML = `
      <h3 class="card__name">${this.name}</h3>
      <img class="card__img" src="./assets/toys/${this.num}.png" alt="игрушка" />
      <p class="card__count card__text">Количество: <span class='card__info'>${this.count}</span></p>
      <p class="card__year card__text">Год покупки: <span class='card__info'>${this.year}</span></p>
      <p class="card__shape card__text">Форма: <span class='card__info'>${this.shape}</span></p>
      <p class="card__color card__text">Цвет: <span class='card__info'> ${this.color}</span></p>
      <p class="card__size card__text">Размер: <span class='card__info'> ${this.size}</span></p>
      <p class="card__favorite card__text">Любимая: <span class='card__info'> ${this.isFavorite()}</span></p>
      <div class="card__star icon"></div>
    `;
    return card;
  }

  isFavorite(): string {
    return this.favorite ? 'да' : 'нет';
  }
}

export default Card;

// import { Author } from '../../../utils/types';
// import INews from '../../../utils/interfaces/INews';

// class News implements INews {
//   draw(data: Author[]): void {
//     const news = data.length >= 10 ? data.filter((_item: Author, idx: number) => idx < 10) : data;

//     const fragment = document.createDocumentFragment();
//     const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

//     news.forEach((item: Author, idx: number) => {
//       const newsClone = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);

//       if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

//       (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
//         item.urlToImage || 'img/news_placeholder.jpg'
//       })`;
//       (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
//       (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
//         .slice(0, 10)
//         .split('-')
//         .reverse()
//         .join('-');

//       (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
//       (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
//       (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
//       (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

//       fragment.append(newsClone);
//     });

//     (document.querySelector('.news') as HTMLElement).innerHTML = '';
//     document.querySelector('.news')?.appendChild(fragment);
//   }
// }

// export default News;
