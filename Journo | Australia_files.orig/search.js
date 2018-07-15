$(document).ready(function () {
    getCurrentSearchInput().autocomplete({
        source: site_url + 'search',
        position: {my: "center top+22", at: "center bottom"},
        delay: 300,
        minLength: 3,
        select: function (event, ui) {
            $(this).val('');

            if (ui.item.data.type === 'user') {
                window.location.href = site_url + 'profile/' + ui.item.data.username;
            } else {
                window.location.href = site_url + 'place/' + ui.item.data.name1;
            }

            return false;
        },
        open: function (event, ui) {
            var searchInput,
                autocompletePosition,
                searchInputPosition,
                posTop,
                posLeft;

            autocompletePosition = $('ul.ui-autocomplete').offset();
            searchInput = getCurrentSearchInput();
            searchInputPosition = searchInput.offset();

            posTop = autocompletePosition.top - $('#white_arrow_up').height();
            posLeft = searchInputPosition.left + (searchInput.width() / 2) - ($('#white_arrow_up').width() / 2);

            $('#white_arrow_up')
                .css('top', posTop)
                .css('left', posLeft)
                .show();
        },
        close: function (event, ui) {
            $('#white_arrow_up').hide();
        },
        focus: function (event, ui) {
            if (ui.item.data.type === 'user') {
                this.value = ui.item.data.username;
            } else {
                this.value = ui.item.data.name1;
            }

            event.preventDefault();
        }
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        if (item.data.type === 'user') {
            return renderUser(ul, item);
        }

        return renderPlace(ul, item);
    };

    getCurrentSearchInput().autocomplete('widget').off('mouseenter');

    function renderUser(ul, item) {
        return $("<li>")
            .addClass('search-result')
            .addClass('search-result-user')
            .attr("data-value", item.value)
            .append(
                '<a href="' + site_url + 'profile/' + item.data.username + '">' +

                '<div class="search-picture">' +
                '<img src="' + item.data.avatar_url + '"/>' +
                '</div>' +

                '<div class="clearfix"></div>' +

                '<div class="search-label">' +
                '<strong>@' + item.data.username + '</strong>' +
                '<br/>' +
                '<span>' + item.data.fullName + '</span>' +
                '</div>' +

                '</a>'
            )
            .appendTo(ul);
    }

    function renderPlace(ul, item) {
        return $("<li>")
            .addClass('search-result')
            .addClass('search-result-place')
            .attr("data-value", item.value)
            .append(
                '<a href="' + site_url + 'place/' + item.data.name1 + '">' +

                '<div class="search-picture">' +
                '<img src="' + site_url + 'images/currently-in-pin-off-2x.png"/>' +
                '</div>' +

                '<div class="clearfix"></div>' +

                '<div class="search-label">' +
                '<strong>' + item.data.name1 + '</strong>' +
                '</div>' +

                '</a>'
            )
            .appendTo(ul);
    }

    function getCurrentSearchInput() {
        return $('.topmenu:visible').find('.search_input');
    }

    $('.header-search').click(function (e) {
        e.preventDefault();

        var input = getCurrentSearchInput();

        var searchQuery = input.val();

        if (searchQuery) {
            input.autocomplete('search', searchQuery);
        } else {
            input.animate({
                width: 'toggle'
            }, function () {
                input.val('');
            });

            input.focus();
        }
    });

    $('.search_input').keypress(function (e) {
        if (e.which == 13) { // Enter key pressed
            var searchQuery = $(this).val();

            if (searchQuery) {
                $(this).autocomplete('search', searchQuery);
            }
        }
    });
});