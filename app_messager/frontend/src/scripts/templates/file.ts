// app_messager\frontend\src\scripts\templates\file.ts

function file(ref: string[]): string {
  // (linkFilesArr[i].split('/'))[len - 1]
  const liHtml = document.createElement('li');
  /* 
  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
  */
  // liHtml.className = 'btn btn-primary';
  // liHtml.dataset.toggle = 'modal';
  // liHtml.dataset.target = '#exampleModal';
  if (ref.length > 1) {
    liHtml.dataset.ind = ref[1];
  }
  if (ref[0].includes('media/')) {
    ref[0] = ref[0].slice('media/'.length);
  }

  const urlOrigin = window.location.origin;
  const reffArrLength = ref[0].split('/').length;

  /* class="bucke" !! */
  const refLi = `<a target="_blank" class='one-file' href="${urlOrigin}/media/${ref[0]}">${ref[0].split('/')[reffArrLength - 1]}</a>
        <div data-bucke="true" class="bucke">
        </div>`;
  liHtml.innerHTML = refLi;
  return liHtml.outerHTML;
};

export default file;
