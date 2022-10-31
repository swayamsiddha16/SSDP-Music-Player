console.log("Welcome to SSDP");

//Initialize the variable
let songIndex = 0;
var audioElement = new Audio("/songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let addSongs = document.getElementById("add-songs");
let currIndex = -1;
let songItemContainer = document.getElementById("songHolder");

let songs = [];
let songName = [];
// var audioElement = new Audio("songs")


function addSongHandler() {
  console.log(addSongs);

  var media = URL.createObjectURL(addSongs.files[0]);
  songName.push(addSongs.files[0].name);
  songs.push(media);


  songItemContainer.innerHTML = ""


  for (let i = 0; i < songName.length; i++) {
    songItemContainer.innerHTML = songItemContainer.innerHTML + 
      ` <div class="songItem">
    <img src="" alt="${i+1}">
    <span class="songName">${songName[i]}</span>
    <span class="songlistplay"></span>
    </div>`;
  }
  console.log(songs);
}

// ` <div class="songItem">
//     <img src="" alt="${i+1}">
//     <span class="songName">${songName[i]}</span>
//     <span class="songlistplay"><span class="timestamp">03:46<i id="1" class="far songItemPlay fa-play-circle"></i></span></span>
//     </div>`;
//audioElement.play();


//HAndle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

//listen to events , audioelement.addeventlistner bcz time must be set by the duration of the audio ,which is accesed by audioElement
audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  //update seekbar
  progress = parseInt(( audioElement.currentTime / audioElement.duration) * 100);
  //progress is calc in %ge which is done by this formula
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
  //now the previous formula is alteredjust to calculate the value
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};



Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
  element.addEventListener('click', (e)=>{ 
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.src = `songs/${songIndex+1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
  })
})

document.getElementById("next").addEventListener("click", () => {
  console.log("currIndex:",currIndex);
  currIndex++;
  audioElement.src = songs[currIndex];
  currIndex= currIndex%songs.length;
  audioElement.src = songs[currIndex];
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
    currIndex-=1;
    if(currIndex < 0) currIndex = songs.length-1;
    audioElement.src = songs[currIndex];
    
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
