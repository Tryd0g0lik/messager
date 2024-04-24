// app_messager\frontend\src\scripts\services\postmen\sendler-up-message.ts

import getCookie from '@Service/cookies';
import getTextOfInput from '@Service/message';
const changeOldPost = async (event: KeyboardEvent | MouseEvent): Promise<object> => {
  /* ------ LocalStorage ------ */
  const localS = localStorage.getItem('data');
  const localSJson = JSON.parse(localS as string);
  localStorage.setItem('data', JSON.stringify(localSJson));
  const postId_ = localSJson.postId;
  const files_ = ((typeof localSJson.fileId).includes('string')) ? JSON.parse(localSJson.fileId).list_indexes : false;

  const massage_ = getTextOfInput();
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

  if (!response.ok) {
    console.log('[changeOldPost > PATCH] response is not a true');
    return { response: false };
  }
  const reresponseJson = await response.json();
  return reresponseJson as object;
};

export default changeOldPost;
