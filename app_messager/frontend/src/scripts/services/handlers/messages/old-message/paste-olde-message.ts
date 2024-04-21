interface PostCorrector {
  postIndex: string
  postMessage: string
}
/**
 * In to the enterpoint called the two parameters. \
 * Function replace the old contend to the modified (new) message.
 * @param `postIndex`: `string` - a box number for modified the old post
 * @param `postMessage`: `string` - a new message
 * @returns viod
 */
function builderOldMessage({ postIndex, postMessage }: PostCorrector): void {
  const postHml = document.querySelector(`div[data-post="${postIndex}"]`);
  if (postHml === null) {
    console.log('[builderOldMessage > postHml]: Something that wrong/ Here can not find the post box through an index');
    return;
  }
  const boxMessageHtml = postHml.getElementsByClassName('user-message');
  if (boxMessageHtml === null) {
    console.log("[builderOldMessage > boxMessageHtml]: Something that wrong/ Here can't find the post with message old");
    return;
  }
  const copy = boxMessageHtml[0].cloneNode(true);
  const old = (boxMessageHtml[0] as HTMLElement).outerText;
  const c = (copy as HTMLElement).innerText.replace(old, postMessage);
  (boxMessageHtml[0] as HTMLElement).replaceWith(c);
}
export default builderOldMessage;
