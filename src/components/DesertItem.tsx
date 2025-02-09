import ShoppingCartButton from "./ShoppingCartButton";

type DesertItemProps = {
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
  name: string;
  category: string;
  price: number;
};

function DesertItem({ image, name, category, price }: DesertItemProps) {
  return (
    <li className="p-4 flex flex-col">
      <div className="flex relative mb-8 md:hidden">
        <img src={image.mobile} alt={name} className="rounded-md" />
      </div>
      <div className=" relative mb-8 hidden md:flex lg:hidden">
        <img src={image.tablet} alt={name} className="rounded-md" />
      </div>

      <div className=" relative mb-8 hidden lg:flex">
        <img src={image.desktop} alt={name} className="rounded-md" />
      </div>
      <div className="text-rose-900">
        <p className="text-sm">{category}</p>
        <p className="font-semibold">{name}</p>
        <p className="text-red font-semibold">${price}</p>
      </div>
      <ShoppingCartButton name={name} category={category} price={price} />
    </li>
  );
}

export default DesertItem;
