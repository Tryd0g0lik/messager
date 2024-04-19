// app_messager\frontend\src\scripts\templates\messages.ts

import { ChatMessage } from '@Interfaces';
import scrollToBottom from '@Service/handlers/scrolling';
import checkerUserId from './checkers/checkUseId';
import checkOfTime from './checkers/checker_time';
import handlerPencilOfMesseg from '@Service/handlers/messages/handler-changes-message';
/**
 * This's function insert a new message to the chat.
 * @param `userId` - thi's user id of the user who is senter
 * @param 'dataTime' - it's the time then user sends the message.
 * We gets from a data format: "eventtime":"2024-4-13@6:2:14:38"
 * @param `authorId` - This's a name. It's who is sends.
 * @param 'message' - This's the message's text.
 * @returns html-text of a box.
 */
export async function createChatMessage({ authorId, dataTime, message, groupId = undefined, postId = '', filesId = [] }: ChatMessage): Promise<undefined> {
  /*
    we change the group number.
  */
  const groupNumber = document.getElementById('group');
  console.log(`[PUBLIC > FILES]: ${filesId[0]}`);

  if ((groupNumber === null) || (groupId === undefined) ||
    (groupNumber.dataset.groupid === undefined) ||
    (!(groupNumber.dataset.groupid).includes(groupId))
  ) {
    return;
  }
  let linkFilesArr: string[] = [];

  if (filesId.length > 0) {
    /** indexes of the files inserted to the parameters from the URL */
    const url = new URL('api/chat/upload/files/', 'http://127.0.0.1:8000/');
    url.searchParams.set('ind', String(filesId));

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.info('[createChatMessage > LINK]:', data);
      const dataList = (JSON.parse(data.files)).linkList;
      linkFilesArr = dataList.slice(0);
    }
  }

  /**
   * insert the message box in chat
   */
  const htmlChat = (groupNumber as HTMLDivElement).querySelector('#chat');
  if (htmlChat === null) { return }
  const htmlMessage = document.createElement('div');
  if ((message === undefined) ||
    ((typeof message).includes('string') && (message.length === 0) && (filesId.length === 0))) {
    return;
  }

  /*  file's links adding to the message */
  let refer = '<ul>';
  if (linkFilesArr.length > 0) {
    for (let i = 0; i < linkFilesArr.length; i++) {
      const len = linkFilesArr[i].split('/').length;
      const urlOrigin = window.location.origin;
      refer += `<li><a target="_blank" href="${urlOrigin}/media/${linkFilesArr[i].slice(0)}">${(linkFilesArr[i].split('/'))[len - 1]}</a></li>`;
    }
  }

  const resultCheckUser = checkerUserId(authorId);
  if (resultCheckUser !== undefined) { // dataTime.replace(/[: @]/g, '-')
    /* 'postId' - data receeiving from the db's timestamp */
    htmlMessage.dataset.post = postId;
    htmlMessage.innerHTML = `
      <div >
        <img src=" https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman"
          width="40" height="40" />
        <div class="text-muted small text-nowrap mt-2">${checkOfTime(dataTime)}</div>
      </div>
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">${(resultCheckUser) ? 'You' : 'NOT your'}</div>
        <div class='pencil'></div>
        <div class="user-message">
        ${message}
        </div>
      </div>
  `;
    htmlMessage.innerHTML += (refer.length > 10) ? (`<div class="download">${refer}</ul></div>`) : '';

    const rightLeft: string = ((resultCheckUser) ? 'chat-message-right' : 'chat-message-left') as string;
    const res = authorId;
    htmlMessage.setAttribute('data-id', res); // data-user-id
    htmlMessage.className = 'pb-4 message';
    htmlMessage.classList.add(rightLeft);
    const oldChat = htmlChat?.innerHTML;
    const newBox = htmlMessage.outerHTML;
    const combinedHTML = oldChat + newBox;
    htmlChat.innerHTML = '';
    htmlChat.innerHTML = combinedHTML;

    /*  cleaning to the datas */
    filesId = [];
    if (refer.length > 10) {
      localStorage.setItem('data', JSON.stringify({ fileId: false }));
    };
    refer = '<ul>';
  }

  const boxMess = document.querySelector(`div[data-post="${postId}"]`);
  debugger
  if (boxMess !== null) {
    (boxMess as HTMLDivElement).onclick = handlerPencilOfMesseg;
  }
  /**
   * scroll
   */
  scrollToBottom();
}
