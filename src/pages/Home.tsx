import PokeCard from "../components/PokeCard";

export default function Home() {
  return (
    <main className="p-10">
      <div>
        <ul className="display: flex flex-wrap">
          {Array.from(Array(10).keys()).map(() => (
            <PokeCard />
          ))}
        </ul>
      </div>
    </main>
  );
}
