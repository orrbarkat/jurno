$(document).ready(function () {
    $('.journo-link').click(function (e) {
        e.preventDefault();
    });

    $('.entry-content').click(function () {
        //$('.modal-body').empty();
        //var title = $(this).parent('a').attr("title");
        //$('.modal-title').html(title);
        if ($(this).data('type') == 'image') {
            $('#myModal .modal-body video').hide();
            $('#myModal .modal-body .entry-video-play-button').hide();
            $('#myModal .modal-body img')
                .attr('src', $(this).data('original'))
                .css('max-height', $(window).height() * 0.8)
                .show();
        } else if ($(this).data('type') == 'video') {
            $('#myModal .modal-body img').hide();
            $('#myModal .modal-body video')
                .attr('src', $(this).data('original'))
                .css('max-height', $(window).height() * 0.8)
                .show();
            $('#myModal .modal-body .entry-video-play-button').show();
        }
        //$('.modal-body').html();
        $('#myModal').modal({show: true});
    });

    $('.modal-lightbox .entry-video-play-button').click(function (e) {
        var video = $(this).prev('video').get(0);

        if (video.paused) {
            video.play();
            $(this).addClass('fade');
        } else {
            video.pause();
            $(this).removeClass('fade');
        }
    });

    $('.entry-report-btn').click(function (e) {
        e.preventDefault();

        var entryUuid = $(this).closest('.entry-box').attr('id');

        $('#entryUuid').val(entryUuid);

        $('#entry_report_modal').modal({
            keyboard: true
        });
    });

    $('#report_form').submit(function (e) {
        e.preventDefault();

        $('#submit_entry_report_modal').prop('disabled', true);

        postReport();
    });

    $('.entry-like-btn').click(function (e) {
        e.preventDefault();

        var entryUuid = $(this).closest('.entry-box').attr('id');

        var state = $(this).hasClass('entry-like-btn-active') ? false : true;

        toggleLike(entryUuid, state);
    });


    function postReport() {
        $.post(
            site_url + 'entry/report',
            $('#report_form').serialize(),
            function (data) {
                if (data.status) {
                    $('#entry_report_modal').modal('hide');
                    $('#report_text').val('');
                } else {
                    alert(data.message);

                    $('#submit_entry_report_modal').prop('disabled', false);
                }
            },
            'json'
        );
    }

    function toggleLike(entryUuid, state) {
        $('.entry-like-btn').prop('disabled', true);

        $.post(
            site_url + (state ? 'entry/like/' : 'entry/unlike/') + entryUuid,
            {},
            function (data) {
                if (data.status) {
                    var likeButton = $('#' + entryUuid).find('.entry-like-btn');

                    if (state) {
                        likeButton.addClass('entry-like-btn-active');
                    } else {
                        likeButton.removeClass('entry-like-btn-active');
                    }

                    likeButton
                        .next('.entry-like-count')
                        .find('span.like-count')
                        .html(data.likeCount)
                        .next('span.like-count-label')
                        .html(data.likeCount === 1 ? 'LIKE' : 'LIKES');
                } else if (data.redirectTo) {
                    window.location = data.redirectTo;
                } else {
                    alert(data.message);
                }

                $('.entry-like-btn').prop('disabled', false);
            },
            'json'
        );
    }
});
