import { Box } from "@mui/material";
import SkeletonUi from "./SkeletonUi";

interface SkeletonUiListProps {
  index: number;
  style: any;
}
const itemsPerRow = 5; // 한 행당 아이템 개수
const itemWidth = "20%"; // 아이템 가로 너비
const itemHeight = 180; // 아이템 세로 높이

export default function SkeletonUiList({ index, style }: SkeletonUiListProps) {
  return (
    <>
      <div
        style={{
          ...style,
          display: "flex",
          gap: "10px",
          height: itemHeight,
          paddingBottom: "20px",
        }}
      >
        {Array.from({ length: itemsPerRow }, (_, i) => (
          <Box
            key={index * itemsPerRow + i}
            sx={{ width: itemWidth, height: "100%" }}
          >
            <SkeletonUi />
          </Box>
        ))}
      </div>
    </>
  );
}
