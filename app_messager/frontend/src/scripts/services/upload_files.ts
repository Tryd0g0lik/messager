// app_messager\frontend\src\scripts\services\upload_files.ts

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
    localStorage.setItem('data', JSON.stringify(dataLocalJson));
  } else {
    localStorage.setItem('data', JSON.stringify({ fileId: false }));
  }

  /**
   * rules of handler
   */
  const handlerInputEvent = async (event: any): Promise<void> => {
    form = formDiv.querySelector('#upload') as HTMLFormElement;

    /* For a loader anime. AnimeCode is below 1/3 */
    const formFiles = document.getElementById('form-files');

    const formData = new FormData(form);
    formData.append('file', event.target.files);

    console.log('SEiZE: ', event.target.files[0].size);

    /**
     * Note: Size files
     */
    let totalSize = 0;
    const fileArr = Array.from(event.target.files);
    let fileSizeLarge = false;
    for (let i = 0; i < fileArr.length; i++) {
      totalSize += Object(fileArr[i]).size;

      if (Object(fileArr[i]).size > 10000000) {
        fileSizeLarge = true;
      }
    }

    if ((totalSize > 64000000) || (fileSizeLarge)) {
      const formMessegeInput = document.querySelector('#messager');
      const div = document.createElement('div');
      div.className = 'attention';
      div.innerText = 'Your all files from the your massage large than 64MB. Or one file is large 10MB';
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

    /** Loader for a display anime 2/3 */
    formFiles?.classList.add('upload');

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
        }
        /** Loader for a display anime 3/3 */
        formFiles?.classList.remove('upload');
      }
      );
  };
  /**
   * added the event listeber
   */
  (form as HTMLElement).onchange = handlerInputEvent;
};
export default handlerUploadFiles;
