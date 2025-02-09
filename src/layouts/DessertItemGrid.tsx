import DesertItem from "../components/DesertItem";
import desertData from "../data/data.json";

export default function DessertItemGrid() {
  return (
    <div className="my-4">
      <h1 className="font-bold text-4xl mb-8 ml-4">Desserts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3">
        {desertData.map((data) => {
          return (
            <DesertItem
              key={data.name}
              name={data.name}
              category={data.category}
              price={data.price}
              image={data.image}
            />
          );
        })}
      </ul>
    </div>
  );
}
