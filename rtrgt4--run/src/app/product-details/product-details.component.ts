import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../products";
import {products} from "../products";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: Product | undefined;
  products = products;
  constructor(private activatedRouter: ActivatedRoute,
              private cartService: CartService) {
  }
  ngOnInit(): void {
    const routerParams = this.activatedRouter.snapshot.paramMap;
    const productId = Number(routerParams.get('productId'));
    this.product = this.products.find(p => p.id === productId);
    console.log(this.product);
  }

  addToCart(product :Product) {
    this.cartService.addItem(product);
    window.alert(`The product ${product.name} has been added to cart!`)
  }
}
