// при нажатии на песил получаю данные файла - мало ло ли что в инпут будет. 

// при нажатии на ведро получаю данные файла - работаю с '   handlerGetMessageOfInput(manageOldMessageTotal());'

// !!!!: нажимаю на песил, затем на ведро - надо обновить данные о фале в инпут
// Что делать после инпут = удалить илм добавить ?

function handlerFileOne(e: MouseEvent): void {
  const target = (e.target as HTMLElement);
  if (((target.tagName).includes('div')) && ('bucke'.includes(String(target.classList)))) {
    console.log('[handlerFileOne]');
  }
};

export default handlerFileOne;
