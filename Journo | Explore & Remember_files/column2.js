$(window).load(function() {
    scrollToHash(getHeaderOffset(), 500);
});

$(document).ready(function () {
    $('#sidebar_nav').find('a').click(function (e) {
        e.preventDefault();

        setHash(e.target.hash);

        scrollToHash(getHeaderOffset(), 500);
    });
});

function getHeaderOffset(selector) {
    if (selector) {
        return $(selector).innerHeight();
    }

    return $('.topmenu:visible').innerHeight()
        + $('.journo-navbar').innerHeight();
}

function setHash(hash) {
    if (history.pushState) {
        history.pushState(null, null, hash);
    }
    else {
        window.location.hash = hash;
    }
}

function scrollToHash(offset, delay) {
    if (offset && window.location.hash) {
        $("html, body").animate({
            scrollTop: $(window.location.hash).offset().top - offset + 2
        }, delay);
    }
}