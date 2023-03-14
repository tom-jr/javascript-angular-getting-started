# O que é o Angular?
Angular é uma plataforma de desenvolvimento construída em Typescript. Angular inclui:
- Framework baseado em component para construção de web applications escaláveis.
- Coleção de biblioteca que cobre uma variedade de features, incluindo rotas, gerenciamento de formulários
comunicação client-serve e mais 
- Um suit de ferramentas de desenvolvimento, para ajudar em teste, desenvolvimento e updates 

## Essencial de uma aplicação Angular

### Components
Components são blocos de construção que compõem uma aplicação.
Components incluem uma class typescript com um __@Component__ decorator, html template e styles. O decorator @Component
especifica as seguintes informações:
- seletor css que define como o component é usado em um template html. Onde estiver definido com este __selector__ será
como uma instancia do meu component.
- html __template__ que instrui o angular a como renderizar o component
- Um opcional _styles_ define array de CSS's para auxiliar na formatação do template

Estrutura simples de um component Angular:
~~~ typescript
@Component({
    selector: 'hello-word',
    template: `
    <h2>Hello World!<h2>
    <p> This is my first Component </p>
    `,
    styles: ['./path-css-arquivo']
})
export class HelloWordComponent {
    // código que se seque define os comportamentos do Component
}
~~~

para usar esse component basta declarar o selector in um template
~~~ html
<hello-world></hello-world>
~~~

quando angular renderizar o resultado será como:

~~~ html
<hello-world>
    <h2>Hello World!<h2>
    <p> This is my first Component </p>
</hello-world>

~~~

Components Angular oferecem um forte encapsulamento e uma estrutura intuitiva de aplicação.

## Templates

Todo component tem um html template que declara como aquele component é renderizado
Nos definimo o template inline ou por meio de arquivo(file_path)
Angula adiciona a sintaxe de elementos html então podemos adicionar valores 
dinamicamente no component.
Angular faz automaticamente updates da renderização quando o status do component
muda. 
Exemplo de inserção de texto dinâmico:

~~~ javascript
<p>{{ message }}</p>
~~~
O valor de message vem da class component

~~~ javascript
@Component({
    selector: 'hello-world-interpolation',
    templateUrl: 'path:'
})
export class HelloWordInterpolation {
    message: string = 'Hello World!';
}
~~~

Quando o component logar a message sera renderizada assim:

~~~ html
<p>Hello World!</p>
~~~

Note o uso das chaves __{{}}__ eles instruem ao Angular a realizar a interpolação
do que há dentro deles.

Angular também suporta o property-bind. Para ajudar a setter valor em um elemento
html e passar valor do elemento para o component

~~~ html
<p [id]="sayHelloId"
[style.color]="fontColor">
you can set my color in the component
</p>
~~~
Note que o uso de coxetes está indicando que essa propriedade pode ser capturada 
pelo component Angular.

Declare uma função de eventLister (keystrokes, mouse movement, clicks e touches)
para ouvir e responder eventos do template. Declaramos um eventListener como o nome
do evento entre parenteses

~~~ html
<button
  type="button"
  [disabled]="canClick"
  (click)="sayMessage()">
  Trigger alert message
</button>
~~~

O exemplo acima, quando for realizado o evento chamará o método apontado como valor
do evento. Então o definimos no component

~~~ javascript
sayMessage() {
    alert(this.message);
}
~~~
O exemplo abaixo mistura interpolação, propertyBiding e eventBiding:

~~~ html
<button
  type="button"
  [disabled]="canClick"
  (click)="sayMessage()">
  Trigger alert message
</button>

<p
  [id]="sayHelloId"
  [style.color]="fontColor">
  You can set my color in the component!
</p>

<p>My color is {{ fontColor }}</p>
~~~
~~~javascript
import {Component} from '@angular/core';

@Component({
    selector: '',
    templateUrl: ''
})
export class HelloWorldBindingsComponent {
    fontColor = 'blue';
    sayHelloId = 1;
    canClick = false;
    message = 'Hello World!';

    sayMessage () {
        alert(this.message);
    }
}
~~~

Podemos adicionar recursos ao nosso template utilizando *diretivas*. As diretivas
mais populares em Angular são __*NgIf__ e __*ngFor__
Use diretivas para performar varias tarefas. Como modificar dinamicamente a 
estrutura do DOM. Crie também suas próprias diretivas customizadas para criar 
ótimas UX(User experience)

Segue um exemplo de *ngIF:

~~~ html
<h2>
    Hello World: ngIf
</h2>

<button type="button" (click)= "onEditClick">
    Make the text Editable
</button>

<div *ngIf="canEdit; else noEdit">
    <p>You can edit the following paragraph.</p>
</div>

<ng-template #noEdit>
    <p>The following paragraph is read only. Try clicking the button!</p>    
</ng-template>

<p [contentEditable]="canEdit">{{ message }}</p>

~~~

~~~ javascript
import {Component} from '@angular/core';

@Component({
    selector:'path',
    templateUrl: 'path'
})
export class HelloWorldNgIfComponent {
    message: 'I\'m read only';
    canEdit= false;

    onEditClick () {
        this.canEdit = !canEdit;

        this.message = canEdit ? 'You can edit me!' : 'I\'m read only';
    }
}
~~~

Angula permite que separemos a nossa aplicação de seu template. Os templates são
baseados no padrão HTML para facilitar a manutenção, updating, e desenvolvimento

## Injeção de Dependências
Injeção de dependências permite-nos declarar dependências de nossas classes 
Typescript sem nos preocuparmos com suas instanciação. Angular irá se preocupar com
isso para voce. Este designer permite criar class mais testáveis e flexíveis.
Entender Injeção de dependerias não é algo critico para poder iniciar com angular.
Mas é altamente recomendado como uma boa pratica. Vários aspectos do angular fazem
proveito disto até certo ponto.

Para ilustrarmos injeção de dependência consideremos o seguinte exemplo
o primeiro arquivo define uma class logger, que contem um método writeCount um 
método que print no console um number

~~~ javascript
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Logger {
    writeCount(count: number) {
        console.warn(number);
    }
}
~~~

O proximo arquivo define um component que irar injetar em si a class Logger e 
utilizar seu método writeCount. Para realizar a injeção, declaramos uma variável
como parâmetro do construtor do nosso component com a keyWord private e com sua 
tipagem igual a class que estamos injetando

~~~ javascript
import {Component} from '@angular/core';
import {Logger} from 'logger_path';

@Component({
    selector: 'name-component',
    templateUrl: 'path'
})
export class HelloWorldInjectorDependencyComponent {

    count = 0;
    constructor(private logger: Logger){

    }

    onLoggerMe() {
        this.logger.writeCount(this.count);
        this.count ++;
    }
}
~~~

## Angular CLI
Angular CLI é a mais rápida, direta e recomendada maneira de desenvolver uma 
aplicação angular. Angular CLI realiza algumas tarefas sem dificuldades:

| Comando | Detalhes|
|--|--|
|__ng build__|Compila uma aplicação angula dentro de um diretório de Saida(output)|
|__ng serve__|build e disponibiliza a application, rebuild ao mudar arquivos|
|__ng generate__|Gera ou modifica arquivos com base na schematic declarada|
|__ng teste__|Roda testes unitários em um dado projeto|
|ng e2e| Build e disponibiliza a aplicação, e executa teste end-to-end|


## First-party lib

Algumas das bibliotecas angular disponível para qe possamos utilizar para 
construção das nossa aplicações.

|biblioteca|Detalhes|
|--|--|
|__Angular Router__|Avançado client-side navigation route, baseado em Angular Component. Suporta LazyLoading, rotas aninhadas, correspondência de caminho personalizado e muito mais.|
|__Angular Forms__|Sistema uniforme para gerenciamento de formulários|
|__Angular HttpClient__|Cliente Http para comunicação cliente-servidor|
|__Angular Animations__|Ferramenta de animação baseado em states|
|__Angular PWD__|Ferramentas para criar aplicativos da Web progressivos (PWA), incluindo um service worker e um manifesto de aplicativo da Web|
|__Angular Schematics__|Ferramentas automatizadas de scaffolding, refatoração e atualização que simplificam o desenvolvimento em grande escala|