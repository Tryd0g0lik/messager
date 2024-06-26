import { PostCorrector } from '@Interfaces';
import { Pencil } from '../../../oop/pencils';
import filetepmplate from '@htmlTemplates/file';
import getLinksToFile from '@Service/links-files';
import getPostOfIndex from '@htmlTemplates/single-post';
/**
 * In to the enterpoint called the two parameters. \
 * Function replace the old contend to the update (new) message.
 * @param `postIndex`: `string` - a box number for update the old post
 * @param `postMessage`: `string` - a update message
 * @params `filesIndexes`: `string[]` - that is an array of files indexes. Then through these indexes \
 * will be found a file's pathnames everything.
 * @returns viod
 */
const upOldMessage = ({ postIndex, postMessage }: PostCorrector) => async ({ filesIndexes }: { filesIndexes: number[] }): void => {
  const postHtml = getPostOfIndex(postIndex);

  /* ------ get the boxes ------ */
  const copyPostHtml = (postHtml as HTMLElement).cloneNode(true);
  const boxMessage = (copyPostHtml as HTMLElement).getElementsByClassName('box-message')[0];
  const childArr = (boxMessage as HTMLElement).getElementsByClassName('user-message');
  if (childArr.length === 0) {
    return;
  }
  const copyChild = (childArr[0] as HTMLElement).cloneNode(true);
  childArr[0].replaceWith(copyChild);
  /* ------  text ------ */
  const oldText = (copyChild as HTMLElement).outerText;
  (copyChild as HTMLElement).innerText = (copyChild as HTMLElement).innerText.replace(oldText, postMessage);
  /* ------ update the boxes ------ */
  (boxMessage as HTMLDivElement).insertAdjacentElement('beforeend', (copyChild as HTMLDivElement));
  const copyBoxMessage = (boxMessage as HTMLDivElement).cloneNode(true);
  boxMessage.remove();
  (copyPostHtml as HTMLElement).classList.add('re_');
  (copyPostHtml as HTMLElement).insertAdjacentElement('beforeend', (copyBoxMessage as HTMLElement));
  /* ------ add a new files after redactions the old post ------ */
  if ((filesIndexes !== undefined) && ((typeof filesIndexes).includes('object')) && (filesIndexes.length > 0)) {
    /*  ------ file's links adding to the message ------ */
    const linkFilesArr = await getLinksToFile(filesIndexes); // GET
    if (linkFilesArr === undefined) {
      console.log("[upOldMessage > linkFilesArr]: Something that wrong! Here can not received link's array");
      return;
    }

    const htmlDownload = (copyPostHtml as HTMLDivElement).getElementsByClassName('download');
    if (htmlDownload.length > 0) {
      let refer = '';
      for (let i = 0; i < linkFilesArr.length; i++) {
        refer += filetepmplate(linkFilesArr[i]);
      };
      const htmlUl = htmlDownload[0].getElementsByTagName('ul');
      htmlUl[0].insertAdjacentHTML('beforeend', refer);
    } else if (htmlDownload.length === 0) {
      let refer = '<ul>';
      for (let i = 0; i < linkFilesArr.length; i++) {
        refer += filetepmplate(linkFilesArr[i]);
      }
      refer += '</ul>';
      (copyPostHtml as HTMLDivElement).insertAdjacentHTML('afterbegin', `<div class="download">${refer}</div>`);
    } else {
      console.log('[upOldMessage > filesIndexes > copyPostHtml]: Something that wrong!');
    }
  }
  /* ------ update all - the end ------ */
  /* ------ update-html to the display ------ */
  (postHtml).replaceWith(copyPostHtml);

  /* inserting an event listener again */
  const postHtmlUp = getPostOfIndex(postIndex);
  /* ------ 2/3 pencil ------ */
  if (postHtmlUp !== null) {
    const pencil = new Pencil(postHtmlUp);
    pencil.start();
    /* ------ update-style ------ */
    /* ------ box download  ------ */
    const boxDownload = postHtmlUp.getElementsByClassName('download');
    /* ------ style for a box with has download class  ------ */
    if (boxDownload.length === 0) {
      console.log('[upOldMessage > boxDownload] Something that wrong!');
      return;
    }
		pencil.managePostStylesHeight(boxDownload[0] as HTMLDivElement);

    const htmlLi = (boxDownload[0] as HTMLDivElement).getElementsByTagName('li');
    if (htmlLi.length === 0) {
      console.log('[upOldMessage > LI]: Something that wrong!');
    }
		pencil.handlerRemoveAdd(htmlLi);

    /* ------ localStorage cleaning  ------ */
    const LStorage = localStorage.getItem('data');
    if (LStorage === null) {
      console.error('[createChatMessage > localStorage]: Key not found here, simply.');
    } else {
      const localSJson = JSON.parse(LStorage);
      localSJson.fileId = false;
      localSJson.pathnames = [];
      localStorage.setItem('data', JSON.stringify(localSJson));
    }
  }
};
export default upOldMessage;
