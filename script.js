const container = document.querySelector('.container');
const innerContainer = document.querySelector('.inner-container');



console.log("left:", innerContainer.style.left)
let isDragging = false;
let startX;
let scrollLeft;

container.style.cursor = 'grab';

container.addEventListener('mousedown', (e) => {
  isDragging = true;
  container.style.cursor = 'grabbing';
  startX = e.pageX;
  scrollLeft = parseInt(innerContainer.style.left, 10) || 0;
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  container.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();

  const x = e.pageX;
  let walk = x - startX;
  let newLeft = scrollLeft + walk;

  const containerRect = container.getBoundingClientRect();
  const innerRect = innerContainer.getBoundingClientRect();

  const maxLeft = 0;
  const minLeft = containerRect.width - innerRect.width;

  if (newLeft > maxLeft) newLeft = maxLeft;
  if (newLeft < minLeft) newLeft = minLeft;

  innerContainer.style.left = newLeft + 'px';
});
