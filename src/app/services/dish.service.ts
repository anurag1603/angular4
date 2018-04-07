import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { resolve } from 'url';


@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise(resolve => {
      // for latency of 2 secs
      setTimeout(() => resolve(DISHES), 2000);
    });
    // return Promise.resolve(DISHES);
  }

  getDish(id: number): Promise<Dish> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      // for latency of 2 secs
      setTimeout(() => resolve(DISHES.filter(dish => (dish.id === id))[0]), 2000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      // for latency of 2 secs
      setTimeout(() => resolve(DISHES.filter(dish => dish.featured)[0]), 2000);
    });
  }
