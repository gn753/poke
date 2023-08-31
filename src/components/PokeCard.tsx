interface IsPokeCard {
  name: string;
  image: string;
  id: number;
}
export default function PokeCard({ name, image, id }: IsPokeCard) {
  return (
    <li className="w-1/5 border transition-[0.5s] p-5 rounded-[10px] border-solid border-[#e8e8e8] cursor-pointer">
      <div>
        <figure className="relative">
          <img className="max-w-full h-auto" src={image} alt="" />
        </figure>
        <p>No.{id}</p>
        <p className="text-lg font-bold">{name}</p>
      </div>
    </li>
  );
}
