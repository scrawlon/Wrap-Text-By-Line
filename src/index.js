
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
    let initialState = initialStateId ? localStorage.getItem(`${elementSelector}-${index}-${initialStateId}-wtbl-initial-state`) : '';

    if ( !initialState ) {
      initialState = cacheSetInitialState(el, elementSelector, index);
    }

    return JSON.parse(initialState);
  }

  function cacheSetInitialState(el, elementSelector, index) {
    const initialStateId = Date.now();
    const initialState = JSON.stringify(el.innerHTML);

    el.dataset.wtblInitialStateId = initialStateId;
    localStorage.setItem(`${elementSelector}-${index}-${initialStateId}-wtbl-initial-state`, initialState);

    return initialState;
  }

  function wrapLines(el, elementSelector, index, wrappedClass, initialState) {
    const clone = document.createElement('div');
    const lineHeight = getLineHeight(el);
    const text = el.textContent;
    const words = text.split(' ');
    const htmlWords = initialState.split(' ');
    const cachedLinesArray = cacheGetLinesArray(el, elementSelector, index);
    let lines = [];
    let currentLine = '';

    el.appendChild(clone);

    words.forEach((word, i) => {
      clone.textContent += `${word} `;

      if ( clone.offsetHeight > lineHeight ) {
        lines.push(currentLine);
        currentLine = '';
        clone.textContent = `${word} `;
      }

      currentLine += `${htmlWords[i]} `;

      if ( i === words.length - 1) {
        lines.push(currentLine.trim())
        el.removeChild(clone);
      };
    });

    if ( !cachedLinesArray || JSON.stringify(cachedLinesArray) != JSON.stringify(lines) ) {
      cacheSetLinesArray(el, elementSelector, index, lines);
      el.innerHTML =  `<span class="${wrappedClass}">${lines.join(`</span><span class="${wrappedClass}">`)}</span>`;
    }
  }

  function getLineHeight(el) {
    const cacheInnerHTML = el.innerHTML;
    let height;

    el.innerHTML = el.textContent;
    el.style.whiteSpace = 'nowrap';
    height = el.offsetHeight;
    el.innerHTML = cacheInnerHTML;
    el.style.whiteSpace = '';

    return height;
  }

  function cacheGetLinesArray(el, elementSelector, index) {
    const initialStateId = el.dataset.wtblInitialStateId;
    const cachedLinesArray = initialStateId
      ? localStorage.getItem(`${elementSelector}-${index}-${initialStateId}-wtblLinesArray`)
      : false;

    return JSON.parse(cachedLinesArray);
  }

  function cacheSetLinesArray(el, elementSelector, index, lines) {
    const initialStateId = el.dataset.wtblInitialStateId;
    localStorage.setItem(`${elementSelector}-${index}-${initialStateId}-wtblLinesArray`, JSON.stringify(lines));
  }

  return WrapTextByLine;
})();

export default WrapTextByLine;
