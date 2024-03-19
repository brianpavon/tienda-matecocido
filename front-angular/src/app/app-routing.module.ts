import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { esAdminGuard } from './guards/es-admin.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./components/items/items.module').then(m => m.ItemsModule) 
  },
  {
    path:'categorias/:codCateg',
    loadChildren:()=> import('./components/items/items.module').then(m => m.ItemsModule) 
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'backoffice',
    loadChildren:() => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
