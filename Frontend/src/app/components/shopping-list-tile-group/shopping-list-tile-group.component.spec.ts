import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListTileGroupComponent } from './shopping-list-tile-group.component';

describe('ShoppingListTileGroupComponent', () => {
  let component: ShoppingListTileGroupComponent;
  let fixture: ComponentFixture<ShoppingListTileGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListTileGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListTileGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
