import { useState } from "react";

import Cart from "/assets/images/icon-add-to-cart.svg";

import { cn } from "../utils/cn";
import { useProductListDispatch } from "../contexts/ProductListContext";

type ShoppingCartButtonProps = {
  name: string;
  category: string;
  price: number;
};

export default function ShoppingCartButton({
  name,
  category,
  price,
}: ShoppingCartButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useProductListDispatch();

  return (
    <div
      onClick={() => {
        if (!isActive) dispatch!({ type: "increment", payload: name });
        setIsActive(true);
      }}
      className={cn(
        "w-40 whitespace-break-spaces flex items-center justify-center cursor-pointer rounded-full bg-white border-1 border-rose-400 font-semibold px-4.5 py-2.5 hover:text-red transition-colors duration-300 ease-out",
        {
          "bg-red text-white hover:text-white cursor-default": isActive,
        }
      )}
    >
      {!isActive ? <img src={Cart} alt="cart button" className="mr-2" /> : null}
      {!isActive ? "Add to cart" : null}
      {isActive ? (
        <div>
          <button
            onClick={() => dispatch!({ type: "increment", payload: name })}
          >
            +
          </button>
          <button onClick={() => dispatch!({ type: "decrement" })}>-</button>
        </div>
      ) : null}
    </div>
  );
}
