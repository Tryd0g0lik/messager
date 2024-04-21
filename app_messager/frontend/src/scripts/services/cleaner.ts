function cleanForm(): void {
  /* clearning forms - message */
  const inputFormHTML = document.querySelector('input[data-id]');
  if (inputFormHTML !== null) {
    (inputFormHTML as HTMLInputElement).value = '';
  };

  /* clearning forms - file */
  const formFiles = document.getElementById('upload');
  if (formFiles !== null) {
    const inputFile = formFiles?.querySelector('input[type="file"]');
    if (inputFile !== null) {
      (inputFile as HTMLInputElement).value = '';
    }
  };
  /* quote DIV */
  const qouteDiv = document.querySelector('.quote.active');
  if (qouteDiv !== null) {
    qouteDiv.remove();
  }
}

export default cleanForm;
