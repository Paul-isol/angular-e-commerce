import { createFeature, createReducer, on, State } from '@ngrx/store';
import { Product } from '../type/product-type';
import { ProductAction } from './product-action';

export type ProductState = {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string | null;
  error: string | null;
  loading: boolean;
};
export const InitialProductState: ProductState = {
  products: [],
  filteredProducts: [],
  searchQuery: null,
  error: null,
  loading: false,
};

export const ProductFeatures = createFeature({
  name: 'product',
  reducer: createReducer(
    InitialProductState,

    on(ProductAction.loadProducts, (state) => ({
      ...state,
      loading: true,
    })),

    on(ProductAction.loadProductSuccess, (state, { products }) => ({
      ...state,
      products,
      filteredProducts: products,
      loading: false,
      error: null,
    })),

    on(ProductAction.loadProductFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(ProductAction.search, (state, { searchQuery }) => {
      const filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...state,
        searchQuery,
        filteredProducts,
      };
    })
  ),
});
