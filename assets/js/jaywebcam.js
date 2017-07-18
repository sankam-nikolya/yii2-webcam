var jayWebCam = {canvasID: '', videoID: '', buttonID: ''};
// Put event listeners into place
window.addEventListener("DOMContentLoaded", function () {
    // Grab elements, create settings, etc.
    var canvas = document.getElementById(jayWebCam.canvasID);
    var context = canvas.getContext('2d');
    var video = document.getElementById(jayWebCam.videoID);
    var mediaConfig = {video: true};
    var errBack = function (e) {
        console.log('An error has occurred!', e);
    };

    // Put video listeners into place
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        });
    }

    /* Legacy code below! */
    else if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(mediaConfig, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(mediaConfig, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }

    // Trigger photo take
    document.getElementById(jayWebCam.buttonID).addEventListener('click', function () {
        context.drawImage(video, 0, 0, 640, 480);
//        window.open(canvas.toDataURL('image/png'));
    });
}, false);