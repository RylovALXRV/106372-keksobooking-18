'use strict';

(function () {
  var FILLES_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  var photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
  var adFormElement = document.querySelector('.ad-form');
  var avatarFileElement = adFormElement.querySelector('#avatar');
  var imagesFileElement = adFormElement.querySelector('#images');
  var photosElement = adFormElement.querySelector('.ad-form__photo');
  var previewElement = adFormElement.querySelector('.ad-form-header__preview img');

  var appendPicture = function (result) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.src = result;

    photosElement.appendChild(photoElement);
  };

  var hidePictures = function () {
    photosElement.innerHTML = '';
    previewElement.src = 'img/muffin-grey.svg';
  };

  var showPicture = function (inputElement, imgElement) {
    var file = inputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILLES_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (imgElement) {
          imgElement.src = reader.result;
        } else {
          appendPicture(reader.result);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarFileElement.addEventListener('change', function () {
    showPicture(avatarFileElement, previewElement);
  });

  imagesFileElement.addEventListener('change', function () {
    showPicture(imagesFileElement);
  });

  window.upload = {
    hide: hidePictures
  };
})();
