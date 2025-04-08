import { Injectable, signal } from '@angular/core';
import { Todo } from './todo.interface';
import { getCurrentInjector } from '@angular/core/primitives/di';

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
    this.todos.update((current) =>
      current.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
      })
    );
  }

  deleteSeletedTodo() {
    this.todos.update((current) => current.filter((todo) => !todo.completed));
  }

  editTodo(id: number, newTitle: string) {
    this.todos.update((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  }

  selectAll() {
    this.todos.update((current) =>
      current.map((todo) => ({ ...todo, completed: true }))
    );
  }
}
