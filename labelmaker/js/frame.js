let frame = {
    w: 110,
    h: 90,
    unit: 'mm',
    zoom: 1.0 ,
    div:null
}
frame.test = function()
{
    console.log(this.w);
}
frame.init = function()
{
    this.div=$('#edrFrame');
    this.div.css('width', this.w+this.unit);
    this.div.css('height', this.h+this.unit);
    this.setZoom(1);
}
frame.setZoom = function (zoom) {
    this.div.css('transform', `scale(${zoom})`);
    this.zoom = zoom;
    $('#range_zoom_label').html(parseInt(this.zoom*100)+'%');
    // calc left, top
    w = zoom * this.div.width();
    h = zoom * this.div.height();
    let hParent = parseInt($('#parent_frame').height()) - 60 - 1 * getScrollbarWidth();
    let wParent = parseInt($('#parent_frame').width()) - 60 - 2 * getScrollbarWidth();
    let top = h > hParent - 60 ? 30 : (hParent - h) / 2;
    let left = w > wParent - 60 ? 30 : (wParent - w) / 2;
    this.div.css('top', top + 'px');
    this.div.css('left', left + 'px');
}