import { createElement, deleteFunc, likeFunction } from './components/card.js';
import { openPopup, closePopup, closePopupButton } from './components/modal.js';

import { initialCards } from './components/cards.js';
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

initialCards.forEach(function (item) {
  const createrCards = createElement(item, deleteFunc, likeFunction, handleImageClick)
  placeList.append(createrCards)
});

document.addEventListener('click', closePopupButton)

editButton.addEventListener('click', () => {
  openPopup(popupEdit)
  fillTextContentToValue(nameInput, profileName, jobInput, profileDescription)
})

addButton.addEventListener('click', () => {
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

  profileName.textContent = nameInputResult
  profileDescription.textContent = jobInputResult

  closePopup(popupEdit)
}

popupEdit.addEventListener('submit', handleFormSubmitEdit);

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  const newObject = {
    link: newLocationUrlInput.value, 
    name: newLocationNameInput.value
  }
  
  const newCardElement = createElement(newObject, deleteFunc, likeFunction, handleImageClick);
  placeList.prepend(newCardElement);

  newLocationUrlInput.value = '';
  newLocationNameInput.value = '';

  const newPlaceForm = popupAdd.querySelector('.popup__form');
  newPlaceForm.reset();

  closePopup(popupAdd)
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