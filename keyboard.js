// Shared on-screen keyboard widget (used by position.html, word.html, sentence.html).
// Injects the physical keyboard markup into a mount element and exposes the
// small set of helper functions each page's own keydown/keyup handlers call into.

var KEYBOARD_HTML = `
<div class="keyboard-housing" id="keyboard-housing">
  <!-- 1. 메인 키보드 -->
  <div class="main-block">
<div class="f-row-group">
  <div class="key c-esc" id="key-Escape">Esc</div>
  <div style="display:flex; gap:6px;"><div class="key c-fkey" id="key-F1">F1</div><div class="key c-fkey" id="key-F2">F2</div><div class="key c-fkey" id="key-F3">F3</div><div class="key c-fkey" id="key-F4">F4</div></div>
  <div style="display:flex; gap:6px;"><div class="key c-fkey" id="key-F5">F5</div><div class="key c-fkey" id="key-F6">F6</div><div class="key c-fkey" id="key-F7">F7</div><div class="key c-fkey" id="key-F8">F8</div></div>
  <div style="display:flex; gap:6px;"><div class="key c-fkey" id="key-F9">F9</div><div class="key c-fkey" id="key-F10">F10</div><div class="key c-fkey" id="key-F11">F11</div><div class="key c-fkey" id="key-F12">F12</div></div>
</div>
<div class="keys-section">
  <div class="row">
    <div class="key c-numrow" id="key-Backquote"><div class="top-char">~</div><div class="bottom-char">\`</div></div>
    <div class="key c-numrow" id="key-Digit1"><div class="top-char">!</div><div class="bottom-char">1</div></div>
    <div class="key c-numrow" id="key-Digit2"><div class="top-char">@</div><div class="bottom-char">2</div></div>
    <div class="key c-numrow" id="key-Digit3"><div class="top-char">#</div><div class="bottom-char">3</div></div>
    <div class="key c-numrow" id="key-Digit4"><div class="top-char">$</div><div class="bottom-char">4</div></div>
    <div class="key c-numrow" id="key-Digit5"><div class="top-char">%</div><div class="bottom-char">5</div></div>
    <div class="key c-numrow" id="key-Digit6"><div class="top-char">^</div><div class="bottom-char">6</div></div>
    <div class="key c-numrow" id="key-Digit7"><div class="top-char">&amp;</div><div class="bottom-char">7</div></div>
    <div class="key c-numrow" id="key-Digit8"><div class="top-char">*</div><div class="bottom-char">8</div></div>
    <div class="key c-numrow" id="key-Digit9"><div class="top-char">(</div><div class="bottom-char">9</div></div>
    <div class="key c-numrow" id="key-Digit0"><div class="top-char">)</div><div class="bottom-char">0</div></div>
    <div class="key c-numrow" id="key-Minus"><div class="top-char">_</div><div class="bottom-char">-</div></div>
    <div class="key c-numrow" id="key-Equal"><div class="top-char">+</div><div class="bottom-char">=</div></div>
    <div class="key c-special w-back" id="key-Backspace">←</div>
  </div>
  <div class="row">
    <div class="key c-special w-tab" id="key-Tab">Tab ⇥</div>
    <div class="key c-letter" id="key-KeyQ"><div class="top-char">Q</div><div class="bottom-char">ㅂ</div></div>
    <div class="key c-letter" id="key-KeyW"><div class="top-char">W</div><div class="bottom-char">ㅈ</div></div>
    <div class="key c-letter" id="key-KeyE"><div class="top-char">E</div><div class="bottom-char">ㄷ</div></div>
    <div class="key c-letter" id="key-KeyR"><div class="top-char">R</div><div class="bottom-char">ㄱ</div></div>
    <div class="key c-letter" id="key-KeyT"><div class="top-char">T</div><div class="bottom-char">ㅅ</div></div>
    <div class="key c-letter" id="key-KeyY"><div class="top-char">Y</div><div class="bottom-char">ㅛ</div></div>
    <div class="key c-letter" id="key-KeyU"><div class="top-char">U</div><div class="bottom-char">ㅕ</div></div>
    <div class="key c-letter" id="key-KeyI"><div class="top-char">I</div><div class="bottom-char">ㅑ</div></div>
    <div class="key c-letter" id="key-KeyO"><div class="top-char">O</div><div class="bottom-char">ㅐ</div></div>
    <div class="key c-letter" id="key-KeyP"><div class="top-char">P</div><div class="bottom-char">ㅔ</div></div>
    <div class="key c-letter" id="key-BracketLeft"><div class="top-char">{</div><div class="bottom-char">[</div></div>
    <div class="key c-letter" id="key-BracketRight"><div class="top-char">}</div><div class="bottom-char">]</div></div>
    <div class="key c-letter" id="key-Backslash"><div class="top-char">|</div><div class="bottom-char">\\</div></div>
  </div>
  <div class="row">
    <div class="key c-special w-caps" id="key-CapsLock">Caps</div>
    <div class="key c-letter" id="key-KeyA"><div class="top-char">A</div><div class="bottom-char">ㅁ</div></div>
    <div class="key c-letter" id="key-KeyS"><div class="top-char">S</div><div class="bottom-char">ㄴ</div></div>
    <div class="key c-letter" id="key-KeyD"><div class="top-char">D</div><div class="bottom-char">ㅇ</div></div>
    <div class="key c-letter" id="key-KeyF"><div class="top-char">F</div><div class="bottom-char">ㄹ</div></div>
    <div class="key c-letter" id="key-KeyG"><div class="top-char">G</div><div class="bottom-char">ㅎ</div></div>
    <div class="key c-letter" id="key-KeyH"><div class="top-char">H</div><div class="bottom-char">ㅗ</div></div>
    <div class="key c-letter" id="key-KeyJ"><div class="top-char">J</div><div class="bottom-char">ㅓ</div></div>
    <div class="key c-letter" id="key-KeyK"><div class="top-char">K</div><div class="bottom-char">ㅏ</div></div>
    <div class="key c-letter" id="key-KeyL"><div class="top-char">L</div><div class="bottom-char">ㅣ</div></div>
    <div class="key c-letter" id="key-Semicolon"><div class="top-char">:</div><div class="bottom-char">;</div></div>
    <div class="key c-letter" id="key-Quote"><div class="top-char">"</div><div class="bottom-char">'</div></div>
    <div class="key c-special w-main-enter" id="key-Enter">Enter ↵</div>
  </div>
  <div class="row">
    <div class="key c-special w-shift" id="key-ShiftLeft">Shift</div>
    <div class="key c-letter" id="key-KeyZ"><div class="top-char">Z</div><div class="bottom-char">ㅋ</div></div>
    <div class="key c-letter" id="key-KeyX"><div class="top-char">X</div><div class="bottom-char">ㅌ</div></div>
    <div class="key c-letter" id="key-KeyC"><div class="top-char">C</div><div class="bottom-char">ㅊ</div></div>
    <div class="key c-letter" id="key-KeyV"><div class="top-char">V</div><div class="bottom-char">ㅍ</div></div>
    <div class="key c-letter" id="key-KeyB"><div class="top-char">B</div><div class="bottom-char">ㅠ</div></div>
    <div class="key c-letter" id="key-KeyN"><div class="top-char">N</div><div class="bottom-char">ㅜ</div></div>
    <div class="key c-letter" id="key-KeyM"><div class="top-char">M</div><div class="bottom-char">ㅡ</div></div>
    <div class="key c-letter" id="key-Comma"><div class="top-char">&lt;</div><div class="bottom-char">,</div></div>
    <div class="key c-letter" id="key-Period"><div class="top-char">&gt;</div><div class="bottom-char">.</div></div>
    <div class="key c-letter" id="key-Slash"><div class="top-char">?</div><div class="bottom-char">/</div></div>
    <div class="key c-special w-shift" id="key-ShiftRight">Shift</div>
  </div>
  <div class="row">
    <div class="key c-special w-ctrl-side" id="key-ControlLeft">Ctrl</div>
    <div class="key c-special w-ctrl-side" id="key-MetaLeft">Win</div>
    <div class="key c-special w-ctrl-side" id="key-AltLeft">Alt</div>
    <div class="key c-space w-space" id="key-Space">Space</div>
    <div class="key c-special w-ctrl-side" id="key-HangulMode">한/영</div>
    <div class="key c-special w-ctrl-side" id="key-AltRight">Alt</div>
    <div class="key c-special w-ctrl-side" id="key-ControlRight">Ctrl</div>
  </div>
</div>
</div>

  <!-- 2. 중간 기능키 / 방향키 -->
  <div class="middle-block">
    <div></div><div></div><div></div>
    <div class="key c-special" style="grid-row:2;grid-column:1;" id="key-Insert">Ins</div><div class="key c-special" style="grid-row:2;grid-column:2;" id="key-Home">Home</div><div class="key c-special" style="grid-row:2;grid-column:3;" id="key-PageUp">PgUp</div>
    <div class="key c-special" style="grid-row:3;grid-column:1;" id="key-Delete">Del</div><div class="key c-special" style="grid-row:3;grid-column:2;" id="key-End">End</div><div class="key c-special" style="grid-row:3;grid-column:3;" id="key-PageDown">PgDn</div>
    <div></div><div></div><div></div>
    <div class="key c-arrow" style="grid-row:5;grid-column:2;" id="key-ArrowUp">↑</div>
    <div class="key c-arrow" style="grid-row:6;grid-column:1;" id="key-ArrowLeft">←</div><div class="key c-arrow" style="grid-row:6;grid-column:2;" id="key-ArrowDown">↓</div><div class="key c-arrow" style="grid-row:6;grid-column:3;" id="key-ArrowRight">→</div>
  </div>

  <!-- 3. 오른쪽 숫자 패드 -->
  <div class="right-block">
    <div class="led-container" style="grid-row:1;">
      <div style="text-align:center;display:flex;flex-direction:column;align-items:center;"><div id="led-num-dot" class="led-dot"></div><span id="led-num-text" class="led-text">Num</span></div>
      <div style="text-align:center;display:flex;flex-direction:column;align-items:center;"><div id="led-caps-dot" class="led-dot"></div><span id="led-caps-text" class="led-text">Caps</span></div>
      <div style="text-align:center;display:flex;flex-direction:column;align-items:center;"><div id="led-scroll-dot" class="led-dot"></div><span id="led-scroll-text" class="led-text">Scroll</span></div>
    </div>
    <div class="key c-numpad" id="key-NumLock" style="grid-row:2;grid-column:1;">Num</div><div class="key c-numpad" id="key-NumpadDivide" style="grid-row:2;grid-column:2;">/</div><div class="key c-numpad" id="key-NumpadMultiply" style="grid-row:2;grid-column:3;">*</div><div class="key c-numpad" id="key-NumpadSubtract" style="grid-row:2;grid-column:4;">-</div>
    <div class="key c-numpad" id="key-Numpad7" style="grid-row:3;grid-column:1;">7</div><div class="key c-numpad" id="key-Numpad8" style="grid-row:3;grid-column:2;">8</div><div class="key c-numpad" id="key-Numpad9" style="grid-row:3;grid-column:3;">9</div><div class="key c-numpad h-double" id="key-NumpadAdd" style="grid-row:3 / span 2;grid-column:4;">+</div>
    <div class="key c-numpad" id="key-Numpad4" style="grid-row:4;grid-column:1;">4</div><div class="key c-numpad" id="key-Numpad5" style="grid-row:4;grid-column:2;">5</div><div class="key c-numpad" id="key-Numpad6" style="grid-row:4;grid-column:3;">6</div>
    <div class="key c-numpad" id="key-Numpad1" style="grid-row:5;grid-column:1;">1</div><div class="key c-numpad" id="key-Numpad2" style="grid-row:5;grid-column:2;">2</div><div class="key c-numpad" id="key-Numpad3" style="grid-row:5;grid-column:3;">3</div><div class="key c-num-enter h-double" id="key-NumpadEnter" style="grid-row:5 / span 2;grid-column:4;">Enter</div>
    <div class="key c-numpad w-double" id="key-Numpad0" style="grid-row:6;grid-column:1 / span 2;">0</div><div class="key c-numpad" id="key-NumpadDecimal" style="grid-row:6;grid-column:3;">.</div>
  </div>
`;

function renderKeyboard(mountId){
  var mount = document.getElementById(mountId);
  if (mount) mount.innerHTML = KEYBOARD_HTML;
}

function keyEl(code){ return document.getElementById("key-" + code); }

var keyMap = {
  'AltRight': 'HangulMode', 'Lang1': 'HangulMode', 'HangulMode': 'HangulMode',
  'Hanja': 'AltRight', 'Lang2': 'AltRight',
  'ControlRight': 'ControlRight', 'MetaRight': 'MetaLeft'
};
function getExactKeyCode(event){
  var code = event.code;
  if (!code || code === 'Shift' || code === 'Control' || code === 'Alt'){
    if (event.key === 'Shift') code = (event.location === 2) ? 'ShiftRight' : 'ShiftLeft';
    else if (event.key === 'Control') code = (event.location === 2) ? 'ControlRight' : 'ControlLeft';
    else if (event.key === 'Alt') code = (event.location === 2) ? 'AltRight' : 'AltLeft';
  }
  return keyMap[code] || code;
}

function updateLEDs(event){
  if (event.getModifierState){
    var isNumOn = event.getModifierState('NumLock');
    var isCapsOn = event.getModifierState('CapsLock');
    var isScrollOn = event.getModifierState('ScrollLock');
    document.getElementById('led-num-dot').classList.toggle('active', isNumOn);
    document.getElementById('led-num-text').classList.toggle('active', isNumOn);
    document.getElementById('led-caps-dot').classList.toggle('active', isCapsOn);
    document.getElementById('led-caps-text').classList.toggle('active', isCapsOn);
    document.getElementById('led-scroll-dot').classList.toggle('active', isScrollOn);
    document.getElementById('led-scroll-text').classList.toggle('active', isScrollOn);
  }
}
