const missionsSelector = document.querySelector('#mission-data')
const launchLocationSelector = document.querySelector('#takeoff-site')
const missionDetailSelector = document.querySelector('#flight-desc')
const countdownSelector = document.querySelector('#launch-count-down-section')
let click = 0 
let missionDataObj = {}

// Pulls Space Image and Caption
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
// TODO: negative numbers!

//API call for SpaceX launches
getSpaceXlaunchData = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
  .then(resp =>{
    return resp.json()
  })
  .then(missionData => {
    createLaunchDataObj(missionData)

    console.log(missionData)
    missionsSelector.textContent = missionData[0].mission_name
    launchLocationSelector.textContent = missionData[0].launch_site.site_name_long

    countdownSelector.textContent = missionData[0].launch_date_utc

    if(missionData[0].details !== null){
      missionDetailSelector.textContent = missionData[0].details
    }else{
    missionDetailSelector.textContent = "No description available yet."
    }
  })
}


//Create an object that holds all of the launch data that can be called based on the button click.
const createLaunchDataObj = (missionData) =>{
  for (let i = 0; i < missionData.length; i++) {
    const _i = {
        "mission": missionData[i].mission_name,
        "site" : missionData[i].launch_site.site_name_long,
        "countdownDate" : missionData[i].launch_date_utc,
        "details" : missionData[i].details
      }
      missionDataObj["_" + i] = _i
  }
  postClickfillInLaunchData(click)
  return missionDataObj
}


const postClickfillInLaunchData = (click) =>{

  console.log(click)
  missionsSelector.textContent = missionDataObj[`_${click}`].mission
  launchLocationSelector.textContent = missionDataObj[`_${click}`].site

  if(missionDataObj[`_${click}`].details !== null){
    missionDetailSelector.textContent = missionDataObj[`_${click}`].details
  }else{
    missionDetailSelector.textContent = "No description available yet."
  }
}

//Button Click for Launch Carousel 
const buttonForNextLaunch = (buttonPress) => {
  
  if (buttonPress === "forward"){
    click++
  }else if (buttonPress === "back"){
    if (click>=0){
      click-- 
    }else{

    }
  }
  //call data to fill in the carousel section
  postClickfillInLaunchData(click)
}


//OnLoad Function 
const mainContent = () => {
  getSpaceImg()
  getSpaceXlaunchData()
  // console.log(missionDataObj)
  
}

document.addEventListener('DOMContentLoaded', mainContent)

document.getElementById("left-button").addEventListener("click", () =>{buttonForNextLaunch("back")})
document.getElementById('right-button').addEventListener("click", () => {buttonForNextLaunch("forward")})










//Function to calcualte and present the countdown
/*
const countdownTimer = (launchTime) => {
  // 70 days, 7 hours, 13 mins, 29 seconds 
  let initialTime = Date.now();
  let timer = duration, hours, minutes, seconds;

    setInterval(function () {
      days = parseInt(timer)
      hours = parseInt(timer)
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

        days = days < 10 ? "0" + days : minudaystes;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);

  window.onload = function () {
  //this is where you can modifies the time amount.
      var twentyfiveminutes = 60 * 25,
          display = document.querySelector('#time');
      startTimer(twentyfiveminutes, display);
  };
}
*/

/* 
createCountDown () {
    
    const now = new Date()
    const launchDate = new Date(this.data.launch_date_utc)
    const dif = launchDate.getTime() - now.getTime()
    const secondsFromT1ToT2 = dif / 1000
    let totalSeconds = Math.abs(secondsFromT1ToT2)

    if (secondsFromT1ToT2 < 0) {
      _countdown.appendChild(document.createTextNode(`Launched!`))
    } else {
      // LO: using data structures to store the data
      const time = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }

      // get days
      time.days = Math.floor(totalSeconds / (60 * 60 * 24))
      totalSeconds = totalSeconds - time.days * 24 * 60 * 60

      // get hours
      time.hours = Math.floor(totalSeconds / (60 * 60))
      totalSeconds = totalSeconds - time.hours * 60 * 60

      // get minutes
      time.minutes = Math.floor(totalSeconds / 60)
      totalSeconds = totalSeconds - time.minutes * 60

      // get seconds
      time.seconds = Math.floor(totalSeconds)

      _countdown.appendChild(
        document.createTextNode(
          `${time.days} days, ${time.hours} hours, ${time.minutes} mins, ${
            time.seconds
          } seconds`
        )
      )
    }
    return _countdown
  }


------------------------------------------------------


  startCountDown () {
    // LO: scoping around closures ?
    // LO : setInterval vs setTimeout
    // LO: event loop
    clearInterval(this.state.launches.countdown)
    this.state.launches.countdown = setTimeout(() => {
      this.renderUpcomingLaunches(this.state.launches.currentIndex)
    }, 1000)
  }


*/
