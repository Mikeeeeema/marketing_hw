import { Component, effect } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { expectedBook } from '../../services/book.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-wish-list',
  imports: [CommonModule],
  templateUrl: './show-wish-list.component.html',
  styleUrl: './show-wish-list.component.scss',
})
export class ShowWishListComponent {
  wishList: expectedBook[] = [];
  constructor(private wishlistService: WishlistService) {
    effect(() => (this.wishList = this.wishlistService.wishlist()));
  }
}
