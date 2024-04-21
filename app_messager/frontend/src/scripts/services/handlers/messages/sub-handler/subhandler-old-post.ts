// app_messager\frontend\src\scripts\services\handlers\messages\sub-handler\subhandler-old-post.ts

import getCookie from '@Service/cookies';
const changeOldPost = async (event: KeyboardEvent | MouseEvent): Promise<object> => {
  /* ------ LocalStorage ------ */
  const localS = localStorage.getItem('data');
  const localSJson = JSON.parse(localS as string);
  localStorage.setItem('data', JSON.stringify(localSJson));
  const postId_ = localSJson.postId;
  const messageInputHtml = document.querySelector('#messager');
  const massage_ = (messageInputHtml !== null) ? (messageInputHtml as HTMLInputElement).value : 'NoN';
  /* ------ Fetch & PATCH for one message which did user be posted & the single column ------ */
  const url = new URL(`api/chat/patch/${Number(postId_)}/`, 'http://127.0.0.1:8000/');

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: String(massage_)
    })
  });

  /* ------ LocalStorage clearing ------ */
  localSJson.postId = '';
  localSJson.userId = '';
  localStorage.setItem('data', JSON.stringify(localSJson));

  if (!response.ok) {
    console.log('[changeOldPost > PATCH] response is not a true');
    return { response: false };
  }
  const reresponseJson = await response.json();
  return reresponseJson as object;
};

export default changeOldPost;
