'use strict';

import './styles/style.scss';

import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';
import { Error404 } from './pages/Error404';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Utils } from './utils/Utils';

const homeInstance = new Home();
const settingsSettings = new Settings();
const categoriesInstance = new Categories();
const error404Instance = new Error404();

const headerInstance = new Header();
const footerInstance = new Footer();

const routes = {
  '/': homeInstance,
  '/settings': settingsSettings,
  '/categories': categoriesInstance,
};

const body = document.querySelector('#body');

const router = async () => {
  const header = null || document.getElementById('header');
  const main = null || document.getElementById('main');
  const footer = null || document.getElementById('footer');

  header.innerHTML = await headerInstance.render();
  await headerInstance.after_render();

  footer.innerHTML = await footerInstance.render();
  await footerInstance.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedURL] ? routes[parsedURL] : error404Instance;
  const bodyClass = routes[parsedURL] ? parsedURL.split('/')[1] : 'error';
  const isHome = bodyClass ? false : true;

  main.innerHTML = await page.render();
  await page.after_render();

  body.className = 'body';
  body.classList.add(isHome ? 'home-page' : bodyClass + '-page');
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

console.log(`


Добрый день! Не успела сделать таск, готова только вёрстка.
Если не сложно, оставьте, пожалуйста, контакты (либо проверьте в четверг).
Спасибо за понимание, ничего не успеваю, знаний не хватает.

Желаю успехов на курсе :)



`);
