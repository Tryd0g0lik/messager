import handlerSendlerMessageTotal from './sendler_message';

/**
 * Here a handler function, it is message sendler  from the form chat input/
 * @param void
 */
const handlerGetMessageOfInput = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
  const buttonHTML = document.querySelector('button[data-id]');
  const target = e.target as HTMLInputElement;
  const messages = ((target.value).length > 0) ? target.value.trim() : '';
  /* ------ Keyboard ------ */
  if ((messages.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))) {
    if ((e as KeyboardEvent).key === 'Enter') {
      await handlerSendlerMessageTotal(e as KeyboardEvent);
    }
    /* ------ MouseEvent ------ */
    (buttonHTML as HTMLButtonElement).onclick = null;
    (buttonHTML as HTMLButtonElement).onclick = handlerSendlerMessageTotal;
  }
};

export default handlerGetMessageOfInput;
