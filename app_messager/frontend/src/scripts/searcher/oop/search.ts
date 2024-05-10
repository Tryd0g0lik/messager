import checkerUserId from '../../checkers/checkUseId';
import { EInput } from './inputs';
import checkOfTime from '../../checkers/checker_time';
import { ChatMessage, S } from '@Interfaces';
import { Paginations } from './paginations';

export class Searher extends EInput {
  arr: ChatMessage[];

  offset: number;

  chatHtml: HTMLDivElement | null;
  constructor(element: HTMLDivElement | HTMLFormElement) {
    super(element);
    this.arr = [];
    this.offset = 12;
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

  addHandlaers(e: MouseEvent | KeyboardEvent) {
    const currentTarget = e.currentTarget as HTMLElement;
    const boxCommonHtml = currentTarget.querySelector('label[for="inputSearch"]');
    const manageKeyup = this.manageKeyup.bind(this);
    const manageClick = this.manageClick.bind(this);
    const subhandlerContentOfInput = this.subhandlerContentOfInput.bind(this);

    if ((boxCommonHtml !== null)) {
      /* ------ remove ------ */
      (boxCommonHtml as HTMLElement).removeEventListener('click', manageClick(subhandlerContentOfInput));
      (boxCommonHtml as HTMLElement).removeEventListener('keyup', manageKeyup(subhandlerContentOfInput));

      /* ------ insert ------ */
      (boxCommonHtml as HTMLElement).addEventListener('click', manageClick(subhandlerContentOfInput));
      (boxCommonHtml as HTMLElement).addEventListener('keydown', manageKeyup(subhandlerContentOfInput));
    };
  }

  /* ------ получаем контейре чата ------ */
  getChatBox(): HTMLDivElement {
    const chatHtml = document.getElementById('chat');

    if (chatHtml === null) {
      const err = new Error();
      err.name = '[EInput > get]';
      err.message = 'Something what wrong! Not found "#chat"';
      throw err;
    }
    return chatHtml;
  }

  /* обработчик формы поиска ------ */
  async subhandlerContentOfInput(e: MouseEvent | KeyboardEvent): void {
    const target = e.target as HTMLInputElement;
    const currentInput = (e.currentTarget as HTMLDivElement).querySelector('input[type="search"]');
    let value_;
    if (target.tagName === 'INPUT') {
      value_ = target.value;
    } else if ((currentInput !== null) && (currentInput.tagName === 'INPUT')) {
      value_ = (currentInput as HTMLInputElement).value;
    }

    if (value_ === undefined) {
      const err = new Error();
      err.name = '[Searher > subhandlerContentOfInput]';
      err.message = "Something what wrong! Not found the imput's value.";
      throw err;
    }

    if (value_.length < 3) {
      return;
    }
    const value = value_.slice(0);
    const url = new URL('api/v1/search/get/', 'http://127.0.0.1:8000/');
    url.searchParams.set('searcher', value);
    this.urls = url;
    const contentType = 'application/json;charset=utf-8';
    const caches = 'no-cahe';
    const responseJson = await this.get({ contentType, caches }) as S;

    this.arr = responseJson.searcher; // received an array of db search result
    const beforeNum = 0;
    const offset = this.offset;

    const basisPage = (this.arr).slice(beforeNum, offset);
    this.template(basisPage);
    /* ----- Pagintions ----- */
    const pagination = new Paginations((this.arr).slice(0));
    const dashbord = pagination.start();
    const chatHtml = this.getChatBox(); // get html-div box of the DOM
    chatHtml.insertAdjacentHTML('afterend', dashbord);

    const handlerStyle = (e: MouseEvent): void => { // style for an active link from the pagiation
      const current = e.currentTarget as HTMLElement;
      const target_ = e.target as HTMLElement;

      if (!current.classList.contains('pagination')) {
        return;
      }

      const li = current.querySelector('li.active');
      if (li !== null) {
        li.classList.remove('active');
      }

      if (target_.tagName === 'A') {
        (target_.parentNode as HTMLLIElement).classList.add('active');
      };
    };

    const p = (document).querySelector('.pagination');
    if (p === null) {
      return;
    }
    (p as HTMLDivElement).onclick = handlerStyle;

    const anchors = p.querySelectorAll('li');
    if (anchors.length === 0) {
      return;
    };

    /* ------ that is inserting the handler for a click by pagination ------ */
    const template = this.template.bind(this);
    const handlerClick = pagination.handlerClick.bind(pagination);
    for (let i = 0; i < anchors.length; i++) {
      (anchors[i]).addEventListener('click', handlerClick(template));
    }
  }

  /* ------ шаблон результатов поиска ------ */
  template(props: ChatMessage[]): void {
    const chatHtml = this.getChatBox();

    chatHtml.classList.add('serch');
    chatHtml.innerHTML = '';

    Array.from(props).forEach((item) => {
      const htmlMessage = document.createElement('div');
      const { postId, authorId, message, groupId, dataTime } = { ...item };
      const resultCheckUser = checkerUserId(authorId);
      const rightLeft: string = ((resultCheckUser as boolean) ? 'chat-message-right' : 'chat-message-left') as string;

      htmlMessage.dataset.post = String(postId);
      htmlMessage.innerHTML += `
      <div >
        <img src=" https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman"
          width="40" height="40" />
        <div class="text-muted small text-nowrap mt-2">${checkOfTime(dataTime as string)}</div>
      </div>
      <div class="box-message flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="user-name font-weight-bold mb-1">${(resultCheckUser as boolean) ? 'You' : 'NOT your'}
        </div>
        <div class="user-message">
        ${message}
        </div>
      </div>`;
      const res = ((typeof authorId).includes('string')) ? authorId : String(authorId);
      htmlMessage.setAttribute('data-id', res as string);

      htmlMessage.className = 'pb-4 message';
      htmlMessage.classList.add(rightLeft);

      const newBox = htmlMessage.outerHTML;
      chatHtml.innerHTML += newBox;
    });
  }
}
