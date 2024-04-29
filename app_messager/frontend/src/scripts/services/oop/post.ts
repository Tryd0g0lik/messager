import { ChatMessage, F, File } from '@Interfaces';
import { Requires } from './requires';

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

  async removePostFile(props: File): Promise<boolean> {
    const { file_id, postId } = { ...props };
    const url = new URL('api/v1/chat/delete/files/', 'http://127.0.0.1:8000/');
    const err = new Error();
    err.name = '[Post > removePostFile]';

    if (postId === undefined) {
      err.message = `Somethefing tha wrong! Not found "postId": ${postId}`;
      throw err;
    }
    url.searchParams.set('post_id', postId as string);

    if (file_id === undefined) {
      err.message = `Somethefing tha wrong! Not found file_id: ${file_id}`;
      throw err;
    }
    url.searchParams.append('file_id', file_id);

    this.urls = url;

    let response = '';
    response = await this.remove();

    if (((typeof response).includes('string')) && (response.includes('OK'))) {
      return true;
    }

    return false;
  }

  async removePost(props: File): Promise<boolean> {

  }
}
export { Post };
