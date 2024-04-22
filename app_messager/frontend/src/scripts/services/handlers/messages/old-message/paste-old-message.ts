import { PostCorrector } from '@Interfaces';
import { Pencil } from './edit-message';
/**
 * In to the enterpoint called the two parameters. \
 * Function replace the old contend to the modified (new) message.
 * @param `postIndex`: `string` - a box number for modified the old post
 * @param `postMessage`: `string` - a new message
 * @returns viod
 */
function builderOldMessage({ postIndex, postMessage }: PostCorrector): void {
  const postHtml = document.querySelector(`div[data-post="${postIndex}"]`);
  if (postHtml === null) {
    console.log('[builderOldMessage > postHml]: Something that wrong/ Here can not find the post box through an index');
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
  (postHtml).replaceWith(copyPostHtml);

  const postHtmlUp = document.querySelector(`div[data-post="${postIndex}"]`);
  const pencilHtmlArrUp = postHtmlUp?.getElementsByClassName('pencil');
  if ((pencilHtmlArrUp as HTMLCollectionOf<HTMLDivElement>).length === 0) {
    console.log('[builderOldMessage > pencilHtmlArrUp]: Something that wrong/ Here can not find the post box through an index');
    return;
  }
  debugger
  const pencil_ = (pencilHtmlArrUp as HTMLCollectionOf<HTMLDivElement>)[0];
  const pencil = new Pencil(pencil_);
  pencil.start();
}
export default builderOldMessage;
