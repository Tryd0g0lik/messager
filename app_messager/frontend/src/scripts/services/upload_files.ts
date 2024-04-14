const handlerUploadFiles = async (event) => {
  const formDiv = document.getElementById('form-files');
  if (formDiv === null) {
    return;
  }
  const formArr = formDiv.getElementsByTagName('form');
  if (formArr.length === 0) {
    return;
  }
  const form = formArr[0];

  event.preventDefault();
  const formData = new FormData(form);
  const file = formData.get('file');

  const response = await fetch('/upload/', {
    method: 'POST',
    body: file // formData
  });

  if (response.ok) {
    const data = await response.json();
    console.log("[upload_files > FORM]: File was upload. It's Ok!:", data);
  } else {
    console.error('[upload_files > FORM]: What is wrong! ERROR while uploading file "src\scripts\services\upload_files.ts" !', response.statusText);
  }
};

export default { handlerUploadFiles };
