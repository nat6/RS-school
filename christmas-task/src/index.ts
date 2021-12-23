import noUiSlider from 'nouislider';
import App from './components/app/app';
import './global.scss';

const app = new App();
app.start();

const sliderCount = document.querySelector('#slider-count') as HTMLElement;
const sliderYear = document.querySelector('#slider-year') as HTMLElement;

noUiSlider.create(sliderCount, {
  start: [1, 12],
  connect: true,
  behaviour: 'tap',
  step: 1,
  range: {
    min: 1,
    max: 12,
  },
});

noUiSlider.create(sliderYear, {
  start: [1940, 2020],
  connect: true,
  behaviour: 'tap',
  step: 1,
  range: {
    min: 1940,
    max: 2020,
  },
});

console.log(`

Добрый день! Спасибо за отсрочку по таску :)


Самооценка: 65/200

- Страница с игрушками содержит карточки всех игрушек а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10
- Карточка игрушки содержит её изображение, название <...> +10
- Добавление игрушек в избранное +20
- Сортировка +20
- Можно отобразить только любимые игрушки +5

Из фильтров работают только любимые игрушки. Проверить сортировку можно на них.

`);
