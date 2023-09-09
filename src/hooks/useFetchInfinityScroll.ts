import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { pokeListState } from "../atoms/atoms";

export interface IsFetchPoke {
  next: any;
  results: any;
}

export interface IsPoke {
  name: string;
  id: string;
  image: string;
}

const useFetchInfinityScroll = () => {
  //포켓몬 리스트 api 시작 넘버
  const [pokeCount, setPokeCount] = useState(0);
  //포켓몬 목록
  const [pokeList, setPokeList] = useRecoilState<any>(pokeListState);
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
  const fetchkoreanNames = async (data: IsFetchPoke) => {
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

    //대량의 요청은 Promise.all로 병렬 처리
    const responses: IsPoke[] = await Promise.all(urls).then((res) =>
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
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const englishPokes = await fetchPoke();
    const koreanNames = await fetchkoreanNames(englishPokes);

    setPokeList((pre: IsPoke[] | []) =>
      pre.length > 0 ? [...pre, ...koreanNames] : [...koreanNames]
    );
    // 다음 페이지 추가
    setPokeCount((pre: any) => pre + 50);
    setIsLoading(false);
  }, [fetchPoke, isLoading, setPokeList]);

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
      // 포켓몬 id값이 1000번을 넘어가면 무한스크롤 종료.
      if (pokeCount === 1000) {
        observer.unobserve(scrollEnd.current);
      }
    }

    return () => {
      if (scrollEnd.current) {
        observer.unobserve(scrollEnd.current);
      }
    };
  }, [getPokes, isLoading, pokeCount]);

  return { isLoading, pokeList, scrollEnd };
};

export default useFetchInfinityScroll;
