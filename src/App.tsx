import { useReducer } from "react";
import DessertItemGrid from "./layouts/DessertItemGrid";
import {
  ProductListContext,
  ProductListDispatchContext,
} from "./contexts/ProductListContext";

type ItemsType = { name: string; quantity: number; selected: boolean };

export type StateProps = { items: ItemsType[] };

export type Actions = { type: "decrement" };
export type ActionsWithPayload =
  | { type: "select"; payload: string }
  | { type: "increment"; payload: string };

function reducer(state: StateProps, action: Actions | ActionsWithPayload) {
  switch (action.type) {
    case "increment": {
      console.log(action.payload);

      const itemsExists = state.items.find((item) =>
        item.name.toLocaleLowerCase().includes(action.payload.toLowerCase())
      );

      return {
        items: [
          {
            name: action.payload,
            quantity: itemsExists ? itemsExists.quantity + 1 : 0,
            selected: false,
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
    { name: "Vanilla Bean Crème Brûlée", quantity: 0, selected: false },
    { name: "Vanilla Bean Crème Brûlée2", quantity: 0, selected: false },
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
