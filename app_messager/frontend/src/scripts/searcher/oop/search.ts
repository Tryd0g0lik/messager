import { EInput } from './inputs';

export class Searher extends EInput {
  arr = [];

  constructor(element: HTMLDivElement | HTMLFormElement) {
    super(element);
    this.arr = [];
    const handlerClick = this.heandlerClick.bind(this);
    (this.element).onclick = handlerClick;
  }

  private addStyle(): void {
    (this.element).classList.add('active');
  }

  heandlerClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;

    if ((target !== null) && (((target.className).length > 0) && (String((target).className)).includes('button-search'))) {
      this.addStyle();
    };
  };
}
