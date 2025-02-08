import { useReducer } from "react";
import DessertItemGrid from "./layouts/DessertItemGrid";

type StateProps = {
  items: { name: string; quantity: number; selected: boolean }[];
};

type Actions = { type: "increment" | "decrement" };
type ActionsWithPayload = { type: "select"; payload: string };

function reducer(state: StateProps, action: Actions | ActionsWithPayload) {
  switch (action.type) {
    case "increment":
      console.log("increment");
      return { ...state };
    case "decrement":
      console.log("decrement");
      return { ...state };
    case "select":
      state.items.map((item) => {
        if (item.name === action.payload) {
          item.selected = true;
          return { ...state };
        }
        item.selected = false;
      });
      return { ...state };
  }
}

const initialState: StateProps = {
  items: [
    { name: "bob", quantity: 23, selected: false },
    { name: "bob2", quantity: 23, selected: false },
    { name: "bob3", quantity: 23, selected: false },
  ],
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="h-screen font-display flex flex-col items-center overflow-scroll bg-rose-50">
      <DessertItemGrid />
    </main>
  );
}

export default App;
