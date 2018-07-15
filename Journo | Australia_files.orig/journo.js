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
});
