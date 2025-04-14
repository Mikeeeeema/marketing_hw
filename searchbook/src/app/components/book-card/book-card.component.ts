import { Component, Input } from '@angular/core';
import { expectedBook } from '../../services/book.interface';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() book!: expectedBook;

  
}
