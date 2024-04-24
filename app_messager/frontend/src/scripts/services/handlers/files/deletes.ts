// при нажатии на песил получаю данные файла - мало ло ли что в инпут будет. 

// при нажатии на ведро получаю данные файла - работаю с '   handlerGetMessageOfInput(manageOldMessageTotal());'

// !!!!: нажимаю на песил, затем на ведро - надо обновить данные о фале в инпут
// Что делать после инпут = удалить илм добавить ?

function handlerFileOne(e: MouseEvent): boolean {
  debugger
  const target = (e.target as HTMLElement);
  if ((String(target.classList).includes('bucke'))) {
    console.log('[handlerFileOne]');
    (e.currentTarget as HTMLElement).remove();
    return true;
  }
  return false;
};

export default handlerFileOne;
