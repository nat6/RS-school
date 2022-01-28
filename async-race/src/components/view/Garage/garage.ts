import Page from '../../../templates/page';
import { CarType } from '../../../utils/types';
import { Components, ClassNames } from '../../../utils/enums';

import Settings from '../Settings/settings';
import Cars from '../Cars/cars';

class Garage extends Page {
  private readonly settings: Settings;

  private readonly cars: Cars;

  protected TextObject = {
    Settings: 'settings',
    Garage: 'garage',
  };

  constructor(idPage: string, count: string, pageNum: number, items: Array<CarType>) {
    super(idPage, Components.Main);
    this.settings = new Settings(Components.Section, this.TextObject.Settings);

    this.cars = new Cars(Components.Section, this.TextObject.Garage, count, pageNum, items);
  }

  protected createHTML(): void {
    const mainContainer = this.createBlock(`${ClassNames.Container} ${ClassNames.MainContainer}`);

    mainContainer.append(this.settings.render(), this.cars.render());
    this.container.append(mainContainer);
  }

  render(): HTMLElement {
    this.createHTML();
    return this.container;
  }
}

export default Garage;
