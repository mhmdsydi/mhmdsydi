$(".ul_default").click(function () {
    $(this).parent().toggleClass("active");
})

$(".ul_select li").click(function () {
    var current = $(this).html();
    $(this).parents(".select_wrap").find(".ul_default li").html(current);
    $(this).parents(".select_wrap").removeClass("active");
})

$("#ulFrameUnit li").click(function () {
    let newUnit = $(this).attr('value');
    frame.changeUnit(newUnit);
})