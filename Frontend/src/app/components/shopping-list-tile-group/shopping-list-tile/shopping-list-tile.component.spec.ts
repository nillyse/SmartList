import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListTileComponent } from './shopping-list-tile.component';

describe('ShoppingListTileComponent', () => {
  let component: ShoppingListTileComponent;
  let fixture: ComponentFixture<ShoppingListTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
