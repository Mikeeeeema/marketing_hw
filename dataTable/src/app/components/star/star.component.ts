import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-star',
  imports: [CommonModule],
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss',
})
export class StarComponent {
  rate = 4;
  rates: boolean[] = new Array(5).fill(false);
  ratings!: { name: string; rate: number }[];
  constructor() {
    for (let i = 0; i < this.rate; i++) {
      this.rates[i] = true;
    }

    const ave = this.rates.reduce((acc, curr) => acc + curr.list, 0);
  }
}
