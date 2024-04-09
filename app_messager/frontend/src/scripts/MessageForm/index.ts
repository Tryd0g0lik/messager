// frontend\src\scripts\MessageForm\index.ts

import { WSocket } from '@Websocket';
let APP_WS_URL = process.env.APP_WS_URL;

if (APP_WS_URL === undefined) {
  APP_WS_URL = '';
};
const socket = new WSocket(APP_WS_URL);
let oldTextOfMessage = '';

const getMessageOfInputHandler = (e: KeyboardEvent | MouseEvent): void => {
  const buttonHTML = document.querySelector('button[data-id]');
  const target = e.target as HTMLInputElement;
  const message = target.value.trim();
  const indexUser = target.dataset.id;

  const sendlerTotal = (): void => {
    socket.beforeSend(JSON.stringify({ messages: oldTextOfMessage, userId: indexUser }));
    socket.dataSendNow();

    const inputFormHTML = document.querySelector('input[data-id]');
    if (inputFormHTML !== null) {
      (inputFormHTML as HTMLInputElement).value = '';
    };
    oldTextOfMessage = '';
  };

  /* ------ Keyboard ------ */
  if (message.length > 0) {
    if ((e as KeyboardEvent).key === 'Enter') {
      sendlerTotal();
    }
    /* ------ MouseEvent ------ */
    buttonHTML?.removeEventListener('click', sendlerTotal);
    buttonHTML?.addEventListener('click', sendlerTotal);
  }
  oldTextOfMessage = message.slice(0);
};

document.addEventListener('DOMContentLoaded', () => {
  const messageFormHTML = document.querySelector('input[name="messager"]');
  if (messageFormHTML !== null) {
    (messageFormHTML as HTMLInputElement).addEventListener('keypress', getMessageOfInputHandler);
  }
});
// here a handler function  is sendler  from the chat input form was completed
