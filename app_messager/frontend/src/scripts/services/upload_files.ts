const handlerUploadFiles = (): undefined => {
/**
 * preparing eventronment
 */
  const formDiv = document.getElementById('form-files');
  if (formDiv === null) {
    return;
  }
  let form = formDiv.querySelector('#upload') as HTMLFormElement;
  if (form === null) {
    return;
  }

  /** Check the key of localStorage.
   * Key fileId be has a value:
   * - 'false' - user no sending the file;
   * - 'true' - user has sent file but has not received a file id in now time.
   * - var a number type is id file.
  */
  const checkLockalKey = localStorage.getItem('data') !== null;

  if (checkLockalKey) {
    const dataLocalJson = JSON.parse(localStorage.getItem('data') as string);
    dataLocalJson.fileId = false;
    localStorage.setItem('data', dataLocalJson);
  } else {
    localStorage.setItem('data', JSON.stringify({ fileId: false }));
  }

  /**
   * rules of handler
   */
  const handlerInputEvent = async (event: any): Promise<void> => {
    form = formDiv.querySelector('#upload') as HTMLFormElement;
    const formData = new FormData(form);
    formData.append('file', event.target.files[0]);
    console.log('SEiZE: ', event.target.files[0].size);
    // debugger

    /**
     * Note
     */
    if (event.target.files[0].size > 64000000) {
      const formMessegeInput = document.querySelector('#messager');
      const div = document.createElement('div');
      div.className = 'attention';
      div.innerText = 'Your file lafge than 64 MB.';
      formMessegeInput?.before(div);
      return;
    } else {
      const attention = document.getElementsByClassName('attention');
      if (attention.length > 0) {
        attention[0].remove();
      }
    }
    /**  We talking about beginning the upload */
    const dataLocalJson_ = JSON.parse(localStorage.getItem('data') as string);
    dataLocalJson_.fileId = true;
    localStorage.setItem('data', JSON.stringify(dataLocalJson_));

    /** upload */
    await fetch('upload/', {
      method: 'POST',
      body: formData
    })
      .then(async (response) => {
        let responce: string | boolean = '';
        if (response.ok) {
          const data = await response.json();
          console.info('[upload_files > FORM]:', data);
          responce = data.index;
          /** record result/ It's ID or false */
          const dataLocalJson = JSON.parse(localStorage.getItem('data') as string);
          dataLocalJson.fileId = responce;
          localStorage.setItem('data', JSON.stringify(dataLocalJson));
        } else {
          console.error("[upload_files > FORM]: What is wrong! ERROR - didn't received the ID file!", response.statusText);
          return;
        }
      }
      );
  };
  /**
   * added the event listeber
   */
  (form as HTMLElement).onchange = handlerInputEvent;
};
export default handlerUploadFiles;
