import getCookie from '@Service/cookies';
import { LoacalLocalHead, RequestHeaders } from '@Interfaces';

/**
 * `ContentType` That is basice proporties of the fetch.  Exemple this is `{Content-Type: 'application/json'}`/
 * `caches?` That is basice proporties of the fetch. Exemple this is 'no-caches' /
 * `modes?` That is basice proporties of the fetch. Exemple this is `cors` /
 * MEthods:
 *  - `fGet` Entrypoints is`fGet(props: RequestHeaders)` where \
 * `{ContentType: string, caches: string|undefined,  modes: string| undefined}`
}`
 */
export class Requires {
  urls: string | object;
  constructor(url: string | object) {
    this.urls = url;
  }

  async post(props: RequestHeaders): Promise<object | boolean> {
    const { caches = 'no-cache', contentType = 'application/json; charset=utf-8', ...data } = { ...props };

    const url = this.urls;
    if (url === undefined) {
      const err = new Error(url);
      err.name = '[FRequeres > fGet] POST:';
      throw err;
    }

    const h = {
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': contentType
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: h,
      body: data.context
    });

    if (!response.ok) {
      console.log('[FRequeres > post] POST: Not Found');
      return false;
    }

    const responseJson = await response.json();
    return responseJson as object;
  }

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
    const url = this.urls;
    /* ------ */
    if (url === undefined) {
      const err = new Error(url);
      err.name = '[FRequeres > fGet] GET:';
      throw err;
      // console.log('[FRequeres > fGet]:  Something that wrong with URL -> ', url);
      // return undefined;
    }

    /* ------ */
    // let response: unknown | Promise<T> = {};
    const h: LoacalLocalHead = { 'Content-Type': contentType };
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
      console.log('[FRequeres > get] GET: Not Found');
      return false;
    }
    const responseJson = await response.json();
    return responseJson;
  }

  /**
   * `id` for a remove through URL \
   * `api/v1/chat/delete/file/` - for a remove file \
   * Used is `removeFile(index)` or `removeFile(undefined, index)` \
   * @param `index` : `undefined|string' is for one file. That value default have `undefined`
   * @param `indexes` : `undefined|number[]' is for one list files. That value default have `undefined`
   * */
  async delete(): Promise<string> {
    const url = this.urls;
    // debugger
    const response = await fetch(url, {
      method: 'DELETE',
      'X-CSRFToken': getCookie('csrftoken'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cache: 'no-cache',
      mode: 'cors'
    });
    // debugger
    /*   */
    if (!response.ok as boolean) {
      const err = new Error(String(response.ok));
      err.name = '[FServices > removeFile]';
      throw err;
    };
    return 'Ok';
  }

  async patch(props): Promise<object | boolean> {
    const { contents = undefined, files = [] } = { ...props };
    const url = this.urls;
    const obj = ((contents !== undefined) && ((files === undefined) || ((typeof files).includes('object') && (files.length === 0))))
      ? { content: String(contents) }
      : ((((files !== undefined) && ((typeof files).includes('object') && (files.length > 0))) && (contents === undefined)) && ((typeof files).includes('objects')))
        ? { filesId: files }
        : (((files !== undefined) && ((typeof files).includes('object') && (files.length > 0))) && (contents !== undefined))
          ? { filesId: files, content: String(contents) }
          : null;
    const err = new Error();
    err.name = '[Requires > patch]';
    if (obj === null) {
      err.message = 'Something that wrong!';
      throw err;
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': getCookie('csrftoken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });

    if (!response.ok) {
      err.message = 'Something that wrong with "response"!';
    }
    return response;
  }
};
