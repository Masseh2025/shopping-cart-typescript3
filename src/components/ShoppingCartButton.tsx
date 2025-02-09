import Cart from "/assets/images/icon-add-to-cart.svg";
import Minus from "/assets/images/icon-decrement-quantity.svg";
import Increment from "/assets/images/icon-increment-quantity.svg";

import { cn } from "../utils/cn";
import {
  useProductListDispatch,
  useProductList,
} from "../contexts/ProductListContext";

type ShoppingCartButtonProps = {
  name: string;
  price: number;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShoppingCartButton({
  name,
  price,
  isActive,
  setIsActive,
}: ShoppingCartButtonProps) {
  // const isActive = productList?.items.find((item) => item.name === name)?.isActive

  const dispatch = useProductListDispatch();
  const productList = useProductList();

  return (
    <div
      onClick={() => {
        if (!isActive) dispatch!({ type: "increment", payload: [name, price] });
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
        <div className="flex justify-between w-full items-center">
          <button
            className="cursor-pointer w-6 h-6 border-2 rounded-full p-1 flex justify-center items-center"
            onClick={() =>
              dispatch!({ type: "decrement", payload: [name, price] })
            }
          >
            <img src={Minus} alt="" />
          </button>
          <span>
            {productList?.items.find((item) => item.name === name)?.quantity}
          </span>
          <button
            className="cursor-pointer w-6 h-6 border-2 rounded-full p-1 flex justify-center items-center"
            onClick={() =>
              dispatch!({ type: "increment", payload: [name, price] })
            }
          >
            <img src={Increment} alt="" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
