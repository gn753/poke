import PokeTypes from "./PokeTypes";

export default function PokeTopBar() {
  return (
    <header>
      <div className="container-xl">
        <div className="pt-[30px] pb-5 px-[25px] bg-[#393939]">
          <div className="flex w-full">
            <h1 className="text-3xl font-bold text-center text-white">
              포켓몬도감
            </h1>
            <input
              className="display: block m-auto w-4/5 h-10 p-6 bg-[#0e0e0e] text-white"
              placeholder="포켓몬 이름 또는 설명, 특성 키워드를 입력해주세요."
            />
          </div>
        </div>
        <PokeTypes />
      </div>
    </header>
  );
}
