// app_messager\frontend\src\scripts\services\handlers\files\handler_input-file.ts

/**
 * handler form : `<form action="upload/" id="upload" method="post"> ` \
 * rules of handler
 */
const handlerInputEvent = (formDiv: HTMLDivElement, form: HTMLFormElement) => {
  return async (event: any): Promise<void> => {
    form = formDiv.querySelector('#upload') as HTMLFormElement;

    /* For a loader anime. AnimeCode is below 1/3 */
    const formFiles = document.getElementById('form-files');

    const formData = new FormData(form);
    formData.append('file', event.target.files);
    /* ------  below received the postId ------ */
    if (localStorage.getItem('data') !== null) {
      const lstorageResult = JSON.parse((localStorage).getItem('data') as string).postId;
      if (lstorageResult !== undefined) {
        formData.append('postId', lstorageResult);
      }
    }
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
          // debugger
          const data = await response.json();
          console.info('[upload_files > FORM]:', data);
          responce = data.index.slice(0);
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
};
export default handlerInputEvent;
