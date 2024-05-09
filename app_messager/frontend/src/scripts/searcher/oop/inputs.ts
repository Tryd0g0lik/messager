import { LoacalLocalHead, RequestHeaders } from '@Interfaces';
import getCookie from '@Service/cookies';

/**
* Then we have a common box for form or the form itself and this's form has single:
* - `eventClickManage` method to the field of the input `<input type="text">`.
* - `manageKeyup` mthod to the field of the button (submit) `<button type="submit">`.
* Box is `HTMLDivElement | HTMLFormElement` \
* And this's field receive the event. It's a `click` by submit or press `Enter` keybord one.
* Exemple, this we can see to the chat or searcher. \
* @param `element` that HTML a common box for form or a form itself \
* wich contains the single field an input of the text type. Maybe this a box for form or \
*  the form itself can be contains and html-button of the text type
*/
export class EInput {
  element: HTMLDivElement | HTMLFormElement;
  urls: string | object;
  constructor(element: HTMLDivElement | HTMLFormElement) {
    this.element = element;
    this.urls = '';
  }

  /**
  * That is for  field of the input `<input type="text">`.
  * @param `h`: `(e: MouseEvent) => void` is function wich will beginning \
  * to work after the click by the button.
  * @returns void
  */
  manageClick = (h: (e: MouseEvent) => void): (e: MouseEvent) => void => {
    return async (e: MouseEvent): Promise<void> => {
      const target = (e.target as HTMLDivElement);

      if (target === undefined) {
        return;
      }
      if (!String(target.classList).includes('button-search')) {
        return;
      }

      const boxMess = e.currentTarget as HTMLDivElement;
      if (boxMess === null) {
        return;
      }

      const inputHtml = (boxMess).querySelector('input[type="search"]') as HTMLInputElement;
      if (inputHtml === null) {
        return;
      }
      const messages = ((inputHtml.value).length > 0) ? inputHtml.value.trim() : '';

      if (messages.length > 0) {
        /* ------ events clearing ------ */
        if ((e.target as HTMLInputElement).tagName === 'INPUT') {
          return;
        }

        e.stopPropagation();
        h(e);
      }
    };
  };

  /**
  * That is for - fied of the input `<input type="text">`.
  * @param `h`: `(e: MouseEvent) => void` is function wich will beginning \
  * to work after the click by the kyebord `Enter`.
  * @returns void
  */
  manageKeyup(h: (e: KeyboardEvent) => void) {

    return (e: KeyboardEvent): void => {
      if ((e).key === 'Enter') {
        e.preventDefault();

        const target = (e.target as HTMLInputElement);
        const searchWord = ((target.value).length > 0) ? target.value.trim() : '';
        if (searchWord.length > 0) {
          h(e);
        }
      };
    };
  };

  /**
     * That is a Fetch request.
     * @param `props` of `fGet` is \
     * `{ContentType: string, caches: string|undefined,  modes: string| undefined}`
     * @param `props.caches` by default is `undefined`
     * @param `props.modes` by default is `'application/json;charset=utf-8'`
     * @returns  Promise<object> or Error;
     */
  async get<T>(props: RequestHeaders): Promise<T | boolean> {
    const { contentType, caches = undefined, modes = undefined } = { ...props };
    /* ------ */
    const url = this.urls;
    if (url === undefined) {
      const err = new Error(url);
      err.name = '[EInput > get] GET:';
      throw err;
      // console.log('[FRequeres > fGet]:  Something that wrong with URL -> ', url);
      // return undefined;
    }

    /* ------ */
    const h: LoacalLocalHead = {
      'Content-Type': contentType,
      'X-CSRFToken': getCookie('csrftoken')
    };
    if (caches !== undefined) {
      h.cache = caches;
    }
    if (modes !== undefined) {
      h.mode = modes;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: h
    });
    if (!response.ok) {
      console.log('[EInput > get] GET: Not Found');
      return false;
    }
    const responseJson = await response.json();
    return responseJson;
  }
}
