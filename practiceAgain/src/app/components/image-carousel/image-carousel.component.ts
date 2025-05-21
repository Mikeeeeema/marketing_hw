import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent {
  @Input() images!: string[];
  index: number = 0;

  prev() {
    console.log(this.index);
    if (this.index > 0) this.index--;
    console.log(this.index);
  }

  next() {
    console.log(this.index);

    if (this.index < this.images.length - 1) this.index++;
    console.log(this.index);
  }
}
