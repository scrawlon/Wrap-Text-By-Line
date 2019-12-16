
const WrapTextByLine = (function() {
  function WrapTextByLine(elementSelectors = [], config = {}) {
    const { wrap = true, wrappedClass = 'wrapped-line' } = config;

    if ( !elementSelectors || !Array.isArray(elementSelectors) ) return false;

    elementSelectors.forEach((elementSelector, index) => {
      const targetElements = document.querySelectorAll(elementSelector);

      targetElements.forEach((el) => {
        const initialState = cacheGetInitialState(el, elementSelector, index);

        if ( wrap ) {
          el.classList.add('wtbl-active');
          wrapLines(el, elementSelector, index, wrappedClass, initialState);
        } else {
          el.classList.remove('wtbl-active');
          el.innerHTML = initialState;
        }
      });
    });
  }

  function cacheGetInitialState(el, elementSelector, index) {
    const initialStateId = el.dataset.wtblInitialStateId;
    let initialState = initialStateId ? localStorage.getItem(`${elementSelector}-${index}-${initialStateId}-wtlb-initial-state`) : '';

    if ( !initialState ) {
      initialState = cacheSetInitialState(el, elementSelector, index);
    }

    return JSON.parse(initialState);
  }

  function cacheSetInitialState(el, elementSelector, index) {
    const initialStateId = Date.now();
    const initialState = JSON.stringify(el.innerHTML);

    el.dataset.wtblInitialStateId = initialStateId;
    localStorage.setItem(`${elementSelector}-${index}-${initialStateId}-wtlb-initial-state`, initialState);

    return initialState;
  }

  function wrapLines(el, elementSelector, index, wrappedClass, initialState) {
    const clone = document.createElement('div');
    const lineHeight = getLineHeight(el);
    const text = el.textContent;
    const words = text.split(' ');
    const htmlWords = initialState.split(' ');
    // const cachedSentences = cacheGetSentences();
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

      currentSentence += `${htmlWords[i]} `;

      if ( i === words.length - 1) {
        sentences.push(currentSentence.trim())
        el.removeChild(clone);
      };
    });

    console.log({sentences});

    el.innerHTML =  `<span class="${wrappedClass}">${sentences.join(`</span><span class="${wrappedClass}">`)}</span>`;
  }

  function getLineHeight(el) {
    const cacheInnerHTML = el.innerHTML;
    let height;

    el.innerHTML = el.textContent;
    el.style.whiteSpace = 'nowrap';
    height = el.offsetHeight;
    el.style.whiteSpace = 'normal';
    el.innerHTML = cacheInnerHTML;

    console.log({height});

    return height;
  }

  return WrapTextByLine;
})();

export default WrapTextByLine;
