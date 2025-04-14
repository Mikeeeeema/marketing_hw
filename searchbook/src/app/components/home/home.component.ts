import { Component } from '@angular/core';
import { BooksComponent } from '../books/books.component';
import { WishlistComponent } from '../wishlist/wishlist.component';

@Component({
  selector: 'app-home',
  imports: [BooksComponent, WishlistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
