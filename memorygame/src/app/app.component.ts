import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'memorygame';
  emojis = [
    '🐵',
    '🐶',
    '🦊',
    '🐱',
    '🦁',
    '🐯',
    '🐴',
    '🦄',
    '🦓',
    '🦌',
    '🐮',
    '🐷',
    '🐭',
    '🐹',
    '🐻',
    '🐨',
    '🐼',
    '🐽',
    '🐸',
    '🐰',
    '🐙',
  ];
  size: number = 4;
  board: { emoji: string; isFlipped: boolean }[][] = [];
  flippedCards: card[] = [];
  gameOver: boolean = false;

  ngOnInit(): void {
    this.generateBoard();
    console.log(this.board);
  }
  generateBoard() {
    const totalcells = this.size * this.size;
    const pairscount = totalcells / 2;

    // console.log(this.emojis);
    const shuffledEmojis = this.emojis.sort(() => Math.random() - 0.5);
    // console.log(this.emojis);
    const selectedEmojis = this.emojis.slice(0, pairscount);
    // console.log(selectedEmojis);
    const pairedEmojis = [...selectedEmojis, ...selectedEmojis];
    pairedEmojis.sort(() => Math.random() - 0.5);

    this.board = Array(this.size)
      .fill(null)
      .map(() =>
        pairedEmojis
          .splice(0, this.size)
          .map((emoji) => ({ emoji, isFlipped: false }))
      );

    this.flippedCards = [];
    this.gameOver = false;
  }

  flipCard(item: card): void {
    if (item.isFlipped || this.flipCard.length === 2) return;
    item.isFlipped = true;
    this.flippedCards.push(item);

    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [first, second] = this.flippedCards;

    if (first.emoji === second.emoji) {
      this.flippedCards = [];
      this.checkGameOver();
    } else {
      setTimeout(() => {
        first.isFlipped = false;
        second.isFlipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }

  checkGameOver() {
    const allMatch = this.board.every((row) =>
      row.every((card) => card.isFlipped)
    );

    if (allMatch) {
      this.gameOver = true;
    }
  }
}

export interface card {
  emoji: string;
  isFlipped: boolean;
}
