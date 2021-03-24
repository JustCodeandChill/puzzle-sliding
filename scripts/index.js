"use strict";
// "https://picsum.photos/200/300"
const element = document.querySelector("#wrapper");
const pictureWidth = 1920;
const pictureHeight = 1080;
const pictureUrl = `https://picsum.photos/${pictureWidth}/${pictureHeight}`;
const canvasWidth = 600;
const dimension = 3;

const picturePuzzle = new PicturePuzzle(element, pictureUrl, canvasWidth, dimension);

const sample = document.querySelector("#img");
sample.style.backgroundImage = `url(${pictureUrl})`;
const sampleWidth = 300;
const sampleHeight = sampleWidth * (pictureHeight/pictureWidth);
sample.style.width = `${sampleWidth}px`;
sample.style.height = `${sampleHeight}px`;
sample.style.backgroundSize = 'cover';

const shuffleBtn = document.querySelector('#shuffle');
shuffleBtn.addEventListener('click', () => {
    picturePuzzle.shuffleArray();
})

const returnOriginalBtn = document.querySelector('#return');
returnOriginalBtn.addEventListener('click', () => {
    picturePuzzle.shuffleArrayToOriginal();
})

const reloadPage = document.querySelector("#new");
reloadPage.addEventListener('click', () => {
    location.reload(true);
})