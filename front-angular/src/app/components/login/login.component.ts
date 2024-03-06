import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formLogin : FormGroup;

  constructor(private auth : AuthService, private fb : FormBuilder, private session : SessionService, private router : Router){
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
    let data = this.formLogin.value
    this.auth.login(data).subscribe(resp => {
      if(resp.isOk){
        this.session.setLocalstorage(resp.content);
        this.router.navigate(['/']);
      }else{
        //mostrar el mensaje
      }
      
    })
  }

}
