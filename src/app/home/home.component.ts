import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  featuredLeader: Leader;
  dishErrorMsg: string;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: LeaderService ,
    @Inject('BaseURL') private BaseURL) {}

  ngOnInit() {
    this.dishservice.getFeaturedDishFireBase().subscribe(dish => this.dish = dish[0]);
    // this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish , error => this.dishErrorMsg = error );
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    this.leaderservice.getFeaturedLeader().subscribe(featuredLeader => this.featuredLeader = featuredLeader);
  }

}
