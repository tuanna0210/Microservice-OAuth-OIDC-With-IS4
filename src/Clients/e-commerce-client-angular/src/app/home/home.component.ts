import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CatalogService } from '../services/catalog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products: Product[] = [];

  constructor(private catalogService: CatalogService) {   
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.catalogService.getProducts().subscribe({
      next: res => {
        console.log(res);
        this.products = res.products;
      }
    });
  }
}
