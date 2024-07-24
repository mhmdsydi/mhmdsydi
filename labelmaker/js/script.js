/* Help

 $(".btn").on("click", function () {
        var self = $(this);
        self.innerLoading(true/false);
    });

*/
const disableRightclick = () => {
    window.addEventListener(
        "contextmenu",
        function (e) {
            e.preventDefault();
        },
        false
    );
};
/* --------------------------------- Begin on load */
const requestWakeLock = async () => {
    try {
        if ("wakeLock" in navigator) {
            await navigator.wakeLock.request("screen");
        }
    } catch (err) {}
};
//
let lb;
//
$(function () {
    //disableRightclick
    requestWakeLock();
    onExitButtonClick();
    $(".mnuItem").on("click", onmnuItemClick);
    //---
    lb = new LabelMakerHandler();
    lb.createElement("lmob001");
    lb.createElement("lmob002");
    //---
});
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
/* --------------------------------- Begin ... */
function onExitButtonClick() {
    $(".lm_btnexit").on("click", function () {
        $(".leftContextMenu").hide();
        $(".mnuItem").removeClass("mnuItemActive");
    });
}
/* --------------------------------- */

function onmnuItemClick(e) {
    $(".leftContextMenu").hide();
    $(".mnuItem").removeClass("mnuItemActive");
    $(e.currentTarget).addClass("mnuItemActive");
    $(".leftContextMenu").show();
}
/* ---------------------------------- */
let mouse = { x: 0, y: 0 };
let offset = { left: 0, top: 0 };
let element;
/* ----------- -- */
function onDrag(e) {
    if (!e) {
        var e = window.event;
    }
    element.style.left = e.pageX - mouse.x + "px";
    element.style.top = e.pageY - mouse.y + "px";
}
function onDrop(e) {
    if (!e) {
        var e = window.event;
    }
    document.onpointermove = null;
}
function onStartDrag(e) {
    e.stopPropagation(); //click on child prevent click on parent
    if (!e) {
        var e = window.event;
    }
    if (e.target) {
        element = e.target;
    } else if (e.srcElement) {
        element = e.srcElement;
    }

    if (e.layerX || e.layerX === 0) {
        mouse.x = e.layerX;
        mouse.y = e.layerY;
    } else if (e.offsetX || e.offsetX === 0) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    }

    mouse.x += $("#lm_pan").offset().left;
    mouse.y += $("#lm_pan").offset().top;
    lb.setTarget(e.target.id);
    document.onpointermove = onDrag;
    document.onpointerup = onDrop;
}
//
function onbtnDeleteClick(e) {
    e.stopPropagation(); //click on child prevent click on parent (parent and child event must be same)
    //console.log("onbtnDeleteClick:" + e.target.parentElement.id);
    $(e.target.parentElement).remove();
    //$(".lm_btnDelete").on("pointerdown", onbtnDeleteClick);
}
function onbtnLockClick(e) {
    e.stopPropagation(); //click on child prevent click on parent (parent and child event must be same)
    //console.log("onbtnDeleteClick:" + e.target.parentElement.id);
    var lock = $(e.target.parentElement).attr("lock") == "true";
    $(e.target.parentElement).attr("lock", !lock);
    var src = $(e.target).attr("src");
    if (lock) src = src.replace("unlock", "lock");
    else src = src.replace("lock", "unlock");
    $(e.target).attr("src", src);
    //this.target.lock = !this.target.lock;
    //$(".lm_btnDelete").on("pointerdown", onbtnDeleteClick);
}
function onbtnEditClick(e) {
    e.stopPropagation(); //click on child prevent click on parent (parent and child event must be same)
    $("#mnuItemText").click();
}
//
class LabelMakerHandler {
    constructor() {
        this.target = null;
        $("#lm_pan").on("pointerdown", (e) => {
            console.log("click");
            this.removeTarget();
        });
    }
    /* ----------------------------------- */
    createElement(id) {
        $("#" + id).on("pointerdown", onStartDrag);
        $("#" + id).attr("lock", false);
    }
    setTarget(id) {
        if (this.target) {
            this.removeTarget();
        }
        this.target = $("#" + id);
        // append Lock Delete html code  from Tamplate to target
        var myTemplate = $("#lm_template_del_lock").html().trim();
        var myTemplateClone = $(myTemplate);
        this.target.append(myTemplateClone);
        this.target.addClass("Target");
        $(".lm_btnDelete").on("pointerdown", onbtnDeleteClick);
        $(".lm_btnLock").on("pointerdown", onbtnLockClick);
        $(".lm_btnEdit").on("pointerdown", onbtnEditClick);
        //
    }
    removeTarget() {
        if (this.target) this.target.removeClass("Target");
        $(".lm_btnDelete").remove();
        $(".lm_btnLock").remove();
        $(".lm_btnEdit").remove();
    }
}
