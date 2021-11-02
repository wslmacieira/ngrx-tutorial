import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrementaContador, IAppState, incrementaContador } from './store/app.state';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-tutorial';

  constructor(private store: Store<{app: IAppState}>) {}

  counter$ = this.store.select('app').pipe(
    map(x => x?.counter)
  );

  incrementaContador() {
    this.store.dispatch(incrementaContador())
  }

  decrementaContador() {
    this.store.dispatch(decrementaContador())
  }
}
