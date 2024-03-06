import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListContainerComponent } from './item-list-container/item-list-container.component';
import { ItemDetailContainerComponent } from './item-detail-container/item-detail-container.component';

const routes: Routes = [
  {
    path:'',
    component: ItemListContainerComponent
  },
  {
    path:'detalle/:productCode',
    component: ItemDetailContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
