const images = [
  'images/img1.jpg',
  'images/img2.jpg',
  'images/img3.jpg'
];

let current = 0;
const imgElement = document.getElementById('fade-img');

function crossfade() {
  // Step 1: Fade out
  imgElement.style.opacity = 0;

  // Step 2: Change image after fade duration
  setTimeout(() => {
    current = (current + 1) % images.length;
    imgElement.src = images[current];
    imgElement.style.opacity = 1;
  }, 2000); // Match CSS transition duration
}

// Run every 4 seconds
setInterval(crossfade, 4000);