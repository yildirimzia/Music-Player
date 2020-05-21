const musicContainer = document.getElementById('music-container');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const title = document.getElementById('title');


const songs = ['hey', 'summer', 'ukulele'];


let songIndex = 2;

loadSong(songs[songIndex]);


function loadSong(song) {
	title.innerText = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
};

function playSong() {
	musicContainer.classList.add('play');
	play.querySelector('i.fas').classList.remove('fa-play');
	play.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove('play');
	play.querySelector('i.fas').classList.add('fa-play');
	play.querySelector('i.fas').classList.remove('fa-pause')

	audio.pause()
}

function prevSong() {

	songIndex--;
	songIndex  < 0 ?  songIndex = songs.length - 1  : '';
	loadSong(songs[songIndex]);
	audio.play()

}

function nextSong() {
	songIndex++;
	songIndex > songs.length - 1 ? songIndex = 0 : '';
	loadSong(songs[songIndex]);
	audio.play();
}

function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`
};

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
  
	audio.currentTime = (clickX / width) * duration;
  }
  
play.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if(isPlaying) {
		pauseSong();
	}else {
		playSong()
	}
})


prev.addEventListener('click',prevSong);
next.addEventListener('click',nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click',setProgress);