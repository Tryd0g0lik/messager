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
  if (messages.length > 0) {
    if ((e as KeyboardEvent).key === 'Enter') {
      await handlerSendlerMessageTotal(e as KeyboardEvent);
    }
    /* ------ MouseEvent ------ */
    buttonHTML?.removeEventListener('click', async () => { await handlerSendlerMessageTotal(e) });
    buttonHTML?.addEventListener('click', async () => { await handlerSendlerMessageTotal(e) });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const messageFormHTML = document.querySelector('input[name="messager"]');
  if (messageFormHTML !== null) {
    (messageFormHTML as HTMLInputElement).addEventListener('keypress', handlerGetMessageOfInput);
  }

  /**
 * Below is function for handler the event  of uploading file to the server
 * @return void
 */
  handlerUploadFiles();
});
