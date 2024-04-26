/**
 * @param `arr`: `number[]'.  That array from the `id` files
 * @returns `string[]` That links of files
 */
async function getLinksToFile(arr: number[]): Promise<string[] | undefined> {
  const url = new URL('api/v1/chat/upload/files/', 'http://127.0.0.1:8000/');
  url.searchParams.set('indexes', String(arr));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    // debugger
    const data = await response.json();
    console.info('[createChatMessage > LINK]:', data);
    const dataList = (JSON.parse(data.files)).linkList;
    const result = dataList.slice(0);
    return result as string[];
  }
}
export default getLinksToFile;
