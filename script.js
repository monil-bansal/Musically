const musicContainer = document.querySelector('.music-container');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const cover = document.querySelector('#cover');
const title = document.querySelector('#title');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
// console.log('1');

// Song Titles
const songs = ['hey','ukulele','summer'];

//keep track of songs
let songIndex = 2;
 
//initially load song into DOM
loadSong(songs[songIndex]);

//updateSongDetails
function loadSong(song ){
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpeg`;	
}

function playSong(){
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
}

function pauseSong(){
	// console.log('3');
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	audio.pause();
}

function prevSong(){
	songIndex--;
	songIndex += songs.length;
	songIndex %= songs.length;

	loadSong(songs[songIndex]);
	playSong();
}

function nextSong(){
	songIndex++; 
	songIndex%=songs.length;

	loadSong(songs[songIndex]);
	playSong();
}

function updateProgress(e){
	const {duration, currentTime} = e.srcElement;
	const progressPercentage = (currentTime / duration) * 100;
	console.log(duration , "   " , currentTime , "   " , progressPercentage );
	progress.style.width = `${progressPercentage}%`;
	if(progressPercentage==100){
		nextSong();
	}
}

function setProgress(e){
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX/width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');
	// console.log(2);
	if(isPlaying){
		// console.log(4);
		pauseSong();
	}
	else{
		playSong();
	}
})

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click',setProgress)


