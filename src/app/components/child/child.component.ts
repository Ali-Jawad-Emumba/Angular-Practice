import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input({ required: true }) name!: string;
  @Output() nameToParent: EventEmitter<string> = new EventEmitter();

  emitName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nameToParent.emit(input.value);
  }
}
