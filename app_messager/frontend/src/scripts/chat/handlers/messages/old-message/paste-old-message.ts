// app_messager\frontend\src\scripts\services\handlers\messages\old-message\paste-old-message.ts
import { PostCorrector } from '@Interfaces';
import { Pencil } from '@Service/oop/pencils';
import getPostOfIndex from '@htmlTemplates/single-post';
/**
 * In to the enterpoint called the two parameters. \
 * Function replace the old contend to the modified (new) message.
 * @param `postIndex`: `string` - a box number for modified the old post
 * @param `postMessage`: `string` - a new message
 * @returns viod
 */
function builderOldMessage({ postIndex, postMessage }: PostCorrector): void {
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
  (postHtml).replaceWith(copyPostHtml);

  /* inserting an event listener again */
  const postHtmlUp = getPostOfIndex(postIndex);
  const pencil = new Pencil(postHtmlUp);
  pencil.start();
}
export default builderOldMessage;
