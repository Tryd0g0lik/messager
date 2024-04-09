// frontend\src\scripts\MessageForm\index.ts

import { WSocket } from '@Websocket';
let APP_WS_URL = process.env.APP_WS_URL;

if (APP_WS_URL === undefined) {
  APP_WS_URL = '';
};

const roomName = '/chat/';
const socket = new WSocket('ws://127.0.0.1:8000/ws/chat/');
// const chatSocket = new WebSocket('ws://' + window.location.host + '/ws/chat/' + roomName + '/');
// APP_WS_URL + roomName

const getMessageOfInputHandler = (e: KeyboardEvent | MouseEvent): void => {
  const buttonHTML = document.querySelector('button[data-id]');
  const target = e.target as HTMLInputElement;
  const messages = target.value.trim();
  const indexUser = target.dataset.id;

  const sendlerTotal = (): void => {
    socket.beforeSend(String([JSON.stringify({ message: messages, userId: indexUser })]));
    socket.dataSendNow();

    const inputFormHTML = document.querySelector('input[data-id]');
    if (inputFormHTML !== null) {
      (inputFormHTML as HTMLInputElement).value = '';
    };
  };

  /* ------ Keyboard ------ */
  if (messages.length > 0) {
    if ((e as KeyboardEvent).key === 'Enter') {
      sendlerTotal();
    }
    /* ------ MouseEvent ------ */
    buttonHTML?.removeEventListener('click', sendlerTotal);
    buttonHTML?.addEventListener('click', sendlerTotal);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const messageFormHTML = document.querySelector('input[name="messager"]');
  if (messageFormHTML !== null) {
    (messageFormHTML as HTMLInputElement).addEventListener('keypress', getMessageOfInputHandler);
  }
});
// here a handler function  is sendler  from the chat input form was completed
