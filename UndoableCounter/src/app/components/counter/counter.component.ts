import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: false,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnChanges {
  @Input() item!: number;
  @Input() canRedo: boolean = false;
  @Output() newNumber: EventEmitter<number> = new EventEmitter();
  @Output() undo: EventEmitter<void> = new EventEmitter();
  @Output() redo: EventEmitter<void> = new EventEmitter();
  counter!: number;
  ifUndo: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.counter = this.item; // 同步 item 到 counter
    }
  }

  minusOnehundred() {
    this.counter -= 100;
    this.newNumber.emit(this.counter);
    this.resetRedo();
  }

  minusTen() {
    this.counter -= 10;
    this.newNumber.emit(this.counter);
    this.resetRedo();
  }

  minusOne() {
    this.counter -= 1;
    this.newNumber.emit(this.counter);
    this.resetRedo();
  }

  plusOne() {
    this.counter += 1;
    this.newNumber.emit(this.counter);
    this.resetRedo();
  }

  plusTen() {
    this.counter += 10;
    this.newNumber.emit(this.counter);
    this.resetRedo();
  }

  plusHundred() {
    this.counter += 100;
    this.newNumber.emit(this.counter);
    this.resetRedo();
  }
  onUndo() {
    this.undo.emit();
    this.ifUndo = true;
    // this.counter = this.item;
  }

  resetRedo() {
    this.ifUndo = false;
  }

  onRedo() {
    this.redo.emit();
  }
}
