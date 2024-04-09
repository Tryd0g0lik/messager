interface WSData {
  open: []
  close: []
  data: []
}
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
      console.info(`[WSocket > MESSAGE]: WebSocket - message was received; MESSAGE: ${e.target.url}, ${e.code}`);

      this.onMessage(e);
    });

    this.socket.addEventListener('close', (e: any) => {
      // if (e.wasClean) { console.log('[websokets > close] : connection was breaked]') }
      // else { console.log('[websokets > close]: - connection was closed]') };
      console.info(`[WSocket > CLOSE]: - connection was CLOSED: ${e.message}`);
      // console.log('[websokets: WebSocket.addEventListener("close") - closed Event]: ', e['message']);
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

  get readyState(): typeof this.socket.handlers {
    const handlers = this.handlers;
    return handlers;
  };

  onMessage = (e): void => {
    console.log('[websokets > OPEN]: - get the MESSAGE: ', e.message);
  };

  onClose(): void {
    this.socket.close();
  }

  dataSendNow(): void {
    const data = (this.readyState.data.slice(0) as string[])[0];
    console.log('[websokets > OPEN]: Message was a pass - Ok', data);
    console.log(`[websokets > OPEN]: Before send. ReadyState: ${this.socket.readyState}`);
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
      console.log('[websokets > OPEN]: After sending - Ok', this.socket.readyState);
      this.handlers.data.pop();
    } else {
      console.info("[websokets > CLOSE ERROR]:  In Now time can't send message to the WebSocket.WebSocket is closed");
    }
  };
}

// WebSocets
