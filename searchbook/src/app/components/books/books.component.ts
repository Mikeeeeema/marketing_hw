import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { expectedBook } from '../../services/book.interface';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../book-card/book-card.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-books',
  imports: [CommonModule, BookCardComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  books: expectedBook[] = [];
  private searchSubject = new Subject<string>();
  constructor(
    private bookService: BooksService,
    private wishlist: WishlistService
  ) {}
  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((query) => {
        this.bookService.fetchBooks(query).subscribe((data) => {
          console.log('oninit', data);
          this.books = data;
          console.log('books', this.books);
        });
      });

    this.getBooks('');
  }

  onSearch(query: string) {
    this.searchSubject.next(query);
  }

  getBooks(query: string) {
    this.bookService.fetchBooks(query).subscribe((data) => {
      this.books = data;
      console.log('Fetched Books:', data);
    });
  }

  addToWishlist(book: expectedBook) {
    this.wishlist.addToWishlist(book);
    console.log(this.wishlist.wishlist());
  }
}
