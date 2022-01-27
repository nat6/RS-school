import { AnimationState } from './types';

export function getRandomColor(): string {
  const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return color;
}

export function getRandomName(): string {
  const brands = [
    'Audi',
    'BMW',
    'Ford',
    'Honda',
    'Hyundai',
    'Kia',
    'Lada',
    'Mazda',
    'Mercedes',
    'Mitsubishi',
    'Nissan',
    'Renault',
    'Skoda',
    'Toyota',
    'Volkswagen',
  ];

  const models = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  let model = '';

  for (let i = 0; i < 3; i++) {
    model += models[Math.floor(Math.random() * models.length)];
  }
  return `${brand} ${model}`;
}

function getPositionAtCenter(elem: HTMLElement) {
  const {
    top, left, width, height,
  } = elem.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
  const aPos = getPositionAtCenter(a);
  const bPos = getPositionAtCenter(b);

  return Math.hypot(aPos.x - bPos.x, aPos.y - bPos.y);
}

export function animation(car: HTMLElement, distance: number, animationTime: number): AnimationState {
  let start: number | null = null;
  const state: AnimationState = {};

  function step(timestamp: number) {
    if (!start) {
      start = timestamp;
    }

    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }

  state.id = window.requestAnimationFrame(step);
  return state;
}
