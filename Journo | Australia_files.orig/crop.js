$(document).ready(function () {
    $('.crop-file').change(function (e) {
        e.preventDefault();

        $('#cropbox').cropper('destroy');

        if (!checkImageExtension()) {
            return;
        }

        e = e.originalEvent;
        var target = e.dataTransfer || e.target,
            file = target && target.files && target.files[0],
            options = {
                canvas: true,
                maxWidth: 2048,
                maxHeight: 2048,
            };

        if (!file) {
            return;
        }

        // Use the "JavaScript Load Image" functionality to parse the file data
        loadImage.parseMetaData(file, function (data) {
            // Get the correct orientation setting from the EXIF Data
            if (data.exif) {
                options.orientation = data.exif.get('Orientation');
            }
            // Load the image from disk and inject it into the DOM with the correct orientation
            loadImage(
                file,
                function (canvas) {
                    var imgDataURL = canvas.toDataURL('image/jpeg');

                    // Initialize cropbox:
                    $('#cropbox').attr('src', imgDataURL);

                    $('#popup_crop').show();

                    $('#edit').attr('disabled', true);
                    $('#reg_submit').attr('disabled', true);

                    initCropper();
                },
                options
            );
        });
    });

    $('#crop_btn').on('click', function (e) {
        e.preventDefault();

        crop_photo();
    });

    $('#signup-form').submit(function() {
        $('#reg_submit').attr('disabled', true);
    });
    $('#edit-form').submit(function() {
        $('#edit').attr('disabled', true);
    });
});

function initCropper() {
    $('#cropbox').cropper({
        aspectRatio: 1,
        preview: '#avatar_container',
        autoCrop: false,
        movable: false,
        checkOrientation: true,
        rotatable: true,
        scalable: true,
        zoomable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        checkCrossOrigin: false,
        crop: function (e) {
            // Output the result data for cropping image.
            $('#x').val(Math.round(e.x));
            $('#y').val(Math.round(e.y));
            $('#h').val(Math.round(e.height));
            $('#w').val(Math.round(e.width));
        }
    });
}

function crop_photo() {
    if (parseInt($('#w').val()) > 0) {
        $('#popup_crop').hide();
        $('.avatar-loading').show();

        $('#cropbox').cropper('disable');

        var form = new FormData();

        var blob = dataURItoBlob1($('#cropbox').attr('src'));
        form.append("avatar", blob);
        form.append('x', $('#x').val());
        form.append('y', $('#y').val());
        form.append('w', $('#w').val());
        form.append('h', $('#h').val());

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "uploadimg");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                $('#image_name').val(xhr.response);

                $('#edit').attr('disabled', false);
                $('#reg_submit').attr('disabled', false);
                $('.avatar-loading').hide();
            }
        }

        xhr.send(form);
    } else {
        alert('Please select a crop region then press submit.');
        return false;
    }
}

function checkImageExtension() {
    var exts = ['jpg', 'jpeg', 'gif', 'png'];
    var msg = $('.user-form').find('.msg');
    msg.hide();
    var val = $(".crop-file").val();

    if (!val.toLowerCase().match(/(?:gif|jpg|png|jpeg|PNG)$/)) {
        // inputted file path is not an image of one of the above types
        msg.show().html('<strong style="color:#f00">Please upload files having extensions: <b>' + exts.join(', ') + '</b> only.</strong>');

        return false;
    }

    return true;
}

// close_popup : close the popup
function close_popup(id) {
    $('#edit').attr('disabled', false);
    $('#reg_submit').attr('disabled', false);
    $('.avatar-loading').hide();

    $('#image_name').val('');
    $('.crop-file').val('')

    // hide the popup
    $('#' + id).hide();
}