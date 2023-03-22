import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../products";
import {products} from "../products";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: Product | undefined;
  products = products;
  constructor(private activatedRouter: ActivatedRoute) {
  }
  ngOnInit(): void {
    const routerParams = this.activatedRouter.snapshot.paramMap;
    const productId = Number(routerParams.get('productId'));
    this.product = this.products.find(p => p.id === productId);
    console.log(this.product);
  }
}
