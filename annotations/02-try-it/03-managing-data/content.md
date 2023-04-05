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

### Usando o CartService
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


### Criar o Component Cart

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

### Display the Cart Items

Nesta sessão vamos aprender como renderizar os item do cart

1. No cart component vamos importar o cartService para obter acesso aos item que foram adicionados por meio do method 
add do cartService.


2. Injetar o cartService no component cart

3. definir propriedade para armazenar os itens. Passaremos o valor dos items usando o método de getItems do cartService

4. vamos atualizar o cart template para exibir os items adicionados no cart. Usaremos a diretiva __*ngFor__ pra essa 
renderização




## Recuperando preço de envio
Servidores normalmente retornam dados em formato de streams. Streams são maleáveis o que o torna um bom formato com que
se trabalhar. Angular __*HttpCliente*__ é uma ferramenta interna para que possamos recuperar dados de fontes externas.
Esta sessão mostrará como usar o HttpCliente para recuperar preços de envio dos items.
A aplicação tem um arquivo assets/shipping.json. Vamos usar esses dados para add no shipping prices

~~~ json
[
  {
    "type": "Overnight",
    "price": 25.99
  },
  {
    "type": "2-Day",
    "price": 9.99
  },
  {
    "type": "Postal",
    "price": 2.99
  }
]
~~~

### Configurar AppModule para usar o HttpCliente
Para usar o HttpCliente devemos configurar nosso AppModule para usar o HttpClienteModule. No caso o HttpCliente faz parte do
HttpClienteModule então devemos importa para a aplicação esse modulo. no arquivo de app.module fazemos esse procedimento

1. importamos o HttpClienteModule no ***app.module*** 
~~~ javascript
import {HttpClienteModule} from '@angular/common/http';
~~~

2. add nos imports da annotation @NgModule


### Configurar o cartService para uso do HttpCliente
Vamos configurar o HttpCliente para podemos recuperar os recursos no cart.

Devemos ficar atento a essa questão. O HttpCliente precisou primeiro do import do seu modulo em nosso app.modulo. Tentar
importa sem esse modulo gera erro de NuNullInjectorError

1. importamos o HttpCliente do ***'@angular/common/http'***

2. injetamos pelo constructor 

### Configurar o CartService para recuperar os dados  
Podemos usar o method get do HttpCliente para fazer a busca dos recursos de shippings

1. criar iremos um método getShippingPrice que usa o get de HttpCliente

~~~ javascript
  getShippingPrices() {
    return this.httpClient.get<{type: string,price: number}[]>('/assets/shipping.json');
  }
~~~
### Criar Shipping Component

1. Usamos o comando no CLI 
~~~ bash
ng generate component shipping
~~~

2. Vamos adicionar uma rota para aquele component
~~~ javascript
 RouterModule.forRoot([
            {path: '', component: ProductListComponent},
            {path: 'products/:productId', component: ProductDetailsComponent},
            {path: 'cart', component: CartComponent},
            {path: 'shipping', component: ShippingComponent}
        ])
~~~


### Configurar Shipping component para usar o CartService

Esse guia nos auxilia na obtenção de dados via http

1. Importando CartService no ShippingComponent

2. Injetamos o CartService no ShippingComponent

3. define uma propriedade de shippingCosts. Que receberá o valor do retorno do método getShippingPrices()

4. Update o shipping template para renderizar as opções de shippings

~~~ html
<h3>Shipping Prices</h3>
<div class="shipping-item" *ngFor="let item of shippingCosts | async">
    <span> {{item.type}} </span>
    <span> {{item.price | currency}} </span>
</div>

~~~
O async pega os dados mais atuais de uma stream de dados e se destroy automaticamente ao component ser destruído

5. No CartComponent vamos add um link para os preços de envio
