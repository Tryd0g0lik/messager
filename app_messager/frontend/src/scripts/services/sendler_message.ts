import time from '@Service/getDataTime';
import { WSocket } from '@Websocket';
const socket = new WSocket('ws://127.0.0.1:8000/ws/chat/');

const handlerSendlerMessageTotal = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
  // debugger
  let fileId = -1;
  const timeItervale = setTimeout(() => {
    handlerSendlerMessageTotal(e);
  }, 300);
  const dataLocalJson = JSON.parse(localStorage.getItem('data') as string);
  if (dataLocalJson.fileId === true) {
    return;
  } else if (!(typeof (dataLocalJson.fileId)).includes('boolen')) {
    clearTimeout(timeItervale);
    fileId = dataLocalJson.fileId;
  }

  console.log('[fileId]: ', fileId);
  // dataLocalJson.fileId = false;
  // localStorage.setItem('data', dataLocalJson);

  const target = e.target as HTMLInputElement;
  const messages = target.value.trim();
  const indexUser = target.dataset.id;
  const datetime = time.getFullTime();
  if (fileId >= 0) {
    socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1', fileIndex: fileId })]));
  } else {
    socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' })]));
  }
  await socket.dataSendNow();

  const inputFormHTML = document.querySelector('input[data-id]');
  if (inputFormHTML !== null) {
    (inputFormHTML as HTMLInputElement).value = '';
  };
};

export default handlerSendlerMessageTotal;
