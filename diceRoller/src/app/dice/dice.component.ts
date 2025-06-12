import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  imports: [CommonModule],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.scss',
})
export class DiceComponent {
  @Input() num!: number;
  dots: { style: Position }[] = [];

  ngOnChanges() {
    console.log(this.num);
    this.dots = this.generatedots(this.num);
  }

  generatedots(num: number) {
    const positions: Position[][] = [
      [{ top: '50%', left: '50%' }],
      [
        { top: '25%', left: '25%' },
        { top: '75%', left: '75%' },
      ],
      [
        { top: '25%', left: '25%' },
        { top: '50%', left: '50%' },
        { top: '75%', left: '75%' },
      ],
      [
        { top: '25%', left: '25%' },
        { top: '25%', left: '75%' },
        { top: '75%', left: '25%' },
        { top: '75%', left: '75%' },
      ],
      [
        { top: '25%', left: '25%' },
        { top: '25%', left: '75%' },
        { top: '50%', left: '50%' },
        { top: '75%', left: '25%' },
        { top: '75%', left: '75%' },
      ],
      [
        { top: '25%', left: '25%' },
        { top: '25%', left: '75%' },
        { top: '25%', left: '50%' },
        { top: '75%', left: '25%' },
        { top: '75%', left: '75%' },
        { top: '75%', left: '50%' },
      ],
    ];
    return positions[num - 1].map((pos: Position) => ({
      style: { top: pos.top, left: pos.left },
    }));
  }
}

export interface Position {
  top: string;
  left: string;
}
