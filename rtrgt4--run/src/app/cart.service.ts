import { Injectable } from '@angular/core';
import {Product} from "./products";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
items: Product[] = [];
  constructor(private httpClient: HttpClient) { }

  addItem(product: Product): void {
    this.items.push(product);
  }

  getCartItems(): Product[] {
    return this.items;
  }

  clearCart(): Product[] {
    return this.items = [];
  }

  getShippingPrices() {
    return this.httpClient.get<{type: string,price: number}[]>('/assets/shipping.json');
  }
}
