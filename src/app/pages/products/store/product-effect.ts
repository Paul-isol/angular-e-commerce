import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { ProductAction } from './product-action';
import { catchError, map, switchMap } from 'rxjs';

export const productEffect = createEffect(
  (action$ = inject(Actions), productService = inject(ProductService)) => {
    return action$.pipe(
      ofType(ProductAction.loadProducts),
      switchMap(() => {
        return productService.getProducts().pipe(
          map((products) => ProductAction.loadProductSuccess({ products })),
          catchError((error) => [ProductAction.loadProductFailure({ error: error.message })])
        );
      })
    );
  },
  {
    functional: true,
  }
);
