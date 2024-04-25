// app_messager\frontend\src\scripts\services\handlers\files\handler_input-file.ts
// import handlerFileOne from '@Service/handlers/files/deletes';
import { Push } from './pushes';
import { OllDatas, F } from '@Interfaces';
let APP_MESSAGER_SERVER_URL_ORIGEN = process.env.APP_MESSAGER_SERVER_URL_ORIGEN;
let APP_MESSAGER_SERVER_URL_PORT = process.env.APP_MESSAGER_SERVER_URL_PORT;

if (APP_MESSAGER_SERVER_URL_ORIGEN === undefined) {
  APP_MESSAGER_SERVER_URL_ORIGEN = window.location.origin;
}

if (APP_MESSAGER_SERVER_URL_PORT === undefined) {
  APP_MESSAGER_SERVER_URL_PORT = '8000';
}


/**
 * Methods:
 * - `receiveHrefsFiles` It SET-function. By completed received the `readonly this.fileNameArr` it's array of the one public file. 
 * - `receiveHrefsFiles` It GET-function. Returns datas of  `this.fileNameArr`
 * - `receivedDatasetAll` it's array of the one public file. `{ dataPost: string, dataId: string, pathnames: string[] }`
 * - `handlerDeleteFileOne` That is a listener the action click from object `<li>..<div class="bucke">`.
 * - `deletesFetch` That making request for the delete data. Returns `Promis<boolean>`
 */
export class FServices extends Push {
  readonly fileNameArr: string[];
  constructor(name: HTMLDivElement) {
    super(name);
    this.fileNameArr = [];
  }

  /**
   *  On the entrypoint received `box`: `HTMLCollectionOf<HTMLAnchorElement>`. \
    * @params `anchors`: `HTMLCollectionOf<HTMLAnchorElement>`. It's box  -> `<div class='download>`. His contain files for the one message, on the page \
    * Code 'object.receiveMessage = ...'
    * In completed received a `this.fileNameArr`. That is type `string[]`.\
    *
    * The `this.fileNameArr` it's array of the one public file. `{ dataPost: string, dataId: string, pathnames: string[] }`
   */
  set receiveHrefsFiles(anchors: HTMLCollectionOf<HTMLAnchorElement>) {
    const files = anchors;
    for (let i = 0; i < files.length; i++) {
      if ((files[i].href).includes('media/')) {
        const oneHref = 'media/' + files[i].href.split('media/')[1];
        (this.fileNameArr).push(oneHref);
      } else {
        console.log('[FService > files] This reference not is a media file');
      }
    }
  }

  /**
   * @returns it's array of the one public file. `{ dataPost: string, dataId: string, pathnames: string[] }`
   */
  get receiveHrefsFiles(): string[] {
    const result = this.fileNameArr;
    return result;
  }

  /**
   * @returns Data type that 
   * `{
      dataPost: string
      dataId: string
      files: string[]
    }`
   * There: \
   * `dataPost` is data from the html `data-post` \
   * `dataId` is data from the html `data-id` \
   * `files` is  URL datas from the html box `<div class='download>`
   */
  receivedDatasetAll(): OllDatas | undefined {
    const dataset = this.receivedDataset();
    if ((dataset.dataId === undefined) || (dataset.dataPost === undefined)) {
      console.log('[FService > dataTotal] Datas not found');
      return;
    }
    const postId_ = dataset.dataPost;
    const userId_ = dataset.dataId;
    const filesArr = this.receiveHrefsFiles;
    return { dataPost: postId_, dataId: userId_, pathnames: filesArr };
  }

  /**
   * That is a listener the action click from object `<li>..<div class="bucke">`.
   * @param `e`: `MouseEvent`
   * @returns Promise<boolean>
   */
  async handlerDeleteFileOne(e: MouseEvent): Promise<boolean> {
    debugger;
    const target = (e.target as HTMLElement);
    const currentTargetLi = (e.currentTarget as HTMLElement);
    const dataset = (((currentTargetLi.parentElement as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).dataset;
    let path = '' as string;
    if ((String(target.classList).includes('bucke'))) {
      const arr = Array.from(currentTargetLi.childNodes);
      /**
       * `arr` got a much of the different elements. \
       * But here is need get an one
       */
      for (let i = 0; i < arr.length; i++) {
        const htmlElem = (arr[i] as HTMLElement);
        if (String(htmlElem.classList).includes('one-file')) {
          const pathname = (htmlElem as HTMLAnchorElement).href.split('media/');
          path = pathname[pathname.length - 1];
        }
      }

      dataset.pathname = path;
      const metaRequest: F = {
        postId: (dataset.post as string).slice(0),
        userId: (dataset.id as string).slice(0),
        pathname: (dataset.pathname).slice(0)
      };
      debugger
      const falsetrue = await this.deletesFetch(metaRequest);
      (currentTargetLi).remove();
      return true;
    }
    console.log('[FServices > handlerDeleteFileOne] Something that wrong!');
    return false;
  };

  /**
   * In entrypoint receive the proporties a `props`  and making request for the delete data
   * @param `props`: `{ postId: string, userId: string, pathname: string }`
   * @returns Promise<boolean> is a`true` that request passed Ok. If `false` - something that wrong to the request.
   */
  async deletesFetch(props: F): Promise<boolean> {
    const { postId, userId, pathname } = { ...props };
    const domen = ((APP_MESSAGER_SERVER_URL_ORIGEN as string).split(':').length > 2) ? APP_MESSAGER_SERVER_URL_ORIGEN : APP_MESSAGER_SERVER_URL_ORIGEN + ':' + APP_MESSAGER_SERVER_URL_PORT;
    const url = new URL(`api/v1/delete/'${Number(postId)}/`, 'http://127.0.0.1:8000/');
    // url.searchParams.set('userId', userId);
    // url.searchParams.set('pathname', pathname as string);
    // headers: {
    //   'X-CSRFToken': getCookie('csrftoken'),
    //     'Content-Type': 'application/json'
    // },
    const responce = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache'
    });
    if (responce.ok) {
      const resultJson = responce.json();
      console.log('[FServices > deletesFetch]: ', resultJson);
      return true;
    }
    console.log('[FServices > deletesFetch] Something that wrong!');
    return false;
  }

  /**
   * Entry point has a one paramenter. That `elements`, his get an object collection fron the `[<li>..<div class="bucke">]`.
   * @param `elements`: `HTMLCollectionOf<HTMLLIElement>`\
   * Everyone element ``<li>..<div class="bucke">` get a listener action by 'click'. \
   *  Click by `< html-element class="bucke">.
   * @returns avoid
   */
  removeAll(elements: HTMLCollectionOf<HTMLLIElement>): void {
    const handlerDeleteFileOne = this.handlerDeleteFileOne.bind(this);
    Array.from(elements).forEach((elem: HTMLLIElement) => {
      elem.onclick = null;
      elem.onclick = handlerDeleteFileOne;
    });
  }
}
