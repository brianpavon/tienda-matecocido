import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { ProductAbmComponent } from './products/product-abm/product-abm.component';
import { ProductPrincipalComponent } from './products/product-principal/product-principal.component';
import { CustomersComponent } from './customers/customers.component';
import { ReportsComponent } from './reports/reports.component';
import { SectionsComponent } from './sections/sections.component';
import { OrdersCustomersComponent } from './orders-customers/orders-customers.component';

const routes: Routes = [
  {
    path:'',
    component:PanelComponent
  },
  {
    path:'productos/nuevo-producto',
    component:ProductAbmComponent
  },
  {
    path:'productos/editar-producto/:codProd',
    component:ProductAbmComponent
  },
  {
    path:'productos',
    component:ProductPrincipalComponent
  },
  {
    path:'ordenes-compra',
    component:OrdersCustomersComponent
  },
  {
    path:'clientes',
    component:CustomersComponent
  },
  {
    path:'reportes',
    component:ReportsComponent
  },
  {
    path:'secciones-pagina',
    component:SectionsComponent
  },
  {
    path:'**',
    pathMatch:'full',
    component:PanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
