import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'connectFourGame';
  board: string[][] = Array.from({ length: 6 }, () => Array(7).fill(''));
  gameOver: boolean = false;
  r: string = '#d9313d';
  y: string = '#fdc601';
  currentPlayer: string = this.r;
  hoverIndex: number | null = null;
  isDraw = false;

  onClick(col: number) {
    console.log(col);

    const ifInsert = this.insert(col);
    console.log(this.board);
    if (this.checkWin()) {
      this.gameOver = true;
    } else if (this.board.flat().every((c) => c !== '')) {
      this.gameOver = true;
      this.isDraw = true;
    } else {
      this.currentPlayer =
        this.currentPlayer === this.r && ifInsert ? this.y : this.r;
    }
  }

  insert(col: number): boolean {
    for (let i = 5; i >= 0; i--) {
      // console.log();
      if (this.board[i][col] === '') {
        this.board[i][col] = this.currentPlayer;
        return true;
      }
    }
    return false;
  }

  checkWin() {
    console.log(this.board);
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (
          this.board[r][c] !== '' &&
          this.board[r][c] === this.board[r][c + 1] &&
          this.board[r][c] === this.board[r][c + 2] &&
          this.board[r][c] === this.board[r][c + 3]
        ) {
          return true;
        }
      }
    }

    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 3; r++) {
        if (
          this.board[r][c] !== '' &&
          this.board[r][c] === this.board[r + 1][c] &&
          this.board[r][c] === this.board[r + 2][c] &&
          this.board[r][c] === this.board[r + 3][c]
        ) {
          return true;
        }
      }
    }

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        if (
          this.board[r][c] !== '' &&
          this.board[r][c] === this.board[r + 1][c + 1] &&
          this.board[r][c] === this.board[r + 2][c + 2] &&
          this.board[r][c] === this.board[r + 3][c + 3]
        ) {
          return true;
        }
      }
    }

    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (
          this.board[r][c] !== '' &&
          this.board[r][c] === this.board[r - 1][c + 1] &&
          this.board[r][c] === this.board[r - 2][c + 2] &&
          this.board[r][c] === this.board[r - 3][c + 3]
        ) {
          return true;
        }
      }
    }

    return false;
  }

  resetBoard() {
    this.board = Array.from({ length: 6 }, () => Array(7).fill(''));
    this.gameOver = false;
    this.currentPlayer = this.r;
    this.hoverIndex = null;
    this.isDraw = false;
  }
}
