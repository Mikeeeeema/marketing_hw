import { Component, EventEmitter, Input, Output } from '@angular/core';
import { p } from '../../app.interface';

@Component({
  selector: 'app-paragraph',
  imports: [],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.scss',
})
export class ParagraphComponent {
  @Input() ele!: p;
  @Input() titleColor?: string;
  @Output() newItemEvent = new EventEmitter<string>();

  onClick() {
    this.newItemEvent.emit(this.ele.color);
  }
}
