import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo-model';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})

/********************************************************
 * TODO DETAIL COMPONENT
 **********************************************************/
export class TodoDetailComponent implements OnInit {
  //Member Variables
  todo: Todo;
  id: string;

  /********************************************************
   * CONSTRUCTOR
   **********************************************************/
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.todo = this.todoService.getTodoItem(this.id);
    });
  }

  /********************************************************
   * ON DELETE
   * This will send the item to the service to be deleted and
   * navigate back to the mian component.
   **********************************************************/
  onDelete() {
    this.todoService.deleteTodoItem(this.todo);
    this.router.navigateByUrl('/');
  }

  /********************************************************
   * UPDATE STATUS
   * This Method will update the status of the To-Do Item
   **********************************************************/
  updateStatus() {
    let status;
    if (this.todo.completed === false) {
      status = true;
    } else {
      status = false;
    }

    let newItem = new Todo(
      this.todo.id,
      this.todo.name,
      this.todo.type,
      this.todo.description,
      (this.todo.completed = status)
    );

    this.todoService.updateTodoitem(this.todo, newItem);

    this.router.navigate(['/']);
  }
}
