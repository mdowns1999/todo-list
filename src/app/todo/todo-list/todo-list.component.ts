import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})

/********************************************************
 * TODO LIST COMPONENT
 **********************************************************/
export class TodoListComponent implements OnInit, OnDestroy {
  //Member Vairables
  TodoList: Todo[] = [];
  statusList: Todo[] = [];
  status: boolean;
  subscription: Subscription;

  /********************************************************
   * CONSTRUCTOR
   **********************************************************/
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    console.log('NGONINIT FIRED');
    this.TodoList = this.todoService.getTodoList();

    this.subscription = this.todoService.todoListChangedEvent.subscribe(
      (todoList: Todo[]) => {
        //this.TodoList = todoList;
        this.TodoList = todoList;
        this.filterList(false);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /********************************************************
   * FILTER LIST
   * This method will filter the list based off of each
   * item's status
   **********************************************************/
  filterList(status: boolean) {
    for (let i = 0; i < this.TodoList.length; i++) {
      if (status) {
        this.statusList = this.TodoList.filter(this.checkCompleted);
      } else {
        this.statusList = this.TodoList.filter(this.checkUnCompleted);
      }
    }
  }

  /********************************************************
   * CHECK COMPLETE
   * Check if the item is completed
   **********************************************************/
  checkCompleted(todoItem: Todo) {
    return todoItem.completed === true;
  }

  /********************************************************
   * CHECK UNCOMPLETE
   * Check if the item is Uncompleted
   **********************************************************/
  checkUnCompleted(todoItem: Todo) {
    return todoItem.completed !== true;
  }
}
