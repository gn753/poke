import { throttle } from "lodash";
import { useEffect, useRef } from "react";
import { FixedSizeList } from "react-window";

export default function useReactWindowScroll() {
  const innerRef = useRef<HTMLElement | null>(null);
  const outerRef = useRef<HTMLElement | null>();
  const ref = useRef<FixedSizeList | null>(null);

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { offsetTop = 0 } = outerRef.current || { offsetTop: 0 };
      const scrollMin = 0;
      let windowScrollY = window.scrollY;
      let scrollOffset = windowScrollY - offsetTop;

      let isScrollRender =
        scrollOffset >= scrollMin && scrollOffset <= document.body.scrollHeight;

      //스크롤 위로 올릴 시 양쪽 높이가 다르기 떄문에 생기는 오차값 보정
      if (ref.current && windowScrollY === 0) {
        ref.current.scrollTo(scrollOffset);
        return;
      }

      if (ref.current && windowScrollY === document.body.scrollHeight) {
        ref.current.scrollToItem(1000);
      }

      //타겟지점 + 스크롤 가능 범위 판별
      if (ref.current && isScrollRender) {
        //브라우저 스크롤이 움직이면 react-window의 List 엘리먼트 스크롤 내리기

        ref.current.scrollTo(scrollOffset);
      }
    }, 10);

    handleWindowScroll();
    window.addEventListener("scroll", handleWindowScroll);
    window.addEventListener("resize", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("resize", handleWindowScroll);
    };
  }, []);

  return { ref, outerRef, innerRef };
}
