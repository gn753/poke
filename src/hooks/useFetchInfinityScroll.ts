import { useCallback, useEffect, useRef, useState } from "react";

export interface IsPokeList {
  next: string;
  results: any;
}
interface IsPokeCard {
  name: string;
  url: string;
}

const useFetchInfinityScroll = () => {
  const [pokeCount, setPokeCount] = useState(100);
  const [pokeList, setPokeList] = useState<IsPokeList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollEnd = useRef<HTMLDivElement | null>(null);

  //포켓몬 호출
  const fetchPoke = useCallback(
    async () => {
      const baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${pokeCount}`;
      const response = await fetch(baseUrl);
      const data = await response.json();
      return data;
    },
    [pokeCount]
  );

  // 포켓몬 한글 이름 호출
  const fetchkoreanNames = async (data: IsPokeList) => {
    const urls: any = data?.results.map((item: IsPokeCard, index: number) => {
      return fetch(
        ` https://pokeapi.co/api/v2/pokemon-species/${index + 1}`
      ).then((res) => res.json());
    });
    const responses = await Promise.all(urls).then((res) =>
      res.map((it: any, index: number) => {
        return {
          name: it.names[2].name,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
      })
    );
  
    return responses;
  };

  const loadMore = () => {
    setPokeCount((prev) => prev + 9);
  
  };
  useEffect(() => {
    const getPokes = async () => {
      setIsLoading(true)
      const englishPokes = await fetchPoke();
      const koreanNames = await fetchkoreanNames(englishPokes);

      setPokeList({
        next: englishPokes.next ? englishPokes.next : null,
        results: [...koreanNames],
      });
      setIsLoading(false)
    };

    getPokes();
  }, [pokeCount, fetchPoke]);



  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entrise) => {
          if (entrise[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0.2 }
      );
      if (scrollEnd.current) {
        observer.observe(scrollEnd.current);
      }
    }
  }, [isLoading]);

  return { isLoading, loadMore, pokeList, scrollEnd };
};

export default useFetchInfinityScroll;
