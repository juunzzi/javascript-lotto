import { NUMBER } from '../constants/number';
import { RANK } from '../constants/rank';
import { shuffle } from '../utils/gameUtil';

class Lotto {
  constructor() {
    this.lottoNumbers = this.#createLottoNumbers();
  }

  getLottoNumbers() {
    return this.lottoNumbers;
  }

  #createLottoNumbers() {
    const lottoNumbers = shuffle([...new Array(NUMBER.LOTTO_MAX_NUMBER)].map((_, idx) => idx + 1));
    return lottoNumbers.slice(0, NUMBER.LOTTO_NUMBER_LENGTH);
  }

  computeWinResult(winningNumbers, bonusNumber) {
    const { length: numberMatchCount } = this.lottoNumbers.filter((number) =>
      winningNumbers.includes(number)
    );
    const isMatchBonus = this.lottoNumbers.includes(bonusNumber);
    return RANK[`${numberMatchCount}${isMatchBonus}`] ?? RANK.UNRANK;
  }
}

export default Lotto;
