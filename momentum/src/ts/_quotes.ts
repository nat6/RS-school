import returnLang from "./_language";

const quoteBox = document.querySelector('.quote');
const authorBox = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');


function getQuoteNum(max:number, current:number):number {
  const num = Math.floor(Math.random() * max);
  if (num === current) getQuoteNum(max, current);
  return num;
}


export default async function getQuotes() {
  let lang = returnLang();

  let quotes = 'json/data-en.json';
  if (lang == 'ru') quotes = 'json/data-ru.json';

  const res = await fetch(quotes);
  const data = await res.json();
  let current = getQuoteNum(data.length, -1);

  const num = getQuoteNum(data.length, current);
  current = num;

  if (quoteBox) quoteBox.textContent = data[num].text;
  if (authorBox) authorBox.textContent = data[num].author;
}

window.addEventListener('load', getQuotes);
quoteButton?.addEventListener('click', getQuotes);