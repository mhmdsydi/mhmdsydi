
function zoomSection_Click() {
    $("#btnFitHeight").on('click', function (event) {
        let zoom = ($('#parent_frame').outerHeight() - 60 - 2 * getScrollbarWidth()) / ($('#edrFrame').outerHeight());
        $('#range_zoom').val(100*zoom);
        frame.setZoom(zoom);
    });
    $("#btnFitWidth").on('click', function (event) {
        let zoom = ($('#parent_frame').outerWidth() - 60 - 2 * getScrollbarWidth()) / ($('#edrFrame').outerWidth());
        $('#range_zoom').val(100*zoom);
        frame.setZoom(zoom);
    });

    $("#btnActualSize").on('click', function (event) {
        $('#range_zoom').val(100);
        frame.setZoom(1.0);
    });
    $('#range_zoom').on('input', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        let zoom = $(this).val()/ 100.0;
        if (Math.abs(frame.zoom - zoom) > 0.1) {
            frame.setZoom(zoom);
        }

    });

}

function divCanvas_click() {
    $(".canvas").on('click', function (event) {
        $('.a-color-picker').parent().html('');
    });
}
