interface RequestHeaders {
  contentType: string
  caches?: string
  modes?: string
}
/**
 * `ContentType` That is basice proporties of the fetch.  Exemple this is `{Content-Type: 'application/json'}`/
 * `caches?` That is basice proporties of the fetch. Exemple this is 'no-caches' /
 * `modes?` That is basice proporties of the fetch. Exemple this is `cors` /
 * MEthods:
 *  - `fGet` Entrypoints is`fGet(props: RequestHeaders)` where \
 * `{ContentType: string, caches: string|undefined,  modes: string| undefined}`
}`
 */
export class FRequeres {
  urls: string | object;
  constructor(url: string | object) {
    this.urls = url;
  }

  /**
   * That is a Fetch request.
   * @param `props` of `fGet` is \
   * `{ContentType: string, caches: string|undefined,  modes: string| undefined}`
   * @param `props.caches` by default is `undefined`
   * @param `props.modes` by default is `undefined`
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
    interface LoacalLocalHead {
      'Content-Type': string
      cache?: string
      mode?: string
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
      console.log('[FRequeres > fGet] GET: Not Found');
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
  async removeFile(): Promise<string> {
    const url = this.urls;
    const response = await fetch(url, {
      method: 'DELETE',
      cache: 'no-cache',
      mode: 'cors'
    });
    // debugger
    if (!response.ok as boolean) {
      const err = new Error(String(response.ok));
      err.name = '[FServices > removeFile]';
    };
    return 'Ok';
  }
}
