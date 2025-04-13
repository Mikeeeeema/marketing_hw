import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../services/todo.interface';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo',
  imports: [TodoItemComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todoService = inject(TodoService);
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  get Todos(): Todo[] {
    return this.todoService.todos();
  }

  addTodo(title: string) {
    if (title.trim()) {
      this.todoService.addTodo(title);
    }
  }
  selectAll() {
    this.todoService.selectAll();
  }

  deleteSelected() {
    console.log(this.Todos);
    this.todoService.deleteSelectedTodo();
  }
}
