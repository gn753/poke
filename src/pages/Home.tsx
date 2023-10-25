import { useState } from "react";
import PokeCard from "../components/PokeCard";
import useFetctPokeList from "../hooks/useFetctPokeList";
import useReactWindowScroll from "../hooks/useReactWindowScroll";
import { FixedSizeList as List } from "react-window";

const itemCount = 1000 / 5; // 아이템 개수
const itemsPerRow = 5; // 한 행당 아이템 개수
const itemWidth = "20%"; // 아이템 가로 너비
const itemHeight = 180; // 아이템 세로 높이

export default function Home() {
  const { pokeList } = useFetctPokeList();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeoutId, setScrollTimeoutId] = useState<any>(null);
  const { ref, outerRef, innerRef } = useReactWindowScroll();

  const Row = ({ index, style }: any) => {
    return (
      <>
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
      </>
    );
  };

  const handleScroll = () => {
    setIsScrolling(true);

    // 이전 타임아웃 취소
    if (scrollTimeoutId) {
      clearTimeout(scrollTimeoutId);
    }

    // 새로운 타임아웃 설정
    const newTimeoutId = setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // 원하는 시간(밀리초)만큼 스크롤이 멈춰야 스켈레톤 UI가 표시됩니다.
    setScrollTimeoutId(newTimeoutId);
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
        onScroll={handleScroll}
        style={{
          display: "inline-block",
          width: "100%",
          height: "100%",
        }}
      >
        {({ index, style }) =>
          isScrolling ? (
            <div
              className={index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={style}
            >
              스크롤
            </div>
          ) : (
            <Row index={index} style={style} />
          )
        }
      </List>
    </main>
  );
}
