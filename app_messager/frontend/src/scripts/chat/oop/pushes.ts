import { Data } from '@Interfaces';
import { Requires } from './requires';

export class Push extends Requires {
  element: HTMLDivElement;

  constructor(name: HTMLDivElement, url = window.location.origin) {
    super(url);
    this.element = name;
  }

  /**
   * That is a listener for post object of the chat. \
   * it a box which contain all html/post th single message from the chat
   * @returns that a'data-pos' and 'data-id' --> '{ dataPost: post, dataId: userId }'
   */
  receivedDataset(): Data {
    const post = this.element.dataset.post;
    const userId = this.element.dataset.id;
    return { dataPost: post, dataId: userId };
  }

  /**
   * Then need update a style `padding-top` for a box `<div class="box-message"` that a method using
   * @param `view`: `HTMLDivElement` child elemen. It's a source size
   * Here is:\
   * - 'parent' is a `<div data-post="<that a post's number >" class="message">`;
   * - 'child' is `<div class="download">`
   * @returns HTMLDivElement parent
   */
  managePostStylesHeight(view: HTMLDivElement): HTMLDivElement {
    const boxReffDownloadHeight = view.offsetHeight;
    (this.element).style.paddingTop = String(boxReffDownloadHeight + 2) + 'px';
    return this.element;
  }

  /**
   * This method for manage the style 'paddaing-top'.
   * @param `view` All child elements from the parent. \
   * Here is:\
   * - 'parent' is a `<div data-post="<that a post's number >" class="message">`;
   * - 'child' is `<div class="download">`
   * @returns
   */
  // removePostStylesHeight(view: HTMLDivElement): HTMLDivElement {
  //   const boxReffDownloadHeight = view.offsetHeight;
  //   (this.element).style.paddingTop = String(boxReffDownloadHeight + 2) + 'px';
  //   return this.element;
  // }
}
