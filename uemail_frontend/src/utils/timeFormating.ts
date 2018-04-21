export function formatAMPM(date: Date): string {
  let hours: number = date.getHours();
  let minutes: number | string = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

export function setTime(time: string): string {
  const currentDate = new Date();
  const date = new Date(time);
  const outputDate = date.toDateString().split(' ');
  if (date.getFullYear() === currentDate.getFullYear()) {
    if (date.getDate() === currentDate.getDate()) {
      time = formatAMPM(date);
    } else {
      time = outputDate[1] + ' ' + outputDate[2];
    }
  } else {
    time = outputDate[1] + ' ' + outputDate[2] + ' ' + outputDate[3];
  }
  return time;
}
