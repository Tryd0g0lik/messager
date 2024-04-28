import { ChatMessage, F, File } from '@Interfaces';
import { Pencil } from './pencils';
import { FRequeres } from './requeres';

class Post extends FRequeres {
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
  async getFetchOneProfile(props: F): Promise<object> {
    const { postId, userId = undefined, pathname = undefined } = { ...props };
    // const domen = ((APP_MESSAGER_SERVER_URL_ORIGEN as string).split(':').length > 2) ? APP_MESSAGER_SERVER_URL_ORIGEN : APP_MESSAGER_SERVER_URL_ORIGEN + ':' + APP_MESSAGER_SERVER_URL_PORT;
    const url = new URL(`api/v1/post/get/${Number(postId)}/`, 'http://127.0.0.1:8000/');
    // if (pathname !== undefined) {
    //   url.searchParams.set('link', pathname);
    // }
    // if (pathname !== undefined) {
    //   url.searchParams.set('pathname', pathname);
    // }
    this.urls = url;
    const contentType = 'application/json';
    const responce = await this.get({ contentType });

    return responce;
  }

  /**
   * This method is specially for a lookup everyone object from db, which hase identical the text. \
   * This text should be from the name column 'content'. \
   * @param `props`: `{postId: string|undefined, authorId: string,  groupId: string|undefined, message: string}` \
   * Here a pathname of URL is `api/v1/post/get/`
   * @returns;
   */
  async getFetchFindProfiles(props: ChatMessage): Promise<object[] | boolean> {
    const { postId, authorId, groupId = undefined, message = undefined } = { ...props };
    // const domen = ((APP_MESSAGER_SERVER_URL_ORIGEN as string).split(':').length > 2) ? APP_MESSAGER_SERVER_URL_ORIGEN : APP_MESSAGER_SERVER_URL_ORIGEN + ':' + APP_MESSAGER_SERVER_URL_PORT;
    const url = new URL('api/v1/post/get/', 'http://127.0.0.1:8000/');

    url.searchParams.set('author_id', authorId as string);

    if (postId !== undefined) {
      url.searchParams.set('post_id', postId as string);
    }
    if (groupId !== undefined) {
      url.searchParams.set('group_id', groupId as string);
    }
    if (message !== undefined) {
      url.searchParams.set('content', message);
    }

    this.urls = url;
    const contentType = 'application/json';
    const responce = await this.get({ contentType });

    return responce as boolean | object[];
  }

  async removePostFile(props: File): Promise<boolean> {
    const { file_id, postId } = { ...props };
    const url = new URL('api/v1/chat/delete/file/', 'http://127.0.0.1:8000/');
    const err = new Error();
    err.name = '[Post > removePostFile]';
    debugger
    if (postId === undefined) {
      err.message = `Somethefing tha wrong! Not found "postId": ${postId}`;
      throw err;
    }
    url.searchParams.set('post_id', postId as string);

    // if ((index === undefined) && (indexes === undefined)) {
    //   err.message = `Somethefing tha wrong! Not found an file index from post. IMDEX: ${index}, INDEXES: ${indexes}`;
    //   throw err;
    // }
    // url.searchParams.append('indexes', (index !== undefined) ? index : (indexes !== undefined) ? String(indexes) : 'Null')

    if (file_id === undefined) {
      err.message = `Somethefing tha wrong! Not found file_id: ${file_id}`;
      throw err;
    }
    url.searchParams.append('file_id', file_id);

    this.urls = url;

    let response = '';
    response = await this.removeFile();

    if (((typeof response).includes('string')) && (response.includes('OK'))) {
      return true;
    }

    return false;
  }
}
export { Post };
