import getCookie from '@Service/cookies';
const changeOldPost = async (event: KeyboardEvent | MouseEvent): Promise<object> => {
  /* ------ LocalStorage ------ */
  const localS = localStorage.getItem('data');
  const localSJson = JSON.parse(localS as string);
  localStorage.setItem('data', JSON.stringify(localSJson));
  const postId_ = localSJson.postId;
  const userId_ = localSJson.userId;
  // if (((e as MouseEvent).type === 'click') || ((e as KeyboardEvent).key === 'Enter')) {
  /* ------ Fetch ------ */
  const csrftoken = getCookie('csrftoken');
  const url = new URL(`api/chat/patch/${Number(postId_)}/`, 'http://127.0.0.1:8000/');
  // url.searchParams.set('ind', String(filesId));
  // }
  // 'http://127.0.0.1:8000/api/chat/patch/404/';
  debugger;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: { //  
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: '{ "2024-4-17@4:15:10 PM": "ds" }',
      userId: userId_

    })
  });

  debugger
  if (!response.ok) {
    console.log('[changeOldPost > PATCH] response is not a true');
    return { response: false };
  }
  const reresponseJson = await response.json();
  // 
  return reresponseJson as object;
};

export default changeOldPost;
