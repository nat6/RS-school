export default function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  const timeOfDayArray:string[] = ['morning', 'afternoon', 'evening', 'night'];
  const timeOfDay = timeOfDayArray[Math.floor(hours / 6) - 1];

  return timeOfDay;
}