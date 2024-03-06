import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formLogin : FormGroup;

  constructor(private auth : AuthService, private fb : FormBuilder){
    this.formLogin = this.fb.group(
      {
        'email':['',[Validators.required,Validators.email]],
        'clave':['',[Validators.required,Validators.minLength(6)]]
      }
    );

  }

  ngOnInit(): void {
    
  }

  makeLogin(){
    let data = ['email']
    this.auth
  }

}
