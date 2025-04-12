const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
  headers: {
    authorization: '05c0f268-e183-4a41-a400-feb77ce4beca',
    'Content-Type': 'application/json'
  }
};



function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
} 

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
} 

export const getUserCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
} 

export const sendUserData = (newName, newDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${newName}`,
      about: `${newDescription}`
    })
  })
  .then(res => {
    return getResponseData(res)
  })
}

export const sendNewCard = (locationName, locationLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${locationName}`,
      link: `${locationLink}`
    })
 })
 .then(res => {
  return getResponseData(res)
})
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return Promise.resolve(); 
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const addLikeToPost = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
}

export const deleteLikeToPost = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
}

export function newAvatarFunction(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${link}`
    })
  })
  .then(res => {
    return getResponseData(res)
  })
}