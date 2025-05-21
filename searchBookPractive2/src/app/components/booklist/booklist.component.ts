import { Component, inject } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { expectbook } from '../../services/books.interface';
import { CommonModule } from '@angular/common';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-booklist',
  imports: [CommonModule, BookComponent],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.scss',
})
export class BooklistComponent {
  books!: expectbook[];
  private booksService = inject(BooksService);

  ngOnInit() {
    this.booksService.books$.subscribe((books: expectbook[]) => {
      this.books = books;
    });
  }

  onClick(book: expectbook) {
    this.booksService.addToWishlist(book);
  }
}
