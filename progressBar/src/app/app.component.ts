import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'progressBar';
  bars: { progress: number }[] = [];
  // bar: { progress: number } = { progress: 0 };

  ngOnInit() {
    // const duration = 2000;
    // const interval = 50;
    // const increment = 100 / (duration / interval);
    // const timer = setInterval(() => {
    //   this.bar.progress += increment;
    //   if (this.bar.progress >= 100) {
    //     this.bar.progress = 100;
    //     clearInterval(timer);
    //   }
    // }, interval);
  }

  onclick() {
    const bar: { progress: number } = { progress: 0 };
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
