// ==========================================
// ELEMENTS
// ==========================================

const openButton = document.getElementById("openButton");
const welcome = document.querySelector(".welcome");

const memories = document.getElementById("memories");
const memoryPhoto = document.getElementById("memoryPhoto");
const photoMessage = document.querySelector(".photo-message p");

const music = document.getElementById("backgroundMusic");


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
// SETTINGS
// ==========================================

let currentSlide = 0;
let slideshow = null;

// Each photo stays for 6 seconds
const PHOTO_TIME = 6000;


// ==========================================
// OPEN MEMORIES
// ==========================================

openButton.addEventListener("click", function () {

    // Start Photograph
    music.volume = 0.7;

    music.play().catch(function (error) {
        console.log("Music could not start:", error);
    });


    // Fade welcome screen
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
// START SLIDESHOW
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

    // Safety check
    if (index >= slides.length) {

        endSlideshow();

        return;
    }


    // Fade old photo
    memoryPhoto.style.opacity = "0";
    photoMessage.style.opacity = "0";


    // Preload next photo
    const newImage = new Image();

    newImage.src = slides[index].photo;


    // ======================================
    // PHOTO LOADED SUCCESSFULLY
    // ======================================

    newImage.onload = function () {

        setTimeout(function () {

            memoryPhoto.src = slides[index].photo;

            photoMessage.textContent =
                slides[index].message;


            // Restart zoom animation
            memoryPhoto.style.animation = "none";

            void memoryPhoto.offsetWidth;

            memoryPhoto.style.animation =
                "slowZoom 8s ease forwards";


            // Fade photo in
            memoryPhoto.style.opacity = "1";

            photoMessage.style.opacity = "1";

        }, 400);

    };


    // ======================================
    // PHOTO FAILED TO LOAD
    // ======================================

    newImage.onerror = function () {

        console.log(
            "Photo failed:",
            slides[index].photo
        );


        // Skip broken photo
        currentSlide++;


        if (currentSlide < slides.length) {

            showSlide(currentSlide);

        } else {

            endSlideshow();

        }

    };

}


// ==========================================
// NEXT PHOTO
// ==========================================

function nextSlide() {

    currentSlide++;


    if (currentSlide < slides.length) {

        showSlide(currentSlide);

    }

    else {

        clearInterval(slideshow);

        endSlideshow();

    }

}


// ==========================================
// ENDING ❤️
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