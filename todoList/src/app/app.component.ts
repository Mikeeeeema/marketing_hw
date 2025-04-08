import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todoList';
}
