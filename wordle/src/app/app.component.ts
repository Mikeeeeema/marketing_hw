import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordleGameComponent } from './components/wordle-game/wordle-game.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WordleGameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'wordle';
}
