// app_messager\frontend\src\scripts\services\handlers\messages\sub-handler\subhandler-click.ts

/**
 * Then we have a common box for form or itself form and this's form has single:
 * - level of the input `<input type="text">`.
 * - level of the button (submit) `<button type="submit">`.
 * Exemple, this we can see to the chat or searcher.
 * @param `h`: `(e: MouseEvent) => void` is function wich will beginning \
 * to work after the click by the button.
 *
 * @returns void
 */
const eventClickManage = (h: (e: MouseEvent) => void): (e: MouseEvent) => void => {
  return (e: MouseEvent): void => {
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
export default eventClickManage;
