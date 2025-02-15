## step1 - todo list

<!--
로또 구입 금액을 입력하면, 금액에 해당하는 로또를 발급해야 한다.
로또 1장의 가격은 1,000원이다.
소비자는 자동 구매를 할 수 있어야 한다.
번호 보기 토글 버튼을 클릭해 로또 번호를 볼 수 있어야 한다.
-->

**로또 모델**

- [✅] 로또 모델에 숫자 배열을 인자로 넣어서 인스턴스를 생성할 수 있다.
- [✅] 로또 모델의 배열에 들어갈 값은 1이상 45이하의 숫자여야 한다.
- [✅] 로또 모델에 들어갈 배열의 길이는 6이어야 한다.

**로또 게임 모델**

- [✅] 로또 게임 모델에 금액이 정상적으로 입력되면, 구매할 수 있는 로또의 수를 반환할 수 있어야 한다.
- [✅] 금액은 1000이상의 숫자여야한다.
- [✅] 로또 번호 배열들을 입력하여 로또 모델을 생성하고 관리할 수 있어야 한다.

## step2 - todo list

- [✅] 확장된 설계를 바탕으로 코드를 리팩토링합니다.
- [✅] 모달 스타일, 마크업을 개발합니다.
- [✅] 결과 로직을 구현합니다.
  - [✅] Lotto Domain은 로또가 당첨 정보 (등수를) 계산할 수 있습니다.
  - [✅] Lotto List Domain은 로또들의 당첨정보를 통해 수익금과 당첨통계를 계산할 수 있습니다.
  - [✅] Winning Number Submit 기능을 구현하여 당첨 로또의 정보를 Domain Manager에게 전달해줍니다.
  - [✅] Domain Manager가 구한 정보를 View Manager에게 전달하여 뷰를 그립니다.
- [✅] 모달의 바깥과 X버튼을 클릭하면 사라지게 합니다.
- [✅] 재시작 기능을 구현합니다.
