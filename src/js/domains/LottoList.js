import { ERROR_MESSAGE } from '../constants/message';
import { NUMBER } from '../constants/number';
import { RANK_KEYS, RANK_PRIZE } from '../constants/rank';
import {
  hasLottoListAndRejectAction,
  isValidCharge,
  isValidWinningNumber,
} from '../utils/validator';
import Lotto from './Lotto';

class LottoList {
  #lottoList = null;

  getLottoList() {
    return this.#lottoList;
  }

  createLottoList(chargeInput) {
    if (hasLottoListAndRejectAction(this.#lottoList)) {
      return;
    }
    /** 정상적이지 않은 로또가 하나라도 존재한다면, 멤버는 빈 값이고 사용자는 금액을 다시 입력하여야 한다. */
    const availableLottoAmount = this.exchangeChargeToLottoAmount(chargeInput);
    const lottoList = [...new Array(availableLottoAmount)].map(() => new Lotto());
    this.#lottoList = lottoList;
  }

  exchangeChargeToLottoAmount(charge) {
    if (isValidCharge(charge)) {
      return Math.floor(charge / NUMBER.LOTTO_PRICE);
    }
    throw new Error(ERROR_MESSAGE.CHARGE_IS_INVALIDATE);
  }

  computeStatisticsAndProfitRatio(winningNumbers, bonusNumber) {
    if (isValidWinningNumber([...winningNumbers, bonusNumber])) {
      const statistics = this.computeStatistics(winningNumbers, bonusNumber);

      const profitRatio = this.computeProfitRatio(statistics);

      return { statistics, profitRatio };
    }
    throw new Error(ERROR_MESSAGE.WIN_NUMBER_IS_INVALIDATE);
  }

  /** 객체의 상태를 바꾸지 않는다. 은닉화 할 필요가 있나? */
  /** 도메인은 최대한 변경하고 싶지 않다. 초반 설계에 고민을 좀 더 했어야 한다. */
  computeStatistics(winningNumbers, bonusNumber) {
    const statisticsArray = this.#lottoList.map((lotto) =>
      lotto.computeWinResult(winningNumbers, bonusNumber)
    );

    const statisticsMap = this.changeStatisticsMap(statisticsArray);

    return statisticsMap;
  }

  computeProfitRatio(statistics) {
    const lottoPurchaseAmount = this.#lottoList.length * NUMBER.LOTTO_PRICE;

    const profitAmount = Object.keys(statistics).reduce((prev, currentKey) => {
      const count = statistics[currentKey] ?? 0;
      const price = RANK_PRIZE[currentKey] ?? 0;

      return prev + count * price;
    }, 0);

    return (profitAmount / lottoPurchaseAmount) * 100;
  }

  /** 배열 형태 ex) ['1등','1등','2등','3등','꽝','꽝'] 를*/
  /** 객체 형태 ex) {'1등' : 2, '2등' : 1} 로 바꾼다*/
  changeStatisticsMap(statisticsArray) {
    const statisticsMap = Object.values(RANK_KEYS).reduce(
      (prev, key) => ({ ...prev, [`${key}`]: 0 }),
      {}
    );
    return statisticsArray.reduce(
      (prev, result) => ({ ...prev, [`${result}`]: prev[result] + 1 }),
      statisticsMap
    );
  }
}
export default LottoList;
