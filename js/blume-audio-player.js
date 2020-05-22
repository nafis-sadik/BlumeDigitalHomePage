
let musicDirectoryLoaction = "../assets/";

const playList = [
    "NEFFEX - Fight Back [Copyright Free].mp3",
    "NEFFEX - Grateful [Copyright Free].mp3",
    "NEFFEX - Destiny [Copyright Free].mp3"
];

let selectedMusic = Math.floor(Math.random() * Math.floor(playList.length));
const AudioPlayer = new Audio("../assets/" + playList[selectedMusic]);
$('document').ready(function () {
    // Initialize Music - Auto Play
    AudioPlayer.loop = true;
    playMusic();
});

$('#PlayButton').click(() => {
    playMusic()
});

$('#NextMusic').click(() => {
    selectedMusic = selectedMusic < playList.length - 1 ? selectedMusic + 1 : 0;
    AudioPlayer.src = musicDirectoryLoaction + playList[selectedMusic];
    playMusic();
});

$('#PreviousMusic').click(() => {
    selectedMusic = selectedMusic > 0 ? selectedMusic - 1 : playList.length - 1;
    AudioPlayer.src = musicDirectoryLoaction + playList[selectedMusic];
    playMusic();
});

const playMusic = () => {
    let currentMusicTitle = playList[selectedMusic].substr(0, playList[selectedMusic].length-4);
    $('#MusicTitle').html(currentMusicTitle);
    if(!AudioPlayer.paused){
        AudioPlayer.pause();
        // AudioPlayer.currentTime = 0;
        $('#PlayButton').html('Play');
    } else {
        AudioPlayer.play();
        $('#PlayButton').html('Pause');
    }
    AudioPlayer.loop = true;
};

const stop = () => {
    AudioPlayer.pause();
    AudioPlayer.currentTime = 0;
}