import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../interfaces/product.interface";

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {

  @Input() displayEdit: boolean = false;

  @Input() productId: string = '';

  product!: IProduct;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    if(this.productId) {
      this.productService.getProductById(this.productId).subscribe(res => {
        this.product = res;
        console.log(this.product);
      })
    }
  }

  onUpdate() {
    if(this.product) {
      this.productService.updateProduct(this.product).then(() => {
        this.displayEdit = false;
      })
    }
  }

  setPrice(product: IProduct, price: string) {
    this.productService.modifyProductPrice(product, Number(price));
  }
}
