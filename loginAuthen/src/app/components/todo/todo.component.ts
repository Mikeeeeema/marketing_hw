import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }
}
