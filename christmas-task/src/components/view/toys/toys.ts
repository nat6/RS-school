import './toys.scss';
// import Data from '../../../data';

class Toys {
  selected: string[] = [];

  addSelected(cardNum: string, currentCard: HTMLElement): void {
    // const test = Data.find((card) => card.num === cardNum);
    if (this.checkCount()) {
      this.selected.push(cardNum);
      this.updateCount();
      currentCard.classList.add('toys__card_active');
    } else {
      alert('Извините, все слоты заполнены');
    }
  }

  removeSelected(cardNum: string, currentCard: HTMLElement): void {
    currentCard.classList.remove('toys__card_active');
    const index = this.selected.indexOf(cardNum);
    this.selected.splice(index, 1);
    this.updateCount();
  }

  updateCount(): void {
    const count = document.querySelector('#count') as HTMLElement;
    count.innerHTML = this.selected.length.toString();
  }

  checkCount(): boolean {
    let isAllow = true;
    if (this.selected.length === 20) isAllow = false;
    return isAllow;
  }
}

export default Toys;
