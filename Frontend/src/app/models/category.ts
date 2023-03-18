import { MatTableDataSource } from "@angular/material/table";
import { Product } from "./product";

export interface Category {
    id: string;
    name: string;
    products?: Array<Product> | MatTableDataSource<Product>;
}
