// app_messager\frontend\src\scripts\websockets\index.ts

import { WSData } from '@Interfaces';
import upOldMessage from '@Service/handlers/messages/old-message/up-message';
import { Post } from '@Service/oop/post';
import { Push } from '@Service/oop/pushes';
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
      // debugger;
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
      : ((!(e.data as string).includes('remove') &&
        (e.data as string).includes('groupId'))
        ? (e.data as string)
        : (e.data as string).includes('remove')
          ? (e.data as string)
          : null
      );

    if (resp === null) {
      return;
    };

    const dataTextJson = JSON.parse(resp);
    let dataKeys = Array.from(Object.keys(JSON.parse(e.data)));
    let message;
    if ((dataKeys.filter((item) => item.includes('message'))).length > 0) {
      message = dataTextJson.message;
    }
    let authorId;
    if ((dataKeys.filter((item) => item.includes('userId'))).length > 0) {
      authorId = String(dataTextJson.userId);
    }
    let postId;
    if ((dataKeys.filter((item) => item.includes('postId'))).length > 0) {
      postId = String(dataTextJson.postId);
    }

    let groupId;
    if ((dataKeys.filter((item) => item.includes('groupId'))).length > 0) {
      groupId = dataTextJson.groupId;
    }
    let dataTime;
    if ((dataKeys.filter((item) => item.includes('eventtime'))).length > 0) {
      dataTime = dataTextJson.eventtime;
    }
    let fileInd;
    if ((dataKeys.filter((item) => item.includes('fileInd'))).length > 0) {
      fileInd = dataTextJson.fileInd;
    }
    let indexes;
    if ((dataKeys.filter((item) => item.includes('indexes'))).length > 0) {
      indexes = dataTextJson.indexes;
    }
    console.log(`[websokets > RECIVED MESS]: ${dataJson}`);
    if (dataTime === undefined) {
      console.log('[websokets > RECIVED MESS] Something that wrong by the time!');
    }
    const filesId = (dataJson.fileIndex !== undefined) ? dataJson.fileIndex : [];
    /* ------ create the message to the chat ------ */
    if (((dataKeys.filter((item) => item.includes('remove'))).length === 0) &&
      (dataTextJson.corrects !== true) && (authorId !== undefined) &&
      (message !== undefined) && (groupId !== undefined) &&
      (postId !== undefined) && (filesId !== undefined)) {
      createChatMessage({ authorId, dataTime, message, groupId, postId, filesId });
      dataKeys = [];
    } else if (((dataKeys.filter((item) => item.includes('remove'))).length === 0) &&
      (postId !== undefined) && (message !== undefined)) {
      const postIndex = postId;
      const postMessage = message;
      /* ------ Here '({ filesIndexes: filesId })' part is an async ------ */
      upOldMessage({ postIndex, postMessage })({ filesIndexes: filesId });
      dataKeys = [];
    } else if (((dataKeys.filter((item) => item.includes('remove'))).length > 0) &&
      (dataTextJson.remove === true)) {
      /* ------ File removing from the dysplay ------ */
      const postHtml = document.querySelector(`div[data-post="${postId}"]`) as HTMLDivElement;
      const push = new Push(postHtml);
      if (fileInd !== undefined) {
        /* ------ remove the one file ------ */
        if (postHtml === null) {
          const err = new Error();
          err.name = '[websokets > RECIVED MESS]';
          err.message = 'Something that wrong. Post not found into the dysplay!';
          throw err;
        }
        // debugger
        const liHtml = postHtml.querySelector(`li[data-ind="${fileInd}"]`);
        if (postHtml === null) {
          const err = new Error();
          err.name = '[websokets > RECIVED MESS]';
          err.message = 'Something that wrong. File not found into the dysplay!';
          throw err;
        }
        liHtml?.remove(); // delete
        const divHtml = postHtml.querySelector('.download') as HTMLDivElement;
        push.managePostStylesHeight(divHtml);
        dataKeys = [];
        console.log('[websokets > > RECIVED MESS > Removing files]: OK! ');
      } else if (indexes !== undefined) {
        /* ------ remove the ALL file and single post/message  ------ */
        dataKeys = [];
        if (postHtml === null) {
          const err = new Error();
          err.name = '[websokets > RECIVED MESS]';
          err.message = 'Something that wrong. File not found into the dysplay!';
          throw err;
        }
        /* ------ cleaning html ------ */
        if ((postHtml).hasAttribute('data-post')) {
          (postHtml).removeAttribute('data-post');
        }
        if ((postHtml).hasAttribute('data-id')) {
          (postHtml).removeAttribute('data-id');
        }
        postHtml.innerHTML = '<p class="epost remove">Your message has been deletes</p>';
        postHtml.classList.remove('message');
        (postHtml).removeAttribute('style'); // padding = String(0);
        dataKeys = [];
      }
    } else {
      const err = new Error();
      err.name = '[websokets > RECIVED MESS]';
      err.message = "Something that wrong. Can't found datas!";
      throw err;
    }
  };

  onClose(): void {
    this.socket.close();
  }

  async dataSendNow(): Promise<undefined | boolean> {
    const data = (this.readyState.data.slice(0) as string[])[0];
    console.log('[websokets > OPEN > BEFORE SEND]: Message was a pass - Ok');
    let timeout: NodeJS.Timeout;
    if (timeout !== undefined) {
      clearInterval(timeout);
    }
    if (this.socket.readyState === WebSocket.OPEN) {
      await this.socket.send(data);
      console.log('[websokets > OPEN > AFTER SEND]: Ok');
      this.handlers.data.pop();
    } else if (this.socket.readyState === WebSocket.CONNECTING) {
      timeout = setTimeout(() => {
        this.dataSendNow();
      }, 700);
    } else {
      console.info(`[websokets > CLOSE]: the WebSocket is not open In now time. CODE: ${this.socket.readyState}`);
      return false;
    }
  };
}
