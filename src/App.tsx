import { useReducer } from "react";
import { cn } from "./utils/cn";

type StateProps = {
  items: { name: string; age: number; selected: boolean }[];
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
    { name: "bob", age: 23, selected: false },
    { name: "bob2", age: 23, selected: false },
    { name: "bob3", age: 23, selected: false },
  ],
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="h-screen font-display flex flex-col">
      <p>meow</p>
      <button
        className="cursor-pointer"
        onClick={() => dispatch({ type: "increment" })}
      >
        add
      </button>
      <button
        className="cursor-pointer"
        onClick={() => dispatch({ type: "decrement" })}
      >
        minus
      </button>
      {state.items.map((item) => {
        return (
          <button
            className={cn(
              "w-40 whitespace-break-spaces flex items-center justify-center cursor-pointer rounded-full bg-white border-1 border-rose-400 font-semibold px-4.5 py-2.5 hover:text-red transition-colors duration-300 ease-out",
              {
                "bg-red text-white hover:text-white cursor-default":
                  item.selected,
              }
            )}
            key={item.name}
            onClick={() => dispatch({ type: "select", payload: item.name })}
          >
            {item.name}
          </button>
        );
      })}
    </main>
  );
}

export default App;
