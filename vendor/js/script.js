var swu;
swu = {};
var video = document.getElementById("video");
var isPlaying = false;
var isChanging = false;
var timer;
var timeoutInterval = 300000; // 1000 = 1sec
var forceCloseQ = 5;
var forceTimer;
var forceTimeoutInterval = 15000; // 1000 = 1sec



$(document).bind('contextmenu', function(e) {
    e.preventDefault();
    return false;
});
$(document).bind("dragstart", function(e) {
    e.preventDefault();
    return false;
});
$(document).bind("click", function(e) {
    e.preventDefault();
    clearTimeout(timer);
    swu.timeout();

    clearTimeout(forceTimer);
    swu.forceTimeout();
});

$('html').bind("mousewheel DOMMouseScroll", function(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();


    return false;
});


$(function () {

    $("#wrapper").hide();
    setTimeout(function() {
        $("#wrapper").fadeIn('slow');
        $("#loading-wrap").fadeOut();
    }, 1000);


    $(".btn-prev").addClass("end");


    /**
     * 커스톰 스크롤바 생성
     */
    $("body").mCustomScrollbar({
        axis:"x",
        theme:"minimal-dark",
        scrollInertia: 500,
        autoHideScrollbar: false,
        contentTouchScroll: true,
        callbacks:{
            onTotalScrollBack:function(){
                $(".btn-prev").addClass("end");
            },
            onTotalScroll:function(){
                $(".btn-next").addClass("end");
            },
            whileScrolling:function(){
                $(".btn-next").removeClass("end");
                $(".btn-prev").removeClass("end");
            }
        }
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
    setTimeout(function() {
        $(".btn-down-ava").show();
    }, 300);

};

/**
 * 목록으로
 */
swu.closeQsn = function() {
    isPlaying = false;
    isChanging = false;



    $(".btn-up-ava").hide();
    $(".btn-down-ava").hide();

    setTimeout(function() {
        $("body").mCustomScrollbar("update");
        $("#list-container").mCustomScrollbar("scrollTo", "top");
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

/**
 * 스크롤 업
 */
swu.scrollUp = function() {
    $("#list-container").mCustomScrollbar("scrollTo", "top");
    $(".btn-up-ava").fadeOut();
    $(".btn-down-ava").fadeIn();
};

/**
 * 스크롤 다운
 */
swu.scrollDown = function() {
    $("#list-container").mCustomScrollbar("scrollTo", "bottom");
    $(".btn-up-ava").fadeIn();
    $(".btn-down-ava").fadeOut();
};

/**
 * 아무런 동작이 없을시 메인으로 이동
 */
swu.timeout = function() {
    timer = setTimeout(function(){

    $("#wrapper").fadeOut('slow');
    $("#loading-wrap").fadeIn();

    setTimeout(function() {
        location.reload();
    }, 1000);
    },timeoutInterval);
};

/**
 * 강제 종료 버튼
 */
swu.forceClose = function() {
    forceCloseQ = forceCloseQ - 1;
    // console.log(forceCloseQ);
    if(!forceCloseQ) {
        if(confirm("해당 미디어를 종료하시겠습니까?")) {

            // 강제 종료하는 스크립트
            window.open('', '_self', '');
            window.close();

           // $("input").focus();
        } else {
            forceCloseQ = 5;
        }
    }
};

/**
 * 15초동안 아무일이 없으면 강제 종료 타이머 초기화
 */
swu.forceTimeout = function() {
    forceTimer = setTimeout(function(){
        forceCloseQ = 5;
    },forceTimeoutInterval);
};