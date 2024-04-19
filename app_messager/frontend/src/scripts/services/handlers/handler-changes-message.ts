import getCookie from "@Service/cookies";

const handlerPencilOfMesseg = async (e: MouseEvent): Promise<void> => {
  const target = e.target as HTMLDivElement;
  const divHtml = target.parentElement.parentElement;
  if ((divHtml === null) || ((divHtml !== null) && !('post' in divHtml.dataset))) {
    return;
  };
  const postId = divHtml.dataset.post;
  const userId = divHtml.dataset.id;
  // debugger;

  const csrftoken = getCookie('csrftoken');
  // fetch(url, {
  //   credentials: "same-origin"
  // });
  const url = new URL('api/chat/patch/404/', 'http://127.0.0.1:8000/');
  // url.searchParams.set('ind', String(filesId));
  // 2024-04-18-08:25:56.059718
  'http://127.0.0.1:8000/api/chat/patch/404/'
  debugger;
  const response = await fetch(url, {

    method: 'PATCH',
    headers: {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: '{ "2024-4-17@4:15:10 PM": "ds" }'
    })
  });
};
export default handlerPencilOfMesseg;
