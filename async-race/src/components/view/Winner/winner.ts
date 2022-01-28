import Component from '../../../templates/component';
import CarImg from '../../../utils/CarImg';
import { NewWinnerType } from '../../../utils/types';
import { ClassNames } from '../../../utils/enums';

class Winner extends Component {
  private id: number;

  private wins: number;

  private time: number;

  private name: string;

  private color: string;

  constructor(tagName: string, className: string, newWinner: NewWinnerType) {
    super(tagName, className);

    this.id = newWinner.id;
    this.wins = newWinner.wins;
    this.time = newWinner.time;
    this.name = newWinner.car.name;
    this.color = newWinner.car.color;
  }

  protected createHTML(): void {
    const winnerHTML = `
      <tr>
        <td>${this.id}</td>
        <td>
          <svg
            class="${ClassNames.CarImg} ${ClassNames.CarImg}_small"
            id="${ClassNames.CarImg}-${this.container.id}"
            viewBox="0 0 1280.000000 640.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            ${CarImg.generateSVG(`${this.color}`)}
          </svg>
        </td>
        <td>${this.name}</td>
        <td>${this.wins}</td>
        <td>${this.time}</td>
      </tr>
    `;

    this.container.innerHTML = winnerHTML;
  }

  render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default Winner;
