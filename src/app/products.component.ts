import { Component } from '@angular/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})

export class ProductsComponent {

    productName = 'A Book';
    products: string[] = ['A Book', 'A Notebook'];

    constructor() {}

    onAddProduct() {
        this.products.push(this.productName);
    }

}