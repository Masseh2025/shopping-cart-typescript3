import { useReducer } from "react";
import DessertItemGrid from "./layouts/DessertItemGrid";
import {
  ProductListContext,
  ProductListDispatchContext,
} from "./contexts/ProductListContext";
import ProductList from "./layouts/ProuctList";

export type ItemsType = {
  name: string;
  quantity: number;
  price: number;
};

export type StateProps = { items: ItemsType[] };

export type Actions = { type: "select" };
export type ActionsWithPayload =
  | { type: "increment"; payload: [name: string, price: number] }
  | { type: "decrement"; payload: [name: string, price: number] };

function reducer(state: StateProps, action: Actions | ActionsWithPayload) {
  switch (action.type) {
    case "increment": {
      const [name, price] = action.payload;
      console.log(action.payload);

      const itemsExists = state.items.find((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );

      return {
        items: [
          {
            name: name,
            quantity: itemsExists
              ? itemsExists.quantity >= 50
                ? 50
                : itemsExists.quantity + 1
              : 1,
            price: price,
          },
          ...state.items.filter((item) => item !== itemsExists),
        ],
      };
    }

    case "decrement": {
      const [name, price] = action.payload;

      const itemsExists = state.items.find((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );

      const list = state.items.filter((item) => item.quantity > 0);

      if (itemsExists!.quantity > 1) {
        console.log(list, itemsExists?.quantity);
        return {
          items: [
            {
              name: name,
              quantity: itemsExists
                ? itemsExists.quantity < 1
                  ? 0
                  : itemsExists.quantity - 1
                : 1,
              price: price,
            },
            ...list.filter((item) => item !== itemsExists),
          ],
        };
      }
      console.log("hey");
      return {
        items: [...list.filter((item) => item !== itemsExists)],
      };
    }

    case "select":
      return { ...state };
  }
}

const initialState: StateProps = {
  items: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductListContext.Provider value={state}>
      <ProductListDispatchContext.Provider value={dispatch}>
        <main className="h-screen font-display flex flex-col items-center overflow-scroll bg-rose-50 p-4 md:p-8 lg:p-16 lg:flex-row lg:items-start lg:justify-center">
          <DessertItemGrid />
          <ProductList />
        </main>
      </ProductListDispatchContext.Provider>
    </ProductListContext.Provider>
  );
}

export default App;
