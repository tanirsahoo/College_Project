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

function displayData(items) {
    const pamphletSection = document.getElementById('pamphletSection');
    if (!pamphletSection) {
        console.error("Element with ID 'pamphlet-section' not found.");
        return;
    }
    pamphletSection.innerHTML = ""; // Clear previous content

    let pamphletCounter = 1;
    // console.log(items) ;
    items.forEach(item => {
        const pamphlet = document.createElement('div');
        pamphlet.classList.add('custom-pamphlet');
        pamphlet.id = `pamphlet-custom-${pamphletCounter++}`;

        let mediaHTML = '';
        const pgFolder = `PG${item.pg.pg_id}`;

        // Initialize empty arrays
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

        // console.log(images) ;
        // console.log(videos) ;

        // Render images if available
        if (images.length > 0) {
            images.forEach((img, index) => {
                mediaHTML += `<img class="${index === 0 ? 'active' : ''}" src="/Media_Files/${pgFolder}/${img}" alt="${item.type}">`;
            });
        }

        // Render videos if available
        if (videos.length > 0) {
            videos.forEach((video, index) => {
                mediaHTML += `<video class="${images.length === 0 && index === 0 ? 'active' : ''}" src="/Media_Files/${pgFolder}/${video}" muted autoplay loop playsinline></video>`;
            });
        }

        let truncatedDescription = item.description
            ? (item.description.length > 30 ? item.description.substring(0, 30) + "..." : item.description)
            : 'No description available';

        async function getPGDetails(item) {
            try {
                // console.log(item.pg.pg_id) ;
                const response = await fetch(PG_details_through_id + `${item.pg.pg_id}`);
                const PGDetails = await response.json();
                // console.log(PGDetails);
                return PGDetails;
            } catch (error) {
                console.error("Failed to fetch PG details:", error);
            }
        }

        async function showPGDetails(item) {
            const PGDetails = await getPGDetails(item);
            // console.log(PGDetails) ;
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
                <p class="custom-pamphlet-description location-share"><spam class="one">${PGDetails.state},<spam>&nbsp;<spam class="two">${PGDetails.pincode}</spam></p>
                <p class="custom-pamphlet-description">${truncatedDescription}</p>
                <a href="${one_item_page}?id=${item.bed_id}" class="custom-pamphlet-btn">Learn More</a>
            </div>
        `;

            pamphletSection.appendChild(pamphlet);

            // Handle media carousel
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

        showPGDetails(item);
    });
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
    try {
        // Create the request body with the query passed as an argument
        const requestBody = {
            query: query
        };

        // Send POST request to the API
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

        // Parse the response data
        const data = await response.json();

        // Fetch bed data from another source
        const bed_response = await fetch(bed_get_request);
        if (!bed_response.ok) {
            throw new Error(`HTTP error! Status: ${bed_response.status}`);
        }

        const bed_data = await bed_response.json();

        const scoredItems = bed_data.map(bed => {
            let matchCount = 0;

            // Compare the fetched data with the bed data
            for (const [key, selectedValue] of Object.entries(selectedValues)) {
                if (!selectedValue) continue;

                // Check for matches based on item properties
                if (
                    (key === 'city' && bed.pg.pincode === selectedValue) ||
                    (key === 'cost' && bed.cost === selectedValue) ||
                    (key === 'gender' && bed.gender === selectedValue) ||
                    (key === 'pgname' && bed.pg.pgname === selectedValue) ||
                    (key === 'pincode' && bed.pg.pincode === selectedValue) ||
                    (key === 'similarity_score' && "0.0" === selectedValue) ||
                    (key === 'state' && bed.pg.state === selectedValue) ||
                    (key === 'type' && bed.type === selectedValue)
                ) {
                    matchCount++;
                }
            }

            return { item: bed, matchCount };
        });

        // Sort items based on the number of matches (descending order)
        scoredItems.sort((a, b) => b.matchCount - a.matchCount);

        // Extract sorted items
        const items = scoredItems.map(entry => entry.item);

        // Display the updated items
        displayData(items);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function getSearchQueryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search_box');
    search_implementation(searchQuery) ;
}


document.addEventListener("DOMContentLoaded", fetchBedData);