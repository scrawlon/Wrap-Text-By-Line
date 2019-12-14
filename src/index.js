
const WrapTextByLine = (function() {
  function WrapTextByLine(elementSelectors = [], config = {}) {
    const { wrap = true, wrappedClass = 'wrapped-line' } = config;

    if ( !elementSelectors || !Array.isArray(elementSelectors) ) return false;

    elementSelectors.forEach((elementSelector) => {
      const targetElements = document.querySelectorAll(elementSelector);

      targetElements.forEach((el) => {
        const initialState = cacheGetInitialState(el);

        if ( wrap ) {
          el.classList.add('wtbl-active');
          el.innerHTML = wrapLines(el, wrappedClass, initialState);
        } else {
          el.classList.remove('wtbl-active');
          el.innerHTML = initialState;
        }
      });
    });
  }

  function cacheGetInitialState(el) {
    const initialStateId = el.dataset.wtblInitialStateId;
    let initialState = initialStateId ? localStorage.getItem(initialStateId) : '';

    if ( !initialState ) {
      initialState = cacheSetInitialState(el);
    }

    return JSON.parse(initialState);
  }

  function cacheSetInitialState(el) {
    const initialStateId = Date.now();
    const initialState = JSON.stringify(el.innerHTML);

    el.dataset.wtblInitialStateId = initialStateId;
    localStorage.setItem(initialStateId, initialState);

    return initialState;
  }

  function wrapLines(el, wrappedClass, initialState) {
    const clone = document.createElement('div');
    const lineHeight = getLineHeight(el);
    const text = el.textContent;
    const words = text.split(' ');
    const htmlWord = initialState.split(' ');
    let sentences = [];
    let currentSentence = '';

    el.appendChild(clone);

    words.forEach((word, i) => {
      clone.textContent += `${word} `;

      if ( clone.offsetHeight > lineHeight ) {
        sentences.push(currentSentence);
        currentSentence = '';
        clone.textContent = `${word} `;
      }

      currentSentence += `${htmlWord[i]} `;

      if ( i === words.length - 1) {
        sentences.push(currentSentence.trim())
        el.removeChild(clone);
      };
    });

    return `<span class="${wrappedClass}">${sentences.join(`</span><span class="${wrappedClass}">`)}</span>`;
  }

  function getLineHeight(el) {
    var height;

    el.style.whiteSpace = 'nowrap';
    height = el.offsetHeight;
    el.style.whiteSpace = 'normal';

    return height;
  }

  return WrapTextByLine;
})();

export default WrapTextByLine;
