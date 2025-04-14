import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShowWishListComponent } from './components/show-wish-list/show-wish-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'showBook', component: ShowWishListComponent },
];
