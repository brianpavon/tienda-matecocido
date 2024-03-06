import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  categories : any[] = [];
  userLogged : boolean = false;
  constructor(private catServ : CategoriesService, public session : SessionService){
    this.userLogged = this.session.isUserLogged();
    console.log(this.userLogged);
  }
  
  ngOnInit(): void {
    this.catServ.getCategories().subscribe(categs => {
      //console.log(categs.content);
      this.categories = categs.content;
      
    })
  }

  closeSession(){
    localStorage.clear()
  }
}
