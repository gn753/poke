import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Details() {
  // 포켓몬 상세 데이터 : 종,타입,이미지, 칼라 
  const [pokeDetails, setPokeDetails] = useState<any>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    //만약 데이터값에 상태가 없다면 호출
    const fetchPokeDetails = async () => {
      //id 값으로 포켓몬 상세 데이터 출력 
      const pokeDetailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokeDeatailslData = await pokeDetailRes.json();
      const pokeSpeciesUrl = pokeDeatailslData.species.url;
      //상세 데이터에서 나온 종 url로 이미지,한글 이름 찾기  
      const koreanNames = await fetch(pokeSpeciesUrl);
      const koreanNamesData = await koreanNames.json();

      const pokeDetailsData = {
        name: koreanNamesData.names[2].name,
        text: koreanNamesData.flavor_text_entries[23].flavor_text,
        color: koreanNamesData.color.name,
        type: pokeDeatailslData.types[0].type.name,
        image: pokeDeatailslData.sprites.other["official-artwork"].front_default
      };

      setPokeDetails(pokeDetailsData);
    };
    if (id) {
      fetchPokeDetails();
    }
  }, [id]);


  return (
    <main>
      {/* 테일윈드 css는 다이나믹 값을 지원하지 않으므로 inline-style 사용 */}
      <div
        className="container-xl"
        style={{ background: `${pokeDetails && pokeDetails.color}` }}
      >
        <div>
          <div className="flex justify-center p-10 gap-4 border border-solid">
            <div>{pokeDetails && <img src={`${pokeDetails.image}`} alt="포켓몬 상세 이미지" />}</div>
            <div>
              <h4 className="text-[50px]">{pokeDetails && pokeDetails.name}</h4>
              <p>타입 : {pokeDetails && pokeDetails.type}</p>
              <p>특성 : {pokeDetails && pokeDetails.text}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
