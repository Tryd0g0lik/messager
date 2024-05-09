import checkerUserId from '../../checkers/checkUseId';
import { EInput } from './inputs';
import checkOfTime from '../../checkers/checker_time';
import { ChatMessage } from '@Interfaces';

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

  async subhandlerContentOfInput(e: MouseEvent | KeyboardEvent): void {
    const target = e.target as HTMLInputElement;
    const currentInput = (e.currentTarget as HTMLDivElement).querySelector('input[type="search"]')
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
    const responseJson = await this.get({ contentType, caches }) as ChatMessage;
    this.template(responseJson.searcher);
  }

  template(props: ChatMessage[]): void {
    const chatHtml = document.getElementById('chat');
    if (chatHtml === null) {
      const err = new Error();
      err.name = '[EInput > get]';
      err.message = 'Something what wrong! Not found "#chat"';
      throw err;
    }
    chatHtml.innerHTML = '';
    // debugger;

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
        <div class="text-muted small text-nowrap mt-2">${checkOfTime(dataTime)}</div>
      </div>
      <div class="box-message flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="user-name font-weight-bold mb-1">${(resultCheckUser as boolean) ? 'You' : 'NOT your'}
        <div class='pencil'></div>
        </div>
        <div class="user-message">
        ${message}
        </div>
      </div>
  `;
      const res = ((typeof authorId).includes('string')) ? authorId : String(authorId);
      htmlMessage.setAttribute('data-id', res as string);

      htmlMessage.className = 'pb-4 message';
      htmlMessage.classList.add(rightLeft);

      const newBox = htmlMessage.outerHTML;
      chatHtml.innerHTML += newBox;
    });
  }
}
