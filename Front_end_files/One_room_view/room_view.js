let insertion_point = document.getElementById('room_view_carousel') ;



let content_inside_page = `<div class="list">
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
                <button id="prev"><< /button>
                        <button id="next">></button>
            </div>
            <!-- time running -->
            <div class="time"></div>` ;

insertion_point.innerHTML = content_inside_page ;