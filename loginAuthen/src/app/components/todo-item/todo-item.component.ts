import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../services/todo.interface';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<void>();
  @Output() edit = new EventEmitter<string>();
  ifEditing: boolean = false;

  toggleTodo() {
    this.toggle.emit();
  }
  startEdit() {
    this.ifEditing = true;
  }

  saveEdit(newTitle: string) {
    this.ifEditing = false;
    this.edit.emit(newTitle.trim());
  }
}
