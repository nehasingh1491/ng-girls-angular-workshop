import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../services/todo-list.service';
import { TodoItem } from '../interfaces/todo-item';


@Component({
  selector: 'app-list-manager',
  template: `
    <div class="todo-app">
      <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

        <ul>
            <li *ngFor="let todoItem of todoList">
                <app-todo-item [item]="todoItem" (remove)="removeItem($event)"
                (complete)="completeItem($event.item, $event.changes)"></app-todo-item>
            </li>
        </ul>
    </div>
  `,
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent implements OnInit {

  todoList : TodoItem[];

  constructor( private todoListService: TodoListService) {
   }

  ngOnInit(): void {
    this.todoList =this.todoListService.getTodoList();
  }

  addItem(title:string){
    this.todoListService.addItem({title});
  }

  removeItem(item){
    this.todoListService.deleteItem(item);
  }

  completeItem(item, changes){
    this.todoListService.updateItem(item, changes);
  }

}
