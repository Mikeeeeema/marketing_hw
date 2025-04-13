import { Injectable, signal } from '@angular/core';
import { Todo } from './todo.interface';
import { TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos = signal<Todo[]>([]);

  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.todos.update((current) => [...current, newTodo]);
  }

  toggleTodo(id: number) {
    this.todos.update((current) => {
      return current.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      });
    });
  }

  deleteSelectedTodo() {
    this.todos.update((current) => current.filter((todo) => !todo.completed));
  }

  selectAll() {
    const allCompleted = this.todos().every((todo) => todo.completed);
    this.todos.update((current) =>
      current.map((todo) => ({ ...todo, completed: !allCompleted }))
    );
  }

  edit(id: number, newTitle: string) {
    this.todos.update((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  }
}
