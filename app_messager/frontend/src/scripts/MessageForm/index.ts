// frontend\src\scripts\MessageForm\index.ts

import handlerSendlerMessageTotal from '@Service/sendler_message';
import handlerUploadFiles from '@Service/upload_files';
let APP_WS_URL = process.env.APP_WS_URL;

if (APP_WS_URL === undefined) {
  APP_WS_URL = '';
};

/**
 * Here a handler function, it is message sendler  from the form chat input/
 * @param void
 */
const handlerGetMessageOfInput = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
  const buttonHTML = document.querySelector('button[data-id]');
  const target = e.target as HTMLInputElement;
  const messages = ((target.value).length > 0) ? target.value.trim() : '';
  /* ------ Keyboard ------ */
  // debugger
  if ((messages.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))) {
    if ((e as KeyboardEvent).key === 'Enter') {
      await handlerSendlerMessageTotal(e as KeyboardEvent);
    }
    /* ------ MouseEvent ------ */
    // buttonHTML?.removeEventListener('click', () => { handlerSendlerMessageTotal(e) });
    (buttonHTML as HTMLButtonElement).onclick = null;
    (buttonHTML as HTMLButtonElement).onclick = handlerSendlerMessageTotal;
    // buttonHTML?.addEventListener('click', () => { handlerSendlerMessageTotal(e) });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const messageFormHTML = document.querySelector('input[name="messager"]');
  if ((messageFormHTML !== null && (messageFormHTML as HTMLInputElement).value.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))) {
    (messageFormHTML as HTMLInputElement).addEventListener('keypress', handlerGetMessageOfInput);
  }

  const buttonHTML = document.querySelector('button[data-id]');
  (buttonHTML as HTMLButtonElement).onclick = handlerSendlerMessageTotal;
  /**
 * Below is function for handler the event  of uploading file to the server
 * @return void
 */
  handlerUploadFiles();
});
