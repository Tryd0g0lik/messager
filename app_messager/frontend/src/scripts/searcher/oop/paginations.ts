import { ChatMessage, S } from '@Interfaces';
let numPageOld = 0;

export class Paginations {
  private readonly list: ChatMessage[];

  numPage: number;
  constructor(list: ChatMessage[]) {
    this.list = list;
    this.numPage = -1;
  }

  handlerClick(fun: (props: ChatMessage[]) => void) {
    return (e: MouseEvent): void => {
      e.preventDefault();
      const target = e.target as HTMLElement;

      if (target.tagName === 'A') {
        const numberLink = Number((target as HTMLAnchorElement).search.split('=')[1]);
        this.numPage = numberLink;
      } else {
        return;
      }

      const numPage = this.numPage;
      if (numPageOld !== numPage) {
        // const newlist = (this.list).slice(numPageOld, 12 * numPage);
        const newlist = (this.list).slice(
          (((12 * numPage) - 12) <= 0) ? 0 : ((12 * numPage) - 12),
          12 * numPage);
        numPageOld = numPage;
        fun(newlist);
      };
    };
  }

  private dashbordnumer(): string {
    const listLen = (this.list).length;
    const div = document.createElement('div');
    div.id = 'pages';
    div.className = 'page';
    let dashbord = '<ul>';
    debugger
    if (listLen > 12) {
      const n = (Number.isInteger(listLen / 12))
        ? (listLen / 12)
        : Number(String(listLen / 12).split('.')[0]) + 1;

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

  template(): string {
    const boxPagination = document.createElement('div');
    const dashbordnumer = this.dashbordnumer();
    const listLen = (this.list).length;

    boxPagination.className = 'pagination';
    /* <div class="current"> */
    boxPagination.innerHTML = `
    <div class="previous previous">
      <ul>
        <li><a href="?page=1">&laquo; first</a></li>
        <li><a href="?page=false">previous</a></li>
      </ul>
    </div>

    <div class="step-links">
      ${String(dashbordnumer)}
    </div>

    <div class="previous last">
      <ul>
        <li><a href="?page=true">next</a></li>
        <li><a href="?page=${listLen}">last &raquo;</a></li>
      </ul>
    </div>`;
    /*
    </div>
    {% if page_obj.has_next %}
            <a href="?page={{ page_obj.next_page_number }}">next</a>
            <a href="?page={{ page_obj.paginator.num_pages }}">last &raquo;</a>
         {% endif %}
         */
    // boxPagination.onclick = handlerClick;
    return boxPagination.outerHTML;
  }

  start(): string {
    const props = this.list;
    const template = this.template();
    return template;
  }
}
