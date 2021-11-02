import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { IAppState, loadTodos, setTodos } from '../store/app.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos$ = this.store.select('app').pipe(map((app) => app.todos));

  constructor(
    private http: HttpClient,
    private store: Store<{ app: IAppState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadTodos()); 
  }
}

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
