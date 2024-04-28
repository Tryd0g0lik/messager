// app_messager\frontend\src\scripts\templates\file.ts

function file(ref: string[]): string {
  // (linkFilesArr[i].split('/'))[len - 1]
  const liHtml = document.createElement('li');
  if (ref.length > 1) {
    liHtml.dataset.ind = ref[1];
  }
  if (ref[0].includes('media/')) {
    ref[0] = ref[0].slice('media/'.length);
  }

  const urlOrigin = window.location.origin;
  const reffArrLength = ref[0].split('/').length;


  // debugger
  /* class="bucke" !! */
  const refLi = `<a target="_blank" class='one-file' href="${urlOrigin}/media/${ref[0]}">${ref[0].split('/')[reffArrLength - 1]}</a>
        <div class="bucke">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bucke bi bi-bucket" viewBox="0 0 16 16">
            <path d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5m1.005 0a4.5 4.5 0 0 1 8.945 0zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z"/>
          </svg>
        </div>`;
  liHtml.innerHTML = refLi;
  return liHtml.outerHTML;
};

export default file;
