console.log("All Right !");

const audioElement = new Audio("src/musics/1.mp3");
const playButton = document.querySelector("#playButton") as HTMLDivElement;
const playButtonIconURL = "src/images/svg-icons/pause-solid-full.svg";
const pauseButtonIconURL = "src/images/svg-icons/play-solid-full.svg";
const musicContainer = document.querySelector(".musicContainer");
const musicCoverImage = document.querySelector(
  ".musicCoverImage",
) as HTMLDivElement;

type Music = {
  musicCoverImage: string;
  musicName: string;
  musicPath: string;
  musicDuration?: number;
};

const musics: Music[] = [
  {
    musicCoverImage: "src/images/covers/1.jpg",
    musicPath: "/src/musics/1.mp3",
    musicName: "Ek Din App Yu Aisa Mil Jayanga",
  },
  {
    musicCoverImage: "src/images/covers/2.jpg",
    musicPath: "/src/musics/2.mp3",
    musicName: "Ek Mulakat Jaruri hai Sanam",
  },
  {
    musicCoverImage: "src/images/covers/3.jpg",
    musicPath: "/src/musics/3.mp3",
    musicName: "Chaale To Kaat Hi Jaayega Safar ",
  },
  {
    musicCoverImage: "src/images/covers/4.jpg",
    musicPath: "/src/musics/4.mp3",
    musicName: "Shikwa Nahi ",
  },
  {
    musicCoverImage: "src/images/covers/5.jpg",
    musicPath: "/src/musics/5.mp3",
    musicName: "Mera Dil Ye Pukare Aaja Cover Song ",
  },
];

playButton?.addEventListener("click", function () {
  if (audioElement.paused) {
    playButton.style.backgroundImage = `url(${playButtonIconURL})`;
    audioElement?.play();
  } else {
    playButton.style.backgroundImage = `url(${pauseButtonIconURL})`;
    audioElement?.pause();
  }
});

(() => {
  if (musicContainer) {
    musics.forEach((ele, i) => {
      let musicDuration = new Audio(ele.musicPath);

      musicDuration.addEventListener("loadedmetadata", () => {
        let duration = musicDuration.duration;
        let formattedDuration;
        if (isFinite(duration)) {
          const minutes: number | string = String(
            Math.floor(duration / 60),
          ).padStart(2, "0");
          const seconds = Math.floor(duration % 60);
          formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        } else {
          console.log("Duration is unknown (streaming or no source)");
        }

        musicContainer.innerHTML += `
        <div class="musics">
        <div class="musicCoverImage" id="abc${i}abc"></div>
        <p class="musicName">${ele.musicName}</p>
        <p class="musicDuration">${formattedDuration}</p>
        </div>`;
        const element = document.querySelector(`#abc${i}abc`);
        if (element) {
          (element as HTMLDivElement).style.backgroundImage =
            `url(${ele.musicCoverImage})`;
        }

        if (i >= 4) {
          addingEventListner();
        }
      });
    });
  }
})();

function addingEventListner() {
  setTimeout(() => {
    const musicTitles = document.querySelectorAll(".musicName");
    musicTitles.forEach((ele) => {
      ele.addEventListener("click", function (events) {
        let songTitle = (events.target as Element).innerHTML;
        console.log(songTitle);

        musics.forEach((ms) => {
          if (ms.musicName == songTitle) {
            audioElement.src = ms.musicPath;
            audioElement.play();
          }
        });
      });
    });
  }, 0);
}
