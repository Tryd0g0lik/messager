const sendlerOldMessageTotal = async (e: KeyboardEvent | MouseEvent): Promise<void> => {
  debugger
  const target = e.target as HTMLInputElement;
  const messages = target.value.trim();

  // const postId = target.post;

  // const url = new URL('api/chat/patch/404/', 'http://127.0.0.1:8000/');
  // url.searchParams.set('ind', String(filesId));

  // 'http://127.0.0.1:8000/api/chat/patch/404/';
  // debugger;
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
