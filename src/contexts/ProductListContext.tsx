import { createContext, useContext } from "react";

import { StateProps } from "../App";
import { Actions } from "../App";
import { ActionsWithPayload } from "../App";

export const ProductListContext = createContext<StateProps | null>(null);
export const ProductListDispatchContext = createContext<React.ActionDispatch<
  [action: Actions | ActionsWithPayload]
> | null>(null);

export function useProductList() {
  return useContext(ProductListContext);
}

export function useProductListDispatch() {
  return useContext(ProductListDispatchContext);
}
