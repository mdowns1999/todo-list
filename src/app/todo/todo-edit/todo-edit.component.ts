import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../todo-model';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})

/********************************************************
 * TODO EDIT COMPONENT
 **********************************************************/
export class TodoEditComponent implements OnInit {
  //Member Variables
  todo: Todo;
  options: string[] = ['Health', 'Food', 'Exercise', 'Vacation', 'Misc'];
  editMode = false;
  id: string;
  originalItem: Todo;

  /********************************************************
   * CONSTRUCTOR
   **********************************************************/
  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalItem = this.todoService.getTodoItem(this.id);

      if (!this.originalItem) {
        return;
      }
      this.editMode = true;
      this.todo = JSON.parse(JSON.stringify(this.originalItem));
    });
  }

  /********************************************************
   * ON CANEL
   * This method will navigate back to the main component
   **********************************************************/
  onCancel() {
    this.router.navigate(['/todoList']);
  }

  /********************************************************
   * ON SUBMIT
   * This method will submit the form and send it to the service
   **********************************************************/
  onSubmit(form: NgForm) {
    let value = form.value; // get values from form’s fields
    let newItem = new Todo(
      value.id,
      value.name,
      value.type,
      value.description,
      (value.completed = false)
    );

    if (this.editMode) {
      this.todoService.updateTodoitem(this.originalItem, newItem);
    } else {
      this.todoService.addTodoItem(newItem);
    }

    this.router.navigate(['/']);
  }
}
