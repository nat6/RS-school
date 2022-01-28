import AppModel from '../model/model';
import AppView from '../view/view';

import Nav from './Nav/nav';
import Store from '../model/store';

import {
  NewCar, WinnerResponse, CurrentWinner, EngineButtons, RaceButtons, SettingsInputs,
} from '../../utils/types';

import {
  getRandomColor, getRandomName, getDistanceBetweenElements, animation, getNumberId,
} from '../../utils/utils';

import {
  PageIds, ButtonsIds, ButtonsClasses, ClassNames, InputsIds, DefaultValues,
} from '../../utils/enums';

class AppController {
  private readonly model: AppModel;

  private readonly view: AppView;

  private readonly nav: Nav;

  constructor() {
    this.model = new AppModel();
    this.view = new AppView();
    this.nav = new Nav(this.onDataChanged);

    this.listen();
  }

  private onDataChanged = async (hash: string): Promise<void> => {
    await Store.updateState();

    let count = Store.winnersCount;
    let page = Store.winnersPage;
    const carItems = Store.cars;
    const winnerItems = Store.winners;

    if (hash === PageIds.GaragePage) {
      count = Store.carsCount;
      page = Store.carsPage;
    }

    await this.view.render(hash, count, page, carItems, winnerItems);

    if (hash === PageIds.GaragePage) {
      this.handleInputValues();
      this.handleButtonsGarage();

      if (Store.currentCar !== null) {
        const currentElement = document.querySelector(`#${ButtonsClasses.Select}-${Store.currentCar}`) as HTMLElement;
        this.handleSelectCar(currentElement);
      }
    }

    if (hash === PageIds.WinnersPage) {
      this.handleButtonsWinners();
      this.handleSortButtons();
    }
  };

  listen(): void {
    document.body.addEventListener('click', (event) => {
      const current = event.target as HTMLElement;
      const currentId = current.id;
      const currentClass = current.classList;

      if (currentId === ButtonsIds.Create) {
        this.handleCreateCar();
      }
      if (currentId === ButtonsIds.Generate) {
        this.handleGenerateCar();
      }
      if (
        currentClass.contains(`${ButtonsClasses.Select}`)
        && !currentClass.contains(`${ButtonsClasses.ButtonDisabled}`)
      ) {
        this.handleSelectCar(current);
      }
      if (currentId === ButtonsIds.Update && !currentClass.contains(`${ButtonsClasses.ButtonDisabled}`)) {
        this.handleUpdateCar();
      }
      if (currentClass.contains(`${ButtonsClasses.Remove}`)) {
        this.handleDeleteCar(currentId);
      }

      if (
        currentClass.contains(`${ButtonsClasses.Page}`)
        && !currentClass.contains(`${ButtonsClasses.ButtonDisabled}`)
      ) {
        this.handlePages(currentId);
      }
      if (

        currentClass.contains(`${ButtonsClasses.Start}`)
        && !currentClass.contains(`${ButtonsClasses.Start}${ButtonsClasses.Disabled}`)
      ) {
        this.handleStartEngine(currentId);
      }
      if (

        currentClass.contains(`${ButtonsClasses.Stop}`)
        && !currentClass.contains(`${ButtonsClasses.Stop}${ButtonsClasses.Disabled}`)
      ) {
        this.handleStopEngine(currentId);
      }
      if (currentId === ButtonsIds.Race && !currentClass.contains(`${ButtonsClasses.ButtonDisabled}`)) {
        this.handleRaceCar();
      }
      if (currentId === ButtonsIds.Reset && !currentClass.contains(`${ButtonsClasses.ButtonDisabled}`)) {
        this.handleResetCar();
      }
      if (currentId === ButtonsIds.Wins || currentId === ButtonsIds.Time) {
        this.handleSortWinners(current);
      }
    });
  }

  private getSettingsInputs(): SettingsInputs {
    const currentName = document.querySelector(`#${InputsIds.Name}`) as HTMLInputElement;
    const currentColor = document.querySelector(`#${InputsIds.Color}`) as HTMLInputElement;
    const newName = document.querySelector(`#${InputsIds.NewName}`) as HTMLInputElement;
    const newColor = document.querySelector(`#${InputsIds.NewColor}`) as HTMLInputElement;

    return {
      currentName, currentColor, newName, newColor,
    };
  }

  private async handleCreateCar(): Promise<void> {
    const settingsInputs = this.getSettingsInputs();

    const car: NewCar = {
      name: settingsInputs.currentName.value,
      color: settingsInputs.currentColor.value,
    };

    await this.model.createCar(car);

    Store.currentColor = DefaultValues.Color;
    Store.currentName = DefaultValues.Name;

    this.onDataChanged(this.nav.getHash());
  }

  private handleGenerateCar(): void {
    for (let i = 0; i < 100; i++) {
      const currentName = getRandomName();
      const currentColor = getRandomColor();

      const car: NewCar = {
        name: currentName,
        color: currentColor,
      };

      this.model.createCar(car);
    }

    this.onDataChanged(this.nav.getHash());
  }

  private clearSelected(): void {
    const buttons = document.querySelectorAll(`.${ButtonsClasses.Select}`);
    buttons.forEach((button) => button.classList.remove(`${ButtonsClasses.ButtonDisabled}`));
  }

  private handleSelectCar(current: HTMLElement): void {
    this.clearSelected();
    current.classList.add(`${ButtonsClasses.ButtonDisabled}`);

    const id = getNumberId(current.id);
    this.enableUpdateCar();
    Store.updateCurrentCar(id);
  }

  private enableUpdateCar(): void {
    const settingsInputs = this.getSettingsInputs();
    const button = document.querySelector(`#${ButtonsIds.Update}`) as HTMLElement;

    settingsInputs.newName.disabled = false;
    settingsInputs.newColor.disabled = false;
    button.classList.remove(`${ButtonsClasses.ButtonDisabled}`);

    settingsInputs.newName.addEventListener('blur', () => {
      Store.newName = settingsInputs.newName.value;
    });

    settingsInputs.newColor.addEventListener('blur', () => {
      Store.newColor = settingsInputs.newColor.value;
    });
  }

  private handleInputValues(): void {
    const settingsInputs = this.getSettingsInputs();

    settingsInputs.currentName.addEventListener('blur', () => {
      Store.currentName = settingsInputs.currentName.value;
    });

    settingsInputs.currentColor.addEventListener('blur', () => {
      Store.currentColor = settingsInputs.currentColor.value;
    });

    settingsInputs.currentName.value = Store.currentName;
    settingsInputs.currentColor.value = Store.currentColor;
    settingsInputs.newName.value = Store.newName;
    settingsInputs.newColor.value = Store.newColor;
  }

  private async handleUpdateCar(): Promise<void> {
    const settingsInputs = this.getSettingsInputs();
    const id = Store.currentCar as number;

    const car: NewCar = {
      name: settingsInputs.newName.value,
      color: settingsInputs.newColor.value,
    };

    await this.model.updateCar(id, car);
    this.onDataChanged(this.nav.getHash());

    Store.updateCurrentCar(null);
    Store.newName = DefaultValues.Name;
    Store.newColor = DefaultValues.Color;
  }

  private async handleDeleteCar(currentId: string): Promise<void> {
    const id = getNumberId(currentId);

    await this.model.deleteCar(id);
    await this.model.deleteWinner(id);
    this.onDataChanged(this.nav.getHash());
  }

  private async handlePages(currentId: string): Promise<void> {
    if (currentId === ButtonsIds.PrevGarage) {
      Store.carsPage--;
    } else if (currentId === ButtonsIds.NextGarage) {
      Store.carsPage++;
    } else if (currentId === ButtonsIds.PrevWinners) {
      Store.winnersPage--;
    } else {
      Store.winnersPage++;
    }

    await this.onDataChanged(this.nav.getHash());

    if (currentId === ButtonsIds.PrevGarage || currentId === ButtonsIds.NextGarage) {
      this.handleButtonsGarage();
    } else {
      this.handleButtonsWinners();
    }
  }

  private handleButtonsGarage(): void {
    const prev = document.querySelector(`#${ButtonsIds.PrevGarage}`) as HTMLElement;
    const next = document.querySelector(`#${ButtonsIds.NextGarage}`) as HTMLElement;

    if (Store.carsPage === 1) {
      prev.classList.add(`${ButtonsClasses.ButtonDisabled}`);
    }
    if (Store.carsPage >= +Store.carsCount / DefaultValues.CarsLimit) {
      next.classList.add(`${ButtonsClasses.ButtonDisabled}`);
    }
  }

  private handleButtonsWinners(): void {
    const prev = document.querySelector(`#${ButtonsIds.PrevWinners}`) as HTMLElement;
    const next = document.querySelector(`#${ButtonsIds.NextWinners}`) as HTMLElement;

    if (Store.winnersPage === 1) {
      prev.classList.add(`${ButtonsClasses.ButtonDisabled}`);
    }
    if (Store.winnersPage >= +Store.winnersCount / DefaultValues.WinnersLimit) {
      next.classList.add(`${ButtonsClasses.ButtonDisabled}`);
    }
  }

  private getEngineButtons(id: number): EngineButtons {
    const start = document.querySelector(`#${ButtonsClasses.Start}-${id}`) as HTMLElement;
    const stop = document.querySelector(`#${ButtonsClasses.Stop}-${id}`) as HTMLElement;
    const carImg = document.querySelector(`#${ClassNames.CarImg}-${id}`) as HTMLElement;
    const flag = document.querySelector(`#${ClassNames.Flag}-${id}`) as HTMLElement;

    return {
      start, stop, carImg, flag,
    };
  }

  private async handleStartEngine(currentId: string): Promise<WinnerResponse> {
    const id = getNumberId(currentId);
    const engineButtons = this.getEngineButtons(id);

    engineButtons.start.classList.add(`${ButtonsClasses.Start}${ButtonsClasses.Disabled}`);
    engineButtons.stop.classList.remove(`${ButtonsClasses.Stop}${ButtonsClasses.Disabled}`);

    const htmlDistance = Math.floor(getDistanceBetweenElements(engineButtons.carImg, engineButtons.flag)) + 90;

    const { velocity, distance } = await this.model.startEngine(id);
    const time = Math.round(distance / velocity);

    Store.animation[id] = animation(engineButtons.carImg, htmlDistance, time);
    const { success } = await this.model.drive(id);

    if (!success) {
      window.cancelAnimationFrame(Store.animation[id].id);
    }

    return { success, id, time };
  }

  private async handleStopEngine(currentId: string): Promise<void> {
    const id = getNumberId(currentId);
    const engineButtons = this.getEngineButtons(id);

    await this.model.stopEngine(id);

    engineButtons.start.classList.remove(`${ButtonsClasses.Start}${ButtonsClasses.Disabled}`);
    engineButtons.stop.classList.add(`${ButtonsClasses.Stop}${ButtonsClasses.Disabled}`);
    engineButtons.carImg.style.transform = 'translateX(0)';

    if (Store.animation[id]) {
      window.cancelAnimationFrame(Store.animation[id].id);
    }
  }

  private async getWinner(promises: Promise<WinnerResponse>[], ids: Array<number>): Promise<CurrentWinner> {
    const winner = await Promise.race(promises);

    if (!winner.success) {
      const failedIndex = ids.findIndex((i) => i === winner.id);
      const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
      const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];

      return this.getWinner(restPromises, restIds);
    }

    const currentWinner = { ...Store.cars.find((car) => car.id === winner.id) };

    const name = currentWinner.name || `Car ${winner.id}`;
    const time = (winner.time / 1000).toFixed(2);
    const { id } = winner;

    return { name, time, id };
  }

  private getRaceButtons(): RaceButtons {
    const race = document.querySelector(`#${ButtonsIds.Race}`) as HTMLElement;
    const reset = document.querySelector(`#${ButtonsIds.Reset}`) as HTMLElement;
    const message = document.querySelector(`#${ClassNames.Message}`) as HTMLElement;

    return { race, reset, message };
  }

  private async handleRaceCar(): Promise<void> {
    const raceButtons = this.getRaceButtons();

    raceButtons.race.classList.add(`${ButtonsClasses.ButtonDisabled}`);
    raceButtons.reset.classList.remove(`${ButtonsClasses.ButtonDisabled}`);

    const cars = Store.cars.map((obj) => obj.id);
    const promises = Store.cars.map((obj) => this.handleStartEngine(`${ButtonsClasses.Start}-${obj.id}`));

    const winner = await this.getWinner(promises, cars);
    await this.model.saveWinner(winner.id, +winner.time);

    if (!raceButtons.reset.classList.contains(`${ButtonsClasses.ButtonDisabled}`)) {
      raceButtons.message.innerText = `${winner.name} went first (${winner.time}s)!`;
      raceButtons.message.classList.remove(`${ClassNames.Message}${ClassNames.Hidden}`);

      setTimeout(() => this.hideMessage(), 8000);
    }
  }

  private hideMessage(): void {
    const raceButtons = this.getRaceButtons();
    raceButtons.message.classList.add(`${ClassNames.Message}${ClassNames.Hidden}`);
  }

  private async handleResetCar(): Promise<void> {
    this.hideMessage();
    const raceButtons = this.getRaceButtons();

    raceButtons.race.classList.remove(`${ButtonsClasses.ButtonDisabled}`);
    raceButtons.reset.classList.add(`${ButtonsClasses.ButtonDisabled}`);

    const cars = Store.cars.map((obj) => `${ButtonsClasses.Start}-${obj.id}`);
    cars.forEach((id) => this.handleStopEngine(id));
  }

  private async updateSortInfo(element: HTMLElement): Promise<void> {
    if (element.id !== Store.sort) {
      Store.order = null;
      Store.sort = null;
    }

    if (element.id === ButtonsIds.Wins) {
      Store.sort = `${ButtonsIds.Wins}`;
    } else {
      Store.sort = `${ButtonsIds.Time}`;
    }

    if (Store.order === null) {
      Store.order = `${ButtonsClasses.ASC}`;
    } else if (Store.order === `${ButtonsClasses.ASC}`) {
      Store.order = `${ButtonsClasses.DESC}`;
    } else {
      Store.order = null;
      Store.sort = null;
    }

    await this.onDataChanged(this.nav.getHash());
  }

  private async handleSortButtons(): Promise<void> {
    if (Store.order !== null || Store.sort !== null) {
      const currentElement = document.querySelector(`#${Store.sort}`) as HTMLElement;
      const currentOrder = `${ButtonsClasses.Sort}-${Store.order}`;

      currentElement.classList.add(currentOrder);
    }
  }

  private async handleSortWinners(element: HTMLElement): Promise<void> {
    await this.updateSortInfo(element);
    this.handleSortButtons();
  }
}

export default AppController;
