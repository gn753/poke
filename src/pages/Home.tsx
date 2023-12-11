import PokeCard from "../components/PokeCard";
import useFetctPokeList from "../hooks/useFetctPokeList";
import useReactWindowScroll from "../hooks/useReactWindowScroll";
import { FixedSizeList as List } from "react-window";
import SkeletonUiList from "../components/SkeletonUiList";
import InfiniteLoader from "react-window-infinite-loader";

// const itemCount = 1000 / 5; // 아이템 개수
const itemsPerRow = 5; // 한 행당 아이템 개수
const itemWidth = "20%"; // 아이템 가로 너비
const itemHeight = 180; // 아이템 세로 높이

export default function Home() {
  const { pokeList, count, isLoading, getPokes } = useFetctPokeList();
  const { ref, outerRef } = useReactWindowScroll();

  const Row = ({ index, style }: any) => {
    return (
      <>
        {!isLoading && (
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
        )}
        {isLoading && <SkeletonUiList index={index} style={style} />}
      </>
    );
  };
  const hasNextPage = count < 1000;
  const itemCount = hasNextPage
    ? (pokeList.length + 100) / 5
    : pokeList.length / 5;

  const loadMoreItems = isLoading ? () => {} : getPokes;
  const isItemLoaded = (index: any) =>
    !hasNextPage || index < pokeList.length / 5;
  return (
    <main className="max-w-screen-md mx-auto">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        threshold={0}
      >
        {({ onItemsRendered }) => (
          <List
            className="List"
            outerRef={outerRef}
            ref={ref}
            onItemsRendered={onItemsRendered}
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
        )}
      </InfiniteLoader>
    </main>
  );
}
