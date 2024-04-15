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
    await fetch('upload/', {
      method: 'POST',
      body: formData
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          console.info('[upload_files > FORM]:', data);
          return data;
        } else {
          console.error("[upload_files > FORM]: What is wrong! ERROR - didn't received the ID file!", response.statusText);
          return undefined;
        }
      });
  };
  /**
   * added the event listeber
   */
  (form as HTMLElement).onchange = handlerInputEvent;
};
export default handlerUploadFiles;
