// app_messager\frontend\src\scripts\services\message.ts
function getTextOfInput(): string {
  const messageInputHtml = document.querySelector('#messager');
  const massage_ = (messageInputHtml !== null) ? (messageInputHtml as HTMLInputElement).value : 'NoN';
  return massage_;
}
export default getTextOfInput;
