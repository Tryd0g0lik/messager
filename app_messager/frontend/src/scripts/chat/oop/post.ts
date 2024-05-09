
import { ChatMessage, F, File } from '@Interfaces';
import { Requires } from './requires';
import { FServices } from './files';
import wsRemove from '@Service/removes';

class Post extends Requires {
  emptyvar: string[] = [];
  constructor(url: string | object) {
    super(url);
    this.emptyvar = []; // просто заглушка для eslintrc
  }

  /* ------ One post is removing  ------ */
  handlerPostRemove(e: MouseEvent): void {
    if (e.defaultPrevented) {
      console.log('[Post > handlerPostRemove] "Event used before!');
      return;
    }

    const target = e.target as HTMLDivElement;
    if ((!(target.tagName.toLowerCase()).includes('div')) ||
      (target.dataset.post === undefined)) {
      return;
    }

    /* ------ receives indexes of files from the one post ------ */
    const indexesArr: string[] = [];
    const download = target.getElementsByClassName('download');
    if (download.length !== 0) {
      const lihtml = download[0].getElementsByTagName('li');
      if (lihtml.length > 0) {
        Array.from(lihtml).forEach((item) => {
          if ((item?.dataset.ind !== undefined)) {
            const index = item.dataset.ind;
            indexesArr.push(index);
          }
        });
      }
    }

    const metaRequest: F = {
      remove: true, // that is a file remove
      postId: (target.dataset.post).slice(0),
      userId: (target.dataset.id as string).slice(0),
      fileInd: undefined,
      postRemove: true
    };
    const service = new FServices(target.parentElement as HTMLDivElement);
    if (indexesArr.length > 0) {
      /* ------ Removing files ------ */

      indexesArr.forEach((item) => {
        metaRequest.fileInd = item;
        const props = service.checkProps(metaRequest);

        service.removing(props);
      });
      metaRequest.fileInd = undefined;
      metaRequest.postRemove = false;
      metaRequest.indexes = indexesArr;
      wsRemove(metaRequest);
    } else {
      const props = service.checkProps(metaRequest);
      service.removing(props);
      // debugger
      wsRemove(metaRequest);
      metaRequest.postRemove = false;
    }
  }
}
export { Post };
