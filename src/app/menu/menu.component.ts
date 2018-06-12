import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  books: Observable<any[]>;
  constructor(private dishService: DishService, @Inject('BaseURL') private BaseURL ) {
   }
  // dishes: Dish[];
   dishes: any;
  selectedDish: Dish;
  errorMsg: any;

  ngOnInit() {
    this.dishService.getDishesFireBase().subscribe(dishes => this.dishes = dishes);
    // this.dishService.getDishes().subscribe(dishes => this.dishes = dishes ,
    //   error => {console.log(error);
    //       return this.errorMsg = error;
    //     });
  }
}
