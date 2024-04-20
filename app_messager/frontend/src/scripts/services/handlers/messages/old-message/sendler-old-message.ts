import { OldData } from '@Interfaces';

import handlerSendlerMessageTotal from '../sendler_message';
import eventClickManage from '../sub-handler/suhandler-click';
import eventKeyupManage from '../sub-handler/subhandler-key';
import changeOldPost from '../sub-handler/subhandler-old-post';

const sendlerOldMessageTotal = (h: (e: KeyboardEvent | MouseEvent) => void): undefined => {
  const messageFormHTML = document.getElementById('message') as HTMLDivElement;
  messageFormHTML.removeEventListener('click', eventClickManage(h));
  messageFormHTML.removeEventListener('keyup', eventKeyupManage(h));

  const result = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
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
    debugger
    const response = await changeOldPost(e);
    handlerSendlerMessageTotal(true);
  };
  messageFormHTML.removeEventListener('click', result);
  messageFormHTML.removeEventListener('keyup', result);
  debugger
  messageFormHTML.addEventListener('click', result);
  messageFormHTML.addEventListener('keyup', result);
};

export default sendlerOldMessageTotal;
