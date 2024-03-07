import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAbmComponent } from './product-abm.component';

describe('ProductAbmComponent', () => {
  let component: ProductAbmComponent;
  let fixture: ComponentFixture<ProductAbmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAbmComponent]
    });
    fixture = TestBed.createComponent(ProductAbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
