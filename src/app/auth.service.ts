import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userServece: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider())
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser | any> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userServece.get(user.uid);

        return of(null);
      })
    )
  }
}
