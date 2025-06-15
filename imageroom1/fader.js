function startFader(images) {
  console.log(`[${new Date().toLocaleTimeString()}] 🚀 startFader called with images:`, images);

  let frontImg = document.getElementById('imgA');
  let backImg = document.getElementById('imgB');

  if (!frontImg || !backImg) {
    console.error("❌ Could not find image elements #imgA or #imgB");
    return;
  }

  let current = images.length - 1; // Start from the last image
  frontImg.src = images[current];
  frontImg.style.opacity = 1;
  backImg.style.opacity = 0;

  function crossfade() {
    current = (current + 1) % images.length;
    const nextSrc = images[current];

    const imgPreloader = new Image();
    imgPreloader.src = nextSrc;
    imgPreloader.onload = () => {
      const temp = frontImg;
      frontImg = backImg;
      backImg = temp;

      backImg.src = nextSrc;
      backImg.style.opacity = 1;
      frontImg.style.opacity = 0;

      console.log(`[${new Date().toLocaleTimeString()}] 🔁 Crossfaded to image: ${nextSrc}`);
    };
  }

  // Start the first fade after a brief delay
  setTimeout(() => {
    crossfade(); // first transition
    setInterval(crossfade, 12000); // continue every 15s
  }, 100);
}