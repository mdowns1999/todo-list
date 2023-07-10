import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo-model';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo;
  id: string;

  constructor(private todoService: TodoService, 
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.todo = this.todoService.getTodoItem(this.id);
      }
    )
  }

  onDelete(){
    this.todoService.deleteTodoItem(this.todo);
    this.router.navigateByUrl('/todoList');
  }

  updateStatus(){
    let status;
    if(this.todo.completed === false){
      status = true;
    }
    else{
      status = false;
    }

    let newItem = new Todo(this.todo.id,
      this.todo.name,
      this.todo.type,
      this.todo.description,
      this.todo.completed = status
)


  this.todoService.updateTodoitem(this.todo, newItem);

  this.router.navigate(['/todoList']);

  }

}

// let value = form.value // get values from form’s fields
// let newItem = new Todo(value.id,
//   value.name,
//   value.type,
//   value.description,
//   value.completed
//   )

//   newItem.completed = false;

// if (this.editMode){
//   this.todoService.updateTodoitem(this.originalItem, newItem);
// }
 
// else {
//   this.todoService.addTodoItem(newItem);
// }

// this.router.navigate(['/todoList']);
