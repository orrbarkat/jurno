$.validator.addMethod(
    "regex",
    function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    },
    "Please check your input."
);

$(document).ready(function () {
    //signup form validation
    $("#signup-form").validate({

        // Specify the validation rules
        rules: {
            first_name: {
                required: true,
                maxlength: 40,
            },
            last_name: {
                required: true,
                maxlength: 40,
            },
            email: {
                required: true,
                email: true,
                maxlength: 40,
            },
            username: {
                required: true,
                minlength: 3,
                maxlength: 40,
                regex: /^[A-Za-z0-9_]+$/ // Letters, digits and underscores
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 255,
            },
            confirm_password: {
                minlength: 6,
                equalTo: "#password"
            },
            city: "required",
            state: "required",
            zip: "required",
        },

        // Specify the validation error messages
        messages: {
            firstname: {
                required: "Please enter your first name",
            },
            lastname: {
                required: "Please enter your last name",
            },
            username: {
                regex: "Your username must contain only letters, numbers and underscores"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
            },
            confirm_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                equalTo: "Please enter the same password as above",
            },
            email: "Please enter a valid email address",
            city: "Please enter your city",
            state: "Please enter your state",
            zip: "Please enter your zipcode",
        },

        submitHandler: function (form) {

            var formid = $('#signup-form');
            var file = $('input[type="file"]', formid).val();
            var exts = ['jpg', 'jpeg', 'gif', 'png', 'PNG'];
            var msg = $('.msg', formid);
            msg.hide();

            if (file) {
                // split file name at dot
                var get_ext = file.split('.');
                // reverse name to check extension
                get_ext = get_ext.reverse();

                // check file type is valid as given in 'exts' array
                if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
                    //msg.show().html( '<strong style="color:#090">Allowed extension!</strong>' );
                    form.submit();
                } else {
                    msg.show().html('<strong style="color:#f00">Please upload files having extensions: <b>' + exts.join(', ') + '</b> only.</strong>');
                }
            } else {
                form.submit();
            }
            /*	var formData = {
             'name'              : $('#first_name').val(),
             'email'             : $('#email').val(),
             };

             // process the form
             $.ajax({
             type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
             url         : 'http://54.175.179.110/dev/service/signup', // the url where we want to POST
             data        : formData, // our data object
             dataType    : 'json', // what type of data do we expect back from the server
             encode          : true,
             success: function(data)
             {
             alert(data); // show response from the php script.
             },error : function(data) {
             alert(data);
             }
             })*/
            // form.submit();
        }
    });

    //Login page validation
    $("#signin-form").validate({
        // Specify the validation rules
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            },
        },
        messages: {
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
            },
            email: "Please enter a valid email address",
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    //change password form validation
    var change_pass_validator = $("#changepass-form").validate({
        // Specify the validation rules
        rules: {
            old_password: {
                required: true,
                minlength: 6,
                maxlength: 255,
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 255,
            },
            confirm_password: {
                minlength: 6,
                maxlength: 255,
                equalTo: "#password"
            },
        },
        messages: {
            old_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
            },
            password: {
                required: "Please provide a New Password",
                minlength: "Your password must be at least 6 characters long",
            },
            confirm_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                equalTo: "New Password and Confirm Password do not match",
            },
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    //forgotpassword form validation
    $("#forgotpass-form").validate({
        // Specify the validation rules
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            email: "Please enter a valid email address",
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    //editprofile form validation
    $("#edit-form").validate({
        // Specify the validation rules
        rules: {
            first_name: {
                required: true,
                maxlength: 40,
            },
            last_name: {
                required: true,
                maxlength: 40,
            },
            email: {
                required: true,
                email: true,
                maxlength: 40,
            },
            username: {
                required: true,
                minlength: 3,
                maxlength: 40,
                regex: /^[A-Za-z0-9_]+$/ // Letters, digits and underscores
            },
            bio: {
                maxlength: 150
            },
            website: {
                regex: /^((http|https):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i,
                maxlength: 150,
            }
        },
        messages: {
            firstname: {
                required: "Please enter your first name",
            },
            lastname: {
                required: "Please enter your last name",
            },
            email: "Please enter a valid email address",
            username: {
                regex: "Your username must contain only letters, numbers and underscores"
            },
            website: {
                regex: "Website is not a valid URL"
            },
        },
        submitHandler: function (form) {

            var formid = $('#edit-form');
            var file = $('input[type="file"]', formid).val();
            var exts = ['jpg', 'jpeg', 'gif', 'png'];
            var msg = $('.msg', formid);
            msg.hide();

            if (file) {
                // split file name at dot
                var get_ext = file.split('.');
                // reverse name to check extension
                get_ext = get_ext.reverse();

                // check file type is valid as given in 'exts' array
                if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {
                    //msg.show().html( '<strong style="color:#090">Allowed extension!</strong>' );
                    form.submit();
                } else {
                    msg.show().html('<strong style="color:#f00">Please upload files having extensions: <b>' + exts.join(', ') + '</b> only.</strong>');
                }
            } else {
                form.submit();
            }

        }
    });

    $('#bioid').keydown(function (e) {
        $(this).closest('form').validate().element(this);
    });

    $("#subscription").click(function () {
        $('html, body').animate({
            scrollTop: $("#update-subscription").offset().top
        }, 2000);
    });

    $("#editprofiles").click(function () {
        $('html, body').animate({
            scrollTop: $("#edit-profile").offset().top
        }, 2000);
    });

    $("#changepass").click(function () {
        $('html, body').animate({
            scrollTop: $("#change-password").offset().top
        }, 2000);
    });

    $("#featureid").click(function () {
        $('html, body').animate({
            scrollTop: $("#features").offset().top
        }, 2000);
    });

    $("#manifestoid").click(function () {
        $('html, body').animate({
            scrollTop: $("#manifesto").offset().top
        }, 2000);
    });

    $("#contactus-form").validate({
        rules: {
            contactName: "required",
            email: {
                required: true,
                email: true
            },
            message: "required",
        },
        // Specify the validation error messages
        messages: {
            contactName: "Please enter your Name",
            message: "Please enter your Message",
            email: "Please enter a valid email address",
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    /*$('#pricing_plan').on('click',function(){
     var plan = $('#selected_plan span').text();
     var price = $('#pricevalue').text();
     $.cookie("plan", plan, { path:'/'});
     $.cookie("price", price, { path:'/'});
     window.location = $(this).data('url');
     //$.removeCookie("plan");
     //$.removeCookie("price");
     });
     if($.cookie("plan")!= null) {
     $('#packagename span').text($.cookie("plan")+' Plan');
     $.removeCookie("plan");
     } else {
     $('#packagename span').text('30-day free trial');
     }*/

    var loc = window.location;
    var pathName = loc.pathname.substring(loc.pathname.lastIndexOf('/'));
    if (pathName == '/promocode') {
        $('#promo-code-block').css('display', 'block');
        $('body').addClass('promocode-opened');
    }
    var plan = '';
    var price = '';
    $('[id^="selectplan_"]').each(function () {
        $(this).on('click', function () {
            product_id = $(this).data('value');
            rowNum = $(this).data('id').replace('selectplan_', '');
            var planname = '#planname' + rowNum;
            plan = $(planname + ' span').text();
            var planprice = '#planprice' + rowNum;
            price = $(planprice).text();
            price = $.trim(price);
            $.session.remove('price');
            $.session.set("plan", plan);
            $.session.set("price", price);
            $.session.set('product_id', product_id);
            //$('body').css('overflow','hidden');
            window.location = site_url + 'pricing/promocode';

        });
    });

    $('#buynow').on('click', function () {

        var selectedvalue = $('input[name="method"]:checked').val();

        if (selectedvalue == 'debit' || selectedvalue == 'Promo') {

            var e = document.getElementById("expDateYear");
            var optionSelIndex = e.options[e.selectedIndex].value;
            var optionSelectedText = e.options[e.selectedIndex].text;

            $("#payment-form").validate({

                // Specify the validation rules
                rules: {
                    creditCardNumber: {
                        required: '#debitid:checked'
                    },
                    expDateYear: {
                        required: '#debitid:checked'
                    },
                    expDateMonth: {
                        required: '#debitid:checked'
                    },
                    cvv2Number: {
                        required: '#debitid:checked'
                    },
                    code: {
                        required: '#promoid:checked'
                    },

                    /* creditCardNumber: "required",
                     expDateYear: "required",
                     expDateMonth: "required",
                     cvv2Number: "required", */
                },

                // Specify the validation error messages
                messages: {
                    creditCardNumber: "Please enter card number",
                    expDateYear: "Please select expiry year",
                    expDateMonth: "Please select expiry month",
                    cvv2Number: "Please enter cvv number",
                    code: "Please enter promo code",
                },

                submitHandler: function (form) {
                    form.submit();
                }
            });
        } /* else if (selectedvalue=='Promo') {

         $("#payment-form").validate({

         // Specify the validation rules
         rules: {
         code: {
         required: '#promoid:checked'
         },
         //code: "required",
         },

         // Specify the validation error messages
         messages: {
         code: "Please enter promo code",
         },

         submitHandler: function(form) {
         form.submit();
         }
         });
         } */ else {
            form.submit();
        }
    });

    /*$('#submitpromo').on('click',function() {
     $('#codemsg').html();
     var promocode = $('#code').val();
     var amtvalue = $.session.get('price').replace('$','');
     $.ajax({
     type: "POST",
     url: 'promoweb',
     data: { code: promocode, amount: amtvalue }, // serializes the form's elements.
     success: function(data)
     {
     var res = $.parseJSON(data);

     if(typeof res.error!='undefined') {
     $('#codemsg').html(res.error.description);
     } else {
     $('#payid').attr('checked',true);
     $('#debitid').parent().removeClass('promoline');
     $('#payid').parent().addClass('promoline');
     $('#debitid').attr('disabled',true);
     $('#display_plan em').text('$ '+res);
     $('.transactions-credit span').text('$ '+res);
     $('#totalamt').val(res);
     $('#discount').val(res);
     return res;
     }
     }
     });
     });*/

    $('#submitpromo').on('click', function () {
        $('#codemsg').html();
        var promocode = $('#code').val();
        var amtvalue = $.session.get('price').replace('$', '');
        $.ajax({
            type: "POST",
            url: 'promoweb',
            data: {code: promocode, amount: amtvalue}, // serializes the form's elements.
            success: function (data) {
                var res = $.parseJSON(data);

                if (typeof res.error != 'undefined') {
                    $('.transactions-credit span').text($.session.get('price'));
                    $('#codemsg').html(res.error.description);
                    $('#buynow').attr('disabled', true);
                } else {
                    if (res.promoprice > 0) {
                        $("#codemsg").empty();
                        $('#buynow').attr('disabled', false);
                        /*$('#payid').attr('checked',true);
                         $('#debitid').parent().removeClass('promoline');
                         $('#payid').parent().addClass('promoline');
                         */
                        //$('#payid').attr('disabled',true);
                        //$('#debitid').attr('disabled',true);
                        // $('#display_plan em').text('$'+res.amount);
                        $('.transactions-credit span').text('$' + res.amount);
                        $('#totalamt').val(base64_encode(res.amount));
                        $('#discount').val(res.amount);
                        $('#disproductid').val(res.productid);
                        return res;
                    } else {
                        alert('Your subscription updated successfully.');
                        window.location = site_url + 'site/dashboard';
                    }

                }
            }
        });

    });

    $('#start').on('click', function () {
        $("input:checkbox").attr('checked', false);
        $("label.checked").removeClass('checked');
        $("#hdnCount").val('0');
        $('#started_block').css('display', 'block');
        $('#start').hide();
    });

    $('#paypal-close-btn').on('click', function () {
        window.location.href = site_url + '/dashboard';
    });

    //$("#header_top_menu_ds").trigger("click");
    $('#f_name').attr('disabled', true);
    $('#l_name').attr('disabled', true);
    $('#u_name').attr('disabled', true);
    $('#emailid').attr('disabled', true);
    $('#bioid').attr('disabled', true);
    $('#websiteid').attr('disabled', true);
    $('#currently_in_destination_switch').attr('disabled', true);
    $('#profile_img').attr('disabled', true);
    $('#browse_button').addClass('disabled');
    $('.currently-in-destination-switch').addClass('disabled');

    $(".footerlink a").click(function () {

        $('.navbar-nav a').not(this).removeClass('active');
        $(this).addClass('active');
        //e.preventDefault();
        var div = $(this).attr("data-div");
        //e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#" + div).offset().top
        }, 2000);
        $('.navbar-collapse').removeClass('in').addClass('collapse');
        //$('.navbar-collapse').css('height', '');
    });

    $('#editbutton').on('click', function () {
        $('.edit_btn').hide();
        $('.save_btn').show();
        $('#f_name').attr('disabled', false);
        $('#l_name').attr('disabled', false);
        $('#u_name').attr('disabled', false);
        $('#emailid').attr('disabled', false);
        $('#bioid').attr('disabled', false);
        $('#websiteid').attr('disabled', false);
        $('#currently_in_destination_switch').attr('disabled', false);
        $('#profile_img').attr('disabled', false);
        $('#browse_button').removeClass('disabled');
        $('.currently-in-destination-switch').removeClass('disabled');

    });

    $('#cancel').on('click', function () {
        $('.edit_btn').show();
        $('.save_btn').hide();
        $('#f_name').attr('disabled', true);
        $('#l_name').attr('disabled', true);
        $('#u_name').attr('disabled', true);
        $('#emailid').attr('disabled', true);
        $('#bioid').attr('disabled', true);
        $('#websiteid').attr('disabled', true);
        $('#currently_in_destination_switch').attr('disabled', true);
        $('#profile_img').attr('disabled', true);
        $('#browse_button').addClass('disabled');
        $('.currently-in-destination-switch').addClass('disabled');
        location.reload();
        //window.location = site_url+'site/dashboard';
    });

    $('#code').keyup(function () {
        if ($(this).val() != '') {
            $('#submitpromo').removeClass('common-btn-lite');
            $('#submitpromo').addClass('common-btn');
            //$('#submitpromo').css({'background':'#000','color':'#fff','font-family':'gotham_boldregular'});
        } else {
            $('#submitpromo').removeClass('common-btn');
            $('#submitpromo').addClass('common-btn-lite');
            //$('#submitpromo').css({'background':'none','color':'#333','font-family':'Raleway','font-weight':'normal !important'});
        }
    });

// Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    $('.exclusive-forbidden').click(function (e) {
            e.preventDefault();

            $('#exclusives_forbidden_popup').modal({
                keyboard: true
            });
        })
});

function refreshBodyScrollSpy() {
    $('body').each(function () {
        var $spy = $(this).scrollspy('refresh')
    });
}

var cnt = 0;

function count_checkbox(elem) {
    cnt = parseInt($("#hdnCount").val());
    var chk = $(elem);
    if (chk.is(":checked")) {
        cnt = cnt + 1;
        $("#hdnCount").val(cnt);
    } else {
        cnt = cnt - 1;
        $("#hdnCount").val(cnt);
    }

    if ($("#hdnCount").val() == "3") {
        //$("input:checkbox").attr('checked', false);
        //$("label.checked").removeClass('checked');
        $.ajax({
            type: "POST",
            url: 'editprofile',
            data: {started_flag: 1}, // serializes the form's elements.
            success: function (data) {

            }, error: function (data) {
                //alert(data);
            }
        });
        $("#get_started_block").remove();

        $('.side_started')
            .parent()
            .remove();

        refreshBodyScrollSpy();

        $('#side_subscription').parent().addClass('active');
        //$('#start').show();
    }
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function base64_encode(data) {
    //  discuss at: http://phpjs.org/functions/base64_encode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Bayron Guevara
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Rafał Kukawski (http://kukawski.pl)
    // bugfixed by: Pellentesque Malesuada
    //   example 1: base64_encode('Kevin van Zonneveld');
    //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    //   example 2: base64_encode('a');
    //   returns 2: 'YQ=='

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');

    var r = data.length % 3;

    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function base64_decode(data) {
    //  discuss at: http://phpjs.org/functions/base64_decode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //    input by: Aman Gupta
    //    input by: Brett Zamir (http://brett-zamir.me)
    // bugfixed by: Onno Marsman
    // bugfixed by: Pellentesque Malesuada
    // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    //   returns 1: 'Kevin van Zonneveld'
    //   example 2: base64_decode('YQ===');
    //   returns 2: 'a'

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = '',
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');

    return dec.replace(/\0+$/, '');
}

function dataURItoBlob1(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
}

