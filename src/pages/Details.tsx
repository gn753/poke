import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface IsDetails {
  name: string;
  text: string;
  color: string;
  type: string;
  image: string;
  height: string;
  weight: string;
  abilities: string;
  genderRatio: number;
  classification: string;
}

export default function Details() {
  // 포켓몬 상세 데이터 : 종,타입,이미지, 칼라
  const [pokeDetails, setPokeDetails] = useState<IsDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    //만약 데이터값에 상태가 없다면 호출
    const fetchPokeDetails = async () => {
      setIsLoading(true);
      //id 값으로 포켓몬 상세 데이터 출력
      const pokeDetailRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokeDeatailslData = await pokeDetailRes.json();
      const pokeSpeciesUrl = pokeDeatailslData.species.url;
      //상세 데이터에서 나온 종 url로 이미지,한글 이름 찾기
      const speciesRes = await fetch(pokeSpeciesUrl);
      const speciesData = await speciesRes.json();

      const name = speciesData.names[2].name;
      const text = speciesData.flavor_text_entries[23].flavor_text;
      const color = speciesData.color.name;
      const type = pokeDeatailslData.types[0].type.name;
      const height = pokeDeatailslData.height;
      const weight = pokeDeatailslData.weight;
      const abilities = pokeDeatailslData.abilities.map(
        (ability: any) => ability.ability.name
      );
      const genderRatio = speciesData.gender_rate;
      const classification = speciesData.genera.find(
        (genus: any) => genus.language.name === "ko"
      ).genus;

      const pokeDetailsData = {
        name,
        text,
        color,
        type,
        height,
        weight,
        abilities,
        genderRatio,
        classification,
        image:
          pokeDeatailslData.sprites.other["official-artwork"].front_default,
      };
      console.log(pokeDetailsData, "data");
      setPokeDetails(pokeDetailsData);
      setIsLoading(false);
    };
    if (id) {
      fetchPokeDetails();
    }
  }, [id]);

  return (
    <main className="p-10">
      {/* 테일윈드 css는 다이나믹 값을 지원하지 않으므로 inline-style 사용 */}
      <div>{isLoading && "로딩중입니다"}</div>
      <div className="container-xl">
        <div>
          <div className="flex justify-center p-10 gap-4 border border-solid">
            <div style={{ background: `${pokeDetails && pokeDetails.color}` }}>
              {pokeDetails && (
                <img src={`${pokeDetails.image}`} alt="포켓몬 상세 이미지" />
              )}
            </div>
            <div>
              <h4 className="text-[50px]">
                <div>No. {String(id).padStart(4, "0")}</div>
                <div>{pokeDetails && pokeDetails.name}</div>
              </h4>
              <p className="text-lg mb-5 mt-5">
                {pokeDetails && pokeDetails.text}
              </p>
              <div className="border pt-2 pb-5 px-[30px] rounded-[7px] border-solid border-[#e8e8e8] ">
                <div className="flex flex-wrap">
                  <div className="w-[33.3%] p-3">
                    타입 : {pokeDetails && pokeDetails.type}
                  </div>
                  <div className="w-[33.3%] p-3">
                    키 : {pokeDetails && pokeDetails.height}m
                  </div>
                  <div className="w-[33.3%] p-3">
                    분류 : {pokeDetails && pokeDetails.classification}
                  </div>
                  <div className="w-[33.3%] p-3">
                    성별 :
                    {pokeDetails && pokeDetails.genderRatio === 1 ? "남" : "여"}
                  </div>
                  <div className="w-[33.3%] p-3">
                    몸무게 : {pokeDetails && pokeDetails.weight}kg
                  </div>
                  <div className="w-[33.3%] p-3">
                    특성 : {pokeDetails && pokeDetails.abilities}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
