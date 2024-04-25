// app_messager\frontend\src\scripts\services\postmen\sendler-up-message.ts

import getCookie from '@Service/cookies';
import getTextOfInput from '@Service/message';
let APP_MESSAGER_SERVER_URL_ORIGEN = process.env.APP_MESSAGER_SERVER_URL_ORIGEN;
if (APP_MESSAGER_SERVER_URL_ORIGEN === undefined) {
  APP_MESSAGER_SERVER_URL_ORIGEN = window.location.origin;
}
let APP_MESSAGER_SERVER_URL_PORT = process.env.APP_MESSAGER_SERVER_URL_PORT;
if (APP_MESSAGER_SERVER_URL_PORT === undefined) {
  APP_MESSAGER_SERVER_URL_PORT = '8000';
}

const changeOldPost = async (event: KeyboardEvent | MouseEvent): Promise<object> => {
  /* ------ LocalStorage ------ */
  const localS = localStorage.getItem('data');
  const localSJson = JSON.parse(localS as string);
  localStorage.setItem('data', JSON.stringify(localSJson));
  const postId_ = localSJson.postId;
  const files_ = ((typeof localSJson.fileId).includes('string')) ? JSON.parse(localSJson.fileId).list_indexes : false;

  const massage_ = getTextOfInput();
  /* ------ Fetch & PATCH for one message which did user be posted & the single column ------ */

  const domen = ((APP_MESSAGER_SERVER_URL_ORIGEN).split(':').length > 2) ? APP_MESSAGER_SERVER_URL_ORIGEN : APP_MESSAGER_SERVER_URL_ORIGEN + ':' + APP_MESSAGER_SERVER_URL_PORT;
  const url = new URL(`api/chat/patch/${Number(postId_)}/`, domen);

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
