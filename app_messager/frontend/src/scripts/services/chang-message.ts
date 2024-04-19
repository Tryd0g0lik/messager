const addQuote = (text: string): void => {
  const inputBox = document.getElementById('messager');
  if (inputBox === null) {
    console.log('[addQuote]: Html input not found');
  }
  const quoteHtml = document.createElement('div');
  quoteHtml.className = 'quote active';
  quoteHtml.innerText = text;
  inputBox?.insertAdjacentHTML('beforebegin', quoteHtml.outerHTML);
  (inputBox as HTMLInputElement).value = text;
};
export default addQuote;
