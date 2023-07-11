import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirectiveDirective } from './directive/dropdown-directive';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { TodoEditComponent } from './todo/todo-edit/todo-edit.component';
import { CompletedComponent } from './completed/completed.component';
import { CompletedListComponent } from './completed/completed-list/completed-list.component';
import { FormsModule } from '@angular/forms';
import { CompletedItemComponent } from './completed/completed-item/completed-item.component';
import { CompletedDetailComponent } from './completed/completed-detail/completed-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirectiveDirective,
    TodoComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoDetailComponent,
    TodoEditComponent,
    CompletedComponent,
    CompletedListComponent,
    CompletedItemComponent,
    CompletedDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
