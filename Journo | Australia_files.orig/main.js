$("#header_top_menu").click(function () {
    $("#headernav").toggle();
});

$('#close_btn').on('click', function () {
    $("#headernav").toggle();
});

$(window).on('load', function () {
    placeFooter();
});

$(window).resize(function () {
    placeFooter();
});

$(document).ready(function () {
    var hash = window.location.hash;

    if (hash == '#features') {
        $('#featureid').addClass('active');
    }
    if (hash == '#manifesto') {
        $('#manifestoid').addClass('active');
    }

    var foo = $('input[name="method"]:checked');

    if (foo.is(':checked')) {
        foo.parent().addClass('promoline');
        $('#code').attr('disabled', true);
        $('#submitpromo').attr('disabled', true);
    }

    $('input[name="method"]').change(function () {
        $("#codemsg").empty();
        $('#code').val('');
        $('#buynow').attr('disabled', false);

        if ($(this).attr('id') == 'promoid') {
            $('#code').attr('disabled', false);
            $('#submitpromo').attr('disabled', false);
        } else {
            $('#code').attr('disabled', true);
            $('#submitpromo').attr('style', '');
            $('#submitpromo').attr('disabled', true);
        }

        if ($(this).is(':checked')) {
            $(this).attr('checked', true);
            var children = $('.promoline').children('input[name="method"]:not(:checked)');

            if (children.length > 0) {
                $(children).each(function () {
                    $(this).parent().removeClass('promoline');
                    $(this).attr('checked', false);
                })
            }

            $(this).parent().addClass('promoline');
        }
    });


    if ($.session.get('plan') != null && $.session.get('price') != null) {
        $('#display_plan').prepend($.session.get('plan'));
        $('#StripPlan').val($.session.get('plan'));
        $('#display_plan em').text($.session.get('price'));
        $('.transactions-credit span').text($.session.get('price'));
        $('#totalamt').val(base64_encode($.session.get('price').replace('$', '')));
        $('#product_id').val($.session.get('product_id'));

        $('.promocode-subscriptions-list')
            .find('.subscription-box')
            .find("span:contains('" + $.session.get('plan') + "')")
            .parent()
            .addClass('subscription-box-heading-selected');
    }

    /**
     * Make selectable plan red
     */
    $('.choose-plan').click(function() {
        $('.subscription-box-heading1').removeClass('subscription-read');
        $(this).closest('.subscription-box').find('.subscription-box-heading1').addClass('subscription-read');
    });
    $('#payment_info').on('hide.bs.modal', function (event) {
        $('.subscription-read').removeClass('subscription-read');
        $('.plan-title-annual').addClass('subscription-read');
    });

    $('#payment_info').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal

        var modal = $(this);
        modal.find('#display_plan .plan-name').text(button.data('plan'));
        modal.find('#StripPlan').val(button.data('plan'));
        modal.find('#display_plan em').text('$' + button.data('price'));
        modal.find('.transactions-credit span').text('$' + button.data('price'));
        modal.find('#totalamt').val(base64_encode(button.data('price').toString().replace('$', '')));
        modal.find('#product_id').val(button.data('product_id'));

        $('.promocode-subscriptions-list')
            .find('.subscription-box')
            .find("span:contains('" + button.data('plan') + "')")
            .parent()
            .addClass('subscription-box-heading-selected');

        setTimeout(function(){
            fleXenv.globalInit();
        }, 200);
    });

    // Custom Checkbox jquery //
    $cust_lbl = 'label';
    $cust_chk = 'checked';
    $cust_opt_wrp = '.custom-opt';
    $cust_chk_wrp = '.custom-chk';
    $cust_input_chk = "input[type='checkbox']";
    $cust_input_opt = "input[type='radio']";

    $($cust_chk_wrp + ' ' + $cust_lbl + ', ' + $cust_opt_wrp + ' ' + $cust_lbl).each(function () {
        $(this).find('input:checked').parent(this).addClass($cust_chk);

    });

    $(document).on('change', $cust_input_chk, function (event) {
        if ($(this).is(":checked")) {
            $(this).attr('checked', true);
        } else {
            $(this).attr('checked', false);
        }
        $(this).parents('label').toggleClass($cust_chk);
        event.stopImmediatePropagation();
    });

    $(document).on('change', $cust_input_opt, function (event) {
        $($cust_opt_wrp).find(("input:not(:checked)")).parents($cust_lbl).removeClass($cust_chk);
        $(this).parents($cust_lbl).addClass($cust_chk);
        event.stopImmediatePropagation();
    });
});

function toggleUpdateSubsctiptionSlide() {
    $('.headernav-home').slideToggle('fast', function () {
        var buttonText;

        if ($('.headernav-home').is(":visible")) {
            setEqualHeightToPricingBoxes();

            buttonText = 'Not Now'

            $('#header_top_menu_ds').hide();
        } else {
            buttonText = 'Update Subscription';

            $('#header_top_menu_ds').show();
        }

        $('#header_top_menu_ds').html(buttonText);

        refreshBodyScrollSpy();
    });
}

$('#header_top_menu_ds').on('click', function () {
    toggleUpdateSubsctiptionSlide();
});

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=939748632779674";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function placeFooter() {
    var documentHeight = $('body').height();
    var windowHeight = $(window).height();

    if (documentHeight < windowHeight) {
        $("#footer").addClass("navbar-fixed-bottom");

        var box = $('.box-height-to-footer');

        var boxHeightToFooterOffset = box.offset();

        if (boxHeightToFooterOffset) {
            var boxPaddingMargin = parseInt(box.css('padding-top')) + parseInt(box.css('padding-bottom')) + parseInt(box.css('margin-top')) + parseInt(box.css('margin-bottom'));

            var boxHeightToFooterHeight = windowHeight - boxHeightToFooterOffset.top - $('#footer').height() - boxPaddingMargin;

            box.height(boxHeightToFooterHeight);
        }
    }
}
