import { EVENT } from '../constants/events';
import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/dom';

class LottoContainerView {
  constructor({ $app, emitEvent }) {
    this.$app = $app;
    this.#initializeTemplate();
    this.#initializeDOM();
    this.#bindEventHandler(emitEvent);
  }

  #initializeTemplate() {
    this.$app.insertAdjacentHTML('beforeend', this.#basicTemplate);
  }

  #initializeDOM() {
    this.$chargeForm = findElement(SELECTOR.CHARGE_INPUT_FORM);
    this.$alignConverter = findElement(SELECTOR.ALIGN_CONVERTER);
    this.$lottoContainer = findElement(SELECTOR.LOTTO_CONTAINER);
    this.$purchasedMessage = findElement(SELECTOR.PURCHASED_MESSAGE);
  }

  #bindEventHandler(emitEvent) {
    this.$chargeForm.addEventListener('submit', (e) => emitEvent(EVENT.SUBMIT_CHARGE, e));
    this.$alignConverter.addEventListener('change', (e) => emitEvent(EVENT.CHANGE_ALIGN_STATE, e));
  }

  renderLottoSection(lottoList) {
    this.renderPurchasedMessage(lottoList.length);
    this.renderLottoList(lottoList);
  }

  renderLottoList(lottoList) {
    this.$lottoContainer.innerHTML = lottoList
      .map((lotto) => this.#generateLottoTemplate(lotto))
      .join('');
  }

  renderPurchasedMessage(lottoAmount) {
    this.$purchasedMessage.innerText = `총 ${lottoAmount}개를 구매하였습니다.`;
  }

  renderAlignState(visibleState) {
    this.$lottoContainer.setAttribute('data-visible-state', visibleState);
  }

  #generateLottoTemplate({ lottoNumbers }) {
    return `<div class="lotto">
      <span>🎟️</span>
      <span class="number">${lottoNumbers.join(', ')}</span>
      </div>`;
  }

  #basicTemplate = `
  <h1 class="header-title">🎱 행운의 로또</h1>
  <section id="charge-input-section" aria-labelledby="charge-input-section-title">
    <h1 id="charge-input-section-title" hidden>금액을 입력하는 섹션입니다.</h1>
    <p>구입할 금액을 입력해주세요</p>
    <form id="charge-input-form">
      <input id="charge-input" type="number" placeholder="금액" min="1000" max="100000"/>
      <button id="charge-button">구입</button>
    </form>
  </section>

  <section id="lotto-section" aria-labelledby="lotto-section-title">
    <h1 id="lotto-section-title" hidden>구매한 로또를 확인하는 섹션입니다.</h1>
    <div class="lotto-wrapper">
      <span id="purchased-message"></span>
      <div id="lotto-container" data-visible-state="false">로또를 구매해주세요 😳</div>
    </div>
    <div id="align-converter-container" class="flex-column-align-end">
      <label for="align-converter" class="flex-column-align-end">
        <span>번호 보기</span>
        <input id="align-converter" type="checkbox" class="converter" />
        <span class="checkmark">
          <span class="circle"></span>
        </span>
      </label>
    </div>
  </section>`;
}
export default LottoContainerView;
