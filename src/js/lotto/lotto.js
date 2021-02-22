import { getRandomNumber, sortByNumber } from "../utils/util.js"
import { LOTTO } from "../constants/constant.js"

class Lotto {
  constructor() {
    this.numbers = new Set()
  }

  gernerateRandomNumbers() {
    while (this.numbers.size !== LOTTO.SIZE) {
      this.numbers.add(getRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM))
    }
    this.sortByNumber()
  }

  sortByNumber() {
    this.numbers = sortByNumber([...this.numbers])
  }

  getNumbers() {
    return this.numbers
  }
}

export default Lotto
