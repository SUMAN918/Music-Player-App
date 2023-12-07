const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const progress = document.getElementById("progress");
const totalDuration = document.getElementById("duration");
const totalCurrentTime = document.getElementById("current-time");
const progressDiv = document.getElementById("progress_div");
let isPlay = false;
songIndex = 0;

const songs = [
  {
    name: "music-1",
    title: "That's My Name",
    artist: "Akcent",
  },
  {
    name: "music-2",
    title: "On My Way",
    artist: "Alan Walker",
  },
  {
    name: "music-3",
    title: "My Passion",
    artist: "Akcent",
  },
  {
    name: "music-4",
    title: "Numb",
    artist: "Linkin Park",
  },
];

// for play function
const playMusic = () => {
  isPlay = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

// for pause function
const pauseMusic = () => {
  isPlay = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  if (isPlay) {
    pauseMusic();
  } else {
    playMusic();
  }

  // or
  // isPlay ? pauseMusic() : playMusic();
});

// for changing the music data
let loadSong = (songs) =>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "./music/"+songs.name+".mp3";
    img.src = "./images/"+songs.name+".jpg";
};

// loadSong(songs[1]);

const nextSong = () =>{
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () =>{
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// progress js work

music.addEventListener("timeupdate", (event) =>{
    // console.log(event);
    const {currentTime, duration} = event.srcElement;
    // console.log(currentTime);
    // console.log(duration);

    let progressTime = (currentTime/duration)*100;
    progress.style.width = `${progressTime}%`;

    // music duration update
    let minDuration = Math.floor(duration/60);
    let secDuration = Math.floor(duration%60);
    let durationTime = `${minDuration}:${secDuration}`;
    // console.log(durationTime);
    if(duration){
        totalDuration.textContent = `${durationTime}`;
    }

    // current duration update
    let minCurrentTime = Math.floor(currentTime/60);
    let secCurrentTime = Math.floor(currentTime%60);

    if(secCurrentTime < 10){
        secCurrentTime = `0${secCurrentTime}`;
    }
    let total_CurrentTime = `${minCurrentTime}:${secCurrentTime}`;
    totalCurrentTime.textContent = `${total_CurrentTime}`;
    // console.log(currentTime);
});

progressDiv.addEventListener("click", (event) =>{
    const {duration} = music;
    let moveProgress = (event.offsetX/event.srcElement.clientWidth)*duration;
    // console.log(duration);
    // console.log(moveProgress);

    music.currentTime = moveProgress;
});

// if music end , call next song
music.addEventListener("ended", nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);



