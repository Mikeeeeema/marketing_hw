import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wordle-game',
  imports: [CommonModule],
  templateUrl: './wordle-game.component.html',
  styleUrl: './wordle-game.component.scss',
})
export class WordleGameComponent {
  answer: string = 'scarf';
  history: string[][] = Array.from({ length: 6 }, () => new Array(5).fill(''));
  keyboard: string[][] = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ];
  currentRow: number = 0;
  currentIndex: number = 0;

  gameOver = false;

  onClick(c: string) {
    console.log(c);
    if (this.gameOver) {
      return;
    }
    //1. 如果只是字母
    if (c === '⌫') {
      if (this.currentIndex) {
        this.history[this.currentRow][this.currentIndex - 1] = '';
        this.currentIndex--;
      }
    } else if (c === 'enter') {
      if (this.currentIndex === 5) {
        this.checkWin();
      }
    } else if (this.currentIndex < 5) {
      this.history[this.currentRow][this.currentIndex] = c;
      this.currentIndex++;
    }
  }

  checkWin() {
    if (this.history[this.currentRow].join('') === this.answer) {
      console.log('win the game');
      this.gameOver = true;
    } else if (this.currentRow < 6) {
      this.currentRow++;
      this.currentIndex = 0;
      console.log('try next row');
    } else {
      console.log('Game is over');
      this.gameOver = true;
    }
  }

  getCellStatus(r: number, c: number) {
    const letter = this.history[r][c];
    if (!letter) return '';
    if (this.gameOver && this.history[r].join('') === this.answer) {
      return 'correct';
    }
    if (r >= this.currentRow) return '';

    if (letter === this.answer[c]) {
      return 'correct';
    } else if (this.answer.includes(letter)) {
      return 'present';
    } else {
      return 'absent';
    }
  }

  resetGame() {
    this.history = Array.from({ length: 6 }, () => new Array(5).fill(''));
    this.currentIndex = 0;
    this.currentRow = 0;
    this.gameOver = false;
  }
}
