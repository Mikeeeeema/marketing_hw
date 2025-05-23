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

  currentIndex: number = 0;

  prev() {
    console.log(this.currentIndex);
    if (this.currentIndex > 0) this.currentIndex--;
    console.log(this.currentIndex);
  }

  next() {
    console.log(this.currentIndex);

    if (this.currentIndex < this.images.length - 1) this.currentIndex++;
    console.log(this.currentIndex);
  }
}
