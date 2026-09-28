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
// OUR PHOTOS ❤️
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
// VARIABLES
// ==========================================

let currentSlide = 0;

let slideshow = null;

let videoPlayed = false;


// ==========================================
// OPEN MEMORIES
// ==========================================

openButton.addEventListener("click", function () {

    // Start music
    music.volume = 0.7;

    music.play().catch(function (error) {

        console.log("Music error:", error);

    });


    // Fade welcome page
    welcome.style.transition = "opacity 1.5s ease";

    welcome.style.opacity = "0";


    setTimeout(function () {

        welcome.style.display = "none";


        memories.style.display = "block";

        memories.style.opacity = "1";

        memories.classList.add("show");


        currentSlide = 0;

        showSlide(currentSlide);


        // Start slideshow
        slideshow = setInterval(nextSlide, 6000);

    }, 1500);

});


// ==========================================
// SHOW PHOTO
// ==========================================

function showSlide(index) {

    memoryPhoto.style.opacity = "0";

    photoMessage.style.opacity = "0";


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

    }, 700);

}


// ==========================================
// NEXT SLIDE
// ==========================================

function nextSlide() {

    currentSlide++;


    // --------------------------------------
    // AFTER PHOTO 5 → PLAY VIDEO
    // --------------------------------------

    if (currentSlide === 5 && videoPlayed === false) {

        clearInterval(slideshow);

        playOurVideo();

        return;

    }


    // --------------------------------------
    // CONTINUE PHOTOS
    // --------------------------------------

    if (currentSlide < slides.length) {

        showSlide(currentSlide);

    }


    // --------------------------------------
    // END
    // --------------------------------------

    else {

        clearInterval(slideshow);

        endSlideshow();

    }

}


// ==========================================
// PLAY VIDEO 🎥
// ==========================================

function playOurVideo() {

    videoPlayed = true;


    // Pause Photograph
    music.pause();


    // Fade photos
    memories.style.opacity = "0";


    setTimeout(function () {

        memories.style.display = "none";


        // Show video section
        videoMemory.style.display = "flex";


        setTimeout(function () {

            videoMemory.classList.add("show");


            ourVideo.currentTime = 0;


            // Play video
            ourVideo.play().catch(function (error) {

                console.log("Video error:", error);

            });

        }, 200);

    }, 1000);

}


// ==========================================
// WHEN VIDEO FINISHES
// ==========================================

ourVideo.addEventListener("ended", function () {

    videoMemory.classList.remove("show");


    setTimeout(function () {

        videoMemory.style.display = "none";


        // Bring photos back
        memories.style.display = "block";


        setTimeout(function () {

            memories.style.opacity = "1";


            // Resume Photograph
            music.play().catch(function (error) {

                console.log(error);

            });


            // Continue with photo 6
            showSlide(currentSlide);


            slideshow =
                setInterval(nextSlide, 6000);

        }, 100);

    }, 1000);

});


// ==========================================
// ENDING ❤️
// ==========================================

function endSlideshow() {

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

    }, 1200);

}