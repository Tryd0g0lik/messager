import getCookie from '@Service/cookies';
import addQuote from './paste-old-message';
import addEventlistenerToInput from '../add-handler';
import handlerGetMessageOfInput from '../get-messages';

const handlerPencilPost = async (e: MouseEvent): Promise<void> => {
  debugger
  if (!((e.target as HTMLDivElement).className.includes('pencil'))) {
    return;
  }

  const currentTarget = e.currentTarget as HTMLDivElement;
  if ((currentTarget !== null) && !('post' in currentTarget.dataset)) {
    return;
  };
  const postId = currentTarget.dataset.post;
  const userId = currentTarget.dataset.id;
  const csrftoken = getCookie('csrftoken');
  const message = (currentTarget.getElementsByClassName('user-message')[0] as HTMLElement).innerText;

  addQuote(message);

  /* 2/3 added the event listener to the input form . It is change of the listener */
  handlerGetMessageOfInput(sendlerOldMessageTotal);

};
export default handlerPencilPost;
