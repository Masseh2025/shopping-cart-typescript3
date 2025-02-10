import { useProductList } from "../contexts/ProductListContext";

export default function ProductList() {
  const productList = useProductList();
  return (
    <div className="bg-white text-rose-900 rounded-md p-4 w-full">
      <h2 className="text-red text-2xl font-bold">
        Your Cart ({productList?.items.length})
      </h2>
      <ul>
        <li>Example item</li>
      </ul>
      <p>Order Total</p>
      <button>Confirm order</button>
    </div>
  );
}
