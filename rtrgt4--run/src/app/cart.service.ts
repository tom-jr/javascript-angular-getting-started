import { Injectable } from '@angular/core';
import {Product} from "./products";

@Injectable({
  providedIn: 'root'
})
export class CartService {
items: Product[] = [];
  constructor() { }

  addItem(product: Product): void {
    this.items.push(product);
  }

  getCart(): Product[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }
}
