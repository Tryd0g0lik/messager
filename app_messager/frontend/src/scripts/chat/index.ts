// app_messager\frontend\src\scripts\chat\index.ts

import handlerSendlerMessageTotal from '@Service/postmen/sendler_message';
import handlerGetMessageOfInput from '@Service/handlers/messages/get-messages';

let APP_WS_URL = process.env.APP_WS_URL;

if (APP_WS_URL === undefined) {
  APP_WS_URL = '';
};

document.addEventListener('DOMContentLoaded', () => {
  /* ------ 1/3 added the event listener to the input form . ------ */
  handlerGetMessageOfInput(handlerSendlerMessageTotal());
});
