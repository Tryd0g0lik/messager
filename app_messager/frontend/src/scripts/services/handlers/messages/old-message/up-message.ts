import { PostCorrector } from '@Interfaces';
import { Pencil } from '../../../oop/pencils';
import filetepmplate from '@htmlTemplates/file';
import getLinksToFile from '@Service/links-files';
/**
 * In to the enterpoint called the two parameters. \
 * Function replace the old contend to the modified (new) message.
 * @param `postIndex`: `string` - a box number for modified the old post
 * @param `postMessage`: `string` - a new message
 * @returns viod
 */
const upOldMessage = ({ postIndex, postMessage }: PostCorrector) => async ({ filesIndexes }: { filesIndexes: number[] }): void => {
  const postHtml = document.querySelector(`div[data-post="${postIndex}"]`);
  if (postHtml === null) {
    console.log('[upOldMessage > postHml]: Something that wrong/ Here can not find the post box through an index');
    return;
  }

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
  debugger
  /* ------ add a new files after redactions the old post ------ */
  if ((filesIndexes !== undefined) && ((typeof filesIndexes).includes('object'))) {
    /*  file's links adding to the message */
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
    } else {
      let refer = '<ul>';
      for (let i = 0; i < linkFilesArr.length; i++) {
        refer += filetepmplate(linkFilesArr[i]);
      }
      refer += '</ul>';
    }
  }
  /* ------ update all - end ------ */
  (postHtml).replaceWith(copyPostHtml);

  /* inserting an event listener again */
  const postHtmlUp = document.querySelector(`div[data-post="${postIndex}"]`) as HTMLDivElement;
  /* ------ 2/2 pencile ------ */
  if (postHtmlUp !== null) {
    const pencil = new Pencil(postHtmlUp);
    pencil.start();
  }
}
export default upOldMessage;
