var $J = jQuery.noConflict(),
    PLAYER_YOUTUBE,
    CURRENT_WIDTH;


$J.fn.exists = function(){return this.length > 0;}

$J(document).ready(function() {
    initPage();
});

function initPage() {
    CURRENT_WIDTH = $J(window).outerWidth();

    initBannerVideo();
    initPlayBanner();
}

function isMobile() {
    return  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function initBannerVideo() {
    var headerSection = $J('.header-video-section'),
        videoEl = $J('.header-video-section iframe[src*=youtube], .header-video-section iframe[src*=vimeo], .header-video-section object, .header-video-section embed'),
        fluidEl = $J('figure'),
        containerEl = fluidEl.siblings('.container-fluid');

    fluidEl.hide();
}

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    idYoutube = $J('.header-video-section iframe').attr('id');
    PLAYER_YOUTUBE = new YT.Player(idYoutube, {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        event.target.playVideo();
        setTimeout(function(){
            event.target.stopVideo();
        }, 200);

        var figureEl = $J('.header-video-section figure'),
            containerEl = figureEl.siblings('.container-fluid');

        figureEl.hide();
        containerEl.show();
    }
}

function initPlayBanner() {
    $J('.header-video-section .btn-play').on('click', function(event) {
        event.preventDefault();

        var figureEl = $J('.header-video-section figure'),
            containerEl = figureEl.siblings('.container-fluid');

        figureEl.show();
        containerEl.hide();

        PLAYER_YOUTUBE.playVideo();
    });
}