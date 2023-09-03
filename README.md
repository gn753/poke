[배포링크] (https://64f4485535b5df7701d0e404--glittering-pavlova-450248.netlify.app/)

## 기능

1. Pokemon API를 이용하여 리스트 만들기.
2. 무한스크롤 구현
3. router 를 이용한 Detail 페이지
4. router를 활용한 Pokemon 타입별 출력.

### Pokemon API

프로젝트 초기에 공식문서를 파악하느라 오래 걸렸습니다. 처음API를 호출할때에는 이름과 url만 들어있어 url을  
재호출해서 원하는 데이터를 찾기 위해 여러번 반복해야하는 구조였습니다. 때문에 데이터 구조를 어떻게 설계해야할지에 대해
여러 고민과 시행반복이 어려웠던것 같습니다.

### 무한스크롤 기능 구현

API 문서 자체에 Data 를 호출시에 호출되는 데이터수의 limit 을 정할수 있었습니다.
무한 스크롤 시 무한 콜을 제거하는게 가장 심혈을 기울였습니다.

최하단에 Ref를 만났을때 useEffect 안에 담긴 Intersection Observer API 함수가 실행되고 함수가 실행될시에 새로운 데이터를 추가 해주는 방식을 사용하여 구현하였습니다.

### Pokemon 타입별 출력.

포켓몬을 타입별로 정리하였습니다. parma을 url에 전달해 해당 id를 받아 타입별로 포켓몬을 구현했습니다.
초기 설계는 home에서 받은 전역 포켓몬 데이터로 recoil의 setter함수를 이용해 필터링을 하는 것을 고민했었습니다.  
 하지만 새로고침을 했을 때 사용할 수 없다는 점, 무한스크롤이기 때문에 해당 포켓몬이 있는 page가 아직 없다면 해당 포켓몬이 나올 수 없다는 단점,  
 api 구조상의 문제점이 있어 현 구조를 선택했습니다.

## 커밋 규칙

| emoji | Commit message |           use           |
| :---: | :------------: | :---------------------: |
|  🚀   |     Start      |     프로젝트 스타트     |
|  ✨   |      Feat      |    새로운 기능 추가     |
|  🐛   |      Fix       |        버그 수정        |
|  🔧   |    Refactor    |      코드 리펙토링      |
|  💄   |     Style      |   UI추가 및 업데이트    |
|  ➕   |     Chore      | 패키지 추가 및 업데이트 |
|  📝   |      Docs      |    리드미 문서 작성     |

## 문제

### 테일윈드 css 동적 스타일 미적용 문제.

#### 상황

- 포켓몬 타입목록 api를 받아와 데이터 값을 렌더링 후 각 타입에 맞는 색깔을 동적으로 매칭시키려함.
- 렌더링 후 값은 잘 매칭되었으나 동적 색상 값이 미적용되는 이슈 발생.

#### 시도

- 테일윈드에 따로 내장된 색상이 아니기 때문에 적용시도. 내장된 값이 아니더라도 정적으로 줄 경우 정상 적용

#### 원인

- 테일윈드 css는 완전한 문자열로 작성된 클래스명만 탐색함. 즉 동적 지원을 적용하지 않아 감지가 불가능했던것.
- Tailwind에는 어떤 종류의 클라이언트 측 런타임도 포함되지 않으므로 클래스 이름은 빌드 시 정적으로 추출 가능해야 하며 클라이언트에서 변경되는 모든 종류의 임의의 동적 값에 의존할 수 없다고 나와있다. 즉 클라이언트에 변경되는 모든 것들은 탐지가 불가능

#### 해결

- 위와 같은 테일윈드 css 작동방식상 동적 값에 의존한다면 공식문서에서는 인라인 스타일을 권장.

```tsx
import { useEffect, useState } from "react";
const colors: any = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
interface IsPokeType {
  name: string;
  url: string;
}

export default function PokeTypes() {
  const [types, setTypes] = useState<IsPokeType[] | []>([]);
  const [color, setColor] = useState(colors);

  useEffect(() => {
    const fetchPokeType = async () => {
      const url = "https://pokeapi.co/api/v2/type/";
      const response = await fetch(url);
      const data = await response.json();
      const results = await data.results;
      setTypes(results);
    };
    fetchPokeType();
  }, []);

  return (
    <div>
      {types.length > 0 &&
        types.map((type) => (
          <div
            className={`mt-3 border-2 border-solid border-black bg-${
              color[type.name]
            } `}
            key={type.name}
          >
            {type.name} {colors[type.name]}
          </div>
        ))}
    </div>
  );
}
```
