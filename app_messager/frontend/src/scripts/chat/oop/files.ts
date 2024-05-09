// app_messager\frontend\src\scripts\services\handlers\files\handler_input-file.ts
// import handlerFileOne from '@Service/handlers/files/deletes';
import wsRemove from '@Service/removes';
import { Post } from './post';
import { Push } from './pushes';
import { OllDatas, F } from '@Interfaces';
import { WSocket } from '@Websocket';
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
    // debugger;
    const target = (e.target as HTMLElement);
    const currentTargetLi = (e.currentTarget as HTMLElement);
    let fileIndex = currentTargetLi.dataset.ind;
    if (!(currentTargetLi.tagName.toLowerCase()).includes('li')) {
      fileIndex = (currentTargetLi.parentElement as HTMLElement).dataset.ind;
    }

    const dataset = (((currentTargetLi.parentElement as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement).dataset;
    let path = '' as string;
    // debugger
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

      const metaRequest: F = {
        remove: true,
        postId: (dataset.post as string).slice(0),
        userId: (dataset.id as string).slice(0),
        fileInd: fileIndex
      };
      /* ------ Modal Window Removing the file one ------ */
      const modalHTML = document.querySelector('#modal_remove .change_remove');
      if (modalHTML === null) {
        console.log('[modal not faoun]');
        return false;
      }

      (modalHTML as HTMLElement).onclick = async () => {
        const closeHTML = document.querySelector('#modal_remove  .close');
        const props = await this.checkProps(metaRequest);
        this.removing(props);
        wsRemove(metaRequest);
        (closeHTML as HTMLElement).click();
      };
      return true;
    }
    console.log('[FServices > handlerDeleteFileOne] Something that wrong!');
    return false;
  };

  /**
   * In entrypoint receive the proporties a `props`  and return object
   * @param `props`: `{ remove: boolean, postId: string, userId: string, pathname: string }`
   * @returns `props`
   */
  checkProps(props: F): object {
    const { postId, fileInd, ...data } = { ...props };
    const domen = ((APP_MESSAGER_SERVER_URL_ORIGEN as string).split(':').length > 2) ? APP_MESSAGER_SERVER_URL_ORIGEN : APP_MESSAGER_SERVER_URL_ORIGEN + ':' + APP_MESSAGER_SERVER_URL_PORT;

    const propsAll = {
      postId: (postId !== undefined)
        ? ((typeof postId).includes('string')
          ? postId
          : String(postId))
        : String(-1),
      file_id: (fileInd !== undefined)
        ? ((typeof fileInd).includes('string')
          ? fileInd
          : String(fileInd))
        : String(-1),
      postRemove: (data?.postRemove !== undefined)
        ? data.postRemove
        : false
    };
    return propsAll;
  }

  async removing(props: F): Promise<boolean> {
    const { file_id, postId, ...data } = { ...props };

    const url = new URL('api/v1/chat/delete/files/', 'http://127.0.0.1:8000/');
    const err = new Error();
    err.name = '[Post > removePostFile]';

    if (postId === undefined) {
      err.message = `Somethefing tha wrong! Not found "postId": ${postId}`;
      throw err;
    }
    url.searchParams.set('post_id', postId as string);

    if (file_id !== undefined) {
      // err.message = `Somethefing tha wrong! Not found file_id: ${file_id}`;
      // throw err;
      url.searchParams.append('file_id', file_id);
    }


    if ((data === undefined) || ((data !== undefined) && (data.postRemove === undefined))) {
      console.log('[Post > removePostFile]: May be somethefing tha wrong! Not found postRemove');
    } else {
      url.searchParams.append('postRemove', String(data.postRemove as boolean));
    }

    this.urls = url;

    let response = '';
    response = await this.delete();

    if (((typeof response).includes('string')) && (response.includes('OK'))) {
      return true;
    }

    return false;
  }

  /**
   * Entry point has a one paramenter. That `elements`, his get an object collection fron the `[<li>..<div class="bucke">]`.
   * @param `elements`: `HTMLCollectionOf<HTMLLIElement>`\
   * Everyone element ``<li>..<div class="bucke">` get a listener action by 'click'. \
   *  Click by `< html-element class="bucke">.
   * @returns avoid
   */
  handlerRemoveAdd(elements: HTMLCollectionOf<HTMLLIElement>): void {
    const handlerDeleteFileOne = this.handlerDeleteFileOne.bind(this);
    Array.from(elements).forEach((elem: HTMLLIElement) => {
      elem.onclick = null;
      elem.onclick = handlerDeleteFileOne;
    });
  }
}
