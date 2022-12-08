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

  constructor(private productService: ProductService,
              public authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(res => {
        this.product = res;
      })
    }
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

  openAddDialog() {
    this.display = true;
  }

  openEditProductDialog(productId: string, name: string, details: string, price: string) {
    this.displayEdit = true;
    this.productId = productId;
    this.precompleteName = name;
    this.precompleteDetails = details;
    this.precompletePrice = price;
  }

  onUpdate() {
    let updateProduct: IProduct = {
      details: "", id: "", price: "", productName: ""
    }

    let productName = (document.getElementById("productName") as HTMLInputElement).value;
    let details = (document.getElementById("details") as HTMLInputElement).value;
    let price = (document.getElementById("price") as HTMLInputElement).value;

    updateProduct.id = this.productId;
    updateProduct.productName = productName;
    updateProduct.details = details;
    updateProduct.price = price;
      this.productService.updateProduct(updateProduct).then(() => {
        this.displayEdit = false;
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
      case 'samsung':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/20114/20113794/images/res_242fb83777fae61b4c6aca7abf87e29d.jpg?width=450&height=450&hash=7741F857EA9B930867A50553E8F7AFAA';
        break;
      case 'laptop':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/45425/45424172/images/res_f495aff6c338b7c8ef9404851caa4599.jpg?width=450&height=450&hash=A3E5F5E0D73D24956E3D10910907C715';
        break;
      case 'mouse':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/18953/18952046/images/res_de3672cff6e18379c144e895e1d785f2.jpg?width=450&height=450&hash=24ACABAA54BE2AEB84711A8D17EA7055';
        break;
      case 'mouse microsoft':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/600/599215/images/res_222e35ef2b03571187a535d2bc35bc94.jpg?width=450&height=450&hash=D281C55052203812A2691BB7B7B0B1AE';
        break;
      case 'headphones':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/8096/8095450/images/res_0dc808a8af26ded30ec4a60b5b367c71.jpg?width=450&height=450&hash=3269C6F328F6395C42B5C1EC41E637CF';
        break;
      case 'airpods':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/26669/26668250/images/res_25452c9cc71d1d7c1146cda73239cb2d.jpg?width=450&height=450&hash=21618BB06EB09FACD642895B71BD7D58';
        break;
      case 'PC':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/43120/43119688/images/res_053354505967a6e29744d21ec798c850.jpg?width=450&height=450&hash=4F1B788DDEDB06F8E35F0A1F637C1F56';
        break;
      case 'keyboard':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/31566/31565621/images/res_04be55c67c55ac1d40bc285f0e434cd2.jpg?width=720&height=720&hash=3BD83503568D3E230EFB94B0BAD7566F';
        break;
      case 'lenovo':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/38277/38276901/images/res_39d5ba539280c46fceddffabc9ea79d9.jpg?width=720&height=720&hash=661893D9D85F14CA25EB10339F625964';
        break;
      case 'macbook':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/33874/33873196/images/res_2ce18bde5ec79adc307a8d4fc03e40a3.jpg?width=450&height=450&hash=36E0AD827269108B1960B2D568C73060';
        break;
      case 'monitor':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/32274/32273347/images/res_0daaac9c75cfb02fed49048f8dcc2826.jpg?width=720&height=720&hash=9BB570D80EBF03F8C585F1758E436B51';
        break;
      case 'sound':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/38636/38635456/images/res_4d102e751c9920905628cf1d29c8be31.jpg?width=720&height=720&hash=6B13DD4AB0670355E5285764790D7759';
        break;
      case 'microphone':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/42922/42921535/images/res_c303e06395cbf02fb8aa04e8adb4ad2d.jpg?width=720&height=720&hash=58399CCE65F1628CDD8D5528EB1F3BD1';
        break;
      case 'camera':
        addProduct.imageUrl = 'https://s13emagst.akamaized.net/products/47791/47790732/images/res_87e86214562d35cc8f3eaeea2b446f0a.jpg?width=720&height=720&hash=33E2D12944E81D298ED5676CBC5458DD';
        break;
    }

    this.addProduct(addProduct);
    this.display = false;
  }

  show(value: string) {
  }
}
