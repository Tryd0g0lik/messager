import { OldData } from '@Interfaces';

import handlerSendlerMessageTotal from '../sendler_message';
import eventClickManage from '../sub-handler/subhandler-click';
import eventKeyupManage from '../sub-handler/subhandler-key';
import changeOldPost from '../sub-handler/subhandler-old-post';

// const sendlerOldMessageTotal = (h: (e: KeyboardEvent | MouseEvent) => void) => {
const sendlerOldMessageTotal = (): (e: KeyboardEvent | MouseEvent) => void => {
  // const messageFormHTML = document.getElementById('message') as HTMLDivElement;
  // const cloneMessageFormHTML = messageFormHTML.cloneNode(true);
  // messageFormHTML.replaceWith(cloneMessageFormHTML);
  // messageFormHTML.removeEventListener('click', eventClickManage(handlerSendlerMessageTotal()));
  // messageFormHTML.removeEventListener('keyup', eventKeyupManage(handlerSendlerMessageTotal()));
  const rewriteContentAsy = async (e: KeyboardEvent | MouseEvent): Promise<void> => {

    const response = await changeOldPost(e);
    handlerSendlerMessageTotal(true);
  };

  return (e: KeyboardEvent | MouseEvent): void => {
    debugger
    rewriteContentAsy(e);
    // eventClickManage(rewriteContentAsy);
    // messageFormHTML.removeEventListener('click', eventClickManage(rewriteContentAsy));
    // messageFormHTML.removeEventListener('keyup', eventKeyupManage(rewriteContentAsy));

    // messageFormHTML.addEventListener('click', eventClickManage(rewriteContentAsy));
    // messageFormHTML.addEventListener('keyup', eventKeyupManage(rewriteContentAsy));
  };
};

export default sendlerOldMessageTotal;
