import { Link } from "react-router-dom";

interface IsPokeCard {
  name: string;
  image: string;
  id: number;
}

export default function PokeCard({ name, image, id }: IsPokeCard) {
  return (
    <div className=" box-border p-5 w-full h-full border transition-[0.5s] rounded-[10px] border-solid border-[#e8e8e8] cursor-pointer">
      <Link to={`/details/${id}`}>
        <figure className="text-center">
          <img className="inline-block max-w-full h-auto" src={image} alt="" />
        </figure>
        <p>No.{id}</p>
        <p className="text-lg font-bold">{name}</p>
      </Link>
    </div>
  );
}
