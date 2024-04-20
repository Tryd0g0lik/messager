import addQuote from './paste-quote';
import handlerGetMessageOfInput from '../get-messages';
import sendlerOldMessageTotal from './sendler-old-message';
import handlerSendlerMessageTotal from '../sendler_message';

const handlerPencilPost = (e: MouseEvent): undefined => {
  if (!((e.target as HTMLDivElement).className.includes('pencil'))) {
    return;
  }

  const currentTarget = e.currentTarget as HTMLDivElement;
  if ((currentTarget !== null) && !('post' in currentTarget.dataset)) {
    return;
  };
  const postId_ = currentTarget.dataset.post;
  if (postId_ === undefined) {
    console.log('[handlerPencilPost > currentTarget] Datas not found');
    return;
  }
  const userId_ = currentTarget.dataset.id;
  if (userId_ === undefined) {
    console.log('[handlerPencilPost > currentTarget] Datas not found');
    return;
  }
  /* 'message' -thet is old post from the window chat */
  const message = (currentTarget.getElementsByClassName('user-message')[0] as HTMLElement).innerText;

  addQuote(message);
  // debugger
  // const newCastomEvent = new CustomEvent('old', {
  //   detail: {
  //     postId: postId_,
  //     userId: userId_
  //   }
  // });
  if (localStorage.getItem('data') === null) {
    console.log('[handlerPencilPost > localStorage] the "data" from the localStorage not found');
    return;
  }

  const localS = localStorage.getItem('data');
  const localSJson = JSON.parse(localS as string);
  localSJson.postId = postId_;
  localSJson.userId = userId_;
  localStorage.setItem('data', JSON.stringify(localSJson));
  /* below is simply empty the click event */
  const emptyEvent = new MouseEvent('click');

  /* 2/3 added the event listener to the input form . It is change of the listener */
  handlerGetMessageOfInput(sendlerOldMessageTotal(emptyEvent));
  /* 3/3 added the event listener to the input form . It is change of the listener */
  // handlerGetMessageOfInput(handlerSendlerMessageTotal());
};
export default handlerPencilPost;
