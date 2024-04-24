// app_messager\frontend\src\scripts\services\handlers\files\upload_files.ts
import handlerInputEvent from './handler_input-file';

const handlerUploadFiles = (): undefined => {
  /**
   * preparing eventronment
   */
  const formDiv = document.getElementById('form-files');
  if (formDiv === null) {
    return;
  }
  const form = formDiv.querySelector('#upload') as HTMLFormElement;
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
    // const dataLocalJson = JSON.parse(localStorage.getItem('data') as string);
    // dataLocalJson.fileId = false;
    // localStorage.setItem('data', JSON.stringify(dataLocalJson));
    null
  } else {
    localStorage.setItem('data', JSON.stringify({ fileId: false }));
  }
  /**
   * added the event listeber
   */
  (form as HTMLElement).onchange = handlerInputEvent(formDiv as HTMLDivElement, form);
};
export default handlerUploadFiles;
