// frontend\src\scripts\MessageForm\index.ts

import handlerSendlerMessageTotal from '@Service/sendler_message';
import uplf from '@Service/upload_files';
let APP_WS_URL = process.env.APP_WS_URL;

if (APP_WS_URL === undefined) {
  APP_WS_URL = '';
};

const getMessageOfInputHandler = async (e: KeyboardEvent | MouseEvent): void => {
  const buttonHTML = document.querySelector('button[data-id]');
  const target = e.target as HTMLInputElement;
  // const handlerUploadFiles = service.handlerUploadFiles;
  const messages = ((target.value).length > 0) ? target.value.trim() : '';

  /* ------ Upload File ------ */
  // handlerUploadFiles(e)
  /* ------ Keyboard ------ */
  if (messages.length > 0) {
    if ((e as KeyboardEvent).key === 'Enter') {
      await handlerSendlerMessageTotal(e);
    }
    /* ------ MouseEvent ------ */
    buttonHTML?.removeEventListener('click', async () => { await handlerSendlerMessageTotal(e) });
    buttonHTML?.addEventListener('click', async () => { await handlerSendlerMessageTotal(e) });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const messageFormHTML = document.querySelector('input[name="messager"]');
  if (messageFormHTML !== null) {
    (messageFormHTML as HTMLInputElement).addEventListener('keypress', getMessageOfInputHandler);
  }
});
// here a handler function  is sendler  from the chat input form was completed
