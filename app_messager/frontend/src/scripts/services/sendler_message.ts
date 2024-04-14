import time from '@Service/getDataTime';
import { WSocket } from '@Websocket';
const socket = new WSocket('ws://127.0.0.1:8000/ws/chat/');

const handlerSendlerMessageTotal = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
  // debugger

  const target = e.target as HTMLInputElement;
  const messages = target.value.trim();
  const indexUser = target.dataset.id;
  const datetime = time.getFullTime();
  socket.beforeSend(String([JSON.stringify({ eventtime: datetime, message: messages, userId: indexUser, groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1' })]));
  await socket.dataSendNow();

  const inputFormHTML = document.querySelector('input[data-id]');
  if (inputFormHTML !== null) {
    (inputFormHTML as HTMLInputElement).value = '';
  };
};

export default handlerSendlerMessageTotal;
