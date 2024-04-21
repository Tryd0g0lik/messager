import getCookie from '@Service/cookies';
const changeOldPost = async (event: KeyboardEvent | MouseEvent): Promise<object> => {
  /* ------ LocalStorage ------ */
  const localS = localStorage.getItem('data');
  const localSJson = JSON.parse(localS as string);
  localStorage.setItem('data', JSON.stringify(localSJson));
  const postId_ = localSJson.postId;
  const messageInputHtml = document.querySelector('#messager');
  const userId_ = localSJson.userId;
  const massage_ = (messageInputHtml !== null) ? (messageInputHtml as HTMLInputElement).value : 'NoN'; // !!!!! undefinde
  // if (((e as MouseEvent).type !== 'click') || ((e as KeyboardEvent).key !== 'Enter')) {
  //   return;
  // }
  debugger;
  if (((event as MouseEvent).type !== 'click') || ((event as KeyboardEvent).key !== 'Enter')) {
    return {};
  }
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

  /* ------ LocalStorage clearing ------ */
  localSJson.postId = '';
  localSJson.userId = '';
  localSJson.message = '';
  localStorage.setItem('data', JSON.stringify(localSJson));

  debugger
  if (!response.ok) {
    console.log('[changeOldPost > PATCH] response is not a true');
    return { response: false };
  }
  const reresponseJson = await response.json();
  return reresponseJson as object;
};

export default changeOldPost;
