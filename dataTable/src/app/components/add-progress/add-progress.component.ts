import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-progress',
  imports: [CommonModule],
  templateUrl: './add-progress.component.html',
  styleUrl: './add-progress.component.scss',
})
export class AddProgressComponent {
  bars: { progress: number }[] = [];

  addBar() {
    const bar = { progress: 0 };
    this.bars.push(bar);

    const duration = 2000;
    const interval = 50;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      bar.progress += increment;
      if (bar.progress >= 100) {
        bar.progress = 100;
        clearInterval(timer);
      }
    }, interval);
  }
}
