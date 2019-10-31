'use strict';

window.util = (function () {
  return {
    KEYCODE_ENTER: 13,
    KEYCODE_ESC: 27,

    toggleDisabledStateOfElements: function (elements, isDisabled) {
      elements.forEach(function (element) {
        element.disabled = isDisabled;
      });
    }
  };
})();
