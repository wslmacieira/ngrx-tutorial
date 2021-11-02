import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ITodo } from '../todo/todo.component';
import {
  IAppState,
  loadTodos,
  setTodos,
  sucessoCarregaTodos,
} from './app.state';

@Injectable({
  providedIn: 'root',
})
export class TodosEffectService {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<{ app: IAppState }>
  ) {}

  carregaTodos = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      withLatestFrom(this.store.select('app').pipe(map((app) => app.todos))),
      switchMap(([action, todos]) => {
        if (!todos.length) {
          return this.http
            .get<ITodo[]>('https://jsonplaceholder.typicode.com/todos')
            .pipe(
              tap((result) => this.store.dispatch(setTodos({ payload: result }))),
              map(() => sucessoCarregaTodos())
            );
        }
        return of(sucessoCarregaTodos());
      })
    )
  );
}
