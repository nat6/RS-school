export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type WinnerType = {
  id: number;
  wins: number;
  time: number;
};

export type CurrentWinner = {
  name: string;
  time: string;
  id: number;
};

export type NewWinnerType = {
  id: number;
  wins: number;
  time: number;
  car: CarType;
};

export type WinnersResponse = {
  items: Array<NewWinnerType>;
  count: string;
};

export type NewCar = {
  name: string;
  color: string;
};

export type CarsResponse = {
  items: Array<CarType>;
  count: string;
};

export type WinnerResponse = {
  success: boolean;
  id: number;
  time: number;
};

export type EngineResponse = {
  distance: number;
  velocity: number;
};

export type DriveResponse = {
  success: true | false;
};
