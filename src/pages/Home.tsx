import { useState } from "react";
import PokeCard from "../components/PokeCard";
import useFetctPokeList from "../hooks/useFetctPokeList";
import useReactWindowScroll from "../hooks/useReactWindowScroll";
import { FixedSizeList as List } from "react-window";
import SkeletonUiList from "../components/SkeletonUiList";

const itemCount = 1000 / 5; // 아이템 개수
const itemsPerRow = 5; // 한 행당 아이템 개수
const itemWidth = "20%"; // 아이템 가로 너비
const itemHeight = 180; // 아이템 세로 높이

export default function Home() {
  const { pokeList } = useFetctPokeList();
  const { ref, outerRef, innerRef } = useReactWindowScroll();

  const Row = ({ index, style }: any) => {
    return (
      <>
        {pokeList.length > 0 ? (
          <div
            style={{
              ...style,
              display: "flex",
              gap: "10px",
              height: itemHeight,
            }}
          >
            {Array.from({ length: itemsPerRow }, (_, i) => (
              <div
                key={index * itemsPerRow + i}
                style={{ width: itemWidth }}
                className="h-full"
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
        ) : (
          <SkeletonUiList index={index} style={style} />
        )}
      </>
    );
  };

  return (
    <main className="max-w-screen-md mx-auto">
      <List
        className="List"
        outerRef={outerRef}
        innerRef={innerRef}
        ref={ref}
        width={window.innerWidth}
        height={window.innerHeight}
        itemCount={itemCount}
        itemSize={itemHeight}
        style={{
          display: "inline-block",
          width: "100%",
          height: "100%",
        }}
      >
        {({ index, style }) => <Row index={index} style={style} />}
      </List>
    </main>
  );
}
