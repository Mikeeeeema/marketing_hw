import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageCarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'imageCarousel';
}
