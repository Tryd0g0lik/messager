import { ChatMessage } from '@Interfaces';

/**
 * This's html box for a chat's message
 * @param `userId` - thi's user id of the user who is senter
 * @param 'dataTime' - it's the time then user sends the message.
 * We gets from a data format: "eventtime":"2024-4-13@6:2:14:38"
 * @param `authorId` - This's a name. It's who is sends.
 * @param 'message' - This's the message's text.
 * @returns html-text of a box.
 */
export function createChatMessage({ authorId, dataTime, message }: ChatMessage): string {
  return `
        <div data-user-id="${authorId}" class="chat-message-left pb-4">
            <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${dataTime}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div class="font-weight-bold mb-1">${authorId}</div>
                ${message}
            </div>
        </div>
    `;
}
