const track = document.getElementById("track");
const prevButton = document.getElementById("button-prev");
const nextButton = document.getElementById("button-next");

let items = document.querySelectorAll(".carrusel-item");
let currentIndex = 1;


const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

items = document.querySelectorAll(".carrusel-item"); 


updateTrackPosition();


function moveToNextSlide() {
    if (currentIndex >= items.length - 1) return; 
    currentIndex++;
    updateTrackPosition();

    
    if (currentIndex === items.length - 1) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = 1;
            updateTrackPosition();
        }, 300); 
    }
}


function moveToPrevSlide() {
    if (currentIndex <= 0) return; 
    currentIndex--;
    updateTrackPosition();

    
    if (currentIndex === 0) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = items.length - 2;
            updateTrackPosition();
        }, 300); 
    }
}


function updateTrackPosition() {
    const width = items[0].offsetWidth;
    track.style.transition = "transform 0.3s ease";
    track.style.transform = `translateX(-${currentIndex * width}px)`;
}


track.addEventListener("transitionend", () => {
    track.style.transition = "transform 0.3s ease";
});


nextButton.addEventListener("click", moveToNextSlide);
prevButton.addEventListener("click", moveToPrevSlide);


const video = document.querySelector("video");

video.addEventListener("click", () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});


function showDetails(year) {
    const details = {
        '1960': 'En 1960 comenzó la visión de Don Juan Carosio con un solo camión Mercedes Benz.',
        '1980': 'En 1980, la empresa se expandió ofreciendo servicios a nuevas empresas.',
        '2001': 'En 2001, la empresa superó la crisis económica con esfuerzo y dedicación.',
        '2023': 'En 2023, la tercera generación sigue liderando con los mismos valores de trabajo.'
    };

    const timelineDetails = document.getElementById('timeline-details');
    timelineDetails.textContent = details[year];
}
