import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingItemsFromCategoryTileComponent } from './shopping-items-from-category-tile.component';

describe('ShoppingItemsFromCategoryTileComponent', () => {
  let component: ShoppingItemsFromCategoryTileComponent;
  let fixture: ComponentFixture<ShoppingItemsFromCategoryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingItemsFromCategoryTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingItemsFromCategoryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
