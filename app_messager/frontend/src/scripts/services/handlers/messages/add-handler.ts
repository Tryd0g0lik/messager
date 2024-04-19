import handlerUploadFiles from '@Service/handlers/files/upload_files';

/**
 * Here is only added handles 'h' on the input form.
 * @param 'h' is a handler function for a listen Event: KeyboardEvent | MouseEvent.
 */
const addEventlistenerToInput = (h: (e: KeyboardEvent | MouseEvent) => void): void => {
  const messageFormHTML = document.querySelector('input[name="messager"]');
  if ((messageFormHTML !== null && (messageFormHTML as HTMLInputElement).value.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))) {
    (messageFormHTML as HTMLInputElement).addEventListener('keypress', h);
  }

  const buttonHTML = document.querySelector('button[data-id]');
  (buttonHTML as HTMLButtonElement).onclick = h;
  /**
   * Below is function for handler the event  of uploading file to the server
   * @return void
   */
  handlerUploadFiles();

};

export default addEventlistenerToInput;
