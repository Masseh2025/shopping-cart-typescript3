type DesertItemProps = {
  image: { thumbnail: string; mobile: string; tablet: string; desktop: string };
  name: string;
  category: string;
  price: number;
};

function DesertItem({ image, name, category, price }: DesertItemProps) {
  return (
    <li className="p-4 flex flex-col">
      <div className="flex relative mb-8">
        <img src={image.mobile} alt={name} className="rounded-md" />
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
