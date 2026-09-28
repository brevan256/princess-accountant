// ==========================================
// ELEMENTS
// ==========================================

const openButton = document.getElementById("openButton");
const welcome = document.querySelector(".welcome");

const memories = document.getElementById("memories");
const memoryPhoto = document.getElementById("memoryPhoto");
const photoMessage = document.querySelector(".photo-message p");

const music = document.getElementById("backgroundMusic");

const videoMemory = document.getElementById("videoMemory");
const ourVideo = document.getElementById("ourVideo");


// ==========================================
// SLIDES
// ==========================================

const slides = [

    {
        photo: "photos/photo1.jpg",
        message: "And then there was you... ❤️"
    },

    {
        photo: "photos/photo2.jpg",
        message: "My beautiful PRINCESS ACCOUNTANT ❤️"
    },

    {
        photo: "photos/photo3.jpg",
        message: "Some moments don't need to be perfect..."
    },

    {
        photo: "photos/photo4.jpg",
        message: "They just need to be ours. ❤️"
    },

    {
        photo: "photos/photo5.jpeg",
        message: "You somehow became my favorite person. ❤️"
    },

    {
        photo: "photos/photo6.png",
        message: "And then there's THIS version of us 😂❤️"
    },

    {
        photo: "photos/photo7.jpg",
        message: "Even the random little moments matter. ❤️"
    },

    {
        photo: "photos/photo8.png",
        message: "Because every memory with you becomes special. ❤️"
    }

];


// ==========================================
// SETTINGS
// ==========================================

let currentSlide = 0;
let slideshow = null;
let videoPlayed = false;

const PHOTO_TIME = 6000;


// ==========================================
// OPEN MEMORIES
// ==========================================

openButton.addEventListener("click", function () {

    music.volume = 0.7;

    music.play().catch(function () {
        console.log("Music could not start.");
    });


    welcome.style.transition = "opacity 1s ease";
    welcome.style.opacity = "0";


    setTimeout(function () {

        welcome.style.display = "none";

        memories.style.display = "block";
        memories.classList.add("show");

        currentSlide = 0;

        showSlide(currentSlide);

        startSlideshow();

    }, 1000);

});


// ==========================================
// START TIMER
// ==========================================

function startSlideshow() {

    clearInterval(slideshow);

    slideshow = setInterval(function () {

        nextSlide();

    }, PHOTO_TIME);

}


// ==========================================
// SHOW PHOTO
// ==========================================

function showSlide(index) {

    if (index >= slides.length) {
        endSlideshow();
        return;
    }


    memoryPhoto.style.opacity = "0";
    photoMessage.style.opacity = "0";


    const testImage = new Image();

    testImage.src = slides[index].photo;


    // PHOTO SUCCESSFULLY LOADED
    testImage.onload = function () {

        setTimeout(function () {

            memoryPhoto.src = slides[index].photo;

            photoMessage.textContent =
                slides[index].message;


            memoryPhoto.style.animation = "none";

            void memoryPhoto.offsetWidth;

            memoryPhoto.style.animation =
                "slowZoom 8s ease forwards";


            memoryPhoto.style.opacity = "1";

            photoMessage.style.opacity = "1";

        }, 400);

    };


    // PHOTO FAILED
    testImage.onerror = function () {

        console.log(
            "Could not load:",
            slides[index].photo
        );

        // Skip broken photo
        currentSlide++;

        showSlide(currentSlide);

    };

}


// ==========================================
// NEXT SLIDE
// ==========================================

function nextSlide() {

    currentSlide++;


    // ======================================
    // VIDEO AFTER PHOTO 5
    // ======================================

    if (
        currentSlide === 5 &&
        videoPlayed === false
    ) {

        clearInterval(slideshow);

        playOurVideo();

        return;
    }


    // ======================================
    // NEXT PHOTO
    // ======================================

    if (currentSlide < slides.length) {

        showSlide(currentSlide);

    }

    else {

        clearInterval(slideshow);

        endSlideshow();

    }

}


// ==========================================
// PLAY VIDEO
// ==========================================

function playOurVideo() {

    videoPlayed = true;

    music.pause();

    memories.style.opacity = "0";


    setTimeout(function () {

        memories.style.display = "none";

        videoMemory.style.display = "flex";


        setTimeout(function () {

            videoMemory.classList.add("show");

            ourVideo.currentTime = 0;

            const playAttempt = ourVideo.play();


            if (playAttempt !== undefined) {

                playAttempt.catch(function (error) {

                    console.log(
                        "Video failed:",
                        error
                    );

                    // IMPORTANT:
                    // Don't let slideshow get stuck
                    skipVideo();

                });

            }

        }, 200);

    }, 700);


    // SAFETY CHECK
    // If video still hasn't started after 5 seconds,
    // continue the slideshow.

    setTimeout(function () {

        if (
            ourVideo.paused &&
            !ourVideo.ended
        ) {

            skipVideo();

        }

    }, 5000);

}


// ==========================================
// VIDEO FINISHED
// ==========================================

ourVideo.addEventListener(
    "ended",
    function () {

        continueAfterVideo();

    }
);


// ==========================================
// VIDEO ERROR
// ==========================================

ourVideo.addEventListener(
    "error",
    function () {

        console.log("Video file error.");

        skipVideo();

    }
);


// ==========================================
// SKIP BROKEN VIDEO
// ==========================================

function skipVideo() {

    try {

        ourVideo.pause();

    } catch (error) {

        console.log(error);

    }


    continueAfterVideo();

}


// ==========================================
// CONTINUE AFTER VIDEO
// ==========================================

function continueAfterVideo() {

    videoMemory.classList.remove("show");


    setTimeout(function () {

        videoMemory.style.display = "none";


        memories.style.display = "block";


        setTimeout(function () {

            memories.style.opacity = "1";


            // Resume Photograph

            music.play().catch(function () {
                console.log(
                    "Music could not resume."
                );
            });


            // We stopped after photo 5.
            // currentSlide is already 5,
            // therefore show photo 6.

            showSlide(currentSlide);


            startSlideshow();

        }, 100);

    }, 700);

}


// ==========================================
// END SLIDESHOW ❤️
// ==========================================

function endSlideshow() {

    clearInterval(slideshow);

    memoryPhoto.style.opacity = "0";
    photoMessage.style.opacity = "0";


    setTimeout(function () {

        memories.innerHTML = `

            <div class="ending">

                <div class="ending-heart">
                    ❤️
                </div>


                <p class="ending-small">
                    AND AFTER ALL THESE MEMORIES...
                </p>


                <h1>
                    PRINCESS ACCOUNTANT
                </h1>


                <p class="ending-message">

                    These are only a few of our memories.

                    <br><br>

                    I hope we get to make thousands more.

                    <br><br>

                    Thank you for being part of my story.

                    <br><br>

                    <strong>
                        I LOVE YOU ❤️
                    </strong>

                </p>

            </div>

        `;

    }, 1000);

}