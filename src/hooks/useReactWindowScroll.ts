import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

interface IsUseScroll {
  items: any;
}

export default function useReactWindowScroll({ items }: IsUseScroll) {
  const [totalHeight, setTotalHeight] = useState(window.innerHeight);
  const innerRef = useRef<any>();
  const outerRef = useRef<any>();
  const ref = useRef<any>(null);
  console.log("호출횟수 세보자");
  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { offsetTop = 0 } = outerRef.current || { offsetTop: 0 };
      const scrollMin = 0;
      let windowScrollY = window.scrollY;
      let scrollOffset = windowScrollY - offsetTop;

      let isScrollRender =
        scrollOffset >= scrollMin && scrollOffset <= document.body.scrollHeight;
      if (innerRef.current) {
        const { offsetTop = 0, scrollTop } = ref.current || { offsetTop: 0 };
        console.log(offsetTop, "offsetTop", innerRef.current.scrollHeight);
      }
      //스크롤 위로 올릴 시 양쪽 높이가 다르기 떄문에 생기는 오차값 보정
      if (windowScrollY === 0) {
        console.log(scrollOffset, "테스트옾셋");
        ref.current.scrollTo(scrollOffset);
        return;
      }

      if (windowScrollY === document.body.scrollHeight) {
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

  // useEffect(() => {
  //   if (innerRef.current && items.length > 0) {
  //     console.log(innerRef.current.clientHeight, "ref.current.clientHeight");
  //     const sum = innerRef.current.clientHeight;

  //     setTotalHeight(sum);
  //   }
  // }, [items, innerRef]);

  return { ref, outerRef, innerRef };
}
