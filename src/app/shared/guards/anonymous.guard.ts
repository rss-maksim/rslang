import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from '../../redux/models/state.model';
import { selectIsAnonymous } from '../../redux/selectors/user.selector';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectIsAnonymous);
  }

  constructor(private store: Store<AppState>) {}
}
