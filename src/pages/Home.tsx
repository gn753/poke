import PokeCard from "../components/PokeCard";
import useFetchInfinityScroll from "../hooks/useFetchInfinityScroll";

export default function Home() {
  const { pokeList, scrollEnd, isLoading } = useFetchInfinityScroll();

  return (
    <main className="p-10">
      <div>
        <ul className="display: flex flex-wrap">
          {pokeList.length > 0 &&
            pokeList.map((card: any) => (
              <PokeCard
                key={card.id}
                name={card.name}
                image={card.image}
                id={card.id}
              />
            ))}
          <div>{isLoading && "로딩중입니다"}</div>
          <div ref={scrollEnd}></div>
        </ul>
      </div>
    </main>
  );
}
