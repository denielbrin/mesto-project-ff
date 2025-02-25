import { createElement, deleteFunc, likeFunction } from './components/card.js';
import { popupOpener, popupCloser } from './components/modal.js';


import { initialCards } from './components/cards.js';
import '../pages/index.css';


const placeList = document.querySelector('.places__list') 

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


popupEdit.addEventListener('submit', handleFormSubmitEdit);
popupAdd.addEventListener('submit', handleFormSubmitAdd);


initialCards.forEach(function (item) {
  const createrCards = createElement(item, deleteFunc, likeFunction)
  placeList.append(createrCards)
});

document.addEventListener('click', (event) => {
  if(event.target === editButton) {
    popupOpener(popupEdit, 'popup_is-opened')
    textContentToValue(nameInput, profileName, jobInput, profileDescription)
   
  } else if (event.target === addButton) {
    popupOpener(popupAdd, 'popup_is-opened')
  
  } else if (event.target.classList.contains('card__image')) {   
    popupOpener(popupImage, 'popup_is-opened')
    imagePushFunc(event.target)
    
  } else if(event.target.classList.contains('popup__close') || event.target.classList.contains('popup_is-opened')) {
    const openedPopup = document.querySelector('.popup_is-opened')
    if(openedPopup) {
    popupCloser (openedPopup, 'popup_is-opened')
    }
  }
})

document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened')
    if(openedPopup) {
    popupCloser (openedPopup, 'popup_is-opened')
    }
  }
})

function textContentToValue (firstTextContent, firstValue, secontTextContent, secondValue) {
  firstTextContent.value = firstValue.textContent
  secontTextContent.value = secondValue.textContent
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const nameInputResult = nameInput.value
  const jobInputResult = jobInput.value

  const resultPoleOne = document.querySelector('.profile__title')
  const resultPoleTwo = document.querySelector('.profile__description')

  resultPoleOne.textContent = nameInputResult
  resultPoleTwo.textContent = jobInputResult

  popupCloser(popupEdit, 'popup_is-opened')
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  const newObject = {}

  newObject.link = newLocationUrlInput.value
  newObject.name = newLocationNameInput.value
 

  initialCards.push(newObject);

  
  const newCardElement = createElement(newObject, deleteFunc, likeFunction);
  placeList.prepend(newCardElement);

  newLocationUrlInput.value = '';
  newLocationNameInput.value = '';

  popupCloser(popupAdd, 'popup_is-opened')
}

function imagePushFunc(event) {
  const popupImageElement = popupImage.querySelector('.popup__image')
  const popupCaptionDataElement = popupImage.querySelector('.popup__caption')
  popupImageElement.src = event.src
  popupCaptionDataElement.textContent = event.alt
}

document.addEventListener('DOMContentLoaded', () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});