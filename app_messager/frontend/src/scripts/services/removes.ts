import { F } from '@Interfaces';
import { WSocket } from '@Websocket';

export default function remove(metaRequest: F): void {
  const socket = new WSocket('ws://127.0.0.1:8000/ws/chat/delete/');
  socket.beforeSend(JSON.stringify(metaRequest));
  socket.dataSendNow();
  let timeout: NodeJS.Timeout;
  if (timeout !== undefined) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    socket.onClose();
  }, 6000);
}
