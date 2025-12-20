import { Component, inject } from '@angular/core';
import { LucideAngularModule, ShoppingCart, LogOut } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartFeature } from '../../pages/cart/store/cart.feature';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, DecimalPipe],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <a routerLink="/" class="btn btn-ghost text-xl">Ngrx-Store</a>
      </div>
      <div class="flex-none px-10">
        <div class="dropdown dropdown-end px-5">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <lucide-icon [img]="icons.ShoppingCart" />
              
              <span class="badge badge-sm indicator-item">{{cartCount()}}</span>
            </div>
          </div>
          <div
            tabindex="0"
            class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div class="card-body">
              <span class="text-lg font-bold">{{cartCount()}} Items</span>
              <span class="text-info">subtotal: $ {{cartTotal()| number: '1.0-3'}}</span>
              <div class="card-actions">
                <button routerLink="/cart" class="btn btn-primary btn-block">
                <lucide-icon [img]="icons.ShoppingCart" />
                View cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="-1"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a routerLink="/profile" class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class Header {
  protected readonly icons = {LogOut,ShoppingCart};
  private readonly store = inject(Store);
  protected readonly cartCount = toSignal(this.store.select(CartFeature.selectCartCount));
  protected readonly cartTotal = toSignal(this.store.select(CartFeature.selectCartTotal));
}
