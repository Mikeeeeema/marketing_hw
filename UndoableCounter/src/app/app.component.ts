import { Component } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'UndoableCounter';
  num: number = 0;
  histories: [string, number, number][] = [];
  redoStack: [string, number, number][] = [];

  updateHistory(n: number): void {
    if (n !== this.num) {
      if (this.histories.length >= 50) {
        this.histories.shift();
      }

      this.histories.push([
        `${n - this.num > 0 ? '+' : ''}${n - this.num}\t(${this.num} -> ${n})`,
        this.num,
        n,
      ]);
      this.num = n;
      this.redoStack = [];
    }
  }

  undo() {
    const last: [string, number, number] | undefined = this.histories.pop();

    if (last) {
      this.redoStack.push(last);
      this.num = last[1];
    }
  }

  redo() {
    const cur: [string, number, number] | undefined = this.redoStack.pop();
    if (cur) {
      this.histories.push(cur);
      this.num = cur[2];
    }
  }
}
