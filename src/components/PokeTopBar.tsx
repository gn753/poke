import { Link } from "react-router-dom";

export default function PokeTopBar() {
  return (
    <header className=" bg-[#393939]">
      <div className="max-w-screen-md mx-auto">
        <div className="pt-[30px] pb-5 px-[25px]">
          <div className="flex w-full">
            <Link to="/">
              <h1 className="text-3xl font-bold text-center text-white">
                포켓몬도감
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
