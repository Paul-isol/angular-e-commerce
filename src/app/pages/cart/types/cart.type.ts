import { Product } from "../../products/type/product-type"

export type CartItem = {
    product: Product;
    quantity: number;
}