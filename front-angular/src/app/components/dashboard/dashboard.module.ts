import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { ReportsComponent } from './reports/reports.component';
import { SectionsComponent } from './sections/sections.component';
import { ProductAbmComponent } from './products/product-abm/product-abm.component';
import { ProductPrincipalComponent } from './products/product-principal/product-principal.component';
import { NavbarDashboardComponent } from './navigation/navbar-dashboard/navbar-dashboard.component';
import { NavigationDashboardComponent } from './navigation/navigation-dashboard/navigation-dashboard.component';
import { SidebarDashboardComponent } from './navigation/sidebar-dashboard/sidebar-dashboard.component';
import { PanelComponent } from './panel/panel.component';


@NgModule({
  declarations: [
    CustomersComponent,
    ReportsComponent,
    SectionsComponent,
    ProductAbmComponent,
    ProductPrincipalComponent,
    NavbarDashboardComponent,
    NavigationDashboardComponent,
    SidebarDashboardComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
