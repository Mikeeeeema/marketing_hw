import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../services/todo.interface';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todoService = inject(TodoService);

  get Todos(): Todo[] {
    return this.todoService.todos();
  }

  addTodo(title: string) {
    if (title.trim()) {
      this.todoService.addTodo(title);
    }
  }

  deleteSelected() {
    this.todoService.deleteSeletedTodo();
  }

  editTodo(id: number, newTitle: string) {
    this.todoService.editTodo(id, newTitle);
  }

  selectAll() {
    this, this.todoService.selectAll();
  }
}
