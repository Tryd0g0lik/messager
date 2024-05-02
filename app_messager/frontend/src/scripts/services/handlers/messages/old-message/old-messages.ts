// app_messager\frontend\src\scripts\services\handlers\messages\old-message\old-messages.ts
import cleanForm from '@Service/cleaner';
import handlerSendlerMessageTotal from '../../../postmen/sendler_message';
import changeOldPost from '../../../postmen/sendler-up-message';
import handlerGetMessageOfInput from '../get-messages';

const manageOldMessageTotal = (): (e: KeyboardEvent | MouseEvent) => void => {
  const rewriteContentAsy = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
    await changeOldPost(e);

    const handler = await handlerSendlerMessageTotal(true);
    await handler(e);
    // /* ------ LocalStorage clearing ------ */
    const localS = localStorage.getItem('data');
    const localSJson = JSON.parse(localS as string);
    localSJson.postId = '';
    localSJson.userId = '';
    localStorage.setItem('data', JSON.stringify(localSJson));
  };

  return (e: KeyboardEvent | MouseEvent): void => {
    rewriteContentAsy(e);
    /* 3/3 added the event listener to the input form . It is change of the listener */
    handlerGetMessageOfInput(handlerSendlerMessageTotal());
  };
};

export default manageOldMessageTotal;
