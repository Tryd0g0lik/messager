// app_messager\frontend\src\scripts\services\sendler_message.ts

import time from '@Service/handlers/getDataTime';
import { WSocket } from '@Websocket';
const socket = new WSocket('ws://127.0.0.1:8000/ws/chat/');

const handlerSendlerMessageTotal = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
  let fileIdArr = [];
  let timeItervale: NodeJS.Timeout;
  // debugger
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

  console.log('[fileId]: ', fileIdArr);

  const target = e.target as HTMLInputElement;
  const messages = target.value.trim();
  const indexUser = target.dataset.id;
  const datetime = time.getFullTime();

  if (((typeof fileIdArr).includes('object'))) {
    socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileIdArr })]));
    await socket.dataSendNow();
  } else {
    socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' })]));
    await socket.dataSendNow();
  }

  /* clearning forms - message */
  const inputFormHTML = document.querySelector('input[data-id]');
  if (inputFormHTML !== null) {
    (inputFormHTML as HTMLInputElement).value = '';
  };

  /* clearning forms - file */
  const formFiles = document.getElementById('upload');
  if (formFiles === null) {
    return;
  }
  const inputFile = formFiles?.querySelector('input[type="file"]');
  if (inputFile !== null) {
    (inputFile as HTMLInputElement).value = '';
  };
};

export default handlerSendlerMessageTotal;
