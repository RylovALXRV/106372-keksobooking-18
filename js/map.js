'use strict';

(function () {

  var onPopupEscKeydown = function (evt) {
    if (evt.keyCode === window.util.KEYCODE_ESC) {
      closePopup();
    }
  };

  var closePopup = function () {
    window.card.hide();
    window.pins.reset();

    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  window.map = {
    onPopupEsc: onPopupEscKeydown,
    closePopup: closePopup
  };
})();
