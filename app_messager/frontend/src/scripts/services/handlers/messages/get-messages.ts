/**
 * Here is a function. In to the entry point inserting 'h-variable'. and return the handler function.
 * @param 'h' is a handler function. It a handler function - the sendler of the message from the input chat's text.
 * @param void
 */
const handlerGetMessageOfInput = (h: (e: KeyboardEvent | MouseEvent) => Promise<void>) => {
  return async (e: KeyboardEvent | MouseEvent): Promise<void> => {
    const buttonHTML = document.querySelector('button[data-id]');
    const target = e.target as HTMLInputElement;
    const messages = ((target.value).length > 0) ? target.value.trim() : '';
    /* ------ Keyboard ------ */
    if ((messages.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))) {
      if ((e as KeyboardEvent).key === 'Enter') {
        await h(e as KeyboardEvent);
      }
      /* ------ MouseEvent ------ */
      (buttonHTML as HTMLButtonElement).onclick = null;
      (buttonHTML as HTMLButtonElement).onclick = h;
    }
  };
};

export default handlerGetMessageOfInput;
