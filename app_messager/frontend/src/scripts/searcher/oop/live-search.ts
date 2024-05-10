import { Searher } from './search';

/**
 * @param `element` is entry point. That HTML a common box for form or a form itself \
 * wich contains the single field an input of the text type. Maybe this a box for form or \
 *  the form itself can be contains and html-button of the text type
 *
 */
export class LiveSearcher extends Searher {
  result = [];
  constructor(element: HTMLDivElement | HTMLFormElement) {
    super(element);
    this.result = [];
  }

}
