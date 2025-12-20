import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { CartFeature } from './store/cart.feature';
import { cartActions } from './store/cart.action';
import { LucideAngularModule, Trash2, Lock, ShoppingBag } from 'lucide-angular';
import { RouterLink } from "@angular/router";
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  imports: [LucideAngularModule, RouterLink, DecimalPipe],
  templateUrl: './cart.html',
  styles: ``,
})
export class Cart implements OnInit{
  private readonly store = inject(Store);
  protected readonly icons = {Trash2, Lock, ShoppingBag};

  protected readonly loading = toSignal(this.store.select(CartFeature.selectLoading));
  protected readonly items = toSignal(this.store.select(CartFeature.selectItems));
  protected readonly cartCount = toSignal(this.store.select(CartFeature.selectCartCount),{initialValue:0});
  protected readonly cartTotal = toSignal(this.store.select(CartFeature.selectCartTotal));

  ngOnInit(): void {
    this.store.dispatch(cartActions.load());
  }

  protected onRemove(productId: number) {
    this.store.dispatch(cartActions.removeFromCart({productId}));
  }

  protected onUpdateQuantity(productId: number, quantity:number) {
    this.store.dispatch(cartActions.updateQuantity({productId, quantity}));
  }

  protected onClearCart() {
    this.store.dispatch(cartActions.clearCart());
  }
}
