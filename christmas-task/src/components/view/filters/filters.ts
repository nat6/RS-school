import './filters.scss';
import Data from '../../../data';
import { CardType } from '../../../utils/types';

class Filters {
  isFavorite = false;

  cards: Array<CardType> = Data;

  sortCards(value: string): Array<CardType> {
    if (value === 'sort-name-max') {
      this.cards.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA < nameB ? -1 : 1;
      });
    } else if (value === 'sort-name-min') {
      this.cards.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA > nameB ? -1 : 1;
      });
    } else if (value === 'sort-count-max') {
      this.cards.sort((a, b) => +a.count - +b.count);
    } else if (value === 'sort-count-min') {
      this.cards.sort((a, b) => +b.count - +a.count);
    }
    return this.cards;
  }

  filterCards(elem: HTMLInputElement): Array<CardType> {
    this.isFavorite = elem.checked;

    if (this.isFavorite) {
      // eslint-disable-next-line eqeqeq
      this.cards = Data.filter((el) => el.favorite == true);
    } else {
      this.cards = Data;
    }
    return this.cards;
  }
}

export default Filters;
