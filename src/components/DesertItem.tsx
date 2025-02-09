import { useState } from "react";
import ShoppingCartButton from "./ShoppingCartButton";
import { cn } from "../utils/cn";
import { useProductList } from "../contexts/ProductListContext";
type DesertItemProps = {
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
  name: string;
  category: string;
  price: number;
};

function DesertItem({ image, name, category, price }: DesertItemProps) {
  const [isActive, setIsActive] = useState(false);
  const productList = useProductList();

  if (
    isActive &&
    productList?.items.find((item) => item.name === name)?.quantity === 0
  ) {
    setIsActive(false);
  }

  return (
    <li className="p-4 flex flex-col relative">
      <div className="relative flex mb-8 md:hidden">
        <img
          src={image.mobile}
          alt={name}
          className={cn("rounded-md", { "border-3 border-red": isActive })}
        />
        <div className="absolute w-full flex justify-center bottom-0 translate-y-1/2">
          <ShoppingCartButton
            name={name}
            price={price}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
      </div>
      <div className=" relative mb-8 hidden md:flex lg:hidden">
        <img
          src={image.tablet}
          alt={name}
          className={cn("rounded-md", {
            "border-3 border-red": isActive,
          })}
        />
        <div className="absolute w-full flex justify-center bottom-0 translate-y-1/2">
          <ShoppingCartButton
            name={name}
            price={price}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
      </div>

      <div className="relative mb-8 hidden lg:flex">
        <img
          src={image.desktop}
          alt={name}
          className={cn("rounded-md", {
            "border-4 border-red": isActive,
          })}
        />
        <div className="absolute w-full flex justify-center bottom-0 translate-y-1/2">
          <ShoppingCartButton
            name={name}
            price={price}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
      </div>
      <div className="text-rose-900">
        <p className="text-sm">{category}</p>
        <p className="font-semibold">{name}</p>
        <p className="text-red font-semibold">${price}</p>
      </div>
    </li>
  );
}

export default DesertItem;
