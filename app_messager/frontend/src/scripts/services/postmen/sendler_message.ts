// app_messager\frontend\src\scripts\services\sendler_message.ts

import cleanForm from '@Service/cleaner';
import time from '@Service/handlers/getDataTime';
import getTextOfInput from '@Service/message';
import { Requires } from '@Service/oop/requires';
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
    const url = new URL('api/v1/chat/make/post/', 'http://127.0.0.1:8000/');

    const requires = new Requires(url);

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
    const lstorage = localStorage.getItem('data');
    const pathnamesArr: string[] = ((lstorage !== undefined) && ((lstorage as string).length > 10))
      ? (JSON.parse(lstorage as string).pathnames)
      : [];
    // !!hдобавлен 'pathnames' из цитаты добавить еще файлы которые выбираем в момент редактирования!!!!!!!!!!!!!
    // Есть id файлов при редактировании
    const postIndex = (localStorage.getItem('data') !== null)
      ? (JSON.parse(localStorage.getItem('data') as string).postId)
      : (-1);
    if ((!(typeof postIndex).includes('string')) && postIndex < 0) {
      console.log('[handlerSendlerMessageTotal > corrects TRUE]: something is thrang. That is "postId" not found');
      return;
    }

    if (((typeof fileIdArr).includes('object'))) {
      /* if 'corrects' is 'true' that is message edit */
      // Возможно  Почистить localStorage - после
      if (!corrects) {
        const dataStr = String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileIdArr })]);
        const queryset = await requires.post({ context: dataStr });
        socket.beforeSend(String([JSON.stringify(queryset.data)]));
        await socket.dataSendNow();
      } else {
        const dataStr = String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileIdArr, postId: postIndex, pathnames: pathnamesArr })]);
        // const queryset = await requires.post({ context: dataStr });
        // const url = new URL(`api/v1/chat/update/${postIndex}/`, 'http://127.0.0.1:8000/');
        // const requires = new Requires(url);
        // requires.patch({ files: fileIdArr });
        socket.beforeSend(dataStr);
        await socket.dataSendNow();
      }
    } else {
      if (!corrects) {
        const dataStr = String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' })]);
        const queryset = await requires.post({ context: dataStr });
        debugger
        socket.beforeSend(String([JSON.stringify(queryset.data)]));
        await socket.dataSendNow();
      } else {
        const dataStr = String([JSON.stringify({ corrects, eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', postId: postIndex, pathnames: pathnamesArr })]);
        // const queryset = await requires.post({ context: dataStr });
        socket.beforeSend(dataStr);
        await socket.dataSendNow();
      }
    }

    cleanForm();
  };
};

export default handlerSendlerMessageTotal;
