// app_messager\frontend\src\scripts\services\handlers\messages\old-message\paste-quote.ts

import { Pencil } from '@Service/oop/pencils';

/**
 * @param 'text:string' Here we paste the old message for editing. Edition in the bottom input form.
 */
const addQuote = (text: string) => (fileHtml = '') => {
  const inputBox = document.getElementById('messager');
  if (inputBox === null) {
    console.log('[addQuote]: Html input not found');
    return;
  }
  /* add quote */
  const quoteHtml = document.createElement('div');
  quoteHtml.className = 'quote active';
  quoteHtml.innerText = text;
  if (((typeof fileHtml).includes('string')) && (fileHtml.length > 0)) {
    quoteHtml.innerHTML += fileHtml;
  }
  inputBox?.insertAdjacentHTML('beforebegin', quoteHtml.outerHTML);

  /* add text to the input form */
  (inputBox as HTMLInputElement).value = text;

  // /* manage styles */
  // const boxMessage = document.getElementById('message');
  // if (boxMessage === null) {
  //   console.log('[addQuote]: Html input not found');
  //   return;
  // }
  // const htmlQuoteArr = boxMessage?.getElementsByClassName('quote');
  // const htmlDownloadArr = boxMessage?.getElementsByClassName('download');

  // if ((htmlQuoteArr.length > 0) && (htmlDownloadArr.length > 0)) {
  //   /* ------ 2/3 pencil ------ */
  //   const parent = new Pencil(htmlQuoteArr[0] as HTMLDivElement);
  //   parent.postStylesHeight(htmlQuoteArr[0] as HTMLDivElement);
  // };
};
export default addQuote;
