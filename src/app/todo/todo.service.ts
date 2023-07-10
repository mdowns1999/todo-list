import { EventEmitter, Injectable } from '@angular/core';
import { Todo } from './todo-model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  TodoList: Todo[] = [];
  todoSelectedEvent = new EventEmitter<Todo>();
  todoListChangedEvent = new Subject<Todo[]>();
  maxToDoId: number;
  // TodoList: Todo[] = [
  //   new Todo ( '1','Doctor Visit','Health','Visit to check ears.',false),
  //   new Todo ( '2','Grocery Shopping','Food','By food for the week.',false)
  // ];

  constructor(private http: HttpClient) {
    this.maxToDoId = this.getMaxId();
   }

  getTodoList(){
    console.log('MONGO CONTACTS')
    this.http
      .get<{ToDoItems: Todo[], message: string}>(
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

  getTodoItem(id: string): Todo{
    return this.TodoList.find((listItem)=> listItem.id === id);
  }


  addTodoItem(todoItem: Todo){
    console.log('MONGO ADD');
    
    if (!todoItem) {
      return;
    }

    // make sure id of the new Document is empty
    todoItem.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, todo: Todo }>('http://localhost:3000/todos',
      todoItem,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.TodoList.push(responseData.todo);
          this.sortAndSend();
          console.log(this.TodoList)
        }
      );
  }


  updateTodoitem(originalTodoItem: Todo, newTodoItem: Todo){
    if (!originalTodoItem || !newTodoItem) {
      return;
    }
  
    const pos = this.TodoList.findIndex(td => td.id === originalTodoItem.id);
    console.log(pos)
    if (pos < 0) {
      return;
    }
  
    // set the id of the new Document to the id of the old Document
  newTodoItem.id = originalTodoItem.id;
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/todos/' + originalTodoItem.id,
      newTodoItem, { headers: headers })
      .subscribe(
        (response: Response) => {
          console.log(this.TodoList[pos])
          console.log(newTodoItem)
          this.TodoList[pos] = newTodoItem;
          console.log('NEW')
          console.log(this.TodoList[pos])
          this.sortAndSend();
        }
      );
  }
  
  deleteTodoItem(todoItem: Todo){
    if (!todoItem) {
          return;
        }
    
        const pos = this.TodoList.findIndex(td => td.id === todoItem.id);
    
        if (pos < 0) {
          return;
        }
        // delete from database
        this.http.delete('http://localhost:3000/todos/' + todoItem.id)
          .subscribe(
            (response: Response) => {
              this.TodoList.splice(pos, 1);
              this.sortAndSend();
            }
          );

  }

  // deleteContact(contact: Contact) {
  //   console.log('MONGO DELETE Contacts');
  //   if (!contact) {
  //     return;
  //   }

  //   const pos = this.contacts.findIndex(c => c.id === contact.id);

  //   if (pos < 0) {
  //     return;
  //   }

  //   // delete from database
  //   this.http.delete('http://localhost:3000/contacts/' + contact.id)
  //     .subscribe(
  //       (response: Response) => {
  //         this.contacts.splice(pos, 1);
  //         this.sortAndSend();
  //       }
  //     );
  // }

  getMaxId(): number {
    //console.log(this.TodoList)
    let maxId = 0
 
    this.TodoList.forEach(todo => {
       let currentId = parseInt(todo.id);
       if(currentId > maxId)
       {
          maxId = currentId;
       }
    });
 
    return maxId
 }

 sortAndSend() {
  this.todoListChangedEvent.next(this.TodoList.slice());
}
}
