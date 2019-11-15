'use strict';

window.util = (function () {
  return {
    KeyCode: {
      ENTER: 13,
      ESC: 27
    },

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
