import './news.css';
import { Author } from '../../../utils/types';
import INews from '../../../utils/interfaces/INews';

class News implements INews {
  draw(data: Author[]): void {
    const news = data.length >= 10 ? data.filter((_item: Author, idx: number) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

    news.forEach((item: Author, idx: number) => {
      const newsClone = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);

      if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

      const photo: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
      if (photo) photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

      const author: HTMLElement | null = newsClone.querySelector('.news__meta-author');
      if (author) author.textContent = item.author || item.source.name;

      const date: HTMLElement | null = newsClone.querySelector('.news__meta-date');
      if (date) date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      const title: HTMLElement | null = newsClone.querySelector('.news__description-title');
      if (title) title.textContent = item.title;

      const source: HTMLElement | null = newsClone.querySelector('.news__description-source');
      if (source) source.textContent = item.source.name;

      const content: HTMLElement | null = newsClone.querySelector('.news__description-content');
      if (content) content.textContent = item.description;

      const link: HTMLElement | null = newsClone.querySelector('.news__read-more a');
      if (link) link.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    (document.querySelector('.news') as HTMLElement).innerHTML = '';
    document.querySelector('.news')?.appendChild(fragment);
  }
}

export default News;
