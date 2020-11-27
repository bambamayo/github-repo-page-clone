export function setRepoUpdateTime(isoString) {
  let date = new Date(isoString);
  let dateToDateStringArr = date.toDateString().split(" ");

  return `${dateToDateStringArr[1]} ${dateToDateStringArr[2]}`;
}
