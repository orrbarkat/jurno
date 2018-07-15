$(document).ready(function () {
    if (!markers.length) {
        $('#journo-map').css('bottom', $('#footer').innerHeight());
    }

    L.mapbox.accessToken = 'pk.eyJ1Ijoiam91cm5vIiwiYSI6InVIa1lseDQifQ.MXbP1ePL8lDdFHHtBBlZ_Q';
    var map = L.mapbox.map('journo-map', map_style_id);

    var geoJSON = makeGeoJsonForMarkers();

    var featureLayer = L.mapbox.featureLayer().setGeoJSON(geoJSON).addTo(map);

    drawLines(map);

    if (geoJSON.length) {
        map.fitBounds(featureLayer.getBounds());
    } else {
        map.fitWorld();
        $('.journo-map-no-entries').show();
    }
    // Disable drag and zoom handlers.
    //map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.keyboard.disable();

    // Disable tap handler, if present.
    if (map.tap) map.tap.disable();

    featureLayer.on('click', function (e) {
        setHash(e.layer.feature.properties.url);

        scrollToHash(getHeaderOffset(), 500);
    });

    // Hack: The lines are not scaling when zooming. Hide lines when it zooming
    map.on('zoomstart', function (e) {
        $('path[stroke-opacity]').attr('stroke-opacity', 0);
    });
    map.on('zoomend', function (e) {
        $('path[stroke-opacity]').attr('stroke-opacity', 1);
    });

    var scrollItems = $('.journo-box, .entry-box');
    var lastId;

    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + getHeaderOffset();

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });

        // Get the id of the current element
        cur = cur[cur.length - 1];
        var activeVisibleIndex = cur && $(cur).attr('data-visible-index') ? $(cur).attr('data-visible-index') : null;

        if (lastId !== activeVisibleIndex) {
            lastId = activeVisibleIndex;

            setActiveMarker(featureLayer, activeVisibleIndex);
        }
    });


    function setActiveMarker(featureLayer, activeVisibleIndex) {
        var geoJson = makeGeoJsonForMarkers(activeVisibleIndex);

        featureLayer.setGeoJSON(geoJson);

        if (activeVisibleIndex) {
            var marker = findMarkerByVisibleIndex(markers, activeVisibleIndex);

            map.flyTo([
                marker.locationLat ? marker.locationLat : 0,
                marker.locationLng ? marker.locationLng : 0
            ], 10);
        } else {
            map.fitBounds(featureLayer.getBounds());
        }

        map.invalidateSize(); // refresh
    }

    $('.entry-header-click').click(function (e) {
        e.preventDefault();

        var isMobileView = $(window).width() <= 767;

        if (isMobileView) {
            showMobileMap(map);
        }

        var markerVisibleIndex = $(this).closest('.entry-box').attr('data-visible-index');

        setActiveMarker(featureLayer, markerVisibleIndex);
    });

    $('#map_slide_arrow').click(function (e) {
        e.preventDefault();

        hideMobileMap();
    });
});

function makeGeoJsonForMarkers(activeVisibleIndex) {
    var geojson = [];

    for (var i = 0; i < markers.length; i++) {
        if (!markers[i].isLocationEnabled) continue;

        geojson.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [markers[i].locationLng, markers[i].locationLat]
            },
            properties: {
                'marker-color': '#FD4526',
                'marker-size': markers[i].visibleIndex == activeVisibleIndex ? 'large' : 'medium',
                'marker-symbol': markers[i].visibleIndex,
                url: '#' + markers[i].uuid,
                uuid: markers[i].uuid
            }
        });

    }

    return geojson;
}

function drawLines(map) {
    var coordinates = [];

    for (var i = 0; i < markers.length; i++) {
        if (!markers[i].isLocationEnabled) continue;

        coordinates.push([markers[i].locationLng, markers[i].locationLat]);
    }

    var linesLayer = L.geoJson({
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: coordinates
        },
        properties: {
            "stroke": "#FD4526",
            "stroke-opacity": 1,
            "stroke-width": 4,
        }
    }, {style: L.mapbox.simplestyle.style}).addTo(map);

    return linesLayer;
}

function showMobileMap(map) {
    $('#journo-map').animate({
        left: "0"
    });

    $('.journo-box, .entries-box')
        .addClass('pos-relative')
        .animate({
            left: "-100%"
        }, function () {
            $('#map_slide_arrow').show();

            map.invalidateSize(); // refresh
        });
}

function hideMobileMap() {
    $('#map_slide_arrow').hide();

    $('#journo-map').animate({
        left: "100%"
    }, function () {
        $('#journo-map').css('left', '');
    });

    $('.journo-box, .entries-box').animate({
        left: "0"
    }, function () {
        $('.journo-box, .entries-box').removeClass('pos-relative');
    });
}

function findMarkerByVisibleIndex(markers, visibleIndex) {
    var marker = null;

    $.each(markers, function (index, _marker) {
        if (visibleIndex == _marker.visibleIndex) {
            marker = _marker;
        }
    });

    return marker;
}
