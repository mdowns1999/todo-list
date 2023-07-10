import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  TodoList: Todo[] = [];
  statusList:Todo[] = [];
  status: boolean;
  subscription: Subscription;

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    console.log("NGONINIT FIRED")
    this.TodoList = this.todoService.getTodoList();


    this.subscription = this.todoService.todoListChangedEvent.subscribe(
      (todoList: Todo[]) => {
        //this.TodoList = todoList;
        this.TodoList = todoList;
        this.filterList(false);

      })

      
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filterList(status: boolean){
      for(let i = 0; i < this.TodoList.length; i++){
        if(status){
          this.statusList = this.TodoList.filter(this.checkCompleted);
        }else{
          this.statusList = this.TodoList.filter(this.checkUnCompleted);
        }

    }
  }

checkCompleted(todoItem:Todo) {
  return todoItem.completed === true;
}

checkUnCompleted(todoItem:Todo) {
  return todoItem.completed !== true;
}
}
