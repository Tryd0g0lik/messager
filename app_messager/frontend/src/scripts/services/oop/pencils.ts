// app_messager\frontend\src\scripts\services\oop\pencils.ts

import addQuote from '../handlers/messages/old-message/paste-quote';
import handlerGetMessageOfInput from '../handlers/messages/get-messages';
import manageOldMessageTotal from '../handlers/messages/old-message/old-messages';
import { FServices } from './files';
import filetepmplate from '@htmlTemplates/file';

/**
 * Methods: \
 * `fGet` is :
 *  - `ContentType` That is basice proporties of the fetch.  Exemple this is `{Content-Type: 'application/json'}`/
 *  - `cache?` That is basice proporties of the fetch. Exemple this is 'no-cache' /
 *  - `mode?` That is basice proporties of the fetch. Exemple this is `cors`
 *
 * `fGet` entrypoint has `fGet(props: RequestHeaders)` where \
 * `{ContentType: string, cache: string|undefined,  mode: string| undefined}`
 */
export class Pencil extends FServices {
  emptyvar: string[];

  constructor(name: HTMLDivElement) {
    super(name);
    this.emptyvar = []; // просто заглушка для eslintrc
  }

  getFileHtmlLi(pathnames: string[]): string {
    let result = '';
    for (let i = 0; i < pathnames.length; i++) {
      const fileTemplate = filetepmplate([pathnames[i]]);
      result += fileTemplate;
    }
    return result;
  }

  handlerPencilPost(e: MouseEvent): void {
    if (e.defaultPrevented) {
      console.log('[Pencil > target] "Event used before!');
      return;
    }
    const target = e.target as HTMLDivElement;
    if (!(String(target.classList).includes('pencil'))) {
      console.log('[Pencil > target] target is not "pencil"!');
      return;
    }

    const currentTarget = e.currentTarget as HTMLDivElement;
    if ((currentTarget !== null) && !('post' in currentTarget.dataset)) {
      return;
    };

    /* get URL of files */
    const htmlDownLoadArr = currentTarget.getElementsByClassName('download');
    if (htmlDownLoadArr.length > 0) {
      const anchors = (htmlDownLoadArr[0] as HTMLDivElement).getElementsByClassName('one-file') as HTMLCollectionOf<HTMLAnchorElement>;
      if (anchors.length === 0) {
        console.log('[Pencil > handlerPencilPost] Datas not found!');
      } else {
        this.receiveHrefsFiles = anchors;
      }
    }

    /* 'message as quote' -that is old post from the window chat */
    const message = (currentTarget.getElementsByClassName('user-message')[0] as HTMLElement).innerText;
    /* ------ 1/3 Quoted ------ */
    const quote = addQuote(message);

    /* ------ LocaStorage and Receive post data------ */
    if (localStorage.getItem('data') === null) {
      console.log('[Pencil > handlerPencilPost > localStorage] the "data" from the localStorage not found');
      return;
    }

    const dataObj = this.receivedDatasetAll();
    if (dataObj !== undefined) {
      const { dataPost, dataId, pathnames } = { ...dataObj };

      const localS = localStorage.getItem('data');
      const localSJson = JSON.parse(localS as string);
      localSJson.postId = dataPost;
      localSJson.userId = dataId;

      localSJson.pathnames = pathnames;
      localStorage.setItem('data', JSON.stringify(localSJson));

      /* ------ 1/3 Quoted ------ */
      const newQuote = quote(dataPost);
      /* ------ Quoted files reference. That repeats the references from the post above */

      const refer = '<ul>' + this.getFileHtmlLi(pathnames) + '</ul>';
      const refResult = (refer.length > 10) ? (`<div class="download repeat">${refer}</div>`) : '';
      /* ------ 2/3 Quoted ------ */
      newQuote(refResult);

      /* manage styles */
      const boxMessage = document.getElementById('message');
      if (boxMessage === null) {
        console.log('[addQuote]: Html input not found');
        return;
      }
      // above the inpute form
      const htmlQuoteArr = boxMessage?.getElementsByClassName('quote');
      const htmlDownloadArr = boxMessage?.getElementsByClassName('download');

      if ((htmlQuoteArr.length > 0) && (htmlDownloadArr.length > 0)) {
        const htmlLiArr = htmlDownloadArr[0].getElementsByTagName('li');

        if (htmlLiArr.length === 0) {
          console.log('[Pencil > handlerPencilPost > LI]: Something that wrong!');
        }
        /* ------ 0/3 pencil ------ */
        // const parent = new Pencil(htmlQuoteArr[0] as HTMLDivElement);
        this.element = htmlQuoteArr[0] as HTMLDivElement;
        this.managePostStylesHeight(htmlDownloadArr[0] as HTMLDivElement);
      };
    }

    /* 2/3 added the event listener to the input form . It is change of the listener */
    handlerGetMessageOfInput(manageOldMessageTotal());
  };

  private addEvent(): void {
    const handlerPencilPost = this.handlerPencilPost.bind(this); // this.handlerPencilPost; //
    this.element.onclick = handlerPencilPost;
  }

  start(): void {
    this.addEvent();
  }
};
