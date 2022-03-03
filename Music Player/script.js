// SELECTORS
const musicContainer = document.querySelector(".music-container");
const musicInfo = document.querySelector(".music-info");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const imgContainer = document.querySelector(".img-container");
const navigation = document.querySelector(".navigation");
const songTitle = document.getElementById("title");
const songImg = document.getElementById("cover");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const audioTag = document.getElementById("audio");
const volumeSlider = document.getElementById("volume-slider");
const outputContainer = document.getElementById("volume-output");

const songList = ["hey", "summer", "ukulele"];

let songIndex = songList.length - 1;

audioLoad(songList[songIndex]);

function audioLoad(song) {
  audioTag.src = `./music/${song}.mp3`;
  songTitle.textContent = song;
  songImg.src = `./images/${song}.jpg`;
}

function playAction() {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
}

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songList.length - 1;
  }
  audioLoad(songList[songIndex]);
  playSong();
});

function nextSong() {
  songIndex++;
  if (songIndex > songList.length - 1) {
    songIndex = 0;
  }
  audioLoad(songList[songIndex]);
  playSong();
}

function audioProgress(e) {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function moveProgress(e) {
  const progressWidth = this.clientWidth;
  const clickWidth = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickWidth / progressWidth) * duration;
}

volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value;
  outputContainer.textContent = value;
  audio.volume = value / 100;
});

playBtn.addEventListener("click", playAction);

nextBtn.addEventListener("click", nextSong);

audio.addEventListener("ended", nextSong);

audio.addEventListener("timeupdate", audioProgress);

progressContainer.addEventListener("click", moveProgress);
