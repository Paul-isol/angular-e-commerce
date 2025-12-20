import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ProductFeatures } from './store/product-feature';
import { ProductAction } from './store/product-action';
import { LucideAngularModule, Search, Star } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Product } from './type/product-type';
import { cartActions } from '../cart/store/cart.action';


@Component({
  selector: 'app-products',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './products.html',
  styles: ``,
})
export class Products implements OnInit {
  private readonly store = inject(Store);
  protected readonly products = toSignal(this.store.select(ProductFeatures.selectFilteredProducts));
  protected readonly loading = toSignal(this.store.select(ProductFeatures.selectLoading));

  protected readonly icons = { Search, Star };

  protected searchQuery = signal('');

  protected onSearch(query: string) {
    this.store.dispatch(ProductAction.search({ searchQuery: query }));
  }
  protected onAddToCart(product: Product) {
    this.store.dispatch(cartActions.addToCart({ product }));
  }

  ngOnInit(): void {
    this.store.dispatch(ProductAction.loadProducts());
  }
}
