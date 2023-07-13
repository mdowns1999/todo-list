import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/todoList', pathMatch: 'full' },
  {
    path: 'todoList',
    component: TodoComponent,
    children: [
      { path: 'new', component: TodoEditComponent },
      { path: ':id', component: TodoDetailComponent },
      { path: ':id/edit', component: TodoEditComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
