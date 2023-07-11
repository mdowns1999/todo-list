import { Component, Input } from '@angular/core';
import { Todo } from '../todo-model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})

/********************************************************
 * TODO ITEM COMPONENT
 **********************************************************/
export class TodoItemComponent {
  @Input() todo: Todo;
}
