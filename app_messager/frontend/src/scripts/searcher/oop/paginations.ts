import { ChatMessage } from '@Interfaces';
let numPageOld = 0;
const range = 12;

/**
 * @params 'list' - список сообщений
 * @params 'box' - контейнер хронящий информацию для пагинации. Контейнер должен иметь id
 */
export class Paginations {
  private readonly list: ChatMessage[];

  page: string;
  constructor(list: ChatMessage[], box: HTMLDivElement) {
    this.list = list;
    this.page = '';

    const boxs: HTMLElement = box;
    const paginationOld = document.querySelectorAll(`${boxs.id} .pagination`);
    Array.from(paginationOld).forEach((item) => {
      item.remove();
    });
  }

  /* ------ обработчик клика ------ */
  handlerClick(fun: (props: ChatMessage[]) => void) {
    return (e: MouseEvent): void => {
      e.preventDefault();
      const target = e.target as HTMLElement;

      if (target.tagName === 'A') {
        const page = (target as HTMLAnchorElement).search.split('=')[1];
        this.page = page;
      } else {
        return;
      }

      const page = this.page;
      if ((
        (!page.includes('false')) && (!page.includes('true')) &&
        (numPageOld !== Number(page))
      ) ||
        (
          (page.includes('false')) || (page.includes('true'))
        )) {
        const numbFirst = (
          ((!page.includes('false')) && (!page.includes('true')))
            ? (
              (((range * Number(page)) - range) <= 0) ? 0 : ((range * Number(page)) - range)
            )
            : (
              (page.includes('true'))
                ? (
                  (range * (((numPageOld + 1) <= this.integer((this.list).length))
                    ? (numPageOld + 1)
                    : this.integer((this.list).length))) - range
                )
                : (page.includes('false')
                  ? (((numPageOld - 1) > 0)
                    ? (range * (numPageOld - 1) - range)
                    : 0)
                  : 0)
            )
        );
        const numbLast = (
          ((!page.includes('false')) && (!page.includes('true')))
            ? (range * Number(page))
            : (
              (page.includes('true'))
                ? (
                  range * (((numPageOld + 1) <= this.integer((this.list).length))
                    ? (numPageOld + 1)
                    : this.integer((this.list).length)
                  )
                )
                : (((numPageOld - 1) > 0)
                  ? (range * (numPageOld - 1))
                  : range
                )
            )
        );
        const newlist = (this.list).slice(numbFirst, numbLast);

        if ((!page.includes('false')) && (!page.includes('true'))) {
          numPageOld = Number(page);
        } else if ((page.includes('false'))) {
          numPageOld = (((numPageOld - 1) > 0) ? (numPageOld - 1) : 0);
        } else {
          numPageOld = (((numPageOld + 1) <= this.integer((this.list).length))
            ? (numPageOld + 1)
            : this.integer((this.list).length));
        };

        fun(newlist);
      };
    };
  }

  /* ------ определяем тип числа - уелое или с десятичным остатком ------ */
  integer(num: number): number {
    const n = (Number.isInteger(num / range))
      ? (num / range)
      : Number(String(num / range).split('.')[0]) + 1;
    return n;
  }


  /* ------ шаблон пагинации ------ */
  template(): string {
    const boxPagination = document.createElement('div');

    const listLen = (this.list).length;
    const dashbordnumer = this.dashbordnumer();
    boxPagination.className = 'pagination';
    /* <div class="current"> */
    boxPagination.innerHTML = `
    <div class="previous first">
      <ul>
        <li ><a href="?page=1">&laquo; first</a></li>
        <li ><a href="?page=false">previous</a></li>
      </ul>
    </div>

    <div class="step-links">
      ${String(dashbordnumer)}
    </div>

    <div class="previous last">
      <ul>
        <li ><a href="?page=true">next</a></li>
        <li ><a href="?page=${(this.integer(listLen))}">last &raquo;</a></li>
      </ul>
    </div>`;

    return boxPagination.outerHTML;
  }

  /* ------ собираем в единое всю пагинацию ------ */
  private dashbordnumer(): string {
    const listLen = (this.list).length;

    const div = document.createElement('div');
    div.id = 'pages';
    let dashbord = '<ul>';

    if (listLen > range) {
      const n = this.integer(listLen);

      for (let i = 0; i < n; i++) {
        dashbord += `<li><a href="?page=${i + 1}">${i + 1}</a></li>`;
      }
      dashbord += '</ul>';
    } else {
      dashbord += '<li><a href="?page=1">1</a></li></ul>';
    }
    div.innerHTML = dashbord;
    return div.outerHTML;
  }

  start(): string {
    const props = this.list;
    const template = this.template();
    return template;
  }
}
