const Panel = $('#ContentPlate');
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const PanelSlideUp = (buttonClicked) => {
    let navItems = $('.nav-item');
    if(!$(buttonClicked).hasClass('active')){
        for (let i = 0; i < navItems.length; i++){
            $(navItems[i]).removeClass('active');
        }
        $(buttonClicked).addClass('active');
        switch ($($(buttonClicked).children()[1]).html()) {
            case "Home":
                PanelShrink();
                break;
            case "Portfolio":
                PanelGrow(GetPortfolio);
                break;
            case "About Us":
                PanelGrow();
                break;
            case "Contact Us":
                PanelGrow();
                break;
        }
    }
};

const PanelGrow = (expand) => {
    //$('#ContentPlate').empty();
    if(Panel.height() > 50){
        Panel.animate({'min-height': '0vh'});
    }
    if(expand instanceof Function){
        expand();
    }
    Panel.animate({'min-height': '100vh'});
};

const PanelShrink = () => {
    if(Panel.height() > 50){
        Panel.animate({
            'min-height': '0vh',
        });
        $('#ContentPlate').empty();
    }
};

const GetPortfolio = () => {
    $.ajax({
        url: './partialViews/Portfolio.html',
        success: (result) => {
            $('#ContentPlate').append(result);
        },
        error: (result) => {
            console.log(result);
        }
    });
};

const playList = [
    "NEFFEX - Fight Back [Copyright Free].mp3",
    "NEFFEX - Grateful [Copyright Free].mp3",
    "NEFFEX - Destiny [Copyright Free].mp3"
];
let selectedMusic = getRandomInt(playList.length);
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
    if(selectedMusic < playList.length - 1){
        selectedMusic++;
        AudioPlayer.src = "../assets/" + playList[selectedMusic];
        playMusic();
    }
});
$('#PreviousMusic').click(() => {
    if(selectedMusic > 0){
        selectedMusic--;
        AudioPlayer.src = "../assets/" + playList[selectedMusic];
        playMusic();
    }
});
const playMusic = () => {
    let currentMusicTitle = playList[selectedMusic].substr(0, playList[selectedMusic].length-4);
    $('#MusicTitle').html(currentMusicTitle);
    if(!AudioPlayer.paused){
        AudioPlayer.pause();
        AudioPlayer.currentTime = 0;
        $('#PlayButton').html('Sound Off');
    } else {
        AudioPlayer.play();
        $('#PlayButton').html('Sound On');
    }
    AudioPlayer.loop = true;
};