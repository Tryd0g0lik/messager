// let h = (e: MouseEvent): void => { };

const eventClickManage = (h: (e: MouseEvent) => void) => {
  return (e: MouseEvent): void => {
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
};
export default eventClickManage;
