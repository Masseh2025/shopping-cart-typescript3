import { useProductList } from "../contexts/ProductListContext";
import Cake from "/assets/images/illustration-empty-cart.svg";
import CarbonNuetral from "/assets/images/icon-carbon-neutral.svg";
export default function ProductList() {
  const productList = useProductList();
  let quantity;
  console.log(quantity);
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
              className="flex flex-col p-4 border-b-2 border-rose-100"
            >
              <h3 className="text-rose-900">{item.name}</h3>
              <div className="flex text-rose-500">
                <p className="mr-4 text-red">{item.quantity}x</p>
                <p className="mr-2">@ ${item.price}</p>
                <p>${item.price * item.quantity}</p>
              </div>
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
      <button className="w-full px-4 py-2 font-bold rounded-full bg-red text-white hover:text-white hover:bg-red-800 cursor-pointer">
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
