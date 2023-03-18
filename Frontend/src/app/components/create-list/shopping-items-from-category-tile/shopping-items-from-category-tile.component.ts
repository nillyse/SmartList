import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-items-from-category-tile',
  templateUrl: './shopping-items-from-category-tile.component.html',
  styleUrls: ['./shopping-items-from-category-tile.component.less']
})
export class ShoppingItemsFromCategoryTileComponent implements AfterViewInit{
  title = "title";
  description = "description";
  @Input() shoppingListFromCategory!: Array<any>;

  ngAfterViewInit(): void {
    console.log(this.shoppingListFromCategory)
  }

}
