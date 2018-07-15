// Activates the Carousel
$('.carousel').carousel({
    interval: 3000
})

// Activates Tooltips for Social Links
$('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
})

$(document).ready(function () {
    $('.entry-content-description, .entry-description').find('a').attr('target', '_blank');

    var i = 0;
    var interval = setInterval(function() {
        var vglnk = $('.entry-content-description, .entry-description').find('a.vglnk').attr('target', '_blank');
        i++;
        if (vglnk.length || i === 20) {
            clearInterval(interval);
        }
    }, 1000);

    $.each($('.entry-content'), function(key, value) {
        var placeholder = value;
        var small = $(placeholder).find('.img-small').get(0);

        if (small) {
            var img = new Image();
            img.src = small.src;
            img.onload = function () {
                small.classList.add('loaded');
            };

            // 2: load large image
            var imgLarge = new Image();
            imgLarge.src = placeholder.dataset.large;
            imgLarge.onload = function () {
                imgLarge.classList.add('loaded');
            };
            placeholder.appendChild(imgLarge);
        }


    });
});
