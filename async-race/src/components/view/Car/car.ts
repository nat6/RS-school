import Component from '../../../templates/component';
import CarImg from '../../../utils/CarImg';
import { ButtonsClasses, ClassNames } from '../../../utils/enums';

class Car extends Component {
  private name: string;

  private color: string;

  constructor(tagName: string, className: string, id: number, name: string, color: string) {
    super(tagName, className);
    this.container.id = id.toString();
    this.name = name;
    this.color = color;
  }

  protected createHTML(): void {
    const carHTML = `
      <div class="car__row">
        <button class="button button_car ${ButtonsClasses.Select}" id="${ButtonsClasses.Select}-${this.container.id}">
          select
        </button>
        <button class="button button_car ${ButtonsClasses.Remove}" id="${ButtonsClasses.Remove}-${this.container.id}">
          remove
        </button>
        <div class="car__name">${this.name}</div>
      </div>
      <div class="car__row">
        <div class="button button_icon ${ButtonsClasses.Start}" id="${ButtonsClasses.Start}-${this.container.id}"></div>
        <div
          class="button button_icon ${ButtonsClasses.Stop} ${ButtonsClasses.Stop}${ButtonsClasses.Disabled}"
          id="${ButtonsClasses.Stop}-${this.container.id}"
        ></div>
        <svg
          class="${ClassNames.CarImg}"
          id="${ClassNames.CarImg}-${this.container.id}"
          viewBox="0 0 1280.000000 640.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          ${CarImg.generateSVG(`${this.color}`)}
        </svg>
        <div class="${ClassNames.Flag}" id="${ClassNames.Flag}-${this.container.id}"></div>
      </div>
    `;

    this.container.innerHTML = carHTML;
  }

  render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default Car;
