import Component from '../../../templates/component';
import Car from '../Car/car';

import { CarType } from '../../../utils/types';

import {
  Components, ClassNames, ButtonsIds, ButtonsClasses,
} from '../../../utils/enums';

class Cars extends Component {
  private count: string;

  private page: number;

  private cars: Array<CarType>;

  protected TextObject = {
    Cars: 'cars',
    CarItem: 'car',
  };

  constructor(tagName: string, className: string, count: string, pageNum: number, currentCars: Array<CarType>) {
    super(tagName, className);
    this.count = count;
    this.page = pageNum;
    this.cars = currentCars;
  }

  protected createHTML(): void {
    const carsHTML = `
      <h2 class="title">Garage (<span id="garage-count">${this.count}</span>)</h2>
      <h3 class="subtitle">Page #<span id="garage-page">${this.page}</span></h3>
      <div class="${ClassNames.Message} ${ClassNames.Message}${ClassNames.Hidden}" id="${ClassNames.Message}"></div>
    `;

    this.container.innerHTML = carsHTML;
  }

  protected generateCars(): void {
    const carsBlock = this.createBlock(this.TextObject.Cars);

    this.cars.forEach((carObj) => {
      const car = new Car(Components.Div, this.TextObject.CarItem, carObj.id, carObj.name, carObj.color);
      carsBlock.append(car.render());
    });

    this.container.append(carsBlock);
  }

  protected addButtons(): void {
    const buttons = this.createBlock(ClassNames.PageButtons);
    const buttonsHTML = `
      <button class="button ${ButtonsClasses.Page}" id="${ButtonsIds.PrevGarage}">prev</button>
      <button class="button ${ButtonsClasses.Page}" id="${ButtonsIds.NextGarage}">next</button>
    `;

    buttons.innerHTML = buttonsHTML;
    this.container.append(buttons);
  }

  render(): HTMLElement {
    this.createHTML();
    this.generateCars();
    this.addButtons();

    return this.container;
  }
}

export default Cars;
