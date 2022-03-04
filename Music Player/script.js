// SELECTORS
const musicContainer = document.querySelector(".music-container");
const musicInfo = musicContainer.querySelector(".music-info");
const progressContainer = musicContainer.querySelector(".progress-container");
const imgContainer = musicContainer.querySelector(".img-container");
const navigation = musicContainer.querySelector(".navigation");
const songTitle = musicContainer.querySelector(".title");
const songImg = musicContainer.querySelector(".cover");
const prevBtn = musicContainer.querySelector(".prev");
const playBtn = musicContainer.querySelector(".play");
const nextBtn = musicContainer.querySelector(".next");
const audioTag = musicContainer.querySelector(".audio");
const volumeSlider = musicContainer.querySelector(".volume-slider");
const outputContainer = musicContainer.querySelector(".volume-output");

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
