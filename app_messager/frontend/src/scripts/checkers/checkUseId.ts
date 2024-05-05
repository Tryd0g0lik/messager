// app_messager\frontend\src\scripts\checkers\checkUseId.ts
/**
 * @param userId ориентируется на user id б он же \
 * data-id из  #messager[data-id]. ?!?!?!?!?!?!?!?!?
 * @returns
 */
export default function checkerUserId(userId: string | number): undefined | boolean {
  const inputHtml = document.getElementById('messager');
  if (inputHtml === null) {
    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the "inputHtml"!');
    return;
  }
  const inputUserId = inputHtml.dataset.id;
  if (inputUserId === undefined) {
    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the "inputUserId"!');
    return;
  }
  const userIdNumber = ((typeof userId).includes('string'))
    ? Number(userId)
    : userId;
  const result = (userIdNumber === Number(inputUserId));
  return result;
}
