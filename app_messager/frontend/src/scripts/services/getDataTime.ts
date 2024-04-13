function zeroDateTime(): Date {
  const currentdate = new Date();
  return currentdate;
}
interface T {
  timeStyle: 'short'
}
function getNowTime(): string {
  const currentdate = zeroDateTime();
  const time = currentdate.getHours().toLocaleString('en-US') + ':' +
    currentdate.getMinutes();
  return time;
}

function getNowDate(): string {
  const currentdate = zeroDateTime();
  const date = currentdate.getFullYear() + '-' +
    (currentdate.getMonth() + 1) + '-' +
    currentdate.getDate();
  return date;
}

function getMowMultiSecond(): string {
  const currentdate = zeroDateTime();
  const multis = currentdate.getMilliseconds();
  return String(multis);
}
function getFullTime(): string {
  const dt = zeroDateTime();
  // const datetime = (((dt.getHours()) >= 0) && (dt.getHours() < 12))
  //   ? getNowDate() + '@' + getNowTime() + '@' + getMowMultiSecond() + '@' + ' AM'
  //   : getNowDate() + '@' + getNowTime() + '@' + getMowMultiSecond() + '@' + ' PM';
  const datetime = getNowDate() + '@' + dt.toLocaleTimeString('en-US');
  return datetime;
}

export default { getNowTime, getNowDate, getFullTime, getMowMultiSecond };
