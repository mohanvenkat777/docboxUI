import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  logIn: string = 'logIn';

  constructor(private cookieService: CookieService) {
    if (this.logIn == this.cookieService.get('status')) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  UserLoggedIn() {
    // this.cookieValue = this.cookieService.get('status');
    if (this.logIn == this.cookieService.get('status')) {
      return this.isUserLoggedIn = true;
    }
    else {
      return this.isUserLoggedIn = false;
    }
  }


  login(desision) {
    this.cookieService.set('status', desision);
  }
}
