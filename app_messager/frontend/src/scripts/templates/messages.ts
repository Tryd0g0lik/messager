import { ChatMessage } from '@Interfaces';
export default function createChatMessage({ userId, dataTime, messageSender, message }: ChatMessage): string {
  return `
        <div data-user-id="${userId}" class="chat-message-left pb-4">
            <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${dataTime}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                <div class="font-weight-bold mb-1">${messageSender}</div>
                ${message}
            </div>
        </div>
    `;
}
