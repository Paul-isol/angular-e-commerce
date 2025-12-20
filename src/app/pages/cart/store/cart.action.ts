import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartItem } from '../types/cart.type';
import { Product } from '../../products/type/product-type';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ items: CartItem[] }>(),
    loadFailure: props<{ error: string }>(),

    addToCart: props<{ product: Product }>(),
    addToCartSuccess: props<{ product: Product }>(),
    addToCartFailure: props<{ error: string }>(),

    removeFromCart: props<{ productId: number }>(),

    updateQuantity: props<{ productId: number; quantity: number }>(),

    clearCart: emptyProps(),
  },
});
