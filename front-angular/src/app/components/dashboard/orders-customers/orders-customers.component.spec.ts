import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCustomersComponent } from './orders-customers.component';

describe('OrdersCustomersComponent', () => {
  let component: OrdersCustomersComponent;
  let fixture: ComponentFixture<OrdersCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersCustomersComponent]
    });
    fixture = TestBed.createComponent(OrdersCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
