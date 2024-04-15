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

    await fetch('upload/', {
      method: 'POST',
      body: formData
    })
      .then(async (response) => {
        console.log('[upload_files > FORM]: response:', response);
        if (response.ok) {
          const data = await response.json();
          console.log("[upload_files > FORM]: File was upload. It's Ok!:", data);
          return data;
        } else {
          console.error("[upload_files > FORM]: What is wrong! ERROR while uploading file 'src/scripts/services/upload_files.ts' !", response.statusText);
          return undefined;
        }
      })
      .then((result) => {
        console.log('[upload_files > FORM]: RESPONSE.ok', (result === undefined) ? 'undefined' : result.ok);
      });

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log("[upload_files > FORM]: File was upload. It's Ok!:", data);
    // } else {
    //   console.error("[upload_files > FORM]: What is wrong! ERROR while uploading file 'src/scripts/services/upload_files.ts' !", response.statusText);
    // }
  };
  /**
   * added the event listeber
   */
  (form as HTMLElement).onchange = handlerInputEvent;
};
export default handlerUploadFiles;
