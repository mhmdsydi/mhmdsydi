function addBorderRange(a_color_picker, target, divColorHandler_parent) {
    a_color_picker.prepend('<div data-label="border thickness" class="a-color-picker-row a-color-picker-row-label a-color-picker-single-input a-color-picker-range-div"> <input max="50.0" min="0.0" type="range" value="0"><input type="number" min="0.0" max="50.0" value="0"> </div>');
    let range = a_color_picker.find('.a-color-picker-range-div input[type="range"]')
    let number = a_color_picker.find('.a-color-picker-range-div input[type="number"]')
    range.val(target.target_border_val);
    number.val(target.target_border_val);
    target.target_element.css('border-width', target.target_border_val);
    $('.a-color-picker-range-div input[type="range"]').on('input', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        let number = $(this).parent().find('input[type="number"]')
        number.val($(this).val())
        target.target_element.css('border-width', $(this).val());
        divColorHandler_parent.attr('target-border', $(this).val());
    });
}
function createColorPicker(divColorPicker, curColor, divColorHandler, target) {
    let picker_bgColor = AColorPicker.createPicker(divColorPicker, { showHSL: false, showRGB: false });

    picker_bgColor.on("change", (picker, color) => {
        divColorHandler.removeClass('noColor');
        let colorHex = AColorPicker.parseColor(color, "hex");
        if (color != 'rgba(255, 255, 255, 0)') {
            colorHex = AColorPicker.parseColor(color, "hex");
            target.target_element.css(target.target_css, colorHex);
            divColorHandler.css('background-color', colorHex);
        }
        else {
            divColorHandler.addClass('noColor');
            target.target_element.css(target.target_css, color);
        }
        divColorHandler.parent().attr('target-value', AColorPicker.parseColor(color, "hexcss4"))
        // picker_bgColor.setColor(colorHex, true);
    });
    if (curColor.length > 0)
        picker_bgColor.setColor(curColor, true);
    picker_bgColor.palette = ['#ffffff', 'red', 'blue'];
    picker_bgColor.show();
    let shafaf = divColorPicker.find('.a-color-picker-palette .a-color-picker-palette-color:first-child');
    if (shafaf && shafaf.attr('data-color') == '#ffffff') {
        shafaf.attr('data-color', '#ffffff00')
        shafaf.attr('title', '#ffffff00')
        shafaf.css('background-color', 'rgba(255,255,255,0);');
        shafaf.addClass('transparentBox')
    }
    if (target.target_border_val) {
        addBorderRange(divColorPicker.find('.a-color-picker'), target, divColorHandler.parent())
    }
}
function divColorHandler_click() {
    $(".divColorHandler").on('click', function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        let parent = $(this).parent();
        let divColorPicker = parent.children(".divColorPicker");
        let isOpen = divColorPicker.html().indexOf('class') > 0;
        $('.a-color-picker').parent().html('');
        if (!isOpen) {
            let curColor = '';
            if ($(this).css('background-color').indexOf('rgba') < 0)
                curColor = $(this).css('background-color')

            let target = {
                target_element: $('#' + parent.attr('target-element')),
                target_css: parent.attr('target-css'),
                target_border_val: parent.attr('target-border')
            }
            createColorPicker(divColorPicker, curColor, $(this), target);
        }
    });
}

assignComponentToObjects = function() {
    $(".divColor").each(function () {
        let target_element = $('#' + $(this).attr('target-element'));
        let target_css = $(this).attr('target-css');
        let target_value = $(this).attr('target-value');
        let target_border_val = $(this).attr('target-border');
        if (target_element && target_css && target_value) {
            target_element.css(target_css, target_value);
        }
        if (target_border_val) {
            target_element.css('border-width', target_border_val);
        }
        let divColorHandler = $(this).find('.divColorHandler');
        if (divColorHandler) {
            divColorHandler.css('background-color', target_value);
            if (target_value.toUpperCase() == '#FFFFFF00') {
                divColorHandler.removeClass('noColor');
                divColorHandler.addClass('noColor');
            }
        }
    });
    $('#range_zoom').val(100);
    $('#range_zoom_label').html('100%');  
    $('#txtEditorW').val(frame.w);
    $('#txtEditorH').val(frame.h);
    $("#ulFrameUnit li[value='"+frame.unit+"']").click();
   
}
