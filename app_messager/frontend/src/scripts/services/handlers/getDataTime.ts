function zeroDateTime(): Date {
  const currentdate = new Date();
  return currentdate;
}

/**
 * @returns '13:02"
 */
function getNowTime(): string {
  const currentdate = zeroDateTime();
  const time = currentdate.getHours().toLocaleString('en-US') + ':' +
    currentdate.getMinutes();
  return time;
}

/**
 * @returns '2020-02-21'
 */
function getNowDate(): string {
  const currentdate = zeroDateTime();
  const date = currentdate.getFullYear() + '-' +
    (currentdate.getMonth() + 1) + '-' +
    currentdate.getDate();
  return date;
}

/**
 * @returns "532"
 */
function getMowMultiSecond(): string {
  const currentdate = zeroDateTime();
  const multis = currentdate.getMilliseconds();
  return String(multis);
}

/**
 * @returns 2020-02-21@11:02:23 PM'
 */
function getFullTime(): string {
  const dt = zeroDateTime();
  const datetime = getNowDate() + '@' + dt.toLocaleTimeString('en-US');
  return datetime;
}

export default { getNowTime, getNowDate, getFullTime, getMowMultiSecond };
