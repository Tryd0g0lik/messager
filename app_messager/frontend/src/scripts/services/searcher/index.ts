// app_messager\frontend\src\scripts\services\searcher\index.ts

import { Searcher } from './oop/search';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const topsearch = document.querySelector('#searchup');
  if (topsearch !== null) {
    const search = new Searcher(topsearch as HTMLElement);
    const heandler = search.heandlerClick.bind(search);
    (topsearch as HTMLElement).onclick = heandler;
  };
});
