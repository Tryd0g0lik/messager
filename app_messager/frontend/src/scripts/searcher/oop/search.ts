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
      this.addHandlaers(e);
    };
  };
  // 21.мая
  // форма 057
  // 21.мая 9 утра
  // квота заблокирована. справка на рукм - какого числа отправили

  addHandlaers(e: MouseEvent | KeyboardEvent) {
    const currentTarget = e.currentTarget as HTMLElement;
    const boxCommonHtml = currentTarget.querySelector('label[for="inputSearch"]');
    const manageKeyup = this.manageKeyup.bind(this);
    const manageClick = this.manageClick.bind(this);
    const subhandlerContentOfInput = this.subhandlerContentOfInput.bind(this);

    if ((boxCommonHtml !== null)) {
      /* ------ remove ------ */
      // (boxCommonHtml as HTMLElement).removeEventListener('click', manageClick(subhandlerContentOfInput));
      (boxCommonHtml as HTMLElement).removeEventListener('keyup', manageKeyup(subhandlerContentOfInput));

      /* ------ insert ------ */
      // (boxCommonHtml as HTMLElement).addEventListener('click', manageClick(subhandlerContentOfInput));
      (boxCommonHtml as HTMLElement).addEventListener('keydown', manageKeyup(subhandlerContentOfInput));
    };
  }

  subhandlerContentOfInput(e: MouseEvent | KeyboardEvent): void {
    debugger;
  }
}
