'use strict';

(function () {

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  window.util = {
    isEnterEvent: function (evt) {
      return evt.keyCode === KeyCode.ENTER;
    },
    isEscEvent: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    },
    toggleDisabledStateOfElements: function (elements, isDisabled) {
      elements.forEach(function (element) {
        element.disabled = isDisabled;
      });
    }
  };
})();
