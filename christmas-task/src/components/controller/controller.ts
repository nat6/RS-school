import Card from '../view/card/card';
import Toys from '../view/toys/toys';
import Filters from '../view/filters/filters';
import { CardType } from '../../utils/types';
import Data from '../../data';

class AppController {
  readonly toys: Toys;

  readonly filters: Filters;

  constructor() {
    this.toys = new Toys();
    this.filters = new Filters();
  }

  loadCards(cards: Array<CardType> = Data): void {
    const cardContainer = document.querySelector('.toys__items') as HTMLElement;
    cardContainer.innerHTML = '';

    cards.forEach((item) => {
      const {
        name, num, count, year, shape, color, size, favorite,
      } = item;
      const card = new Card(name, num, count, year, shape, color, size, favorite);
      cardContainer.append(card.createCard());
    });
  }

  loadPage(e: Event): void {
    const target = e.target as HTMLElement;
    const body = document.querySelector('#body') as HTMLElement;

    if (target.classList.contains('nav__item')) {
      body.className = `body__${target.id}`;
    }

    if (target.classList.contains('start__button')) {
      body.className = 'body__toys';
    }
  }

  changeSelected(e: Event): void {
    const target = e.target as HTMLElement;
    const currentCard: HTMLElement | null = target.closest('.toys__card');

    if (currentCard && currentCard.classList.contains('toys__card_active')) {
      this.toys.removeSelected(currentCard.id, currentCard);
    } else if (currentCard) {
      this.toys.addSelected(currentCard.id, currentCard);
    }
  }

  test(elem: HTMLInputElement): void {
    console.log(elem.checked);
  }

  updateCards(e: Event): void {
    const target = e.target as HTMLElement;
    const favorite = document.querySelector('.favorite__input') as HTMLInputElement;
    favorite.addEventListener('change', () => {
      const currentCards = this.filters.filterCards(favorite);

      if (currentCards.length > 0) {
        this.loadCards(currentCards);
      } else {
        this.loadCards();
      }
    });
  }

  sortCards(e: Event): void {
    const target = e.target as HTMLSelectElement;

    const currentCards = this.filters.sortCards(target.value);
    this.loadCards(currentCards);
  }
}

export default AppController;
