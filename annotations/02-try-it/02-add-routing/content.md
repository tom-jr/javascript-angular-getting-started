# Add navigation
## Associar uma URL path a um component
 A aplicação de exemplo ja usa o __*Angular Router*__ para navegar para o 
ProductListComponent

1. Adicionaremos um novo component para os detalhes dos produtos
 ~~~ bash
 ng generate component product-details
 ~~~


 2. No app.module.ts adicionamos um rota para product-details com um path
 products/:productId e productDetailsComponent para o component

~~~ javascript
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
  ],})
~~~

3. Abriremos o product-list.component.html

4. Modificaremos o link \<a> para incluir  um routerLink com o product.id como 
param

~~~ html
<h3>
    <a title="{{product.name}} details"
       [routerLink]="['/products', product.id]"> {{ product.name }} </a>
</h3>
~~~

A diretiva RouterLink nos ajuda a customizar nossos links elements. Neste caso
a rota/URL contem um segmento fixo, /product e o segmento final é uma variável
o id do produto corrente. Como exemplo uma url para o component de detalhes de um
produto com id = 1 seria
http://localhost:4200/products/1

Quando clicamos no nome do produto iremos ser direcionados para o component de 
productDetailsComponent e para cada produto o final da url tera um dado de id 
distinto

## Ver detalhes do Produto

O productDetails deve exibir o detalhe de cada produto
Nesta sessão iremos usar o angular router para combinar os dados do produto e 
informações de rotas para renderizar os detalhes específicos de cada produto

1. No component ProductDetails vamos importar o ActivatedRoute do __*@/angular/router*__

2. Definir uma propriedade no Component que representa um produto. Podendo ser do
tipo produto ou undefined

~~~ typescript
product: Product | undefined;
~~~

3. Vamos fazer a injeção de dependências do ActivatedRouter pelo constructor

~~~ typescript
import {Component, OnInit} from '@angular/core';
import {ActivatedRouter} from '@angular/router';
@Component({
  selector: '',
  templateUrl: '',
  styleUrl:''
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRouter) {

  }

  product: Product | undefined;
}
~~~

_ActivatedRouter_ é especifico para cada rota logada, contendo informações sobre a
rota e seus params

4. no método ngOnInit extrairemos da rota o paramento productId e encontrar o 
produto correspondente na lista de produtos

~~~ javascript
ngOnInit(): void {
  const routerParams = this.activatedRoute.snapshot.ParamMap;
  const productIdFromRouter = Number(routerParams.get('productId'));

  this.product = this.products.find(item => item.id === productIdFromRouter);
}
~~~

5. Atualizar o template de ProductDetails para mostrar os detalhes do produto
mas com a diretiva ngIf para renderizar caso não for null ou undefined

~~~ html
<h2>Product Details</h2>
<div *ngIf="product">
    <h3>{{product.name}}</h3>
    <h4>{{product.price | currency}}</h4>
    <p>{{product.description}}</p>
</div>

~~~
