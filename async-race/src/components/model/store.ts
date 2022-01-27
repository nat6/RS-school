import AppModel from './model';
import { CarType, NewWinnerType } from '../../utils/types';
import { DefaultValues } from '../../utils/enums';

class Store {
  static carsPage = 1;

  static cars: Array<CarType>;

  static carsCount: string;

  static currentCar: number | null = null;

  static currentColor: string = DefaultValues.Color;

  static currentName: string = DefaultValues.Name;

  static newColor: string = DefaultValues.Color;

  static newName: string = DefaultValues.Name;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static animation: any = {}; // object to save animation frames, it can't be typified differently

  static winnersPage = 1;

  static winners: Array<NewWinnerType>;

  static winnersCount: string;

  static sort: string | null = null;

  static order: string | null = null;

  static async updateState(): Promise<void> {
    const carItems = await AppModel.getCars(Store.carsPage);
    Store.carsCount = carItems.count;
    Store.cars = carItems.items;

    let winnerItems;

    if (Store.sort !== null && Store.order !== null) {
      winnerItems = await AppModel.getWinners(Store.winnersPage, Store.sort, Store.order);
    } else {
      winnerItems = await AppModel.getWinners(Store.winnersPage);
    }

    Store.winnersCount = winnerItems.count;
    Store.winners = winnerItems.items;
  }

  static updateWinnersPage(page: number): void {
    Store.winnersPage = page;
  }

  static updateCarsPage(page: number): void {
    Store.carsPage = page;
  }

  static updateCurrentCar(id: number | null): void {
    Store.currentCar = id;
  }
}

Store.updateState();
export default Store;
