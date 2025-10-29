export function notCloneId(arr) {
  let idList = [];
  let notCloneList = [];
  arr.map(item => idList.push(item.imdbID))
  const notCloneIdList = [... (new Set(idList))];
  notCloneIdList.map(itemId => {
    let idCount = 0
    arr.map(itemData => {
      if (itemData.imdbID === itemId && idCount === 0) {
        notCloneList.push(itemData);
        ++idCount
      }
    })
  })
  return notCloneList
}