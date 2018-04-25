import { Component, OnInit, Inject } from '@angular/core';
import { Params , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService} from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  errorMsg: string;


  constructor(private dishservice: DishService ,
    private route: ActivatedRoute,
         private location: Location ,
         @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(ids =>  this.dishIds = ids);
    this.route.params.switchMap((params: Params) => {
    console.log(params);
    return this.dishservice.getDish(+params['id']);
  }).subscribe(dish => {console.log(dish);
    this.dish = dish;
    this.setPrevNext(dish.id);
  }
    , error => this.errorMsg = error
  );
}

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onAdding(data) {
    this.dish.comments.push(data);
    console.log(data);
  }

}
