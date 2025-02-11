import {
  useProductList,
  useProductListDispatch,
} from "../contexts/ProductListContext";
import OrderConfrimed from "/assets/images/icon-order-confirmed.svg";
type OrderModelProps = {
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function OrderModel({ setIsConfirmed }: OrderModelProps) {
  const productList = useProductList();
  const dispatch = useProductListDispatch();
  let quantity;

  if (productList?.items.length !== 0) {
    quantity = productList?.items.reduce(
      (acc, curr) => (acc += curr.price * curr.quantity),
      0
    );
  }
  return (
    <div className="flex justify-center items-center">
      <div className="fixed z-10 top-0 right-0 h-full w-screen bg-black opacity-50 flex justify-center items-center"></div>
      <div className="fixed p-4 bottom-1/2 right-1/2 z-10 translate-1/2 md:rounded-md bg-white  h-full md:max-w-xl w-full md:max-h-80 md:h-full overflow-scroll">
        <img src={OrderConfrimed} alt="confirmation icon" className="mb-4" />
        <h2 className="text-3xl font-semibold mb-4">Order Confirmed</h2>
        <p className="mb-4">We hope you enjoy your food!</p>
        <div>
          <ul className="mb-4">
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
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between text-2xl text-rose-900 mb-4">
            <p>Order total</p>
            <p className="font-semibold">${quantity}</p>
          </div>
          <button
            onClick={() => {
              dispatch!({ type: "resetItems" });
              setIsConfirmed(false);
            }}
            className="w-full px-4 py-2 font-bold rounded-full bg-red text-white hover:text-white hover:bg-red-800 cursor-pointer"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}
