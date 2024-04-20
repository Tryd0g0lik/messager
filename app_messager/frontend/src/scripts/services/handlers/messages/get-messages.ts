import { OldData } from '@Interfaces';
import handlerUploadFiles from '../files/upload_files';
import eventClickManage from './sub-handler/suhandler-click';
import eventKeyupManage from './sub-handler/subhandler-key';
/**
 * Here is a function. In to the entry point inserting 'h-variable' - handler. and return the handler function.
 * This function we use in more than one place and it has different handlers. \
 * Itself variable 'h' is a heandler event the KeyboardEvent | MouseEvent or (KeyboardEvent && MouseEvent). \
 * @param 'h' is a handler function. It, a handler function that is sendler of the message from the input chat's text.
 * @param void
 */
const handlerGetMessageOfInput = (h: () => void): void => {
  const messageFormHTML = document.getElementById('message') as HTMLDivElement;

  /* ------ */
  if ((messageFormHTML !== null)) {
    messageFormHTML.removeEventListener('click', eventClickManage(h));
    messageFormHTML.addEventListener('click', eventClickManage(h));
    /* ------ */

    messageFormHTML.removeEventListener('keyup', eventKeyupManage(h));
    messageFormHTML.addEventListener('keyup', eventKeyupManage(h));
  };

  /**
   * Below is function for handler the event  of uploading file to the server
   * @return void
   */
  handlerUploadFiles();
};

export default handlerGetMessageOfInput;
