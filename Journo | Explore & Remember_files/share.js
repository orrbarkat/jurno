/**
 * jQuery function to prevent default anchor event and take the href * and the title to make a share popup
 *
 * @param  {[object]} e           [Mouse event]
 * @param  {[integer]} intWidth   [Popup width defalut 500]
 * @param  {[integer]} intHeight  [Popup height defalut 400]
 * @param  {[boolean]} blnResize  [Is popup resizeabel default true]
 */
$.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {

    // Prevent default anchor event
    e.preventDefault();

    // Set values for window
    intWidth = intWidth || '500';
    intHeight = intHeight || '400';
    strResize = (blnResize ? 'yes' : 'no');

    // Set title and open popup with focus on it
    var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
        strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
        objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
};

$(document).ready(function ($) {
    var clip = new Clipboard('.sharing_link_copy');
    clip.on('success', function (e) {
        var buttonId = $(e.trigger).attr('id');
        var btn = $('#' + buttonId);

        btn.attr('data-original-title', 'Copied!').tooltip('show');

        setTimeout(function () {
            btn.tooltip('hide').attr('data-original-title', '');
        }, 500);
    });

    $('.entry_sharing_icon_popup').on("click", function (e) {
        $(this).customerPopup(e);
    });

    $('.entry-sharing-btn').click(function (e) {
        e.preventDefault();

        var entryUuid = $(this).closest('.entry-box').attr('id');

        $('#entry_sharing_modal_' + entryUuid).modal({
            keyboard: true
        });
    });

    $('.journo-share-btn').click(function (e) {
        e.preventDefault();

        $('#entry_sharing_modal_journo').modal({
            keyboard: true
        });
    });
});