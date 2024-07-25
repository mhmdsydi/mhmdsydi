function getScrollbarWidth() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;

}
const disableRightclick = () => {
    window.addEventListener(
        "contextmenu",
        function (e) {
            e.preventDefault();
        },
        false
    );
};
const requestWakeLock = async () => {
    try {
        if ("wakeLock" in navigator) {
            await navigator.wakeLock.request("screen");
        }
    } catch (err) {}
};

/* --------------------------------- Begin JQuery Plugins */
(function ($) {
    //--- innerLoading
    $.fn.innerLoading = function (state) {
        if (state) {
            this.removeClass("innerLoading");
            return this.addClass("innerLoading");
        } else return this.removeClass("innerLoading");
    };
    //---
})(jQuery);

//
const round2 = function(num)
{
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
