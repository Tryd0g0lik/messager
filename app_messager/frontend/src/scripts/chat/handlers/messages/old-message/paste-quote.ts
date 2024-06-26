// app_messager\frontend\src\scripts\services\handlers\messages\old-message\paste-quote.ts

/**
 * @param 'text:string' Here we paste the old message for editing. Edition in the bottom input form. \
 * @params ''postInd' it's index of row wich now editing. \
 * @param 'fileHtml' That HTML where inside the files's references.
 */
const addQuote = (text: string) => (postInd: string | undefined = undefined) => (fileHtml = '') => {
  const inputBox = document.getElementById('messager');
  if (inputBox === null) {
    console.log('[addQuote]: Html input not found');
    return;
  }
  /* ------ add quote ------ */
  const quoteHtml = document.createElement('div');
  quoteHtml.className = 'quote active';
  quoteHtml.innerText = text;
  if (((typeof fileHtml).includes('string')) && (fileHtml.length > 0)) {
    quoteHtml.innerHTML += fileHtml;
  }
  if (postInd !== undefined) {
    quoteHtml.setAttribute('data-post', postInd);
  }
  inputBox?.insertAdjacentHTML('beforebegin', quoteHtml.outerHTML);

  /* ------ add text to the input form ------ */
  (inputBox as HTMLInputElement).value = text;

};
export default addQuote;
