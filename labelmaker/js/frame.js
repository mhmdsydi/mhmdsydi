let frame = {
    w: 110,
    h: 90,
    unit: 'mm',
    zoom: 1.0 ,
    div:null
}
 
frame.init = function()
{
    this.div=$('#edrFrame');
    this.div.css('width', this.w+this.unit);
    this.div.css('height', this.h+this.unit);
    this.setZoom(1);
    this.unitRatioPixelMM = 200.0 / $('#forUnitRatioPixelMM').outerWidth();
    $('#forUnitRatioPixelMM').remove();
    $('#range_zoom').val(100);
    $('#range_zoom_label').html('100%');  
    
    $("#ulFrameUnit li[value='"+frame.unit+"']").click();

}
frame.setZoom = function (zoom) {
    this.div.css('transform', `scale(${zoom})`);
    this.zoom = zoom;
    $('#range_zoom_label').html(parseInt(this.zoom*100)+'%');
    // calc left, top
    w = zoom * this.div.outerWidth();
    h = zoom * this.div.outerHeight();
    let hParent = parseInt($('#parent_frame').outerHeight()) - 60 - 1 * getScrollbarWidth();
    let wParent = parseInt($('#parent_frame').outerWidth()) - 60 - 2 * getScrollbarWidth();
    let top = h > hParent - 60 ? 30 : (hParent - h) / 2;
    let left = w > wParent - 60 ? 30 : (wParent - w) / 2;
    this.div.css('top', top + 'px');
    this.div.css('left', left + 'px');
}

frame.fooLoad = function()
{
    $('#elm1').load('labelmaker/elms/elm1.svg');
    $('#elm3').load('labelmaker/elms/elm3.svg')
}
frame.changeUnit = function(newUnit)
{
    if (newUnit == frame.unit) {
        $('#txtEditorW').val(frame.w);
        $('#txtEditorH').val(frame.h);
    }
    else if (newUnit == 'px') {
        frame.w = round2(frame.div.outerWidth());
        frame.h = round2(frame.div.outerHeight());
        $('#txtEditorW').val(frame.w);
        $('#txtEditorH').val(frame.h);
    }
    else if (newUnit == 'mm') {
        frame.w = round2(frame.div.outerWidth() * frame.unitRatioPixelMM);  
        frame.h = round2(frame.div.outerHeight() * frame.unitRatioPixelMM); 
        $('#txtEditorW').val(frame.w);
        $('#txtEditorH').val(frame.h);
    }
    else if (newUnit == 'in') {
        frame.w = round2(frame.div.outerWidth() * frame.unitRatioPixelMM/25.4);  
        frame.h = round2(frame.div.outerHeight() * frame.unitRatioPixelMM/25.4); 
        $('#txtEditorW').val(frame.w);
        $('#txtEditorH').val(frame.h);
    }
    frame.unit = newUnit
    console.log('frame.unit='+frame.unit)
    console.log('frame.w='+frame.w)
    console.log('frame.h='+frame.h)
}