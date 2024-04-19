// frontend\src\scripts\MessageForm\index.ts

import handlerSendlerMessageTotal from '@Service/handlers/messages/sendler_message';
import handlerUploadFiles from '@Service/upload_files';
import addEventlistenerToInput from '@Service/handlers/messages/add-handler';
import handlerGetMessageOfInput from '@Service/handlers/messages/input-form';

let APP_WS_URL = process.env.APP_WS_URL;

if (APP_WS_URL === undefined) {
  APP_WS_URL = '';
};

document.addEventListener('DOMContentLoaded', () => {
  //   const messageFormHTML = document.querySelector('input[name="messager"]');
  //   if ((messageFormHTML !== null && (messageFormHTML as HTMLInputElement).value.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))) {
  //     (messageFormHTML as HTMLInputElement).addEventListener('keypress', handlerGetMessageOfInput);
  //   }

  //   const buttonHTML = document.querySelector('button[data-id]');
  //   (buttonHTML as HTMLButtonElement).onclick = handlerSendlerMessageTotal;
  //   /**
  //  * Below is function for handler the event  of uploading file to the server
  //  * @return void
  //  */
  //   handlerUploadFiles();
  addEventlistenerToInput(handlerGetMessageOfInput);
});
