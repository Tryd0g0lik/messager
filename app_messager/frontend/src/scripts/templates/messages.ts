import { ChatMessage } from '@Interfaces';
import time from '@Service/getDataTime';

function scrollToBottom(): void {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

function checkOfTime(dateTime: string): string {
  const oldDate = dateTime.split('@')[0];
  const t = (dateTime.split('@'))[1];
  if (oldDate.includes(time.getNowDate())) {
    return t;
  };
  const d = (dateTime.split('@'))[0];
  return d + ' ' + t;
}

function checkYourOnNotYour(userId: string | number): undefined | boolean {
  const inputHtml = document.getElementById('messager');
  if (inputHtml === null) {
    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the "inputHtml"!');
    return;
  }
  const inputUserId = inputHtml.dataset.id;
  if (inputUserId === undefined) {
    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the "inputUserId"!');
    return;
  }
  const userIdNumber = ((typeof userId).includes('string'))
    ? Number(userId)
    : userId;
  const result = (userIdNumber === Number(inputUserId));
  return result;
}

/**
 * This's function insert a new message to the chat.
 * @param `userId` - thi's user id of the user who is senter
 * @param 'dataTime' - it's the time then user sends the message.
 * We gets from a data format: "eventtime":"2024-4-13@6:2:14:38"
 * @param `authorId` - This's a name. It's who is sends.
 * @param 'message' - This's the message's text.
 * @returns html-text of a box.
 */
export function createChatMessage({ authorId, dataTime, message, groupId = undefined }: ChatMessage): undefined {
  /*
    we change the group number.
  */
  const groupNumber = document.getElementById('group');

  if ((groupNumber === null) || (groupId === undefined) ||
    (groupNumber.dataset.groupid === undefined) ||
    (!(groupNumber.dataset.groupid).includes(groupId))
  ) {
    return;
  }
  /**
   * insert the message box in chat
   */
  const htmlChat = (groupNumber as HTMLDivElement).querySelector('#chat');
  if (htmlChat === null) { return }
  const htmlMessage = document.createElement('div');
  // htmlMessage.className = 'pb-4';
  // htmlMessage.setAttribute('user-id', authorId);
  const resultCheckUser = checkYourOnNotYour(authorId);
  if (resultCheckUser !== undefined) {
    htmlMessage.innerHTML = `
      <div>
        <img src=" https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman"
          width="40" height="40" />
        <div class="text-muted small text-nowrap mt-2">${checkOfTime(dataTime)}</div>
      </div>
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">${(resultCheckUser) ? 'You' : 'NOT your'}</div>
        ${message}
      </div>
  `;

    const rightLeft: string = ((resultCheckUser) ? 'chat-message-right' : 'chat-message-left') as string;
    const res = authorId;
    htmlMessage.setAttribute('data-user-id', res);
    htmlMessage.className = 'pb-4';
    htmlMessage.classList.add(rightLeft);
    const oldChat = htmlChat?.innerHTML;
    const newBox = htmlMessage.outerHTML;
    const combinedHTML = oldChat + newBox;
    htmlChat.innerHTML = '';
    htmlChat.innerHTML = combinedHTML;
  }
  /**
   * scroll
   */
  scrollToBottom();
}
