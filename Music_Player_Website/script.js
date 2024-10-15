console.log("Welcome to Spotify");


// Variable Initialization
let songIdx = 0;
let masterPlay = document.getElementById('masterPlay');
let audioElement = new Audio('song/perfect.mp3');
let songBar = document.getElementById('songTimeLapse');
let gif = document.getElementById('gifDJ');
let songItem = Array.from(document.getElementsByClassName('songContainer'));

let songsList = [
    { songName: "perfect", filePath: "song/perfect.mp3", coverPath: "covers/Ed_Sheeran_Perfect_Single_cover.jpg" },
    { songName: "cars outside", filePath: "song/James_Arthur_-_Cars_Outside_CeeNaija.com_.mp3", coverPath: "covers/co.jpeg" },
    { songName: "somewhere only we know", filePath: "song/Keane_-_Somewhere_Only_We_Know_CeeNaija.com_.mp3", coverPath: "covers/somewhere_only_we_know.jpg" },
    { songName: "love me like you do", filePath: "song/Love-Me-Like-You-Do-Song---Ellie-Goulding(trendymusic.in).mp3", coverPath: "covers/lmlyd.jpeg" },
    { songName: "those eyes", filePath: "song/New_West_-_Those_Eyes_CeeNaija.com_.mp3", coverPath: "covers/te.jpg" },
]

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songsList[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songsList[i].songName;
});

// Event listener
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
});

let progress = 0;
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    songBar.value = progress;
});

songBar.addEventListener('change', () => {
    audioElement.currentTime = ((songBar.value * audioElement.duration) / 100);
});

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (event) => {
        makeAllPlay();
        songIdx = parseInt(event.target.id)
        event.target.classList.remove('fa-play-circle');
        event.target.classList.add('fa-pause-circle');
        audioElement.src = songsList[songIdx].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('prev').addEventListener('click', () => {
    if (songIdx - 1 < 0) songIdx = 4;
    else songIdx = songIdx - 1;
    audioElement.src = songsList[songIdx].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('next').addEventListener('click', () => {
    if (songIdx + 1 > 4) songIdx = 0;
    else songIdx = songIdx + 1;
    audioElement.src = songsList[songIdx].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})