import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ViewProductDetailsComponent } from '../view-product-details/view-product-details.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public rowIndex!: number;
  showAddProduct!: boolean;
  isLoading: boolean = false;
  showEditProduct!: boolean;
  selectedProduct!: Product;
  message!: string;
  @ViewChild(ViewProductDetailsComponent) viewComponent!: ViewProductDetailsComponent

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.message = this.viewComponent.childMessage;
  }

  public products: Product[] = [];

  public selectProduct(selectedRow: number, product: Product) {
    this.rowIndex = selectedRow;
    this.selectedProduct = product;
  }

  showAddProducts() {
    if (this.showEditProduct) {
      this.showEditProduct = false;
    }
    this.showAddProduct = true;
  }

  hideAddProducts() {
    this.showAddProduct = false;
  }

  refresh() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe((res) => {
      this.products = res.data;
      this.isLoading = false;
    });
  }

  updateProductList() {
    this.getProducts();
  }

  OpenEditProductView() {
    if (this.showAddProduct) {
      this.showAddProduct = false;
    }
    this.showEditProduct = true;
  }

  closeEditView() {
    this.showEditProduct = false;
  }

  closeAddView() {
    this.showAddProduct = false;
  }
  
}

function ViewProductComponent(ViewProductComponent: any) {
  throw new Error('Function not implemented.');
}
