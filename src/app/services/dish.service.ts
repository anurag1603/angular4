import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { resolve } from 'url';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DishService {

  constructor(private http: Http, private processHttpmsgService: ProcessHttpmsgService , private db: AngularFireDatabase) { }

  getDishesFireBase() {
    return this.db.list('dishes').valueChanges();
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
      .map(res => this.processHttpmsgService.extractData(res))
      .catch(error => this.processHttpmsgService.handleError(error));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + 'dishes/' + id)
      .map(res => this.processHttpmsgService.extractData(res))
      .catch(error => this.processHttpmsgService.handleError(error));
  }

  getDishFireBase(id: number): Observable<any> {
    return this.db.list('dishes' , ref => ref.orderByChild('id').equalTo(id)).valueChanges();
  }

  getFeaturedDishFireBase(): Observable<any> {
    return this.db.list('dishes' , ref => ref.orderByChild('featured').equalTo('true')).valueChanges();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => this.processHttpmsgService.extractData(res)[0])
      .catch(error => this.processHttpmsgService.handleError(error));
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes().map(dishes => dishes.map(dish => dish.id));
  }

  addDishComment(dish: Dish): Observable <Response> {
    return this.http.put(baseURL + 'dishes/' + dish.id,  dish ).map(res => { console.log(res + 'treer  '); return res; });
  }

}
