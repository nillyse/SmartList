import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWithProductsComponent } from './categories-with-products.component';

describe('CategoriesWithProductsComponent', () => {
  let component: CategoriesWithProductsComponent;
  let fixture: ComponentFixture<CategoriesWithProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesWithProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesWithProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
