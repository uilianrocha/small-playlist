const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

const iWillFind = {
    songTitle : "I Will Find",
    artist : "Vintage Culture",
    file: "iwillfind",
};

const clintEastwood = {
    songTitle : "Clint Eastwood",
    artist : "Gorillaz",
    file: "clint_eastwood"
};

const richAndSad = {
    songTitle : "Rich and Sad",
    artist : "Post Malone",
    file: "rich-and-sad"
};

const theKids = {
    songTitle : "The Kids Aren't Alright",
    artist : "Fall Out Boy",
    file: "theKidsArentAlright"
};

const timeOfTheSeason = {
    songTitle : "Time of the Season",
    artist : "The Zombies",
    file: "timeOfTheSeason"
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const playlist = [iWillFind, clintEastwood, richAndSad, theKids, timeOfTheSeason];
let shuffledPlaylist = [...playlist]
let index = 0;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle');
    play.querySelector('.bi').classList.add('bi-pause-circle');
    song.play();
    isPlaying = true;

}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle');
    play.querySelector('.bi').classList.remove('bi-pause-circle');
    song.pause();
    isPlaying = false;

}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    } 
    else {
        playSong();
    }
}

function loadSong(){
    cover.src = `img/${shuffledPlaylist[index].file}.jpg`;
    song.src = `songs/${shuffledPlaylist[index].file}.mp3`;
    songTitle.innerText = shuffledPlaylist[index].songTitle;
    artist.innerText = shuffledPlaylist[index].artist;
}

function previousSong(){
    if (index === 0){
        index = shuffledPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    loadSong();
    playSong();
}

function nextSong(){
    if (index === shuffledPlaylist.length - 1){
        index = 0;
    }
    else {
        index += 1;
    }
    loadSong();
    playSong();
}

function updateProgress(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = timeToHourMinSec(song.currentTime);

}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleTo(){
    if (isShuffled === false){
        isShuffled = true;
        shuffleArray(shuffledPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        shuffledPlaylist = [...playlist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatSong(){
    if (repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

    function nextOrRepeat(){
        if(repeatOn === false){
            nextSong();
    }
    else {
        playSong();

    }
}

// Create a function to display the time in HH/MM/SS 

function timeToHourMinSec(originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min
        .toString().padStart(2,'0')}:${secs.toString().padStart(2, '0')}`;

}

function updateTotalTime(){
    totalTime.innerText = timeToHourMinSec(song.duration);
}

loadSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleTo);
repeatButton.addEventListener('click', repeatSong);
