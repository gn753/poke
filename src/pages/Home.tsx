import PokeCard from "../components/PokeCard";
import useFetchInfinityScroll from "../hooks/useFetchInfinityScroll";
import useReactWindowScroll from "../hooks/useReactWindowScroll";
import { FixedSizeList as List } from "react-window";

const itemCount = 1000 / 5; // 아이템 개수
const itemsPerRow = 5; // 한 행당 아이템 개수
const itemWidth = "20%" // 아이템 가로 너비
const itemHeight = 180; // 아이템 세로 높이

export default function Home() {
  const { pokeList } = useFetchInfinityScroll();
  const { ref, outerRef, innerRef } = useReactWindowScroll({ items: pokeList });

  const Row = ({ index, style }: any) => {
    return (
      <>
        <div style={{ ...style, display: "flex", height: itemHeight }}>
          {Array.from({ length: itemsPerRow }, (_, i) => (
            <div
              key={index * itemsPerRow + i}
              style={{ width: itemWidth, height: itemHeight }}
            >
              {pokeList[index * itemsPerRow + i] && (
                <PokeCard
                  id={pokeList[index * itemsPerRow + i].id}
                  name={pokeList[index * itemsPerRow + i].name}
                  image={pokeList[index * itemsPerRow + i].image}
                />
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <main className="p-10">
      <List
        className="List"
        outerRef={outerRef}
        innerRef={innerRef}
        ref={ref}
        width={window.innerWidth}
        height={window.innerHeight}
        itemCount={itemCount}
        itemSize={itemHeight}
        useIsScrolling
        style={{
          display: "inline-block",
          width: "100%",
          height: "100%",
        }}
      >
        {Row}
      </List>
    </main>
  );
}
