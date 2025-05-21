import { Component, Input } from '@angular/core';
import { expectbook } from '../../services/books.interface';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  @Input() book!: expectbook;
}
