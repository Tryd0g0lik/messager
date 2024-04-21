// let h = (e: KeyboardEvent): void => { };
const eventKeyupManage = (h: (e: KeyboardEvent) => void) => {
  return (e: KeyboardEvent): void => {
    debugger
    if ((e).key === 'Enter') {
      const target = (e.target as HTMLInputElement);
      const messages = ((target.value).length > 0) ? target.value.trim() : '';
      if ((messages.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolean'))) {
        h(e);
      }
    };
  };
};
export default eventKeyupManage;
