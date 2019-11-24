import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit, OnDestroy {

    productName = 'A Book';
    products: string[] = [];
    customForm: FormGroup;
    private productsSubscription: Subscription;

    constructor(private fb: FormBuilder, private productService: ProductsService) {}

    ngOnInit() {
        this.initForm();
        this.products = this.productService.getProducts();
        this.productsSubscription = this.productService.productsUpdated.subscribe(() => {
            this.products = this.products = this.productService.getProducts();
        });
    }

    onRemoveProduct(productName: string) {
        this.products = this.products.filter(p => p !== productName);
    }

    initForm() {
        this.customForm = this.fb.group({
            productName: ['product', Validators.required]
        });
    }

    submit() {
        if (this.customForm.valid) {
            // this.products.push(this.customForm.value.productName);
            this.productService.addProducts(this.customForm.value.productName);
        }
    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
    }

}
