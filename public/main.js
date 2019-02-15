const getSpaceImg = () => {
  const photoCopyrightSelector = document.querySelector('#copyright')

  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
  .then(resp =>{
    return resp.json()
  })
  .then(photoUrl => {
    const topHeader = document.querySelector('.spacePhoto')
    topHeader.style.backgroundImage = `url(${photoUrl.hdUrl})`
    
    document.querySelector('#photo-title').textContent = photoUrl.title
    if(photoUrl.copyright !== null){
      photoCopyrightSelector.textContent = photoUrl.copyright
    }else{
      photoCopyrightSelector.textContent = "No Copyright"
    }
  })
}

const mainContent = () => {
  getSpaceImg()
}

document.addEventListener('DOMContentLoaded', mainContent)

