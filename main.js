const app = () => {
    const track = document.querySelector('.track');
    const play = document.querySelector('.play');
    const replay = document.querySelector(".replay");
    const outline = document.querySelector('.moving-time-line circle');
    const video = document.querySelector('.video-container video');
    const timeSelect = document.querySelectorAll('.time input');

    const sounds = document.querySelectorAll('.change-sound button');
    const timeDisplay = document.querySelector('.time-display');
    const outlineLength = outline.getTotalLength();

    let defaultDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            track.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(track);
        });
    });

    play.addEventListener('click', () => {
        checkPlaying(track);
    });

    const checkPlaying = track => {
        if (track.paused) {
            track.play();
            video.play();
            play.src = 'svg/pause.svg';
        } else {
            track.pause();
            video.pause();
            play.src = 'svg/play.svg';
        }
    };

    replay.addEventListener('click', () => {
        let currentTime = track.currentTime;
        track.currentTime = 0;
    });

    track.ontimeupdate = () => {
        let currentTime = track.currentTime;
        let elapsed = defaultDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        timeDisplay.textContent = `${minutes}:${seconds}`;

        let progress = outlineLength - (currentTime / defaultDuration) * outlineLength;
        outline.style.strokeDasharray = progress;

        if (currentTime >= defaultDuration) {
            track.pause();
            track.currentTime = 0;
            play.src = '(./svg/play.svg)';
            video.pause();
        }
    };

    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            defaultDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(defaultDuration / 60)}:${Math.floor(defaultDuration % 60)}`;
        });
    });
};

app();