// app_messager\frontend\src\scripts\templates\single-post.ts
/**
 * @param `index` that is data from the `<div data-post="< post's number >">`;
 * @returns HTMLDivElement
 */
export default function getPostOfIndex(index: string | number): HTMLDivElement {
  index = ((typeof index).includes('string')) ? index : String(index);
  const postHtmlUp = document.querySelector(`div[data-post="${index}"]`);
  if (postHtmlUp === null) {
    const err = new Error();
    err.name = '[postIndex]';
    err.message = 'Something that wrong - message not found!';
    throw err;
  };
  return postHtmlUp as HTMLDivElement;
}
