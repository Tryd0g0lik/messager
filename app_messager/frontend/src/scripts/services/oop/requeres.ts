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
   * @param `props` of `fGet` is \
   * `{ContentType: string, caches: string|undefined,  modes: string| undefined}`
   * @returns  Promise<object>;
   */
  async fGet(props: RequestHeaders): Promise<object> {
    const { contentType, caches = undefined, modes = undefined } = { ...props };
    const url = this.urls;
    /* ------ */
    if (url === undefined) {
      console.log('[FRequeres > fGet]:  Something that wrong with URL -> ', url);
      return Promise<{ responce: false }>;
    }
    interface LoacalLocalHead {
      'Content-Type': string
      cache?: string
      mode?: string
    }

    /* ------ */
    let responce: unknown | Promise<object> = {};
    const h: LoacalLocalHead = { 'Content-Type': contentType };
    if (caches !== undefined) {
      h.cache = caches;
    }
    if (modes !== undefined) {
      h.mode = modes;
    }
    try {
      responce = await fetch(url, {
        method: 'GET',
        headers: h
      });
    } catch (error: unknown | object) {
      console.log(`[FRequeres > Request]:  Something that wrong with ERROR.message: ${(error as object).message} and ERROR.name: ${(error as object).name}`);
    } finally {
      return await (responce);
    }
  }
}
