// app_messager\frontend\src\scripts\services\handlers\messages\old-message\sendler-old-message.ts
import cleanForm from '@Service/cleaner';
import handlerSendlerMessageTotal from '../sendler_message';
import changeOldPost from '../sub-handler/subhandler-old-post';
import handlerGetMessageOfInput from '../get-messages';

const sendlerOldMessageTotal = (): (e: KeyboardEvent | MouseEvent) => void => {
  const rewriteContentAsy = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
    await changeOldPost(e);

    handlerSendlerMessageTotal(true);
  };

  return (e: KeyboardEvent | MouseEvent): void => {
    rewriteContentAsy(e);
    cleanForm();
    /* 3/3 added the event listener to the input form . It is change of the listener */
    handlerGetMessageOfInput(handlerSendlerMessageTotal());
  };
};

export default sendlerOldMessageTotal;
