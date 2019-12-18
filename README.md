# Wrap-Text-By-Line
To target individual lines of text, as they are displayed in the Dom, this library adds wrapper &lt;span&gt; tags around each line.

## Installation
* __ESM:__ `const { WrapTextByLine } = require 'wrap-text-by-line';`
* __CJS:__ `import WrapTextByLine from 'wrap-text-by-line';`
* __HTML:__`<script src="https://unpkg.com/wrap-text-by-line"></script>`

## Usage
Add wrapper to all h1 elements:
```JavaScript
WrapTextByLine(['h1']);
```

Add wrapper to all elements of class 'headline':
```JavaScript
WrapTextByLine(['.headline']);
```

Remove wrapper from all h1 elements:
```JavaScript
WrapTextByLine(['.headline'], { wrap: false });
```
