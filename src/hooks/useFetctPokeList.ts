import { useCallback, useState } from "react";
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

const useFetctPokeList = () => {
  //포켓몬 리스트 api 시작 넘버
  const [pokeList, setPokeList] = useRecoilState<any>(pokeListState);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);

  //포켓몬 호출
  const fetchPoke = useCallback(
    async (offset: number = 1, limit: number = 100) => {
      const baseUrl = `https://pokeapi.co/api/v2/pokemon?offset=${count}&limit=${limit}`;
      const response = await fetch(baseUrl);
      const data = await response.json();
      return data;
    },
    [count]
  );

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
    setIsLoading(true);
    const englishPokes = await fetchPoke();
    const koreanNames = await fetchkoreanNames(englishPokes);

    setPokeList((pre: IsPoke[] | []) =>
      pre.length > 0 ? [...pre, ...koreanNames] : [...koreanNames]
    );
    setCount((pre) => pre + 100);
    setIsLoading(false);
  }, [fetchPoke, setPokeList]);

  return { isLoading, pokeList, count, getPokes };
};

export default useFetctPokeList;
