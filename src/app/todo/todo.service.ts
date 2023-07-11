import { EventEmitter, Injectable } from '@angular/core';
import { Todo } from './todo-model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

/********************************************************
 * TODO SERVICE
 * This service will manage all the todo items for the
 * application.  IT will communicate with the database
 * and hold the apps list that it will use.
 ********************************************************/
export class TodoService {
  //Member Variables
  TodoList: Todo[] = [];
  todoSelectedEvent = new EventEmitter<Todo>();
  todoListChangedEvent = new Subject<Todo[]>();
  maxToDoId: number;

  /********************************************************
   * CONSTRUCTOR
   * Get the max ID from the database.
   **********************************************************/
  constructor(private http: HttpClient) {
    this.maxToDoId = this.getMaxId();
  }

  /********************************************************
   * GET TODO LIST
   * This method will GET the list from the database
   **********************************************************/
  getTodoList() {
    console.log('MONGO CONTACTS');
    this.http
      .get<{ ToDoItems: Todo[]; message: string }>(
        'http://localhost:3000/todos'
      )
      .subscribe(
        // success method
        (response) => {
          this.TodoList = response.ToDoItems.sort();
          this.maxToDoId = this.getMaxId();
          this.todoListChangedEvent.next(this.TodoList.slice());
        },
        (error: any) => {
          console.log(error.message);
        }
      );

    return this.TodoList.slice();
  }

  /********************************************************
   * GET TODO ITEM
   * This method will get one item from the list by id.
   **********************************************************/
  getTodoItem(id: string): Todo {
    return this.TodoList.find((listItem) => listItem.id === id);
  }

  /********************************************************
   * ADD TODO ITEM
   * This method will POST the list from the database
   **********************************************************/
  addTodoItem(todoItem: Todo) {
    console.log('MONGO ADD');

    if (!todoItem) {
      return;
    }

    // make sure id is empty
    todoItem.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; todo: Todo }>(
        'http://localhost:3000/todos',
        todoItem,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.TodoList.push(responseData.todo);
        this.sortAndSend();
        console.log(this.TodoList);
      });
  }

  /********************************************************
   * UPDATE TODO ITEM
   * This method will update one of the list items
   * from the database
   **********************************************************/
  updateTodoitem(originalTodoItem: Todo, newTodoItem: Todo) {
    if (!originalTodoItem || !newTodoItem) {
      return;
    }

    const pos = this.TodoList.findIndex((td) => td.id === originalTodoItem.id);
    console.log(pos);
    if (pos < 0) {
      return;
    }

    // set the id of the new item to the id of the old item
    newTodoItem.id = originalTodoItem.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/todos/' + originalTodoItem.id, newTodoItem, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        console.log(this.TodoList[pos]);
        console.log(newTodoItem);
        this.TodoList[pos] = newTodoItem;
        console.log('NEW');
        console.log(this.TodoList[pos]);
        this.sortAndSend();
      });
  }

  /********************************************************
   * DELETE TODO ITEM
   * This method will DELETE a item from the database
   **********************************************************/
  deleteTodoItem(todoItem: Todo) {
    if (!todoItem) {
      return;
    }

    const pos = this.TodoList.findIndex((td) => td.id === todoItem.id);

    if (pos < 0) {
      return;
    }
    // delete from database
    this.http
      .delete('http://localhost:3000/todos/' + todoItem.id)
      .subscribe((response: Response) => {
        this.TodoList.splice(pos, 1);
        this.sortAndSend();
      });
  }

  /********************************************************
   * GET MAX ID
   * This method will find the biggest ID we have in the list
   * and return it.
   **********************************************************/
  getMaxId(): number {
    let maxId = 0;

    this.TodoList.forEach((todo) => {
      let currentId = parseInt(todo.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  /********************************************************
   * SORT AND SEND
   * This method will update all the other components that need
   * to know that the list changed.
   **********************************************************/
  sortAndSend() {
    this.todoListChangedEvent.next(this.TodoList.slice());
  }
}
