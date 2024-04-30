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

  /**
   * This is a async method received datas about one post/message from the chat
   * @param `props`: `{postId: string, userId: string, pathname: string}`
   * * Here a pathname of URL is `api/v1/post/get/<your id from the html attribute 'data-post' >/`
   * @returns;
   */
  // async getFetchOneProfile(props: F): Promise<object> {
  //   const { postId } = { ...props };

  //   const url = new URL(`api/v1/post/get/${Number(postId)}/`, 'http://127.0.0.1:8000/');

  //   this.urls = url;
  //   const contentType = 'application/json';
  //   const responce = await this.get({ contentType });

  //   return responce;
  // }

  /**
   * This method is specially for a lookup everyone object from db, which hase identical the text. \
   * This text should be from the name column 'content'. \
   * @param `props`: `{postId: string|undefined, authorId: string,  groupId: string|undefined, message: string}` \
   * Here a pathname of URL is `api/v1/post/get/`
   * @returns;
   */
  // async getFetchFindProfiles(props: ChatMessage): Promise<object[] | boolean> {
  //   const { postId, authorId, groupId = undefined, message = undefined } = { ...props };
  //   // const domen = ((APP_MESSAGER_SERVER_URL_ORIGEN as string).split(':').length > 2) ? APP_MESSAGER_SERVER_URL_ORIGEN : APP_MESSAGER_SERVER_URL_ORIGEN + ':' + APP_MESSAGER_SERVER_URL_PORT;
  //   const url = new URL('api/v1/post/get/', 'http://127.0.0.1:8000/');

  //   url.searchParams.set('author_id', authorId as string);

  //   if (postId !== undefined) {
  //     url.searchParams.append('post_id', postId as string);
  //   }
  //   if (groupId !== undefined) {
  //     url.searchParams.append('group_id', groupId as string);
  //   }
  //   if (message !== undefined) {
  //     url.searchParams.append('content', message);
  //   }

  //   this.urls = url;
  //   const contentType = 'application/json';
  //   const responce = await this.get({ contentType });

  //   return responce as boolean | object[];
  // }


  /* ------ One post is removing  ------ */
  handlerPostRemove(e: MouseEvent): void {
    if (e.defaultPrevented) {
      console.log('[Post > handlerPostRemove] "Event used before!');
      return;
    }
    debugger  
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
