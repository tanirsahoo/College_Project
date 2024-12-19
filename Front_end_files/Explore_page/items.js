const items = [
    {
        title: "Item 1",
        description: "Description for Item 1",
        media: [
            "https://via.placeholder.com/300x200",
            "https://www.w3schools.com/html/mov_bbb.mp4"
        ],
        link: "#"
    },
    {
        title: "Item 2",
        description: "Description for Item 2",
        media: [
            "https://via.placeholder.com/300x200",
            "https://www.w3schools.com/html/mov_bbb.mp4"
        ],
        link: "#"
    },
    {
        title: "Item 3",
        description: "Description for Item 3",
        media: [
            "https://via.placeholder.com/300x200",
            "https://www.w3schools.com/html/mov_bbb.mp4"
        ],
        link: "#"
    }
];

const pamphletSection = document.getElementById('pamphletSection');

items.forEach(item => {
    const pamphlet = document.createElement('div');
    pamphlet.classList.add('custom-pamphlet');

    let mediaHTML = '';
    item.media.forEach((media, index) => {
        if (media.endsWith('.mp4')) {
            mediaHTML += `<video class="${index === 0 ? 'active' : ''}" src="${media}" muted loop></video>`;
        } else {
            mediaHTML += `<img class="${index === 0 ? 'active' : ''}" src="${media}" alt="${item.title}">`;
        }
    });

    pamphlet.innerHTML = `
        <div class="carousel_inside">
            ${mediaHTML}    
            <div class="carousel-buttons">
                <button class="carousel-button prev">❮</button>
                <button class="carousel-button next">❯</button>
            </div>
        </div>
        <div class="custom-pamphlet-content">
            <h3 class="custom-pamphlet-title">${item.title}</h3>
            <p class="custom-pamphlet-description">${item.description}</p>
            <a href="${item.link}" class="custom-pamphlet-btn">Learn More</a>
        </div>
    `;

    pamphletSection.appendChild(pamphlet);

    const carousel = pamphlet.querySelector('.carousel');
    const images = carousel.querySelectorAll('img, video');
    let currentIndex = 0;

    const updateCarousel = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    };

    carousel.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel(currentIndex);
    });

    carousel.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel(currentIndex);
    });
});
