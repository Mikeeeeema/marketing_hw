import { Component, inject } from '@angular/core';
import { expectbook } from '../../services/books.interface';
import { BooksService } from '../../services/books.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlist: expectbook[] = [];
  private bookService = inject(BooksService);

  ngOnInit() {
    this.bookService.wishes$.subscribe((wishlist) => {
      this.wishlist = wishlist;
    });
  }
}
