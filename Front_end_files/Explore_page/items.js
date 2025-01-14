const items = [
    {
        title: "Item 1",
        description: "Description for Item 1",
        media: [
            "/Media_Files/1.jpg",
            "/Media_Files/2.jpeg"
        ],
        link: "#"
    },
    {
        title: "Item 2",
        description: "Description for Item 2",
        media: [
            "/Media_Files/3.jpg",
            "/Media_Files/1.jpg"
        ],
        link: "#"
    },
    {
        title: "Item 3",
        description: "Description for Item 3",
        media: [
            "/Media_Files/4.jpg",
            "/Media_Files/2.jpeg"
        ],
        link: "#"
    },
    {
        title: "Item 4",
        description: "Description for Item 1",
        media: [
            "/Media_Files/1.jpg",
            "/Media_Files/2.jpeg"
        ],
        link: "#"
    },
    {
        title: "Item 5",
        description: "Description for Item 2",
        media: [
            "/Media_Files/3.jpg",
            "/Media_Files/1.jpg"
        ],
        link: "#"
    },
    {
        title: "Item 6",
        description: "Description for Item 3",
        media: [
            "/Media_Files/4.jpg",
            "/Media_Files/2.jpeg"
        ],
        link: "#"
    },
    {
        title: "Item 3",
        description: "Description for Item 3",
        media: [
            "/Media_Files/4.jpg",
            "/Media_Files/2.jpeg"
        ],
        link: "#"
    },
    {
        title: "Item 4",
        description: "Description for Item 1",
        media: [
            "/Media_Files/1.jpg",
            "/Media_Files/2.jpeg"
        ],
        link: "#"
    }
];

let pamphletCounter = 1; // Initialize a counter for pamphlets

items.forEach(item => {
    const pamphlet = document.createElement('div');
    pamphlet.classList.add('custom-pamphlet');
    pamphlet.id = `pamphlet-custom-${pamphletCounter++}`; // Assign a unique ID

    let mediaHTML = '';
    item.media.forEach((media, index) => {
        if (media.endsWith('.mp4')) {
            mediaHTML += `<video class="${index === 0 ? 'active' : ''}" src="${media}" muted loop></video>`;
        } else {
            mediaHTML += `<img class="${index === 0 ? 'active' : ''}" src="${media}" alt="${item.title}">`;
        }
    });

    pamphlet.innerHTML = `
        <div class="media-carousel">
            ${mediaHTML}    
            <div class="media-carousel-buttons">
                <button class="media-carousel-button prev">❮</button>
                <button class="media-carousel-button next">❯</button>
            </div>
        </div>
        <div class="custom-pamphlet-content">
            <h3 class="custom-pamphlet-title">${item.title}</h3>
            <p class="custom-pamphlet-description">${item.description}</p>
            <a href="${item.link}" class="custom-pamphlet-btn">Learn More</a>
        </div>
    `;

    pamphletSection.appendChild(pamphlet);

    const mediaCarousel = pamphlet.querySelector('.media-carousel');
    const images = mediaCarousel.querySelectorAll('img, video');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    };

    mediaCarousel.querySelector('.prev').addEventListener('click', () => {
        console.log("Clicked Prev");
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel(currentIndex);
    });

    mediaCarousel.querySelector('.next').addEventListener('click', () => {
        console.log("Clicked Next");
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel(currentIndex);
    });
});