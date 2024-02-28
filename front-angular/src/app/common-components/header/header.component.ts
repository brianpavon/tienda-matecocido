import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  categories : any[] = [];
  constructor(private catServ : CategoriesService){

  }
  
  ngOnInit(): void {
    this.catServ.getCategories().subscribe(categs => {
      //console.log(categs.content);
      this.categories = categs.content;
      
    })
  }
}
