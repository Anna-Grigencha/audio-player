const audio = document.querySelector("audio");
const picture = document.querySelector(".picture");
const playPause = document.querySelector(".play-pause");
const next = document.querySelector(".forward");
const previous = document.querySelector(".backward");
const artist = document.querySelector(".song-artist");
const song = document.querySelector(".song-title");

let playNum = 0;
let isPlay = false;
let playlist = [
  "billie-eilish-no-time-to-die(mp3bit.cc).mp3",
  "beyonce.mp3",
  "dontstartnow.mp3",
];

let pictures = ["Billy Eilish.jpg", "lemonade.png", "dontstartnow.png"];
let artists = ["Billy Eilish", "Beyonce", "Dua Lipa"];
let songs = ["No Time To Die", "Don't Hurt Yourself", "Don't Start Now"];
let treck; //переменная с индексом трека

//событие перед загрузкой страницы
window.onload = function () {
  treck = 0;
};

playPause.addEventListener("click", playPauseAudio);

function playPauseAudio() {
  if (isPlay === false) {
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    playPause.classList.add("pause");
  } else if (isPlay === true) {
    audio.pause();
    isPlay = false;
    playPause.classList.remove("pause");
  }
}

/*процент звука и обновите время*/

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  document.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

audio.addEventListener(
  "loadeddata",
  () => {
    document.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = 0.75;
  },
  false
);

//нажать на временную шкалу
//click on timeline to skip around
const timeline = document.querySelector(".timeline");
timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

//Переключение песен
function switchTreck(numTreck) {
  //Меняем значение атрибута src
  audio.src = "./assets/music/" + playlist[numTreck];
  picture.src = "./assets/img/" + pictures[numTreck];
  artist.textContent = artists[numTreck];
  song.textContent = songs[numTreck];
  //назначаем время песни ноль
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  playPause.classList.add("pause");
}

previous.addEventListener("click", function () {
  if (treck > 0) {
    treck--;
    switchTreck(treck); //меняем песню
  } else {
    treck = 2;
    switchTreck(treck);
  }
});

next.addEventListener("click", function () {
  if (treck < 2) {
    treck++;
    switchTreck(treck);
  } else {
    treck = 0;
    switchTreck(treck); //меняем песню
  }
});
