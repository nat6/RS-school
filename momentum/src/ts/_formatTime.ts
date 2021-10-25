export default function formatTime(timestamp:number):string {
  const hours = Math.floor(timestamp / 60 / 60);
  const minutes = Math.floor(timestamp / 60) - (hours * 60);
  const seconds = Math.floor(timestamp % 60);

  let formatted:string;

  if (hours === 0) {
    formatted = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  } else {
    formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  }

  return formatted;
}