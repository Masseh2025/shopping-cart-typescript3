import { useReducer, useState } from "react";
import DessertItemGrid from "./layouts/DessertItemGrid";
import {
  ProductListContext,
  ProductListDispatchContext,
} from "./contexts/ProductListContext";
import ProductList from "./layouts/ProuctList";
import OrderModel from "./components/OrderModel";

export type ItemsType = {
  name: string;
  quantity: number;
  price: number;
};

export type StateProps = { items: ItemsType[] };

export type ActionsWithPayload =
  | { type: "increment"; payload: [name: string, price: number] }
  | { type: "decrement"; payload: [name: string, price: number] }
  | { type: "removeItem"; payload: [name: string] }
  | { type: "resetItems" };

function reducer(state: StateProps, action: ActionsWithPayload) {
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
    case "removeItem": {
      const [name] = action.payload;
      return {
        items: [...state.items.filter((item) => item.name !== name)],
      };
    }
    case "resetItems": {
      return {
        items: [],
      };
    }
    default:
      return { ...state };
  }
}

const initialState: StateProps = {
  items: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isConfirmed, setIsConfirmed] = useState(false);

  return isConfirmed ? (
    <ProductListContext.Provider value={state}>
      <ProductListDispatchContext.Provider value={dispatch}>
        <main className="relative h-full font-display flex flex-col items-center overflow-scroll bg-rose-50 p-4 md:p-8 lg:p-16 lg:flex-row lg:items-start lg:justify-center">
          <OrderModel setIsConfirmed={setIsConfirmed} />
          <DessertItemGrid />
          <ProductList
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
          />
        </main>
      </ProductListDispatchContext.Provider>
    </ProductListContext.Provider>
  ) : (
    <ProductListContext.Provider value={state}>
      <ProductListDispatchContext.Provider value={dispatch}>
        <main className="h-screen font-display flex flex-col items-center overflow-scroll bg-rose-50 p-4 md:p-8 lg:p-16 lg:flex-row lg:items-start lg:justify-center">
          <DessertItemGrid />
          <ProductList
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
          />
        </main>
      </ProductListDispatchContext.Provider>
    </ProductListContext.Provider>
  );
}

export default App;
