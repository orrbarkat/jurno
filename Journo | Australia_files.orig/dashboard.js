$(window).resize(function () {
    setEqualHeightToPricingBoxes();
});

$(document).ready(function () {
    initAndSetCurrentlyInDestinationBG($('#currently_in_destination_switch').attr('checked'));

    if (window.location.hash === '#update-subscription-open') {
        toggleUpdateSubsctiptionSlide();

        setHash('#update-subscription')
    }

    $('#close_update_subscription').click(function (e) {
        e.preventDefault();

        toggleUpdateSubsctiptionSlide();

        $("html, body").animate({
            scrollTop: $('#update-subscription').offset().top - getHeaderOffset()
        }, 500);
    });

    $('#cancel_subscription').find('a').click(function (e) {
        e.preventDefault();

        var source = $(this).attr('data-source');

        switch (source) {
            case 'stripe':
                $('#cancel_subscription_web_modal').modal({
                    keyboard: true
                });
                break;
            case 'app' :
                $('#cancel_subscription_app_modal').modal({
                    keyboard: true
                });
                break;
            default:
                console.error('Invalid subscription source');
        }
    });

    $('#cancel_subscription_button').click(function (e) {
        e.preventDefault();

        $('#cancel_subscription_button').prop('disabled', true);

        $.post(
            site_url + 'subscription/cancel',
            {},
            function (data) {
                if (data.status) {
                    $('#cancel_subscription_web_modal').modal('hide');

                    $('#unsubscribed_modal').modal({
                        keyboard: true
                    });
                } else if (data.redirectTo) {
                    window.location = data.redirectTo;
                } else {
                    alert(data.message);

                    $('#cancel_subscription_button').prop('disabled', false);
                }
            },
            'json'
        );
    });

    $('#unsubscribed_modal').on('hidden.bs.modal', function () {
        location.reload();
    })

    $('#currently_in_destination_switch').change(function () {
        initAndSetCurrentlyInDestinationBG(this.checked);
    });

    $('#button_show_update_password').find('a').click(function (e) {
        e.preventDefault();

        $(this).parent().hide();

        toggleUpdatePasswordSlide();
    });

    $('#cancel_pass').click(function (e) {
        e.preventDefault();

        $('#changepass-form')[0].reset();
        $('#changepass-form').validate().resetForm();

        $('#button_show_update_password').show();

        toggleUpdatePasswordSlide();
    });
});

function setEqualHeightToPricingBoxes() {
    if ($(window).width() < 767) {
        $('.subscription-main').removeAttr('height');
        return;
    }

    var maxHeight = 0;

    $('.subscription-main').each(function (index, box) {
        if ($(box).height() > maxHeight) {
            maxHeight = $(box).height();
        }
    });

    if (maxHeight) {
        $('.subscription-main').height(maxHeight);
    }
}

function initAndSetCurrentlyInDestinationBG(isChecked) {
    var pin_class_on = 'currently-in-destination-pin-on';
    var pin_class_off = 'currently-in-destination-pin-off';

    var pin_class = isChecked ? pin_class_on : pin_class_off;
    var remove_pin_class = isChecked ? pin_class_off : pin_class_on;

    $('.currently-in-destination-pin')
        .addClass(pin_class)
        .removeClass(remove_pin_class);
}

function toggleUpdatePasswordSlide() {
    $('#change_password_form').slideToggle('fast');

    refreshBodyScrollSpy();
}
