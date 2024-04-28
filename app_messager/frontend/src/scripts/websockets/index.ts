// app_messager\frontend\src\scripts\websockets\index.ts

import { WSData } from '@Interfaces';
import upOldMessage from '@Service/handlers/messages/old-message/up-message';
import { createChatMessage } from '@htmlTemplates/messages';

/**
 * Класс для работы с "WebSocket" протоколом.
 * Запускает прослушку событий:
 * - 'open';
 * - 'message';
 * -'close'.
 *  Каждое событие запускает фукцию по умолчанию.
 * Каждую функцию можно переписать под свои условия.
 *
 *  Есть фунция зкрытия соединения.
 *  Она возвращает соманду - закрыть соединение.
 */
export class WSocket {
  socket: any;

  handlers: WSData;

  constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', (e: any) => {
      console.info(`[WSocket > OPEN]: ${e}`);
    });

    this.socket.addEventListener('message', (e: any) => {
      console.info(`[WSocket > MESSAGE]: WebSocket - message was received; MESSAGE: ${e.target.url}`);

      this.onMessage(e);
    });

    this.socket.onbeforeunload = function () {
      this.socket.send('ping');
    };

    this.socket.addEventListener('close', (e: any) => {
      console.info(`[WSocket > CLOSE]: - connection was CLOSED: ${e.message}`);
    });

    this.socket.addEventListener('error', (e: any) => {
      console.info(`[WSocket > ERROR]: - connection was ERROR: ${e}`);
    });

    this.handlers = {
      open: [],
      close: [],
      data: []
    };
  }

  /**
   * Here we getting the data for a send.
   * Entry point getting JSON.stringfy
   * @param datas void
   */
  beforeSend(datas: string): void {
    // debugger;
    try {
      if ((typeof JSON.parse(datas)).includes('object')) {
        (this.handlers.data as string[]).push(datas);
      } else {
        console.log('[websokets: SENDS]: Received datas is a not JSON object. ');
      }
    } catch (e: any) {
      console.error(`[websokets: sends ERROR]: Received datas and what went wrong. It is not JSON object. MESSAGE: ${e.message}`);
    }
  };

  get readyState(): typeof this.handlers {
    const handlers = this.handlers;
    return handlers;
  };

  onMessage = (e: any): void => {
    console.log('-------------------');
    const dataJson = JSON.parse(e.data);
    const resp = (dataJson.text !== undefined)
      ? dataJson.text
      : ((e.data as string).includes('groupId')
        ? e.data as string
        : null
      );
    if (resp === null) {
      return;
    };

    const dataTextJson = JSON.parse(resp);
    const message = dataTextJson.message;
    const authorId = String(dataTextJson.userId);
    const postId = String(dataTextJson.postId);

    const groupId = dataTextJson.groupId;
    const dataTime = dataTextJson.eventtime;
    console.log(`[websokets > RECIVED MESS]: ${dataJson}`);
    if (dataTime === undefined) {
      const err = new Error();
      err.name = '[websokets > RECIVED MESS]';
      err.message = 'Something that wrong by the time!';
      throw err;
    }
    const filesId = (dataJson.fileIndex !== undefined) ? dataJson.fileIndex : [];
    if (dataTextJson.corrects !== true) {
      createChatMessage({ authorId, dataTime, message, groupId, postId, filesId });
    } else {
      const postIndex = postId;
      const postMessage = message;
      /* Here '({ filesIndexes: filesId })' part is an async */
      upOldMessage({ postIndex, postMessage })({ filesIndexes: filesId });
    }
  };

  onClose(): void {
    this.socket.close();
  }

  dataSendNow(): undefined | boolean {
    const data = (this.readyState.data.slice(0) as string[])[0];
    console.log('[websokets > OPEN > BEFORE SEND]: Message was a pass - Ok');
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
      console.log('[websokets > OPEN > AFTER SEND]: Ok');
      this.handlers.data.pop();
    } else {
      console.info("[websokets > CLOSE ERROR]:  In Now time can't send message to the WebSocket.WebSocket is closed");
      return false;
    }
  };
}
