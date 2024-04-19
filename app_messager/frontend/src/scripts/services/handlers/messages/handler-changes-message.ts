import getCookie from '@Service/cookies';
import addQuote from '@Service/handlers/messages/chang-message';

const handlerPencilOfMesseg = async (e: MouseEvent): Promise<void> => {
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
  const url = new URL('api/chat/patch/404/', 'http://127.0.0.1:8000/');
  // url.searchParams.set('ind', String(filesId));
  // 2024-04-18-08:25:56.059718
  'http://127.0.0.1:8000/api/chat/patch/404/';
  debugger;
  //   const response = await fetch(url, {

  //     method: 'PATCH',
  //     headers: {
  //       'X-CSRFToken': getCookie('csrftoken'),
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       content: '{ "2024-4-17@4:15:10 PM": "ds" }'
  //     })
  //   });
};
export default handlerPencilOfMesseg;
