export const validationConfiguration = {
  formSelector: '.popup__form', 
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_disabled', 
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' 
}; 

export function clearValidation(formElement, validationConfiguration) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfiguration.inputSelector));
  const buttonElement = formElement.querySelector(validationConfiguration.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfiguration);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfiguration.inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement, validationConfiguration) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfiguration.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfiguration.inactiveButtonClass);
  }
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

function showInputError(formElement, inputElement, validationMessage, validationConfiguration) {
  inputElement.classList.add(validationConfiguration.inputErrorClass)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

  
  if(inputElement.validity.patternMismatch) {
    errorElement.textContent = inputElement.dataset.errorMessage
  } else {
    errorElement.textContent = validationMessage
  }
  
  errorElement.classList.add(validationConfiguration.errorClass)
}

function hideInputError(formElement, inputElement, validationConfiguration) {
  inputElement.classList.remove(validationConfiguration.inputErrorClass)
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  errorElement.classList.remove(validationConfiguration.errorClass)
  errorElement.textContent = ''
}

function isValid(formElement, inputElement, validationConfiguration) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfiguration)
    } else {
    hideInputError(formElement, inputElement, validationConfiguration)
    }  
}

const setEventListener = (formElement, validationConfiguration) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfiguration.inputSelector))
  const buttonElement = formElement.querySelector(validationConfiguration.submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfiguration)
      toggleButtonState (inputList, buttonElement, validationConfiguration)
    })
  });
}

export const enableValidation = (validationConfiguration) => {
  const formList = Array.from(document.querySelectorAll(validationConfiguration.formSelector));
  formList.forEach((formElement) => {
    setEventListener(formElement, validationConfiguration)
  });
}
