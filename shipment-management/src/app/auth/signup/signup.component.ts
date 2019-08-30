import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  isLoading = false;
  selectedValue = '';

  type = [
    {value: 'admin'},
    {value: 'worker'}
];
  constructor(public authService: AuthService){}

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email.trim(), form.value.name.trim(), this.selectedValue, form.value.password);
  }
}

