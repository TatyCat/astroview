let getSpaceImg = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
  .then(resp =>{
    return resp.json()
  })
  .then(photoUrl => {
    let topHeader = document.querySelector('.spacePhoto')
    topHeader.style.backgroundImage = `url(${photoUrl.hdUrl})`
  })
}

const main = () => {
  getSpaceImg()
}

document.addEventListener('DOMContentLoaded', main)

