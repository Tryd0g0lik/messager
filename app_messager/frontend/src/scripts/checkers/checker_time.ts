// app_messager\frontend\src\scripts\templates\checker_time.ts
import time from '@Service/handlers/getDataTime';

export default function checkOfTime(dateTime: string): string {
  // (([0-9]{1,4})|-|[0-9]{2}){10}([a-z])([0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3})
  let oldDate;
  let t;
  if (dateTime.includes('@')) {
    oldDate = dateTime.split('@')[0];
    t = (dateTime.split('@'))[1];
  } else {
    oldDate = dateTime.split(/[a-zA-Z]/)[0];
    t = (dateTime.split(/[a-zA-Z]/))[1];
  }
  if ((oldDate === undefined) || (t === undefined)) {
    const err = new Error();
    err.name = '[checkOfTime]';
    err.message = 'Something what wrong! Not found a date or time';
    throw err;
  }

  /* ------ Below is a format of date change ------ */
  let checkTime = time.getNowDate();
  if (checkTime.search(/-[0-9]-/) >= 0) {
    const ind = checkTime.search(/-[0-9]-/);
    const newDate = checkTime.slice(0, ind) + '-0' + checkTime.slice(ind + 1);
    checkTime = newDate;
  }
  if (checkTime.search(/-[0-9]$/) >= 0) {
    const ind = checkTime.search(/-[0-9]$/);
    const newDate = checkTime.slice(0, ind) + '-0' + checkTime.slice(ind + 1);
    checkTime = newDate;
  }
  /* ------ checking ------ */
  if (oldDate.includes(checkTime)) {
    return t;
  };
  return oldDate + ' ' + t;
}
