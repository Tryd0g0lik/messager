// app_messager\frontend\src\scripts\services\sendler_message.ts

import cleanForm from '@Service/cleaner';
import time from '@Service/handlers/getDataTime';
import getTextOfInput from '@Service/message';
import { WSocket } from '@Websocket';
const socket = new WSocket('ws://127.0.0.1:8000/ws/chat/');
/**
 *!! ключ группы изменить на динамический !!
 * @param 'corrects:boolean' That is 'true' then is event by send the new message. \
 * If value is 'false', than send the old message.  It's a post wich has a correcte
 * @returns Promise<void>
 */
const handlerSendlerMessageTotal = (corrects = false): (e: KeyboardEvent | MouseEvent) => Promise<void> => {
  return async (e: KeyboardEvent | MouseEvent): Promise<void> => {
    let fileIdArr = [];
    let timeItervale: NodeJS.Timeout;

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
    const curranTarget = (e.currentTarget !== null) ? e.currentTarget as HTMLElement : e.target;

    // const messages = ((target.type).includes('submit')) ? ((curranTarget as HTMLElement).querySelector('#messager') as HTMLInputElement).value.trim() : target.value.trim();
    const messages = getTextOfInput();
    const indexUser = target.dataset.id;
    const datetime = time.getFullTime();
    const postIndex = (localStorage.getItem('data') !== null)
      ? (JSON.parse(localStorage.getItem('data') as string).postId)
      : (-1);
    if (postIndex < 0) {
      console.log('[handlerSendlerMessageTotal > corrects TRUE]: something is thrang. That is "postId" not found');
      return;
    }

    if (((typeof fileIdArr).includes('object'))) {
      if (!corrects) {
        socket.beforeSend(String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileIdArr })]));
        await socket.dataSendNow();
      } else {
        socket.beforeSend(String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileIdArr, postId: postIndex })]));
        await socket.dataSendNow();
      }
    } else {
      if (!corrects) {
        socket.beforeSend(String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' })]));
        await socket.dataSendNow();
      } else {
        socket.beforeSend(String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', postId: postIndex })]));
        await socket.dataSendNow();
      }
    }

    cleanForm();
  };
};

export default handlerSendlerMessageTotal;
