import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiceComponent } from './dice/dice.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, DiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'diceRoller';
  inputNum!: number;
  ifClick = false;
  dices: number[] = [];

  onClick() {
    this.dices = [];
    for (let i = 0; i < this.inputNum; i++) {
      this.dices.push(Math.floor(Math.random() * 6 + 1));
    }
    console.log(this.dices);
  }
}
