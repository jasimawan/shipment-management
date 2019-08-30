import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class  HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  userType: string;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userType = this.authService.getUser().userType;
    console.log(this.userType);
    this.authListenerSubs =  this.authService
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userType = this.authService.getUser().userType;
      })
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
