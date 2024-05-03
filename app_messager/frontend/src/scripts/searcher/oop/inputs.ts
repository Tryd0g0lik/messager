/**
* Then we have a common box for form or the form itself and this's form has single:
* - `eventClickManage` method to the field of the input `<input type="text">`.
* - `manageKeyup` mthod to the field of the button (submit) `<button type="submit">`.
* Box is `HTMLDivElement | HTMLFormElement` \
* And this's field receive the event. It's a `click` by submit or press `Enter` keybord one.
* Exemple, this we can see to the chat or searcher. \
* @param `element` that HTML a common box for form or a form itself \
* wich contains the single field an input of the text type. Maybe this a box for form or \
*  the form itself can be contains and html-button of the text type
*/
export class EInput {
  element: HTMLDivElement | HTMLFormElement;
  constructor(element: HTMLDivElement | HTMLFormElement) {
    this.element = element;
  }

  /**
  * That is for  field of the input `<input type="text">`.
  * @param `h`: `(e: MouseEvent) => void` is function wich will beginning \
  * to work after the click by the button.
  * @returns void
  */
  eventClickManage = (h: (e: MouseEvent) => void): (e: MouseEvent) => void => {
    return async (e: MouseEvent): Promise<void> => {
      const boxMess = e.currentTarget as HTMLDivElement;
      if ((boxMess === null) || ((e.target as HTMLButtonElement).type !== 'submit')) {
        return;
      }
      const inputHtml = (boxMess).querySelector('input[type="text"]') as HTMLInputElement;
      if (inputHtml === null) {
        return;
      }

      const messages = ((inputHtml.value).length > 0) ? inputHtml.value.trim() : '';
      if ((messages.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolean'))) {
        /* ------ events clearing ------ */
        if ((e.target as HTMLInputElement).tagName === 'INPUT') {
          return;
        }
        h(e);
      }
    };
  };

  /**
  * That is for - fied of the input `<input type="text">`.
  * @param `h`: `(e: MouseEvent) => void` is function wich will beginning \
  * to work after the click by the kyebord `Enter`.
  * @returns void
  */
  manageKeyup(h: (e: KeyboardEvent) => void) {
    return (e: KeyboardEvent): void => {
      if ((e).key === 'Enter') {
        const target = (e.target as HTMLInputElement);
        const searchWord = ((target.value).length > 0) ? target.value.trim() : '';
        if (searchWord.length > 0) {
          h(e);
        }
      };
    };
  }
}
