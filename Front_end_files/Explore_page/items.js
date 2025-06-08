let items = null;

async function fetchBedData() {
    try {
        const response = await fetch(bed_get_request);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Fetched Data:", data);
        items = data;
        // console.log(items);
        displayData(items);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function displayData(items) {
    const pamphletSection = document.getElementById('pamphletSection');
    if (!pamphletSection) {
        console.error("Element with ID 'pamphletSection' not found.");
        return;
    }
    pamphletSection.innerHTML = ""; // Clear previous content

    let pamphletCounter = 1;

    for (const item of items) {
        const pamphlet = document.createElement('div');
        pamphlet.classList.add('custom-pamphlet');
        pamphlet.id = `pamphlet-custom-${pamphletCounter++}`;

        let mediaHTML = '';
        const pgFolder = `PG${item.pg.pg_id}`;

        let images = [];
        let videos = [];

        try {
            if (item.image) {
                images = JSON.parse(item.image.replace(/'/g, '"'));
            }
        } catch (e) {
            console.warn("Invalid image JSON for PG:", item.pg_id);
        }

        try {
            if (item.video) {
                videos = JSON.parse(item.video.replace(/'/g, '"'));
            }
        } catch (e) {
            console.warn("Invalid video JSON for PG:", item.pg_id);
        }

        if (images.length > 0) {
            images.forEach((img, index) => {
                mediaHTML += `<img class="${index === 0 ? 'active' : ''}" src="/Media_Files/${pgFolder}/${img}" alt="${item.type}">`;
            });
        }

        if (videos.length > 0) {
            videos.forEach((video, index) => {
                mediaHTML += `<video class="${images.length === 0 && index === 0 ? 'active' : ''}" src="/Media_Files/${pgFolder}/${video}" muted autoplay loop playsinline></video>`;
            });
        }

        let truncatedDescription = item.description
            ? (item.description.length > 30 ? item.description.substring(0, 30) + "..." : item.description)
            : 'No description available';

        // Fetch PG details
        async function getPGDetails(item) {
            try {
                const response = await fetch(PG_details_through_id + `${item.pg.pg_id}`);
                return await response.json();
            } catch (error) {
                console.error("Failed to fetch PG details:", error);
                return {};
            }
        }

        const PGDetails = await getPGDetails(item);

        pamphlet.innerHTML = `
            <div class="media-carousel">
                ${mediaHTML || '<p>No media available</p>'}
                ${(images.length + videos.length > 1) ? `
                <div class="media-carousel-buttons">
                    <button class="media-carousel-button prev">❮</button>
                    <button class="media-carousel-button next">❯</button>
                </div>` : ''}
            </div>
            <div class="custom-pamphlet-content">
                <h3 class="custom-pamphlet-title">${PGDetails.pgname}</h3>
                <h2 class="custom-pamphlet-title custom-pamphlet-type">${item.type}</h2>
                <h2 class="custom-pamphlet-title custom-pamphlet-price"><spam>₹${item.cost}</spam>&nbsp;<strike>₹${item.cost * 1.8}</strike></h2>
                <p class="custom-pamphlet-description location-share"><spam class="one">${PGDetails.state},</spam>&nbsp;<spam class="two">${PGDetails.pincode}</spam></p>
                <p class="custom-pamphlet-description">${truncatedDescription}</p>
                <a href="${one_item_page}?id=${item.bed_id}" class="custom-pamphlet-btn">Learn More</a>
            </div>
        `;

        pamphletSection.appendChild(pamphlet);

        // Carousel Logic
        const mediaCarousel = pamphlet.querySelector('.media-carousel');
        const mediaElements = mediaCarousel.querySelectorAll('img, video');
        let currentIndex = 0;

        const updateCarousel = (index) => {
            mediaElements.forEach((media, i) => {
                media.classList.toggle('active', i === index);
            });
        };

        if (mediaElements.length > 1) {
            mediaCarousel.querySelector('.prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length;
                updateCarousel(currentIndex);
            });

            mediaCarousel.querySelector('.next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % mediaElements.length;
                updateCarousel(currentIndex);
            });
        }
    }
}



async function filter_implementation() {
    try {
      const response = await fetch(bed_get_request);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
    //   console.log("======================================");
    //   console.log(Object.entries(selectedValues)) ;
    //   console.log("======================================");
  
      const scoredItems = data.map(item => {
              
        let matchCount = 0;
  
        for (const [key, selectedValue] of Object.entries(selectedValues)) {
          if (!selectedValue) continue;
  
          if (
            (key === 'dropdown_1' && item.type === selectedValue) ||
            (key === 'dropdown_2' && item.gender === selectedValue) ||
            (key === 'dropdown_3' && item.cost === selectedValue) ||
            (key === 'dropdown_4' && item.pg.pincode === selectedValue) ||
            (key === 'dropdown_5' && item.pg.state === selectedValue)
          ) {
            // wait(1000); // Simulate a delay for the match
            matchCount++;
            // console.log(matchCount) ;
          }
        }
        // console.log(matchCount);
        return { item, matchCount };
      });
  
      // Sort items based on number of matches (descending)
      scoredItems.sort((a, b) => b.matchCount - a.matchCount);
  
      // Extract sorted items
      items = scoredItems.map(entry => entry.item);
  
    //   console.log("Sorted & Filtered Items:", items);
      displayData(items);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
}  

async function search_implementation(query) {
    console.log("Got Access");
    try {
        // Create the request body with the query
        const requestBody = {
            value: query
        };

        // Send POST request to the keyword_extract endpoint
        const response = await fetch(keyword_extract, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse and store the response
        const items = await response.json();

        // Optional: display or use items
        console.log("Received items:", items);
        displayData(items);  // If you want to render them on screen

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function getSearchQueryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search_box');
    console.log(searchQuery) ;
    search_implementation(searchQuery) ;
}


document.addEventListener("DOMContentLoaded", fetchBedData);