export class Searcher {
  elements: HTMLElement;

  constructor(element: HTMLElement) {
    this.elements = element;
  }

  private addStyle(): void {
    (this.elements).classList.add('active');
  }

  heandlerClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;

    if ((target !== null) && (((target.className).length > 0) && (String((target).className)).includes('button-search'))) {
      this.addStyle();
    };
  };
}
