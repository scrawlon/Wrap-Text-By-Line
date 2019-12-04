
function WrapTextByLine(elementSelector = '', config = {}) {
  const { wrap = true, wrappedClass = 'wrapped-line' } = config;

  if ( !elementSelector ) return false;

  const targetElements = document.querySelectorAll(elementSelector);

  targetElements.forEach((el) => {
    if ( wrap ) {
      el.innerHTML = wrapLines(el, wrappedClass);
    } else {
      el.innerHTML = el.textContent;
    }
  });
}

function wrapLines(el, wrappedClass) {
  const clone = document.createElement('div');
  const lineHeight = getLineHeight(el);
  const text = el.textContent;
  const words = text.split(' ');
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

    currentSentence += `${word} `;

    if ( i === words.length - 1) {
      sentences.push(currentSentence)
      el.removeChild(clone);
    };
  })

  return `<span class="${wrappedClass}">${sentences.join(`</span><span class="${wrappedClass}">`)}</span>`;
}

function getLineHeight(el) {
  var height;

  el.style.whiteSpace = 'nowrap';
  height = el.offsetHeight;
  el.style.whiteSpace = 'normal';

  return height;
}

export default WrapTextByLine;
