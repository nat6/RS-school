const quoteBox = document.querySelector('.quote');
const authorBox = document.querySelector('.author');
const quoteButton = document.querySelector('.change-quote');


function getQuoteNum(max:number, current:number):number {
  const num = Math.floor(Math.random() * max);
  if (num === current) getQuoteNum(max, current);
  return num;
}


async function getQuotes() {
  const quotes = 'json/data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  let current = getQuoteNum(data.length, -1);

  const num = getQuoteNum(data.length, current);
  current = num;

  if (quoteBox) quoteBox.textContent = data[num].text;
  if (authorBox) authorBox.textContent = data[num].author;
}
getQuotes();

quoteButton?.addEventListener('click', getQuotes);