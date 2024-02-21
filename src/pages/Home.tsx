import useReactWindowScroll from "../hooks/useReactWindowScroll";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Box } from "@mui/material";
import Row from "../components/common/Row";
import useFetctPokemonList from "../hooks/useFetctPokemonList";

// const itemCount = 1000 / 5; // 아이템 개수
const itemsPerRow = 4; // 한 행당 아이템 개수
const itemWidth = "25%"; // 아이템 가로 너비
const itemHeight = 200; // 아이템 세로 높이

export default function Home() {
  const { pokeList, count, isLoading, getPokes } = useFetctPokemonList();
  const { ref, outerRef } = useReactWindowScroll();
  const hasNextPage = count < 1000;
  const itemCount = hasNextPage
    ? (pokeList.length + 100) / 5
    : pokeList.length / 5;

  const loadMoreItems = isLoading ? () => {} : getPokes;
  const isItemLoaded = (index: any) =>
    !hasNextPage || index < pokeList.length / 5;

  console.log(pokeList, "pokeList");
  return (
    <Box>
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
            {({ index, style }) => (
              <Row
                index={index}
                style={style}
                isLoading={isLoading}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                itemsPerRow={itemsPerRow}
                pokeList={pokeList}
              />
            )}
          </List>
        )}
      </InfiniteLoader>
    </Box>
  );
}
