interface Data {
  dataPost: string | undefined
  dataId: string | undefined
}
export class Push {
  element: HTMLDivElement;

  constructor(name: HTMLDivElement) {
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
}
