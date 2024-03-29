import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { FoodItem } from "src/app/shared/foodItem";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-food-list",
  templateUrl: "./food-list.component.html",
  styleUrls: ["./food-list.component.scss"]
})
export class FoodListComponent implements OnInit {
  constructor() {}

  @Input()
  food: FoodItem[];
  @Output()
  foodSelected: EventEmitter<FoodItem> = new EventEmitter();

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.food.currentValue);
    this.dataSource = new MatTableDataSource(changes.food.currentValue);
  }

  displayedColumns: string[] = ["id", "name", "price", "calories"];
  dataSource: MatTableDataSource<FoodItem> = new MatTableDataSource([]);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectFood(p: FoodItem) {
    this.foodSelected.emit(p);
  }
}
