// Tutaj napisz swój kod

function convertToTimeFormat(timeInSec) {
  const seconds = (timeInSec % 60).toString();
  const minutes = (((timeInSec - seconds) / 60) % 60).toString();
  const hours = (((timeInSec - seconds) / 60 - minutes) / 60).toString();
  const timeFormat = `${hours}:${minutes}:${seconds}`;
  return { seconds, minutes, hours, time: timeInSec, timeFormat };
}

const timeElements = document.querySelectorAll('tr>td:last-child');
const moduleElements = document.querySelectorAll('tr>td:nth-child(1)');
const authorElements = document.querySelectorAll('tr>td:nth-child(2)');

const timeValues = Object.values(timeElements).map((item, index) => [
  Number(item.innerHTML),
  index,
]);
const valuesByRow = Object.values(timeElements).map((item, index) => [
  index,
  Object.values(moduleElements)[index].innerHTML,
  Object.values(authorElements)[index].innerHTML,
  Number(item.innerHTML),
]);

const timeDescending = valuesByRow
  .sort((a, b) => b[3] - a[3])
  .map((item) => item);

const timeAscending = valuesByRow
  .sort((a, b) => a[3] - b[3])
  .map((item) => item);

timeElements.forEach(
  (item) =>
    (item.innerHTML = convertToTimeFormat(Number(item.innerHTML)).timeFormat)
);

function toggle(indexOfRow, values) {
  timeElements[indexOfRow].innerHTML = convertToTimeFormat(
    values[indexOfRow][3]
  ).timeFormat;
  authorElements[indexOfRow].innerHTML = values[indexOfRow][2];
  moduleElements[indexOfRow].innerHTML = values[indexOfRow][1];
}

const changeElement = document.querySelector('tr>th:last-child');

let triangle = document.querySelector('i');

let directionStatus = 'down';
changeElement.addEventListener('click', () => {
  if (directionStatus === 'down') {
    valuesByRow.forEach((item) => toggle(item[0], timeAscending));
    directionStatus = 'up';
  } else {
    valuesByRow.forEach((item) => toggle(item[0], timeDescending));
    directionStatus = 'down';
  }
});
function changeToUp() {
  triangle.classList = [];
  triangle.classList.add('fa-caret-up');
  triangle.classList.add('fa');
}

function changeToDown() {
  triangle.classList = [];
  triangle.classList.add('fa-caret-down');
  triangle.classList.add('fas');
}

if (directionStatus === 'down') {
  changeToUp();
} else {
  changeToDown();
}
