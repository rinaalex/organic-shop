import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  appUser: AppUser;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

}
