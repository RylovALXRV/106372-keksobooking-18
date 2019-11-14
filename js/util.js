'use strict';

window.util = (function () {
  return {
    KEYCODE_ENTER: 13,
    KEYCODE_ESC: 27,

    isKeyCode: function (evt, code) {
      return evt.keyCode === code;
    },
    toggleDisabledStateOfElements: function (elements, isDisabled) {
      elements.forEach(function (element) {
        element.disabled = isDisabled;
      });
    }
  };
})();
