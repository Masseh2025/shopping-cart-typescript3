import {
  useProductList,
  useProductListDispatch,
} from "../contexts/ProductListContext";
import Cake from "/assets/images/illustration-empty-cart.svg";
import CarbonNuetral from "/assets/images/icon-carbon-neutral.svg";
import Remove from "/assets/images/icon-remove-item.svg";

type ProductListProps = {
  isConfirmed: boolean;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ProductList({ setIsConfirmed }: ProductListProps) {
  const productList = useProductList();
  const dispatch = useProductListDispatch();

  let quantity;

  if (productList?.items.length !== 0) {
    quantity = productList?.items.reduce(
      (acc, curr) => (acc += curr.price * curr.quantity),
      0
    );
  }
  return productList?.items.length !== 0 ? (
    <div className="bg-white text-rose-900 rounded-md p-4 w-full lg:max-w-xl">
      <h2 className="text-red text-2xl font-bold">
        Your Cart ({productList?.items.length})
      </h2>
      <ul>
        {productList?.items.map((item) => {
          return (
            <li
              key={item.name}
              className=" flex  items-center justify-between p-4 border-b-2 border-rose-100"
            >
              <div className="flex flex-col">
                <h3 className="text-rose-900">{item.name}</h3>
                <div className="flex text-rose-500">
                  <p className="mr-4 text-red">{item.quantity}x</p>
                  <p className="mr-2">@ ${item.price}</p>
                  <p>${item.price * item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  dispatch!({ type: "removeItem", payload: [item.name] })
                }
                className="cursor-pointer w-5 h-5 border-2 border-rose-400 rounded-full p-.5 flex justify-center items-center"
              >
                <img src={Remove} alt="" />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between mt-4 mb-4">
        <p className="rose-900">Order Total</p>
        <p className="font-bold text-2xl">${quantity}</p>
      </div>
      <div className="flex justify-center items-center p-2 bg-rose-50 mb-4">
        <img src={CarbonNuetral} alt="carbon nuetral symbol" />
        <p>This is a carbon neutral delivery</p>
      </div>
      <button
        onClick={() => setIsConfirmed(true)}
        className="w-full px-4 py-2 font-bold rounded-full bg-red text-white hover:text-white hover:bg-red-800 cursor-pointer"
      >
        Confirm order
      </button>
    </div>
  ) : (
    <div className="bg-white text-rose-900 rounded-md p-4 w-full lg:max-w-xl">
      <h2 className="text-red text-2xl font-bold text-left">
        Your Cart ({productList?.items.length})
      </h2>
      <img src={Cake} alt="cake" className="w-full max-w-52 m-auto" />
      <p className="text-rose-900 text-center">
        Your added items will appear here
      </p>
    </div>
  );
}
