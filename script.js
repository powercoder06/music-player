const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill Machine',
        artist:'Power Musician',
    },
    {
        name:'jacinto-2',
        displayName:'Seven Nation Army (Remix)',
        artist:'Power Musician',
    },
    {
        name:'jacinto-3',
        displayName:'Goodnight, Disco Queen',
        artist:'Power Musician',
    },
    {
        name:'metric-1',
        displayName:'Front Row (Remix)',
        artist:'Power Musician',
    }

]

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM

function loadSong(songs) {
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    music.src= `music/${songs.name}.mp3`;
    image.src= `img/${songs.name}.jpg`;
}

//Current song
let songIndex = 0;

// Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load- Select first song
loadSong(songs[songIndex]);

//Update Progress Bar & Time
function updateProgressBar(e) {
    if(isPlaying){
        const {duration, currentTime } =e.srcElement;
        //Update progress Bar width
        const progressPercent = (currentTime/ duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calculate display for duration
        const durationMinutes = Math.floor(duration/60);
      
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`; 
        }
       
        //Delay switching duration Element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime/60);
       
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`; 
        }
        //Delay switching currentTime
        if(currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

//Set progress Bar
function setProgressBar(e) {
   const width = this.clientWidth;
   const clickX = e.offsetX;
   const {duration} =music;
   music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);