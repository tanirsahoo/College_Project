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


// const PG_bed_details = "http://127.0.0.1:9000/beds/";
// const PG_details_through_id = "http://127.0.0.1:9000/PGSearch/pg/";

// Fetch and load Bed and PG details
fetch(`${PG_bed_details}${bedId}`)
  .then(res => res.json())
  .then(bedData => {
    const pgId = bedData.pg_id;
    const cost = parseInt(bedData.cost);

    // Set cost and striked price
    document.getElementById("currentPrice").textContent = cost;
    document.getElementById("strikedPrice").textContent = Math.round(cost * 1.8);

    // Update gender (optional)
    document.getElementById("pgGender").innerHTML = `<p>${bedData.gender || "Gender Info"}</p>`;

    // Update bed type
    document.getElementById("bedType").innerHTML = `<p>${bedData.type} Sharing</p>`;

    // Update description
    document.getElementById("bedDescription").textContent = bedData.description;

    // Update facilities
    const facilitiesList = JSON.parse(bedData.facilities_for_bed.replace(/'/g, '"'));
    const ul = document.getElementById("bedFacilities");
    ul.innerHTML = "";
    facilitiesList.forEach(facility => {
      const li = document.createElement("li");
      li.textContent = facility;
      ul.appendChild(li);
    });

    // Now fetch PG details using pg_id
    return fetch(`${PG_details_through_id}${pgId}`);
  })
  .then(res => res.json())
  .then(pgData => {
    console.log(pgData) ;
    const rules = JSON.parse(pgData.pgrules.replace(/'/g, '"'));
    console.log(rules) ;
    const ul = document.getElementById("pgRules");
    ul.innerHTML = "";
    rules.forEach(rule => {
      const li = document.createElement("li");
      li.textContent = rule;
      ul.appendChild(li);
    });
  })
  .catch(error => {
    console.error("❌ Error loading bed/pg data:", error);
  });
