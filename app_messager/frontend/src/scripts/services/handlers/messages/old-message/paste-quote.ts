// app_messager\frontend\src\scripts\services\handlers\messages\old-message\paste-quote.ts

/**
 * @param 'text:string' Here we paste the old message for editing. Edition in the bottom input form. 
 */
const addQuote = (text: string): void => {
  const inputBox = document.getElementById('messager');
  if (inputBox === null) {
    console.log('[addQuote]: Html input not found');
  }
  /* add quote */
  const quoteHtml = document.createElement('div');
  quoteHtml.className = 'quote active';
  quoteHtml.innerText = text;
  inputBox?.insertAdjacentHTML('beforebegin', quoteHtml.outerHTML);

  /* add text to the input form */
  (inputBox as HTMLInputElement).value = text;
};
export default addQuote;
