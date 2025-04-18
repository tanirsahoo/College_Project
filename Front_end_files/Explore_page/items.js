let items = null;

async function fetchBedData() {
    try {
        const response = await fetch(bed_get_request);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        items = data;
        displayData(items);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(items) {
    const pamphletSection = document.getElementById('pamphletSection');
    if (!pamphletSection) {
        console.error("Element with ID 'pamphlet-section' not found.");
        return;
    }
    pamphletSection.innerHTML = ""; // Clear previous content

    let pamphletCounter = 1; // Initialize a counter for pamphlets

    items.forEach(item => {
        const pamphlet = document.createElement('div');
        pamphlet.classList.add('custom-pamphlet');
        pamphlet.id = `pamphlet-custom-${pamphletCounter++}`; // Assign a unique ID

        let mediaHTML = '';

        // Extract PG ID and update URL dynamically
        const pgFolder = `PG${item.pg_id}`;

        // Process images (convert string array to actual array)
        let images = JSON.parse(item.image.replace(/'/g, '"'));
        images.forEach((img, index) => {
            mediaHTML += `<img class="${index === 0 ? 'active' : ''}" src="/Media_Files/${pgFolder}/${img}" alt="${item.type}">`;
        });

        // Process multiple video files (convert to array if needed)
        let videos = JSON.parse(item.video.replace(/'/g, '"'));
        videos.forEach((video, index) => {
            mediaHTML += `<video class="${images.length === 0 && index === 0 ? 'active' : ''}" src="/Media_Files/${pgFolder}/${video}" muted autoplay loop playsinline></video>`;
        });

        // **Truncate description to 30 characters**
        let truncatedDescription = item.description
            ? (item.description.length > 30 ? item.description.substring(0, 30) + "..." : item.description)
            : 'No description available';

        async function getPGDetails(item) {
            try {
                const response = await fetch(PG_details_through_id + `${item.pg_id}`);
                const PGDetails = await response.json();
                return PGDetails;
            } catch (error) {
                console.error("Failed to fetch PG details:", error);
            }
        }

        // Wrap your call in an async function
        async function showPGDetails(item) {
            const PGDetails = await getPGDetails(item);


            // Construct the pamphlet HTML
            pamphlet.innerHTML = `
            <div class="media-carousel">
                ${mediaHTML}    
                <div class="media-carousel-buttons">
                    <button class="media-carousel-button prev">❮</button>
                    <button class="media-carousel-button next">❯</button>
                </div>
            </div>
            <div class="custom-pamphlet-content">
                <h3 class="custom-pamphlet-title">${PGDetails.pgname}</h3>
                <h2 class="custom-pamphlet-title custom-pamphlet-type">${item.type}</h2>
                <p class="custom-pamphlet-description">${truncatedDescription}</p>
                <a href="${one_item_page}?id=${item.bed_id}" class="custom-pamphlet-btn">Learn More</a>
            </div>
        `;

            pamphletSection.appendChild(pamphlet);

            // Handle media carousel functionality
            const mediaCarousel = pamphlet.querySelector('.media-carousel');
            const mediaElements = mediaCarousel.querySelectorAll('img, video');
            let currentIndex = 0;

            const updateCarousel = (index) => {
                mediaElements.forEach((media, i) => {
                    media.classList.toggle('active', i === index);
                });
            };

            mediaCarousel.querySelector('.prev').addEventListener('click', () => {
                console.log("Clicked Prev");
                currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length;
                updateCarousel(currentIndex);
            });

            mediaCarousel.querySelector('.next').addEventListener('click', () => {
                console.log("Clicked Next");
                currentIndex = (currentIndex + 1) % mediaElements.length;
                updateCarousel(currentIndex);
            });
        }
        showPGDetails(item) ;
    });
}

document.addEventListener("DOMContentLoaded", fetchBedData);
