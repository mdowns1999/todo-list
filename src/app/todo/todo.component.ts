import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo-model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})

/********************************************************
 * TODO COMPONENT
 * This is the main component for our To-do area of the app.
 **********************************************************/
export class TodoComponent implements OnInit {
  //Member Variables
  selectedItem: Todo;

  /********************************************************
   * CONSTRUCTOR
   **********************************************************/
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todoSelectedEvent.subscribe((toDoItem: Todo) => {
      this.selectedItem = toDoItem;
    });
  }
}
