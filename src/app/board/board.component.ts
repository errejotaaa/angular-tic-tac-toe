import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  squares: string[];
  private isXmark: boolean = false;
  winner: string;
  noWinner: boolean = false;

  get player(): string {
    return this.isXmark ? 'O' : 'X';
  }
  constructor() {}

  ngOnInit(): void {
    this.onNewGame();
  }

  onNewGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.isXmark = false;
    this.noWinner = false;
  }

  onClickSquare(index: number) {
    if (!this.squares[index] && !this.winner) {
      this.squares[index] = this.isXmark ? 'O' : 'X';

      this.isXmark = !this.isXmark;
    }
    this.winner = this.isWinner();
    this.noWinner = this.isNoWinner();
  }

  isWinner() {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];

      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  isNoWinner() {
    let count = 0;
    for (let i = 0; i < this.squares.length; i++) {
      if (this.squares[i] !== null) {
        count++;
      }
    }
    if (count === this.squares.length) {
      return true;
    }

    return false;
  }
}
