const userNickname = document.querySelector('.user__nickname-text');
const userDescription = document.querySelector('.user__description');
const placesEl = document.querySelector('.places__list');
const placeItemTemplate = document.querySelector('#place-item').content;
const userInfoEditButton = document.querySelector('.user__info-edit-button');
const placeAddButton = document.querySelector('.profile__place-add-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const userInfoEditPopup = document.querySelector('#user-info-edit-popup');
const userInfoEditForm = userInfoEditPopup.querySelector('#user-info-edit-form');
const userNicknameField = userInfoEditForm.querySelector('#user-nickname-field');
const userDescriptionField = userInfoEditForm.querySelector('#user-description-field');
const placeAddPopup = document.querySelector('#place-add-popup');
const placeAddForm = placeAddPopup.querySelector('#place-add-form');
const placeNameField = placeAddForm.querySelector('#place-name-field');
const placeImageField = placeAddForm.querySelector('#place-image-field');
const placePhotoPopup = document.querySelector('#place-photo-popup');
const placePopupImage = placePhotoPopup.querySelector('.popup__image');
const placePopupImageCaption = placePhotoPopup.querySelector('.popup__caption');

const places = [
  {
    name: 'Карачаевск',
    link: './assets/images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './assets/images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './assets/images/dombay.jpg'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './assets/images/karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './assets/images/elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './assets/images/dombay.jpg'
  }
]

function setTextValue(item, value) {
  item.textContent = `${value}`;
}

function createPlaceCard(place) {
  const placeItemEl = placeItemTemplate.cloneNode(true);
  const placeLikeButton = placeItemEl.querySelector('.place__like-button');
  const placeRemoveButton = placeItemEl.querySelector('.place__remove-button');
  const placeImage = placeItemEl.querySelector('.place__image');
  const placeName = placeItemEl.querySelector('.place__name');

  placeName.textContent = place.name;
  placeImage.src = place.link;
  placeImage.alt = place.name;

  placeLikeButton.addEventListener('click', setLikeStatus);
  placeRemoveButton.addEventListener('click', removePlaceItem);
  placeImage.addEventListener('click', openPlacePopup);

  return placeItemEl;
}

function renderPlaceCard(place) {
  placesEl.prepend(createPlaceCard(place));
}

function fillPlaces() {
  for (const place of places) {
    renderPlaceCard(place);
  }
}

function setUserInfoEditFormFieldValue() {
  userNicknameField.value = userNickname.textContent;
  userDescriptionField.value = userDescription.textContent;
}

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
}

function closePopup(e) {
  const popup = e.target.closest('.popup');

  popup.classList.remove('popup_opened');
}

function openProfilePopup(e) {
  openPopup(e)
  setUserInfoEditFormFieldValue();
}

function removePlaceItem(e) {
  e.target.closest('.places__item').remove();
}

function setLikeStatus(e) {
  e.target.classList.toggle('place__like-button_active');
}

function openPlacePopup(e) {
  setPlacePopupData(e);
  openPopup(placePhotoPopup);
}

function setPlacePopupData(e) {
  placePopupImage.src = e.target.src;
  placePopupImage.alt = e.target.alt;
  placePopupImageCaption.textContent = e.target.alt;
}

userInfoEditForm.addEventListener('submit', function (e) {
  e.preventDefault();

  setTextValue(userNickname, userNicknameField.value);
  setTextValue(userDescription, userDescriptionField.value);

  closePopup(e);
});

userInfoEditButton.addEventListener('click', function () {
  openProfilePopup(userInfoEditPopup);
});

placeAddForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const place = {
    name: placeNameField.value,
    link: placeImageField.value
  }

  renderPlaceCard(place);
  closePopup(e);
});

placeAddButton.addEventListener('click', function () {
  placeAddForm.reset();
  openPopup(placeAddPopup);
});

closePopupButtons.forEach(closePopupButton => {
  closePopupButton.addEventListener('click', function (e) {
    closePopup(e);
  });
});

setTextValue(userNickname, 'Жак-Ив Кусто');
setTextValue(userDescription, 'Исследователь океана');
fillPlaces();
