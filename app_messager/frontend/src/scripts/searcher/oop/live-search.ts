import { ChatMessage } from '@Interfaces';
import fun from '../functions';
import { Searher } from './search';

/**
 * @param `element` is entry point. That HTML a common box for form or a form itself \
 * wich contains the single field an input of the text type. Maybe this a box for form or \
 *  the form itself can be contains and html-button of the text type
 *
 */
export class LiveSearcher extends Searher {
  result = [];

  words: string
  constructor(element: HTMLDivElement | HTMLFormElement) {
    super(element);
    this.result = [];
    this.words = '';

    const htmlElement = fun.detectionElement('input[type="search"]');
    const window = fun.detectionElement('body');
    if (htmlElement === null) {
      this.errors('[LiveSearcher > htmlElement]');
    }
    const handlerKeyBoard = this.handlerKeyBoard.bind(this);
    (htmlElement as HTMLInputElement).removeEventListener('keyup', handlerKeyBoard);
    (htmlElement as HTMLInputElement).addEventListener('keyup', handlerKeyBoard);
  }

  async handlerKeyBoard(e: KeyboardEvent): Promise<void> {
    const target = e.target as HTMLElement;
    if ((e.type.includes('keyup') && (!(e.key).includes('Enter'))) && ((target.tagName).includes('INPUT'))) {
      this.words = (target as HTMLInputElement).value;

      /* ------ */
      const clear = this.clear.bind(this);
      window.removeEventListener('resize', () => { clear('.prompting') });
      window.addEventListener('resize', () => { clear('.prompting') });

      if (this.words.length < 3) {
        this.clear('.prompting');
        return;
      }

      const searcherObj = await this.receive(this.words);
      const templateresult = this.templateresult.bind(this);
      if (searcherObj === undefined) {
        this.errors('[LiveSearcher > handlerKeyBoard > searcherObj]');
      }

      let htmlLi = '';
      await ((searcherObj.searcher) as ChatMessage[]).forEach((item) => {
        htmlLi += String(templateresult(item));
      });

      if (htmlLi.length === 0) {
        this.errors('[LiveSearcher >handlerKeyBoard > searcherObj.searcher]');
      }

      this.clear('.prompting');
      const div = document.createElement('div');
      div.className = 'prompting';
      div.innerHTML = `<ul>${htmlLi}</ul>`;
      /* ------ */
      const res = fun.detectionElement('body');
      const box = fun.htmlBoxLocation('.position-relative');
      const location = fun.htmlBoxLocation('input[type="search"]');
      if (location !== undefined || box !== undefined) {
        div.style.left = String((location as DOMRect).left) + 'px';
        div.style.top = String((box as DOMRect).top + 39) + 'px';
      }
      if (res !== null) {
        res.insertAdjacentHTML('afterend', div.outerHTML);
      }
    } else if (((e.key).includes('Escape')) || ((e.key).includes('Enter'))) {
      this.clear('.prompting');
    }
  }

  private async receive(v: string): Promise<Record<'searcher', object>> {
    const url = new URL('api/v1/search/get/', 'http://127.0.0.1:8000/');
    url.searchParams.set('searcher', v);
    this.urls = url;
    const response = await this.get({ contentType: 'application/json' });
    return response as Record<'searcher', object>;
  };

  private templateresult(prop: ChatMessage): string | undefined {
    const { message, postId } = prop;
    const wordArr = message.split(' ');
    const swords = this.words;
    const wordFilt = wordArr.filter((item) => item.includes(swords));
    if (wordFilt.length === 0) {
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `<span>${wordFilt[0]}</span><span><a href="/#${postId}">go to message</a></span>`;
    return li.outerHTML;
  }

  clear(select: string): void {
    const res = fun.detectionElement(select);
    if (res !== null) {
      res.remove();
    }
  }

  /**
   *
   * @param `name` type a string. Exemple is '[handlerKeyBoard > searcherObj.searcher]'
   * @returns void
   */
  errors(name: string): void {
    const err = new Error('Something what wrong!');
    err.name = name;
    throw err;
  }
}

// const { searcher } = datas;
// datas: Record<'searcher', object>
