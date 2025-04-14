import { Component, effect, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { expectedBook } from '../../services/book.interface';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlist: expectedBook[] = [];
  constructor(private wishlistService: WishlistService) {
    effect(() => {
      this.wishlist = this.wishlistService.wishlist();
    });
  }

  removeFromWishlist(book: expectedBook) {
    this.wishlistService.removeFromWishlist(book);
  }
}
