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
// PHOTOS ❤️
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

let videoFinished = false;

const PHOTO_TIME = 6000;


// ==========================================
// OPEN MEMORIES
// ==========================================

openButton.addEventListener("click", function () {

    music.volume = 0.7;

    music.play().catch(function (error) {
        console.log("Music error:", error);
    });


    welcome.style.transition = "opacity 1s ease";

    welcome.style.opacity = "0";


    setTimeout(function () {

        welcome.style.display = "none";

        memories.style.display = "block";

        memories.style.opacity = "1";

        memories.classList.add("show");


        currentSlide = 0;

        showSlide(currentSlide);

        startSlideshow();

    }, 1000);

});


// ==========================================
// START PHOTO TIMER
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


    const newImage = new Image();

    newImage.src = slides[index].photo;


    newImage.onload = function () {

        setTimeout(function () {

            memoryPhoto.src = slides[index].photo;

            photoMessage.textContent =
                slides[index].message;


            // Restart zoom
            memoryPhoto.style.animation = "none";

            void memoryPhoto.offsetWidth;

            memoryPhoto.style.animation =
                "slowZoom 8s ease forwards";


            memoryPhoto.style.opacity = "1";

            photoMessage.style.opacity = "1";

        }, 400);

    };


    // If a photo fails, continue
    newImage.onerror = function () {

        console.log(
            "Photo failed:",
            slides[index].photo
        );

        currentSlide++;

        if (currentSlide < slides.length) {

            showSlide(currentSlide);

        } else {

            endSlideshow();

        }

    };

}


// ==========================================
// NEXT
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

        playVideo();

        return;
    }


    // ======================================
    // CONTINUE PHOTOS
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
// PLAY VIDEO 🎥
// ==========================================

function playVideo() {

    videoPlayed = true;

    videoFinished = false;


    // Pause Photograph
    music.pause();


    // Hide photos
    memories.style.opacity = "0";


    setTimeout(function () {

        memories.style.display = "none";


        // Show video
        videoMemory.style.display = "flex";


        setTimeout(function () {

            videoMemory.classList.add("show");


            ourVideo.currentTime = 0;

            ourVideo.muted = false;

            ourVideo.volume = 1;


            const videoPlay =
                ourVideo.play();


            if (videoPlay !== undefined) {

                videoPlay.catch(function (error) {

                    console.log(
                        "Video couldn't play:",
                        error
                    );

                    // If iPhone refuses the video,
                    // continue the slideshow.
                    continueAfterVideo();

                });

            }

        }, 200);

    }, 700);


    // ======================================
    // SAFETY TIMER
    // ======================================
    // If video cannot start, don't leave
    // the surprise stuck on a black screen.

    setTimeout(function () {

        if (
            !videoFinished &&
            ourVideo.paused &&
            ourVideo.currentTime === 0
        ) {

            continueAfterVideo();

        }

    }, 5000);

}


// ==========================================
// VIDEO FINISHED
// ==========================================

ourVideo.addEventListener(
    "ended",
    function () {

        videoFinished = true;

        continueAfterVideo();

    }
);


// ==========================================
// VIDEO ERROR
// ==========================================

ourVideo.addEventListener(
    "error",
    function () {

        console.log("Video loading error.");

        continueAfterVideo();

    }
);


// ==========================================
// CONTINUE AFTER VIDEO
// ==========================================

function continueAfterVideo() {

    // Prevent this function running twice
    if (videoFinished === true) {

        // ended event can continue normally
    }

    videoFinished = true;


    try {

        ourVideo.pause();

    } catch (error) {

        console.log(error);

    }


    videoMemory.classList.remove("show");


    setTimeout(function () {

        videoMemory.style.display = "none";


        // Bring photos back
        memories.style.display = "block";


        setTimeout(function () {

            memories.style.opacity = "1";


            // Resume Photograph
            music.play().catch(function () {

                console.log(
                    "Music couldn't resume."
                );

            });


            // currentSlide = 5
            // therefore this is PHOTO 6

            showSlide(currentSlide);


            startSlideshow();

        }, 100);

    }, 700);

}


// ==========================================
// END ❤️
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