import { useReducer } from "react";
import DessertItemGrid from "./layouts/DessertItemGrid";
import {
  ProductListContext,
  ProductListDispatchContext,
} from "./contexts/ProductListContext";

type ItemsType = { name: string; quantity: number; price: number };

export type StateProps = { items: ItemsType[] };

export type Actions = { type: "decrement" };
export type ActionsWithPayload =
  | { type: "select"; payload: string }
  | { type: "increment"; payload: [name: string, price: number] };

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
            quantity: itemsExists ? itemsExists.quantity + 1 : 0,
            price: price,
          },
          ...state.items.filter((item) => item !== itemsExists),
        ],
      };
    }

    case "decrement":
      console.log("decrement");
      return { ...state };
    case "select":
      return { ...state };
  }
}

const initialState: StateProps = {
  items: [
    { name: "Vanilla Bean Crème Brûlée", quantity: 0, price: 0 },
    { name: "Vanilla Bean Crème Brûlée2", quantity: 0, price: 0 },
  ],
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductListContext.Provider value={state}>
      <ProductListDispatchContext.Provider value={dispatch}>
        <main className="h-screen font-display flex flex-col items-center overflow-scroll bg-rose-50 p-4 md:p-8 lg:p-16">
          <DessertItemGrid />
        </main>
      </ProductListDispatchContext.Provider>
    </ProductListContext.Provider>
  );
}

export default App;
