# Using forms for user input

Esta sessão auxilia ao uso de form 

## Definir um checkout form model
Este step mostra como sett um form checkout

1. Abrir cart.component

2. Importar o FormBuilder service do __*@angular/forms*__

3. Inject formBuilder no constructor

4. criamos uma propriedade para agrupar os formulários

~~~ javascript
checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });
~~~

5. Define o método onSubmit que será responsável pela logica de checkout, dar reset no formulário e limpar o cart
~~~ javascript
  onSubmit(): void {
    //TODO checkout
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
~~~ 

## Criar checkoutForm
Vamos usar os passos seguintes para adicionar o formulário 

1. add o elemento form no fim __*cart.component.html*__. No el adicionaremos a property formGroup e como value sett a 
propriedade checkoutForm (formBuilder.group({}))
~~~ html
<form [formGroup]="checkoutForm">
<button class="button" type="submit">Purchase</button>
</form>
~~~

3. adicionaremos o método onSubmit como valor de um evento no el form **(ngSubmit)**

4. Então adicionamos os campos de input e com a propriedade formControlName nomeamos de acordo com o que criamos
no **group**

~~~ html
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
    <div>
        <label for="name">
            Name
        </label>
        <input id="name" type="text" formControlName="name">
    </div>

    <div>
        <label for="address">
            Address
        </label>
        <input id="address" type="text" formControlName="address">
    </div>
<button class="button" type="submit">Purchase</button>
</form>
~~~
