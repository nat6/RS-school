export function getGreetingRu():string {
  const date = new Date();
  const hours = date.getHours();
  let greeting:string = 'Доброй ночи';

  if (hours >= 6 && hours < 12) greeting = 'Доброе утро';
  else if (hours >= 12 && hours < 18) greeting = 'Добрый день';
  else if (hours >= 18 && hours < 24) greeting = 'Добрый вечер';

  return greeting;
}


export function getTimeOfDay():string {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay:string = 'Night';

  if (hours >= 6 && hours < 12) timeOfDay = 'Morning';
  else if (hours >= 12 && hours < 18) timeOfDay = 'Afternoon';
  else if (hours >= 18 && hours < 24) timeOfDay = 'Evening';

  return timeOfDay;
}