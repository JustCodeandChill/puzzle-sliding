"use strict";

// index ranging from 0 to 8
class Cell {
  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;
    this.pseudoIndex = index + 1;
    this.isEmpty = false;
    this.width = this.puzzle.width / this.puzzle.dimension;
    this.height = this.puzzle.height / this.puzzle.dimension;
    this.el = this.createDiv();
    puzzle.el.appendChild(this.el);

    if (this.index === this.puzzle.dimension * this.puzzle.dimension - 1) {
      this.isEmpty = true;
      if (this.isEmpty) this.el.style.border = "none";
      return;
    }
    this.setImage();
    this.setPostition(this.index);
  }

  createDiv() {
    const div = document.createElement("div");
    // image style
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.border = "1px solid #fff";
    // image size
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;

    // image position
    div.style.position = "absolute";

    div.onclick = () => {
      const currentCellIndex = this.puzzle.findPosition(this.index);
      const emptyCellIndex = this.puzzle.findEmpty();
      const { x, y } = this.getXY(currentCellIndex);
      const { x: emptyX, y: emptyY } = this.getXY(emptyCellIndex);

      // condition to
      if (
        (x === emptyX || y === emptyY) &&
        (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)
      ) {
        console.log("Swapping");
        this.puzzle.isPlaying = true;
        this.puzzle.swapCell(currentCellIndex, emptyCellIndex);
        this.puzzle.increaseCounter();
        this.puzzle.updateReport();
      }
    };
    return div;
  }
  setImage() {
    const { x, y } = this.getXY(this.index);
    const left = this.width * x;
    const top = this.height * y;
    this.el.style.backgroundImage = `url(${this.puzzle.pictureUrl})`;
    this.el.style.backgroundPosition = `-${left}px -${top}px`;
  }

  setPostition(index) {
    const { left, top } = this.getPostionFromIndex(index);
    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  getPostionFromIndex(index) {
    const { x, y } = this.getXY(index);
    return {
      left: this.width * x,
      top: this.height * y,
    };
  }

  getXY(index) {
    return {
      x: index % this.puzzle.dimension,
      y: Math.floor(index / this.puzzle.dimension),
    };
  }
}
