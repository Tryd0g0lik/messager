// app_messager\frontend\src\scripts\services\handlers\files\handler_input-file.ts
class FService {
  name: HTMLDivElement;

  dataset: string;

  constructor(name: HTMLDivElement) {
    this.name = name;
  }

  /* On the entrypoint get the 'name:string' of objects dataset */
  // set receiveDataset(name: string) {
  //   this.dataset = name;
  // }

  private receivedDataset() {
    const post = this.name.dataset.post;
    const userId = this.name.dataset.id;
    return { dataPost: post, dataId: userId };
  }


}
