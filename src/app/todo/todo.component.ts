import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo-model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

selectedItem: Todo;

  constructor(private todoService: TodoService){}
  ngOnInit(): void {
    this.todoService.todoSelectedEvent.subscribe(
      (toDoItem: Todo) => {this.selectedItem = toDoItem}
    )
  }
}
