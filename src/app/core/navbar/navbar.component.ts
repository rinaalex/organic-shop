import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$: Observable<firebase.default.User>;
  constructor(private auth: AuthService) {
    this.user$ = auth.user$;
  }

  logout() {
    this.auth.logout();
  }

}
