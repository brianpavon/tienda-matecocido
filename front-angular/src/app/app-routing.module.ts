import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./components/items/items.module').then(m => m.ItemsModule) 
  },
  {
    path:'categorias/:codCateg',
    loadChildren:()=> import('./components/items/items.module').then(m => m.ItemsModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
