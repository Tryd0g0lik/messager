import { OldData } from '@Interfaces';

import handlerSendlerMessageTotal from '../sendler_message';
import eventClickManage from '../sub-handler/suhandler-click';
import eventKeyupManage from '../sub-handler/subhandler-key';
import changeOldPost from '../sub-handler/subhandler-old-post';

const sendlerOldMessageTotal = (): void => {
  const messageFormHTML = document.getElementById('message') as HTMLDivElement;
  messageFormHTML.removeEventListener('click', eventClickManage(() => { }));
  messageFormHTML.removeEventListener('keyup', eventKeyupManage(() => { }));

  const result = (e: KeyboardEvent | MouseEvent): void => {
    const inputHtml = (messageFormHTML).querySelector('messager') as HTMLInputElement;
    if (inputHtml === null) {
      return;
    }
    const inputValue = ((inputHtml.value).length > 0) ? inputHtml.value.trim() : '';

    /* ------ LocalStorage for old's message ------ */
    const localS = localStorage.getItem('data');
    const localSJson = JSON.parse(localS as string);
    localSJson.message = inputValue;
    localStorage.setItem('data', JSON.stringify(localSJson));
    debugger;
    const response = changeOldPost(e); // проверить входещее событие пустышку
    handlerSendlerMessageTotal(true);
  };
  messageFormHTML.removeEventListener('click', result);
  messageFormHTML.removeEventListener('keyup', result);
  debugger;
  messageFormHTML.addEventListener('click', result);
  messageFormHTML.addEventListener('keyup', result);
};

export default sendlerOldMessageTotal;
