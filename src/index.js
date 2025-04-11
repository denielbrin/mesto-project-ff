import { getUserData, getUserCards, sendUserData, sendNewCard, newAvatarFunction } from './components/api.js';

import { createElement, deleteFunc, likeFunction } from './components/card.js';
import { openPopup, closePopup, closePopupButton, cleanerPopupFields } from './components/modal.js';

import { enableValidation, clearValidation, validationConfiguration } from './components/validation.js'; 

// import { initialCards } from './components/cards.js';
import '../pages/index.css';

const placeList = document.querySelector('.places__list') 

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit') 
const popupAdd = document.querySelector('.popup_type_new-card') 
const popupImage = document.querySelector('.popup_type_image') 

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const newLocationNameInput = document.querySelector('.popup__input_type_card-name')
const newLocationUrlInput = document.querySelector('.popup__input_type_url')

const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

const popupAvatar = document.querySelector('.popup_type_new-avatar')
const newAvatarInput = popupAvatar.querySelector('.popup__input_type_url')

let userIdentNumber;

Promise.all([getUserData(), getUserCards()])
  .then(([user, card]) => {
    insertUserDataFromServer(user.name, user.about, user.avatar)
    userIdentNumber = user._id
    insertCardDataFromServer(card, userIdentNumber)

  })
  .catch(error => {
    console.error('Ошибка:', error);
  });

  function insertUserDataFromServer (userNameFromServer, userDescriptionFromServer, userAvatarFromServer) {
    profileName.textContent = userNameFromServer
    profileDescription.textContent = userDescriptionFromServer
    profileImage.style.backgroundImage = `url(${userAvatarFromServer})`
  }

  function insertCardDataFromServer (cardsArray, userIdentNumber) {
    cardsArray.forEach(function (item) {
      const createrCards = createElement(item, deleteFunc, likeFunction, handleImageClick, userIdentNumber)
      placeList.append(createrCards)
    });
  }

document.addEventListener('click', closePopupButton)

editButton.addEventListener('click', () => {
  clearValidation(popupEdit, validationConfiguration) 
  fillTextContentToValue(nameInput, profileName, jobInput, profileDescription)
  openPopup(popupEdit)
})

addButton.addEventListener('click', () => {
  cleanerPopupFields(popupAdd) 
  clearValidation(popupAdd, validationConfiguration) 
  openPopup(popupAdd)
})

function fillTextContentToValue (firstTextContent, firstValue, secontTextContent, secondValue) {
  firstTextContent.value = firstValue.textContent
  secontTextContent.value = secondValue.textContent
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  const nameInputResult = nameInput.value
  const jobInputResult = jobInput.value

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";

  sendUserData (nameInputResult, jobInputResult)
    .then((newUserData) => {
      submitButton.textContent = "Сохранить";
      newUserDataFromServer(newUserData)
      closePopup(popupEdit)
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}

function newUserDataFromServer(dataObject) {
  profileName.textContent = dataObject.name
  profileDescription.textContent = dataObject.about
}

popupEdit.addEventListener('submit', handleFormSubmitEdit);

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  const newLocationName = newLocationNameInput.value
  const newLocationLink = newLocationUrlInput.value

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";

  sendNewCard (newLocationName, newLocationLink)
  .then((newCardData) => {
    submitButton.textContent = "Сохранить";
    const newCardElement = createElement(newCardData, deleteFunc, likeFunction, handleImageClick, userIdentNumber);
    placeList.prepend(newCardElement);
    cleanerPopupCard ()
    closePopup(popupAdd)
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}

function cleanerPopupCard () {
  newLocationUrlInput.value = '';
  newLocationNameInput.value = '';

  const newPlaceForm = popupAdd.querySelector('.popup__form');
  newPlaceForm.reset();
}

popupAdd.addEventListener('submit', handleFormSubmitAdd);

function handleImageClick(event) {
  const imageSrc = event.target.src;
  const imageAlt = event.target.alt;

  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');

  popupImageElement.src = imageSrc;
  popupImageElement.alt = imageAlt;
  popupCaptionElement.textContent = imageAlt;

  openPopup(popupImage);
}

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

profileImage.addEventListener('click', function () {
  clearValidation(popupAvatar, validationConfiguration) 
  cleanerPopupFields(popupAvatar) 
  openPopup(popupAvatar)
})

popupAvatar.addEventListener('submit', (evt) => {

  const submitButton = evt.submitter;
  submitButton.textContent = "Сохранение...";

  evt.preventDefault();
  newAvatarFunction(newAvatarInput.value)
  .then((res) => {
    submitButton.textContent = "Сохранить";
    profileImage.style.backgroundImage = `url(${res.avatar})`
    closePopup(popupAvatar)
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
});

enableValidation(validationConfiguration)