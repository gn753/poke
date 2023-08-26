export default function PokeCardDetails() {
  return (
    <div>
      <div className="flex justify-center p-10 gap-4 border border-solid">
        <div>
          <img
            src="https://data1.pokemonkorea.co.kr/newdata/pokedex/full/000201.png"
            alt="2"
          />
        </div>
        <div>
          <h4 className="text-[50px]">이상해풀</h4>
          <p>풀타입</p>
          <p>
            등의 봉오리가 부풀어 오르면 달콤한 냄새가 감돌기 시작한다. 큰 꽃이
            필 조짐이다.
          </p>
        </div>
      </div>
    </div>
  );
}
