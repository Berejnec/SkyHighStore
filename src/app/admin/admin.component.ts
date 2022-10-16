import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {IProduct} from "../interfaces/product.interface";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  products: IProduct[] = [];

  productId: string = '';

  display: boolean = false;

  displayEdit: boolean = false;

  precompleteName: string = '';

  precompleteDetails: string = '';

  precompletePrice: string = '';

  product: IProduct = {
    price: "", productName: ""
  };
  displayDeleteProduct: boolean = false;

  constructor(private productService: ProductService,
              public authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(res => {
        this.product = res;
        console.log(res);
        console.log(this.product);
      })
    }
  }

  onDeleteProduct() {
    this.displayDeleteProduct = true;
  }

  deleteProduct(product: IProduct) {
    this.productService.deleteProduct(product);
  }

  addProduct(product: IProduct) {
    this.productService.addProduct(product).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Product added!',
        detail: 'Product has been added successfully',
        life: 5000
      })
    });
  }

  updateProduct(product: IProduct) {
    this.productService.updateProduct(product);
  }

  openAddDialog() {
    this.display = true;
  }

  openEditProductDialog(productId: string, name: string, details: string, price: string) {
    this.displayEdit = true;
    this.productId = productId;
    this.precompleteName = name;
    this.precompleteDetails = details;
    this.precompletePrice = price;
    console.log(this.productId);
  }

  onUpdate(name: string, details: string, price: string) {
    this.product.productName = name;
    this.product.details = details;
    this.product.price = price;
    this.product.id = this.productId;
    if (this.product) {
      this.productService.updateProduct(this.product).then(() => {
        this.displayEdit = false;
      })
    }
  }

  onAdd(name: string, details: string, price: string) {
    let addProduct: IProduct = {
      details: "",
      price: "",
      productName: ""
    }
    addProduct.productName = name;
    addProduct.details = details;
    addProduct.price = price;
    this.addProduct(addProduct);
    this.display = false;
  }
}
