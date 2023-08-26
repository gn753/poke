interface IsPokeCard {
  name: string;
  url: string;
}

export default function PokeCard() {
  return (
    <li className="w-1/5 border transition-[0.5s] p-5 rounded-[10px] border-solid border-[#e8e8e8] cursor-pointer">
      <div>
        <figure className="relative">
          <img
            className="max-w-full h-auto"
            src="https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000101.png"
            alt=""
          />
        </figure>
        <p>No 01111</p>
        <p className="text-lg font-bold">이상해씨</p>
      </div>
    </li>
  );
}
