import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../services/product.service";
import {IProduct} from "../interfaces/product.interface";
import {AuthService} from "../services/auth.service";
import {MessageService} from "primeng/api";
import {FormGroup, NgForm} from "@angular/forms";

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

  @ViewChild('productForm') productForm!: NgForm;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('details') details!: ElementRef;
  @ViewChild('price') price!: ElementRef;

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

  onUpdate() {
    let updateProduct: IProduct = {
      details: "", id: "", price: "", productName: ""
    }
    updateProduct.id = this.productId;
    updateProduct.productName = this.name.nativeElement.value;
    updateProduct.details = this.details.nativeElement.value;
    updateProduct.price = this.price.nativeElement.value;
    // this.product.productName = name;
    // this.product.details = details;
    // this.product.price = price;
    // this.product.id = this.productId;
      this.productService.updateProduct(updateProduct).then(() => {
        this.displayEdit = false;
        console.log(updateProduct);
      })
  }

  onAdd(name: string, details: string, price: string, type: string) {
    let addProduct: IProduct = {
      details: "",
      price: "",
      productName: "",
      type: ""
    }
    addProduct.productName = name;
    addProduct.details = details;
    addProduct.price = price;
    addProduct.type = type;
    switch (addProduct.type) {
      case 'phone':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/25344/25343941/images/res_99d57ec9e3d9bb8d3242f384288ce0a3.jpg?width=450&height=450&hash=786B6F02C39C1B12EDCE7B0392025549';
        break;
      case 'laptop':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/45425/45424172/images/res_f495aff6c338b7c8ef9404851caa4599.jpg?width=450&height=450&hash=A3E5F5E0D73D24956E3D10910907C715';
        break;
      case 'mouse':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/18953/18952046/images/res_de3672cff6e18379c144e895e1d785f2.jpg?width=450&height=450&hash=24ACABAA54BE2AEB84711A8D17EA7055';
        break;
      case 'headphones':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/8096/8095450/images/res_0dc808a8af26ded30ec4a60b5b367c71.jpg?width=450&height=450&hash=3269C6F328F6395C42B5C1EC41E637CF';
        break;
      case 'pc':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/43120/43119688/images/res_053354505967a6e29744d21ec798c850.jpg?width=450&height=450&hash=4F1B788DDEDB06F8E35F0A1F637C1F56';
        break;
    }

    this.addProduct(addProduct);
    this.display = false;
  }
}
