// app_messager\frontend\src\scripts\services\handlers\messages\get-messages.ts

import handlerUploadFiles from '../files/upload_files';
import eventClickManage from './sub-handler/subhandler-click';
import eventKeyupManage from './sub-handler/subhandler-key';
/**
 * Here is a function. In to the entry point inserting 'fun-variable' - handler. and return the handler function.
 * This function we use in more than one place and it has different handlers. \
 * Itself variable 'fun' is a heandler event the KeyboardEvent | MouseEvent or (KeyboardEvent && MouseEvent). \
 * @param 'fun' is a handler function. It, a handler function that is sendler of the message from the input chat's text.
 * @param void
 */
const handlerGetMessageOfInput = (fun: ((e: KeyboardEvent | MouseEvent) => void) | (() => void)): void => {
  const messageFormHTML = document.getElementById('message') as HTMLElement;
  /*
  * Atencion!! Here changing  html-element on the copy it. \
  * This action be clearning from is event-listeners \
  * https://typedarray.org/remove-all-event-listeners-from-an-element/
  */
  const cloneMessageFormHTML = messageFormHTML.cloneNode(true);
  messageFormHTML.replaceWith(cloneMessageFormHTML);
  /* ------ */
  if ((messageFormHTML !== null)) {
    (cloneMessageFormHTML as HTMLElement).addEventListener('click', eventClickManage(fun));
    /* ------ */
    (cloneMessageFormHTML as HTMLElement).addEventListener('keyup', eventKeyupManage(fun));
  };

  /**
   * Below is function for handler the event  of uploading file to the server
   * @return void
   */
  handlerUploadFiles();
};

export default handlerGetMessageOfInput;
