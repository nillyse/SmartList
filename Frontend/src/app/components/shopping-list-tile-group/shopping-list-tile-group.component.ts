import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-list-tile-group',
  templateUrl: './shopping-list-tile-group.component.html',
  styleUrls: ['./shopping-list-tile-group.component.less']
})
export class ShoppingListTileGroupComponent {
  columnsCount: number = 3;
}
