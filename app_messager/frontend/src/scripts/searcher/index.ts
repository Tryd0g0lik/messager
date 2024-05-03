// app_messager\frontend\src\scripts\services\searcher\index.ts

import { Searher } from './oop/search';
import './style.css';
/* ------ Search ------ */
document.addEventListener('DOMContentLoaded', () => {
  const topsearch = document.querySelector('#searchup');
  if (topsearch !== null) {
    const search = new Searher(topsearch as HTMLDivElement);
  };
});
