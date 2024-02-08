import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

import { ProductProps } from "@/utils/data/products";
import * as cartInMemory from './helpers/cart-in-memory';

export interface ProductCartProps extends ProductProps {
  quantity: number;
}

interface StateProps {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (productID: string) => void;
  clear: () => void;
}

export const useCartStore = create(
  persist<StateProps>((set) => ({
  products: [],
  add: (product: ProductProps) => 
    set((state) => ({
     products: cartInMemory.add(state.products, product)
  })),
  remove: (productId: string) =>
    set((state) => ({
      products: cartInMemory.remove(state.products, productId)
    })),
  clear: () => set(() => ({products: []}))
}), {
  name: 'nlw-expert:cart',
  storage: createJSONStorage(() => AsyncStorage)
}));