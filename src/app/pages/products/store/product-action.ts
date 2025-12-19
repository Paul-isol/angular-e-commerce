import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../type/product-type";

export const ProductAction = createActionGroup({
    source: 'Products',
    events: {
        loadProducts: emptyProps(),
        loadProductSuccess: props<{products: Product[]}>(),
        loadProductFailure: props<{error:string}>(),

        search: props<{searchQuery: string}>()
    }
})