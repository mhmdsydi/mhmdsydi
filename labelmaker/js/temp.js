function setFrameDimension(w, h) {
    if (w == null)
        w = h * frame.w / frame.h;
    else
        h = w * frame.h / frame.w;
    console.log(h, h + 60)
    $('#edrFrame').parent().css('height', h + 60);
    $('#edrFrame').css('height', h);
    $('#edrFrame').parent().css('width', w + 60);
    $('#edrFrame').css('width', w);
    // calc left, top
    w = w + 60
    h = h + 60
    let hParent = parseInt($('#parent_frame').outerHeight());
    let wParent = parseInt($('#parent_frame').outerWidth());
    let top = h > hParent ? 0 : (hParent - h) / 2;
    let left = w > wParent ? 0 : (wParent - w) / 2;
    $('#edrFrame').parent().css('top', top + 'px');
    $('#edrFrame').parent().css('left', left + 'px');
}