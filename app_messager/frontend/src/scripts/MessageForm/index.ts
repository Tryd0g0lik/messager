// frontend\src\scripts\MessageForm\index.ts

import handlerSendlerMessageTotal from '@Service/handlers/messages/sendler_message';
import handlerUploadFiles from '@Service/handlers/files/upload_files';
import addEventlistenerToInput from '@Service/handlers/messages/add-handler';
import handlerGetMessageOfInput from '@Service/handlers/messages/get-messages';

let APP_WS_URL = process.env.APP_WS_URL;

if (APP_WS_URL === undefined) {
  APP_WS_URL = '';
};

document.addEventListener('DOMContentLoaded', () => {

  /* 1/3 added the event listener to the input form . */
  addEventlistenerToInput(handlerGetMessageOfInput(handlerSendlerMessageTotal));
});
