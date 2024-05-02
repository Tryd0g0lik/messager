export default function scrollToBottom(): void {
  const chatBox = document.querySelector('#chat');
  if (chatBox === null) {
    return;
  }
  chatBox.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}
