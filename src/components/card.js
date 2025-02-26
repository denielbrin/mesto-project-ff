const cardTemplate = document.querySelector('#card-template') 

export function createElement(dataForCards, deleteFunction, likeFunction, imageClickFunction) {
  const newElement = cardTemplate.content.cloneNode(true)

  const newElementTitle = newElement.querySelector('.card__title')
  const newElementImg = newElement.querySelector('.card__image')
  newElementTitle.textContent = dataForCards.name
  newElementImg.src = dataForCards.link
  newElementImg.alt = dataForCards.name

  const deleteButton = newElement.querySelector('.card__delete-button')
  deleteButton.addEventListener('click', deleteFunction)

  const likeButton = newElement.querySelector('.card__like-button')
  likeButton.addEventListener('click', likeFunction)

  newElementImg.addEventListener('click', imageClickFunction)

  return newElement
}

export function deleteFunc (event) {
  event.target.closest('.card').remove()
}

export function likeFunction (event) {
  event.target.classList.toggle('card__like-button_is-active')
}