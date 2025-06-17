import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tictactoe';
  width: number = 2;
  height: number = 3;
  currentPlayer: 'x' | 'o' = 'x';
  gameOver: boolean = false;
  ifDraw = true;
  board: string[][] = Array.from({ length: this.height }, () =>
    new Array(this.width).fill('')
  );

  ngOnInit() {
    of(1, 2, 3)
      .pipe(map((value) => value * 10))
      .subscribe(console.log);
  }

  onClick(r: number, c: number) {
    if (this.board[r][c] !== '' || this.gameOver) {
      return;
    }

    this.board[r][c] = this.currentPlayer;
    console.log(this.board);
    if (this.checkWin()) {
      this.gameOver = true;

      console.log(this.currentPlayer, 'win');

      return;
    }
    //分开判断
    else if (this.board.flat().reduce((a, i) => a && i !== '', true)) {
      this.ifDraw = true;
      this.gameOver = true;
      console.log('draw');
    } else {
      this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
    }
  }

  checkWin() {
    for (let i = 0; i < this.height; i++) {
      let res = this.board[i][0] !== '' ? true : false;
      for (let j = 1; j < this.width; j++) {
        res = res && this.board[i][0] === this.board[i][j];
      }
      if (res) {
      }
      if (res) return true;
    }
    for (let i = 0; i < this.width; i++) {
      let res = this.board[0][i] !== '' ? true : false;
      for (let j = 1; j < this.height; j++) {
        res = res && this.board[0][i] === this.board[j][i];
      }
      if (res) {
      }
      if (res) return true;
    }

    let minLen = Math.min(this.width, this.height);

    //左上到右下
    //row as start
    for (let i = 0; i <= this.width - minLen; i++) {
      let res = this.board[0][i] !== '';
      for (let j = 1; j < minLen; j++) {
        if (j >= this.height || i + j >= this.width) {
          res = false;
          break;
        }
        res = res && this.board[0][i] === this.board[j][i + j];
      }
      if (res) return true;
    }
    //col as start
    for (let i = 0; i <= this.height - minLen; i++) {
      let res = this.board[i][0] !== '';
      for (let j = 1; j < minLen; j++) {
        res = res && this.board[i][0] === this.board[j + i][j];
      }
      if (res) return true;
    }
    //右上到坐下
    //row as start
    for (let i = 0; i <= this.width - minLen; i++) {
      let res = this.board[this.height - 1][i] !== '';
      for (let j = 1; j < minLen; j++) {
        res =
          res &&
          this.board[this.height - 1][i] ===
            this.board[this.height - 1 - j][j + i];
      }
      if (res) return true;
    }
    // //col as start
    for (let i = 0; i <= this.height - minLen; i++) {
      let res = this.board[i][this.width - 1] !== '';
      for (let j = 1; j < minLen; j++) {
        res =
          res &&
          this.board[i][this.width - 1] ===
            this.board[i + j][this.width - 1 - j];
      }
      if (res) return true;
    }

    //col as start
    // let res = this.board[0][0] !== '';
    // // console.log('res:', res);
    // for (let i = 1; i < this.height; i++) {
    //   res = res && this.board[i][i] === this.board[0][0];
    //   // console.log('res in for:', res);
    // }
    // if (res) return true;

    // let res1 = this.board[0][this.width - 1] !== '';
    // for (let i = 0; i < this.height; i++) {
    //   res1 =
    //     res1 &&
    //     this.board[0][this.width - 1] === this.board[i][this.width - 1 - i];
    // }
    // if (res1) return true;

    return false;
  }

  onReset() {
    if (confirm('Are you sure to reset the game?')) {
      this.board = Array.from({ length: this.height }, () =>
        Array(this.width).fill('')
      );
      this.gameOver = false;
      this.ifDraw = false;
    }
  }
}
