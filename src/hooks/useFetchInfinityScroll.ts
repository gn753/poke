import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { pokeListState } from "../atoms/atoms";

export interface IsPokeList {
  next: string;
  results: any;
}

const useFetchInfinityScroll = () => {
  //포켓몬 리스트 api 시작 넘버
  const [pokeCount, setPokeCount] = useState(0);
  //포켓몬 목록
  const [pokeList, setPokeList] = useRecoilState<IsPokeList | null>(
    pokeListState
  );
  // 무한스크롤 fetching 여부 판별
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollEnd = useRef<HTMLDivElement | null>(null);

  //포켓몬 호출
  const fetchPoke = useCallback(async () => {
    const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${pokeCount}`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  }, [pokeCount]);

  // 포켓몬 한글 이름 호출
  const fetchkoreanNames = async (data: IsPokeList) => {
    // url에서 id 값 추출
    const urlParts = data.results.map((part: any) => {
      const urlSplit = part.url.split("/");
      const id = urlSplit[urlSplit.length - 2];
      return id;
    });
    //추출한 id값으로 한글 이름이 있는 species api에  접근
    const urls: any = data?.results.map((_unused: any, index: number) => {
      return fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${urlParts[index]}`
      ).then((res) => res.json());
    });

    //대량의 요청으로 빠른 사용자 경험을 위해 Promise.all로 병렬 처리
    const responses = await Promise.all(urls).then((res) =>
      res.map((it: any, index: number) => {
        return {
          name: it.names[2].name,
          id: urlParts[index],
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urlParts[index]}.png`,
        };
      })
    );
    return responses;
  };

  const getPokes = useCallback(async () => {
    if (isLoading || !hasNext) {
      return;
    }

    setIsLoading(true);
    const englishPokes = await fetchPoke();
    const koreanNames = await fetchkoreanNames(englishPokes);

    const isNextUrl = englishPokes?.next;

    if (!isNextUrl) {
      setIsLoading(false);
      setHasNext(false);
      return;
    }

    setPokeList((pre) => {
      return {
        next: isNextUrl ? isNextUrl : null,
        results: pre ? [...pre?.results, ...koreanNames] : [...koreanNames],
      };
    });
    // 다음 페이지 추가
    setPokeCount((pre) => pre + 50);
    setIsLoading(false);
  }, [fetchPoke, hasNext, isLoading, setPokeList]);

  useEffect(() => {
    const options = {
      root: null, // 기본값: viewport
      rootMargin: "0px",
      threshold: 0.2, // 요소가 20% 이상 들어왔을 때 콜백 함수 호출
    };

    const handleIntersection = (entries: any[]) => {
      //스크롤 밑 감지
      const entry = entries[0];
      if (entry.isIntersecting) {
        getPokes();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (scrollEnd.current) {
      observer.observe(scrollEnd.current);
    }

    return () => {
      if (scrollEnd.current) {
        observer.unobserve(scrollEnd.current);
      }
    };
  }, [getPokes, isLoading]);

  return { isLoading, pokeList, scrollEnd };
};

export default useFetchInfinityScroll;
