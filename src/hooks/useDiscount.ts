import { IProduct } from "@/type";

export function useDiscount(product: IProduct) {
  return Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
}
