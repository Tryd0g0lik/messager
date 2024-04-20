import handlerUploadFiles from '../files/upload_files';

/**
 * Here is a function. In to the entry point inserting 'h-variable' - handler. and return the handler function.
 * This function we use in more than one place and it has different handlers. \
 * Itself variable 'h' is a heandler event the KeyboardEvent | MouseEvent or (KeyboardEvent && MouseEvent). \
 * @param 'h' is a handler function. It, a handler function that is sendler of the message from the input chat's text.
 * @param void
 */
const handlerGetMessageOfInput = (h: (e: KeyboardEvent | MouseEvent) => void): void => {
  const messageFormHTML = document.getElementById('message') as HTMLDivElement;
  const eventClickManage = (e: MouseEvent): void => {
    const boxMess = e.currentTarget as HTMLDivElement;
    if ((boxMess === null) && (e.type !== 'submit')) {
      return;
    }
    const inputHtml = (boxMess).querySelector('input[type="text"]') as HTMLInputElement;
    if (inputHtml === null) {
      return;
    }

    (inputHtml).onclick = null;
    const messages = ((inputHtml.value).length > 0) ? inputHtml.value.trim() : '';
    if ((messages.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolean'))) {
      /* ------ events clearing ------ */
      if ((e.target as HTMLInputElement).tagName === 'INPUT') {
        return;
      }
      (inputHtml).onclick = h;

      /* ------ Generator event for tag input ------  */
      const newEvent = new Event('click');
      (inputHtml).dispatchEvent(newEvent);
      (inputHtml).onclick = null;
    }
  };
  /* ------ */
  if ((messageFormHTML !== null)) {
    messageFormHTML.removeEventListener('click', eventClickManage);
    messageFormHTML.addEventListener('click', eventClickManage);
    /* ------ */
    const eventKeyupManage = (e: KeyboardEvent): void => {
      if ((e).key === 'Enter') {
        const target = (e.target as HTMLInputElement);
        const messages = ((target.value).length > 0) ? target.value.trim() : '';
        if ((messages.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolean'))) {
          h(e);
        }
      };
    };
    messageFormHTML.removeEventListener('keyup', eventKeyupManage);
    messageFormHTML.addEventListener('keyup', eventKeyupManage);
  };

  /**
   * Below is function for handler the event  of uploading file to the server
   * @return void
   */
  handlerUploadFiles();
};

export default handlerGetMessageOfInput;
