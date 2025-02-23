let carousel_target = document.getElementById('carousel_target');
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const roomId = getQueryParam('id');

let material_carousel = `<div class="carousel">
            <!-- list item -->
            <div class="list">
                <div class="item">
                    <img src="/Media_Files/Carousel_media/1.jpg">
                    <div class="content">
                        <div class="author">LUNDEV</div>
                        <div class="title">DESIGN SLIDER</div>
                        <div class="topic">ANIMAL</div>
                        <div class="des">
                            <!-- lorem 50 -->
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt
                            minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda
                            facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi
                            reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum
                            laudantium?
                        </div>
                        <div class="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="/Media_Files/Carousel_media/2.jpg">
                    <div class="content">
                        <div class="author">LUNDEV</div>
                        <div class="title">DESIGN SLIDER</div>
                        <div class="topic">ANIMAL</div>
                        <div class="des">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt
                            minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda
                            facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi
                            reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum
                            laudantium?
                        </div>
                        <div class="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="/Media_Files/Carousel_media/3.jpg">
                    <div class="content">
                        <div class="author">LUNDEV</div>
                        <div class="title">DESIGN SLIDER</div>
                        <div class="topic">ANIMAL</div>
                        <div class="des">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt
                            minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda
                            facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi
                            reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum
                            laudantium?
                        </div>
                        <div class="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="/Media_Files/Carousel_media/4.jpg">
                    <div class="content">
                        <div class="author">LUNDEV</div>
                        <div class="title">DESIGN SLIDER</div>
                        <div class="topic">ANIMAL</div>
                        <div class="des">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt
                            minima placeat, itaque eum neque officiis unde, eaque optio ratione aliquid assumenda
                            facere ab et quasi ducimus aut doloribus non numquam. Explicabo, laboriosam nisi
                            reprehenderit tempora at laborum natus unde. Ut, exercitationem eum aperiam illo illum
                            laudantium?
                        </div>
                        <div class="buttons">
                            <button>SEE MORE</button>
                            <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- list thumbnail -->
            <div class="thumbnail">
                <div class="item">
                    <img src="/Media_Files/Carousel_media/1.jpg">
                    <div class="content">
                        <div class="title">
                            Name Slider
                        </div>
                        <div class="description">
                            Description
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="/Media_Files/Carousel_media/2.jpg">
                    <div class="content">
                        <div class="title">
                            Name Slider
                        </div>
                        <div class="description">
                            Description
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="/Media_Files/Carousel_media/3.jpg">
                    <div class="content">
                        <div class="title">
                            Name Slider
                        </div>
                        <div class="description">
                            Description
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="/Media_Files/Carousel_media/4.jpg">
                    <div class="content">
                        <div class="title">
                            Name Slider
                        </div>
                        <div class="description">
                            Description
                        </div>
                    </div>
                </div>
            </div>
            <!-- next prev -->

            <div class="arrows">
                <button id="prev"><</button>
                <button id="next">></button>
            </div>
            <!-- time running -->
            <div class="time"></div>
        </div>` ;
carousel_target.appendChild(material_carousel) ;








































let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

console.log(nextDom) ;
console.log(prevDom) ;
console.log(carouselDom) ;
console.log(SliderDom) ;
console.log(thumbnailBorderDom) ;
console.log(thumbnailItemsDom) ;
console.log(timeDom) ;


thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}