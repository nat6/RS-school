import {
  CarType,
  NewCar,
  CarsResponse,
  EngineResponse,
  DriveResponse,
  WinnersResponse,
  WinnerType,
} from '../../utils/types';

import { DefaultValues } from '../../utils/enums';

class AppModel {
  static base = 'http://localhost:3000';

  static garage = `${AppModel.base}/garage`;

  static winners = `${AppModel.base}/winners`;

  static engine = `${AppModel.base}/engine`;

  static async getCars(_page: number, _limit = DefaultValues.CarsLimit): Promise<CarsResponse> {
    const response = await fetch(`${AppModel.garage}?_page=${_page}&_limit=${_limit}`);
    const currentCount = response.headers.get('X-Total-Count') as string;

    return {
      items: await response.json(),
      count: currentCount,
    };
  }

  static async getCar(id: number): Promise<CarType> {
    return (await fetch(`${AppModel.garage}/${id}`)).json();
  }

  async createCar(car: NewCar): Promise<void> {
    (
      await fetch(AppModel.garage, {
        method: 'POST',
        body: JSON.stringify(car),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  async deleteCar(id: number): Promise<void> {
    (await fetch(`${AppModel.garage}/${id}`, { method: 'DELETE' })).json();
  }

  async updateCar(id: number, car: NewCar): Promise<void> {
    (
      await fetch(`${AppModel.garage}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(car),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  async startEngine(id: number): Promise<EngineResponse> {
    const response = await fetch(`${AppModel.engine}?id=${id}&status=started`, {
      method: 'PATCH',
    });

    return response.json();
  }

  async stopEngine(id: number): Promise<EngineResponse> {
    const response = await fetch(`${AppModel.engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });

    return response.json();
  }

  async drive(id: number): Promise<DriveResponse> {
    const response = await fetch(`${AppModel.engine}?id=${id}&status=drive`, {
      method: 'PATCH',
    }).catch();
    if (response.status !== 200) {
      return {
        success: false,
      };
    }

    return { ...(await response.json()) };
  }

  static async getWinners(
    _page: number,
    _sort: string = DefaultValues.Sort,
    _order: string = DefaultValues.Order,
    _limit = DefaultValues.WinnersLimit,
  ): Promise<WinnersResponse> {
    const response = await fetch(`${AppModel.winners}?_page=${_page}&_limit=${_limit}&_sort=${_sort}&_order=${_order}`);
    const currentCount = response.headers.get('X-Total-Count') as string;
    const winners = await response.json();

    const winnersInfo = await Promise.all(
      winners.map(async (winner: WinnerType) => ({ ...winner, car: await AppModel.getCar(winner.id) })),
    );

    return {
      items: winnersInfo,
      count: currentCount,
    };
  }

  async getWinner(id: number): Promise<WinnerType> {
    return (await fetch(`${AppModel.winners}/${id}`)).json();
  }

  async getWinnerStatus(id: number): Promise<number> {
    return (await fetch(`${AppModel.winners}/${id}`)).status;
  }

  async deleteWinner(id: number): Promise<void> {
    return (await fetch(`${AppModel.winners}/${id}`, { method: 'DELETE' })).json();
  }

  async createWinner(body: WinnerType): Promise<void> {
    return (
      await fetch(AppModel.winners, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
  }

  async updateWinner(id: number, body: WinnerType): Promise<void> {
    return (
      await fetch(`${AppModel.winners}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
  }

  async saveWinner(id: number, time: number): Promise<void> {
    const winnerStatus = await this.getWinnerStatus(id);

    if (winnerStatus === 404) {
      await this.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }
}

export default AppModel;
