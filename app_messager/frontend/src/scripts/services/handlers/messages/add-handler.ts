import handlerUploadFiles from '@Service/upload_files';

/**
 * @param 'repeat:boolean' If 'fals' this means added the handlerUploadFiles'. This handler is run when text needs to be created.
 * Then a 'true' is edit text/
 * @param 'h' is a handler function.
 * @param repeat void/
 */
const addEventlistenerToInput = (h: (e: KeyboardEvent | MouseEvent) => void, repeat = false): void => {
  const messageFormHTML = document.querySelector('input[name="messager"]');
  if ((messageFormHTML !== null && (messageFormHTML as HTMLInputElement).value.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))) {
    (messageFormHTML as HTMLInputElement).addEventListener('keypress', h);
  }

  const buttonHTML = document.querySelector('button[data-id]');
  (buttonHTML as HTMLButtonElement).onclick = h;
  if (!repeat) {
    /**
     * Below is function for handler the event  of uploading file to the server
     * @return void
     */
    handlerUploadFiles();
  }
};

export default addEventlistenerToInput;
