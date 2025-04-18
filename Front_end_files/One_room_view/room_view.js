async function fetchBedMedia(bed_id) {
  try {
    const response = await fetch(PG_bed_details + `${bed_id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();

    const imageFiles = JSON.parse(data.image.replace(/'/g, '"'));
    const videoFiles = JSON.parse(data.video.replace(/'/g, '"'));

    const carouselTrack = document.getElementById("carouselTrack");
    carouselTrack.innerHTML = "";

    // Clone last image for infinite scroll effect
    const lastImage = imageFiles[imageFiles.length - 1];
    const cloneLast = document.createElement("div");
    cloneLast.className = "carousel-slide";
    cloneLast.innerHTML = `<img src="/Media_Files/PG${data.pg_id}/${lastImage}" alt="cloned-last" />`;
    carouselTrack.appendChild(cloneLast);

    // Append all images
    imageFiles.forEach((img, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.innerHTML = `<img src="/Media_Files/PG${data.pg_id}/${img}" alt="${index + 1}" />`;
      carouselTrack.appendChild(slide);
    });

    // Clone first image for infinite scroll
    const firstImage = imageFiles[0];
    const cloneFirst = document.createElement("div");
    cloneFirst.className = "carousel-slide";
    cloneFirst.innerHTML = `<img src="/Media_Files/PG${data.pg_id}/${firstImage}" alt="cloned-first" />`;
    carouselTrack.appendChild(cloneFirst);

    // Append videos
    videoFiles.forEach((vid) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.innerHTML = `
        <video controls>
          <source src="/Media_Files/PG${data.pg_id}/${vid}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
      carouselTrack.appendChild(slide);
    });

    console.log("✅ Carousel built with images and video!");
    initCarousel();

  } catch (error) {
    console.error("❌ Failed to fetch bed media:", error);
  }
}

function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let index = 1;

  function getSlideWidth() {
    return slides[0].clientWidth;
  }

  function updateSlide() {
    track.style.transform = `translateX(-${getSlideWidth() * index}px)`;
  }

  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveToNext(), 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  function moveToNext() {
    if (index >= slides.length - 1) return;
    index++;
    track.style.transition = "transform 0.5s ease-in-out";
    updateSlide();
  }

  function moveToPrev() {
    if (index <= 0) return;
    index--;
    track.style.transition = "transform 0.5s ease-in-out";
    updateSlide();
  }

  nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    moveToNext();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    moveToPrev();
    startAutoSlide();
  });

  track.addEventListener("transitionend", () => {
    const current = slides[index].children[0];

    if (current.alt === "1" && index === slides.length - 1) {
      track.style.transition = "none";
      index = 1;
      updateSlide();
    } else if (current.alt === "5") {
      track.style.transition = "none";
      index = slides.length - 2;
      updateSlide();
    }
  });

  window.addEventListener('resize', () => {
    track.style.transition = "none";
    updateSlide();
  });

  updateSlide();
  startAutoSlide();
}


// Get the current URL
const urlParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const bedId = urlParams.get('id');

// console.log("Extracted bed ID:", bedId);

// Load media on page
fetchBedMedia(bedId);


fetch(PG_bed_details + `${bedId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch bed data");
    }
    return response.json();
  })
  .then(data => {
    const cost = parseInt(data.cost, 10);

    // Update current price
    document.getElementById("currentPrice").textContent = cost;

    // Update striked price (e.g., 1.8x of actual cost)
    const striked = Math.round(cost * 1.8);
    document.getElementById("strikedPrice").textContent = striked;
  })
  .catch(error => {
    console.error("Error loading bed data:", error);
  });

