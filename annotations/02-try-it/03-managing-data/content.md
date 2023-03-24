# Managing Data
Em Angular um serviço é a instancia de um class que pode se torna disponível
para qualquer parte da aplicação usando serviço de injeção de dependência do
Angular. 
Nesta sessão vamos criar uma forma de adicionar produtos em um carrinho

## Definindo um Cart(carrinho) Service

1. criando com o command line do angular um serviço

~~~ bash
ng generate service cart
~~~

2. vamos criar uma propriedade que será um array de product para armazenar
produtos adicionados ao cart

~~~ javascript
import { Injectable } from '@angular/core';
import {Product} from "./products";

@Injectable({
  providedIn: 'root'
})
export class CartService {
items: Product[] = [];
  constructor() { }
}
~~~


3. Definir método para adicionar produtos ao cart, retorna o cart e limpar

~~~ javascript
/*
*/
  addItem(product: Product): void {
    this.items.push(product);
  }

  getCart(): Product[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }
  /*
  */
~~~

## Usando o CartService
1. Em product-details vamos importar o cartService

2. realizar injeção do mesmo no construtor de product-details

~~~ javascript
constructor(private cartService: CartService){}
~~~

3. vamos definir um método addToCart no product-details que invoca o addItem
do cartService. O addToCart recebe um arg do tipo product que repassaremos ao 
addItem do cartService.

~~~ javascript
  addToCart(product :Product) {
    this.cartService.addItem(product);
  }
~~~

4. no details-product iremos add um button que invoca o addToCart como evento
de click.

~~~ html
<h2>Product Details</h2>
<div *ngIf="product">
    <h3>{{product.name}}</h3>
    <h4>{{product.price | currency}}</h4>
    <p>{{product.description}}</p>
    <button type="button" (click)="addToCart(product)">Add to Cart</button>
</div>

~~~


## Criar o Component Cart

Vamos criar o component para cart com o CLI e add tbm uma rota para o mesmo

1. gerar com o command
~~~ bash
ng generate component cart
~~~

2. declarar o component em declarations no app.module.ts

~~~ javascript
@NgModule({
  declarations : [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
  ]
})
export class AppModule {

}
~~~

3. adicionaremos as propriedades de rota do CartComponent

~~~ javascript
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      {path:'products/:productId', component: ProductDetailsComponent},
      {path:'cart', component: CartComponent}
    ])
  ],})
~~~

4. Vamos adicionar a property routLink no button de checkout do component 
top-bar 

