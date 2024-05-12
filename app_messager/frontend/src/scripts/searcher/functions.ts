function detectionElement(select: string): HTMLElement {
  const view = document.querySelector(select);
  if (view === null) {
    console.info('[serchElement] Something what wrong! That element not found');
  }
  return view as HTMLElement;
}

function htmlBoxLocation(select: string): DOMRect | undefined {
  const elem = detectionElement(select);
  if (elem === null) {
    return;
  }
  const res = elem.getBoundingClientRect();
  return res;
}

export default { detectionElement, htmlBoxLocation };
