// app_messager\frontend\src\scripts\services\handlers\files\handler_input-file.ts
import { Push } from './pushes';
interface OllDatas {
  dataPost: string
  dataId: string
  pathnames: string[]
}

export class FServices extends Push {
  fileNameArr: string[];
  constructor(name: HTMLDivElement) {
    super(name);
    this.fileNameArr = [];
  }

  /*
* On the enterpoint received `box`: `HTMLDivElement`. \
* It's box which has c class name 'download' -> `<div class='download>`. His contain files for one message \
* Code 'object.receiveMessage = ...'
* In completed received a `this.fileNameArr`. That is type `string[]`.\
*
* The `this.fileNameArr` it's array URLs.
*/
  set receiveHrefsFiles(box: HTMLDivElement) {
    const files = box.getElementsByClassName('one-file') as HTMLCollectionOf<HTMLAnchorElement>;
    if (files.length === 0) {
      console.log('[FService > files] Datas not found');
    } else {
      for (let i = 0; i < files.length; i++) {
        if ((files[i].href).includes('media/')) {
          const oneHref = 'media/' + files[i].href.split('media/')[1];
          (this.fileNameArr).push(oneHref);
        } else {
          console.log('[FService > files] This reference not is a media file');
        }
      }
    }
  }

  /**
   * @returns The array URLs.
   */
  get receiveHrefsFiles(): string[] {
    const result = this.fileNameArr;
    return result;
  }

  /**
   * @returns Data type that 
   * `{
      dataPost: string
      dataId: string
      files: string[]
    }`
   * There: \
   * `dataPost` is data from the html `data-post` \
   * `dataId` is data from the html `data-id` \
   * `files` is  URL datas from the html box `<div class='download>`
   */
  receivedDatasetAll(): OllDatas | undefined {
    const dataset = this.receivedDataset();
    if ((dataset.dataId === undefined) || (dataset.dataPost === undefined)) {
      console.log('[FService > dataTotal] Datas not found');
      return;
    }
    const postId_ = dataset.dataPost;
    const userId_ = dataset.dataId;
    const filesArr = this.receiveHrefsFiles;
    return { dataPost: postId_, dataId: userId_, pathnames: filesArr };
  }
}
