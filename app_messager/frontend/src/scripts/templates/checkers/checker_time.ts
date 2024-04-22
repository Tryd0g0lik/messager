// app_messager\frontend\src\scripts\templates\checker_time.ts
import time from '@Service/handlers/getDataTime';

export default function checkOfTime(dateTime: string): string {
  const oldDate = dateTime.split('@')[0];
  const t = (dateTime.split('@'))[1];
  if (oldDate.includes(time.getNowDate())) {
    return t;
  };
  const d = (dateTime.split('@'))[0];
  return d + ' ' + t;
}
