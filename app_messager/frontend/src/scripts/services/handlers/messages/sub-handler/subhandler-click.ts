// let h = (e: MouseEvent): void => { };

/**
 * This is only  a logic action after the event click or 'Enter' keybord.
 * @param `h`: `(e: MouseEvent) => void` is function. That is sction after the events
 * @returns void
 */
const eventClickManage = (h: (e: MouseEvent) => void): (e: MouseEvent) => void => {
  return (e: MouseEvent): void => {
    const boxMess = e.currentTarget as HTMLDivElement;
    if ((boxMess === null) && (e.type !== 'submit')) {
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
      // (inputHtml).onclick = h;
      debugger;
      h(e);
      /* ------ Generator event for tag input ------  */
      // const newEvent = new Event('click');
      // (inputHtml).dispatchEvent(newEvent);
      // (inputHtml).onclick = null;
    }
  };
};
export default eventClickManage;
