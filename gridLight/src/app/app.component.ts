import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gridLight';
  grids: string[] = [
    '1 / 1',
    '1 / 2',
    '1 / 3',
    '2 / 1',
    '2 / 3',
    '3 / 1',
    '3 / 2',
    '3 / 3',
  ];
  clickedgrids: number[] = [];
  clicked: boolean[] = Array(9).fill(false);

  onClick(i: number) {
    if (!this.clickedgrids.includes(i)) {
      this.clickedgrids.push(i);
      this.clicked[i] = true;
    }
    console.log(this.clickedgrids);
    if (this.clickedgrids.length === 8) {
      this.clearGrids();
    }
  }

  clearGrids() {
    const interval = setInterval(() => {
      if (this.clickedgrids.length === 0) {
        clearInterval(interval);
        return;
      }

      const current = this.clickedgrids.pop();
      console.log(this.clickedgrids);
      if (current !== undefined) {
        this.clicked[current] = false;
      }
    }, 300);
  }
}
