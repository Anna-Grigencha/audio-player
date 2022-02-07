const audio = document.querySelector("audio");
const playPause = document.querySelector(".play-pause");
let playNum = 0;
let isPlay = false;

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
