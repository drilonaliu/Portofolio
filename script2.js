//DOM
let container = document.querySelector('.container');
let innerContainer = document.querySelector('.card-container');
let items = document.querySelectorAll('.card');


let isDragging = false;
let x1 = 0; // mouse click
let x = 0; //mouse dragged
let inner_container_x = 0; //inner container x when on click cordinate
let width = parseInt(innerContainer.getBoundingClientRect().width, 10) || 0; //width of inner container


container.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.style.cursor = 'grabbing';
    x1 = e.pageX;
    inner_container_x = parseInt(innerContainer.style.left, 10) || 0;
});

document.addEventListener('mouseup', (e) => {
    isDragging = false;
    container.style.cursor = 'grab'
})

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        e.preventDefault();

        //Mouse dragged x coordinate
        x = e.pageX;

        //New coordinates of the inner container
        let start_x = inner_container_x - (x1 - x);
        let end_x = start_x + width;

        //Coordinates of the container relative to inner container
        let minX = 0;
        let maxX = container.getBoundingClientRect().width;

        //Check if we are scrolling beyond the left edge
        if (start_x > minX) {
            start_x = minX;
        }
        //Check if we are scrolling beyond the right edge
        if (end_x < maxX) {
            start_x = maxX - width;
        }

        //Update the inner container coordinate x
        innerContainer.style.left = start_x + 'px';

        //Update the cards 
        const frequency = 0.01;
        items.forEach((item, index) => {
            cardWidth = item.getBoundingClientRect().width
            const xOffset = index * cardWidth + start_x;
            const y = Math.sin(xOffset *frequency) * 15;
            item.style.transform = `translateY(${y}px)`;
        })
    }
})