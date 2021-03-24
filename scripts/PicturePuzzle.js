"use strict";
class PicturePuzzle {
  constructor(renderEl, pictureUrl, canvasWidth, dimension = 3) {
    this.parentEl = renderEl;
    this.pictureUrl = pictureUrl;
    this.width = canvasWidth;
    this.isPlaying = false;
    this.cells = [];
    this.notShuffledCells = [];
    this.dimension = dimension;
    this.init();

    const img = new Image();
    img.onload = () => {
      this.height = this.width * (img.height / img.width);
      this.el.style.width = `${this.width}px`;
      this.el.style.height = `${this.height}px`;
      this.setup();
    };
    img.src = this.pictureUrl;

    this.counter = 0;
    this.report = document.getElementById("counter");
    this.updateReport()
  }

  init() {
    this.el = this.createdWrapper();
    this.parentEl.appendChild(this.el);
  }

  createdWrapper() {
    const div = document.createElement("div");
    div.style.position = "relative";
    div.style.margin = "0 auto";
    return div;
  }

  updateReport() {
    this.report.innerHTML = this.counter;
  }

  increaseCounter() {
    this.counter++;
  }

  resetCounter() {
    this.counter = 0;
  }
  setup() {
    // key point: we have the same images but with different background position
    const upperIndex = this.dimension * this.dimension;
    for (let i = 0; i < upperIndex; i++) {
      this.cells.push(new Cell(this, i));
    }
    this.notShuffledCells = [...this.cells];
    //this.shuffleArray();
    console.log(this.cells);
  }

  shuffleArray() {
    for (let i = this.cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swapCell(i, j);
    }
    this.isPlaying = false;
  }

  //  Key functionality: To swap 2 cells (applied in empty cell and neighbor non-empty cell)
  swapCell(i, j) {
    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    this.cells[i].setPostition(i);
    this.cells[j].setPostition(j);
    if (this.isPlaying && this.isAssemble()) {
        console.log("winner");
        alert("Congratulations !!! You solved the puzzle")
    }
  }

  findPosition(index) {
    return this.cells.findIndex((cell) => cell.index === index);
  }

  findEmpty() {
    return this.cells.findIndex((cell) => cell.isEmpty);
  }

  getProportion() {
    return this.height / this.width;
  }

  isAssemble() {
    for (let i = 0; i < this.cells.length; i++) {
      
      if (i !== this.cells[i].index) {
        // a corner case in 3x3 game
        //if (
        //  i === 6 &&
        //  this.cells[i].index === 8 &&
        //  this.cells[i + 1].index === i + 1
        //) {
        //    console.log("is assemble");
        //    this.isPlaying = false;
        //  return true;
        //}
        return false;
      }
    }
    this.isPlaying = false;
    return true;
  }

  shuffleArrayToOriginal() {
    this.cells = [...this.notShuffledCells];
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].setPostition(i);
    }
    this.isPlaying = false;
    this.resetCounter();
    this.updateReport();
  }
}
