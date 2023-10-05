<img width="1399" alt="메인페이지" src="https://github.com/gn753/poke/assets/71584114/b7bad3e0-dd33-4a63-8bc3-23640f258134">

[배포링크] (https://main--lively-scone-f8b04e.netlify.app/)

## [개발 배경](../../wiki/개발-히스토리)

## 주요기능

### Pokemon API

프로젝트 초기에 공식 문서를 이해하는 데 상당한 시간이 소요되었습니다. 초기 API 호출 시, 데이터에는 이름과 URL만이 제공되었기 때문에 원하는 정보를 얻기 위해 추가적인 API 호출이 필요했습니다.

예를 들어, 포켓몬의 한글 이름을 얻거나 포켓몬의 특징 설명을 얻기 위해서는 각각 다른 API를 호출해야 했습니다.

이러한 데이터 구조를 어떻게 설계해야 하는지 이해하기 위해 간단한 프로토타입을 만들고 API 구조를 이해하기 위해 여러 실험을 진행하면서 문제를 해결하였습니다.

### 무한스크롤 기능 구현

![무한스크롤](https://github.com/gn753/poke/assets/71584114/ebc18e1a-edab-4820-b37d-f26413a93447)

### 무한 스크롤 => 가상 리스트 변경 1.1.0 ver update

<img width="814" alt="스크린샷 2023-10-05 오후 3 13 21" src="https://github.com/gn753/poke/assets/71584114/6f96dd3e-19f8-4c9f-b632-7a0cdb9f399f">

### Pokemon 타입별 출력.

![타입](https://user-images.githubusercontent.com/71584114/272788279-037f9a42-b53f-4595-b79a-eba05936eade.png)

## 포켓몬 상세정보

![상세정보](https://user-images.githubusercontent.com/71584114/272788619-ff2863d2-a6af-47ae-a010-91b2c3dca4ab.png)

## 기술

- React
- Typescript
- TailwindCss
- Recoil

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

### 앞으로 도전해볼만한 것

1. 가상화 작업
2. 캐싱작업
