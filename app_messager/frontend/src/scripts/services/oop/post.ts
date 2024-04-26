import { F } from '@Interfaces';
import { Pencil } from './pencils';

export class Post extends Pencil {
  emptyvar: string[];

  constructor(name: HTMLDivElement) {
    super(name);
    this.emptyvar = []; // просто заглушка для eslintrc
  }

  /**
   * @param `props`: `{postId: string, userId: string, pathname: string}` 
   * @returns;
   */
  async getFetchOneProfile(props: F): Promise<object> {
    const { postId, userId, pathname } = { ...props };
    // const domen = ((APP_MESSAGER_SERVER_URL_ORIGEN as string).split(':').length > 2) ? APP_MESSAGER_SERVER_URL_ORIGEN : APP_MESSAGER_SERVER_URL_ORIGEN + ':' + APP_MESSAGER_SERVER_URL_PORT;
    const url = new URL(`api/v1/post/get/${Number(postId)}/`, 'http://127.0.0.1:8000/');
    if (pathname !== undefined) {
      url.searchParams.set('pathname', pathname);
    }
    this.urls = url;
    const contentType = 'application/json';
    // const cache = undefined;
    // const mode = undefined;
    const responce = await this.fGet({ contentType });

    return responce;
  }
}
