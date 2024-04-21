// app_messager\frontend\src\scripts\services\sendler_message.ts

import cleanForm from '@Service/cleaner';
import time from '@Service/handlers/getDataTime';
import { WSocket } from '@Websocket';
const socket = new WSocket('ws://127.0.0.1:8000/ws/chat/');
/**
 *
 * @param 'corrects:boolean' That is 'true' then is event by send the new message. \
 * If value is 'false', than send the old message.  It's a post wich has a correcte
 * @returns Promise<void>
 */
const handlerSendlerMessageTotal = (corrects = false): (e: KeyboardEvent | MouseEvent) => Promise<void> => {
  return async (e: KeyboardEvent | MouseEvent): Promise<void> => {
    let fileIdArr = [];
    let timeItervale: NodeJS.Timeout;
    // debugger
    /* localStorage */
    const dataLocalJson = JSON.parse(localStorage.getItem('data') as string);
    if (dataLocalJson.fileId === true) {
      timeItervale = setTimeout(() => {
        handlerSendlerMessageTotal(e);
      }, 300);
      return;
    } else if (!(typeof (dataLocalJson.fileId)).includes('boolen')) {
      clearTimeout(timeItervale);
      fileIdArr = (JSON.parse(dataLocalJson.fileId)).list_indexes;
    }

    const target = e.target as HTMLInputElement;
    const curranTarget = e.currentTarget as HTMLElement;

    const messages = ((target.type).includes('submit')) ? (curranTarget.querySelector('#messager') as HTMLInputElement).value.trim() : target.value.trim();
    // const messages = target.value.trim();
    const indexUser = target.dataset.id;
    const datetime = time.getFullTime();
    //  && (messageFormHTML as HTMLInputElement).value.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))
    if (((typeof fileIdArr).includes('object'))) {
      if (!corrects) {
        socket.beforeSend(String([JSON.stringify({ corrects: false, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileIdArr })]));
        await socket.dataSendNow();
      } else {
        socket.beforeSend(String([JSON.stringify({ corrects: true, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileIdArr })]));
        await socket.oldDataSendNow(); // ???
      }
    } else {
      if (!corrects) {
        socket.beforeSend(String([JSON.stringify({ corrects: false, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' })]));
        await socket.dataSendNow();
      } else {
        socket.beforeSend(String([JSON.stringify({ corrects: true, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' })]));
        await socket.oldDataSendNow(); // ???
      }
    }

    cleanForm();
  };
};

export default handlerSendlerMessageTotal;
