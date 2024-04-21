// app_messager\frontend\src\scripts\services\handlers\messages\old-message\sendler-old-message.ts
import handlerSendlerMessageTotal from '../sendler_message';
import changeOldPost from '../sub-handler/subhandler-old-post';

const sendlerOldMessageTotal = (): (e: KeyboardEvent | MouseEvent) => void => {
  const rewriteContentAsy = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
    await changeOldPost(e);

    handlerSendlerMessageTotal(true);
  };

  return (e: KeyboardEvent | MouseEvent): void => {
    rewriteContentAsy(e);
  };
};

export default sendlerOldMessageTotal;
