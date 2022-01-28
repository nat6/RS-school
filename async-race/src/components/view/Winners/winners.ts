import Page from '../../../templates/page';
import Winner from '../Winner/winner';

import { NewWinnerType } from '../../../utils/types';

import {
  Components, ClassNames, ButtonsIds, ButtonsClasses,
} from '../../../utils/enums';

class Winners extends Page {
  private count: string;

  private page: number;

  private winners: Array<NewWinnerType>;

  private readonly mainContainer = this.createBlock(`${ClassNames.Container} ${ClassNames.MainContainer}`);

  protected TextObject = {
    Winners: 'winners',
    Winner: 'winner',
  };

  constructor(id: string, count: string, page: number, winners: Array<NewWinnerType>) {
    super(id, Components.Main);
    this.count = count;
    this.page = page;
    this.winners = winners;
  }

  protected createHTML(): void {
    const winnersHTML = `
      <h2 class="title">Winners (<span id="winners-count">${this.count}</span>)</h2>
      <h3 class="subtitle">Page #<span id="garage-page">${this.page}</span></h3>
    `;

    this.mainContainer.innerHTML = winnersHTML;
  }

  protected generateWinners(): void {
    const winnersTable = document.createElement(Components.Table);
    winnersTable.className = this.TextObject.Winners;

    const tableHTML = `
      <thead class="row__header">
        <tr>
          <th class="cell__header">№</th>
          <th class="cell__header">Car</th>
          <th class="cell__header">Name</th>
          <th class="cell__header button_table" id="${ButtonsIds.Wins}">Wins</th>
          <th class="cell__header button_table" id="${ButtonsIds.Time}">
            Best time<span class="cell__header_small"> (seconds)</span>
          </th>
        </tr>
      </thead>
    `;

    winnersTable.innerHTML = tableHTML;

    const tableBody = document.createElement('tbody');

    this.winners.forEach((winnerObj) => {
      const winner = new Winner(Components.Row, this.TextObject.Winner, winnerObj);
      tableBody.append(winner.render());
    });

    winnersTable.append(tableBody);
    this.mainContainer.append(winnersTable);
  }

  protected addButtons(): void {
    const buttons = this.createBlock(ClassNames.PageButtons);
    const buttonsHTML = `
      <button class="button ${ButtonsClasses.Page}" id="${ButtonsIds.PrevWinners}">prev</button>
      <button class="button ${ButtonsClasses.Page}" id="${ButtonsIds.NextWinners}">next</button>
    `;

    buttons.innerHTML = buttonsHTML;
    this.mainContainer.append(buttons);
  }

  render(): HTMLElement {
    this.createHTML();
    this.generateWinners();
    this.addButtons();
    this.container.append(this.mainContainer);

    return this.container;
  }
}

export default Winners;
