function ready() {
    // fetch api image
    const apiKey = "B0FMBYYl_wacYSCMSaxFpwNTkffXqNVwkeYE5VqyH1Q";
    const apiUrl = "https://api.unsplash.com/photos/?client_id=" + apiKey;
    var divNode, slider_image, slideData;
    window.addEventListener("DOMContentLoaded", function () {
        fetch(apiUrl)
            .then(res => res.json())
            .then(function (slideImages) {
                slideData = slideImages;

                return slideData.map(function (singleImg) {
                    slider_image = singleImg.urls.full;
                    divNode = document.createElement("div");
                    imgNode = document.createElement("img");
                    divNode.classList = "pillow-slide"
                    divNode.style = "width:" + pillow_container_width + "px;";
                    imgNode.src = slider_image;
                    imgNode.alt = "Slider Image";
                    divNode.appendChild(imgNode);
                    document.querySelector('.pillow-wrapper').prepend(divNode)
                })
            })
    }) 

    //declaire varible
    const pillow_container = document.querySelector(".pillow-container");
    const pillow_wrapper = document.querySelector(".pillow-wrapper");
    const pillow_slide_prev = document.querySelector(".pillow-prev");
    const pillow_slide_next = document.querySelector(".pillow-next");

    // initialize Variale
    const pillow_container_width = pillow_container.clientWidth; 

    // add Event Listner on slider next and prev button 
    pillow_slide_prev.addEventListener("click", pillowSlidePrev);
    pillow_slide_next.addEventListener("click", pillowSlideNext);

    var pillow_slide_move_next = 0, pillow_slide_move_prev = 0, pillow_total_slide, pillow_slide_move_count;

    var transform_value = window.getComputedStyle(pillow_wrapper);
    var matrix = new WebKitCSSMatrix(transform_value.webkitTransform);
    var currentSlideValue = matrix.m41;

    function pillowSlidePrev() {
        if (currentSlideValue !== 0) {
            pillow_slide_move_prev = currentSlideValue -= pillow_container_width;
        }
        pillow_wrapper.style = "transform: translateX(-" + pillow_slide_move_prev + "px)";
    }

    function pillowSlideNext() { 
        pillow_total_slide = pillow_wrapper.childElementCount; 
        pillow_slide_move_count = pillow_container_width * Math.round(pillow_total_slide-1);
        if (currentSlideValue !== pillow_slide_move_count) {
            pillow_slide_move_next = currentSlideValue += pillow_container_width;
            pillow_wrapper.style = "transform: translateX(-" + pillow_slide_move_next + "px)";
        } else return false
    }
} //ready function end
document.addEventListener("readystatechange", ready); 
