/*jslint browser: true*/
/*global $, jQuery, alert*/

var swu = {};
var video = document.getElementById("video");
var isPlaying = false;
var isChanging = false;

$(function () {

    /**
     * 커스톰 스크롤바 생성
     */
    $("body").mCustomScrollbar({
        axis:"x",
        theme:"minimal-dark",
        scrollInertia: 500,
        autoHideScrollbar: false,
        contentTouchScroll: true
    });

    /**
     * 썸네일 목록 스크롤바 생성
     */
    $("#list-container").mCustomScrollbar({
        axis:"y",
        theme:"minimal-dark",
        scrollInertia: 300,
        autoHideScrollbar: false,
        contentTouchScroll: true,
        callbacks:{
            onTotalScrollBack:function(){
                $("#list-shadow").fadeIn();
            },
            onTotalScroll:function(){
                $("#list-shadow").fadeOut();
            },
            onTotalScrollOffset: 100,
            onTotalScrollBackOffset: 50
        }
    });

    /**
     * 영상 끝
     */
    $("#video").bind("ended", function() {
        $(".btn-toggle-play").removeClass("btn-pause");
        $(".btn-toggle-play").addClass("btn-play");
        isPlaying = false;
    });



    $("#btn-qsn-prev").click(function(e){
        e.preventDefault();
        $("body").mCustomScrollbar("scrollTo", ["+=0","+=960"]);
    });

    $("#btn-qsn-next").click(function(e){
        e.preventDefault();
        $("body").mCustomScrollbar("scrollTo", ["+=0","-=960"]);
    });


});



/**
 * 질문 클릭
 */
swu.openQsn = function() {
    isPlaying = true;
    $("body").mCustomScrollbar("disable");
};

/**
 * 목록으로
 */
swu.closeQsn = function() {
    isPlaying = false;
    isChanging = false;
    setTimeout(function() {
        $("body").mCustomScrollbar("update");
        $(".btn-toggle-play").removeClass("btn-play");
        $(".btn-toggle-play").addClass("btn-pause");
    }, 1000);
};

/**
 * 재생/일시정지 버튼
 */
swu.togglePlay = function(obj) {
    if(!isChanging) {
        if (!isPlaying) {
            $(obj).removeClass("btn-play");
            $(obj).addClass("btn-pause");
            document.getElementById("video").play();
            isPlaying = true;
        } else {
            $(obj).removeClass("btn-pause");
            $(obj).addClass("btn-play");
            document.getElementById("video").pause();
            isPlaying = false;
        }
    }
};

/**
 * 정지
 */
swu.stopPlay = function() {
    if(!isChanging) {
        $(".btn-toggle-play").removeClass("btn-pause");
        $(".btn-toggle-play").addClass("btn-play");
        document.getElementById("video").currentTime = 0;
        document.getElementById("video").pause();
        isPlaying = false;
    }
};

/**
 * 영상 변경
 */
swu.changeVideo = function() {
    isChanging = true;
    setTimeout(function() {
        $(".btn-toggle-play").addClass("btn-pause");
        $(".btn-toggle-play").removeClass("btn-play");
        isPlaying = true;
        isChanging = false;
    }, 1500);
};