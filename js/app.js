a = function () {
    var c = (function () {
        var g = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        var f, e;
        $("body").append(g);
        f = g.children("div").innerWidth();
        g.css("overflow-y", "scroll");
        e = g.children("div").innerWidth();
        g.remove();
        return (f - e)
    })();
    var d = 155;
    var b = 338;
    $('<style type="text/css">#content-scroll.scroll.open #content {right:' + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo("head")
}
renderScrollbar = function () {
    var b = $("#content-scroll");
    var c = $("#content-view");
    c.innerscroll({
        destination: b,
        draggable: true
    });
    scrollbar = b.children().not(c);
    scrollbar.addClass("scrollbar");
    a()
};
_updateScrollbar = function () {
    var d = $("#content").innerHeight();
    var c = $("#content-scroll");
    var b = c.height();
    c.removeClass("scroll");
    if (b < d) {
        c.addClass("scroll")
    }
};
updateScrollbar = function () {
    setTimeout(_updateScrollbar, 500)
};
var animationSpeed = 200;
var appSideMenu;
var appPagebody;
var collapseSideMenuBT;
var animationSpeed = 200;
function collapseSideMenu(speedOverride) {
	var vSpeed = animationSpeed;
	if(typeof speedOverride != 'undefined') {
		vSpeed = speedOverride;
	}
	appSideMenu.animate({width:30}, vSpeed).find('.content').fadeOut(30);
	appPagebody.animate({left:31}, vSpeed);
	collapseSideMenuBT.unbind('click.collapseSideMenuClick').bind('click.collapseSideMenuClick',expandSideMenu).find('.arrow').switchClass('arrowLeft','arrowRight',30);
}
function expandSideMenu() {
	var vSpeed = animationSpeed;
	appSideMenu.animate({width:155}, vSpeed).find('.content').delay(170).fadeIn(100);
	appPagebody.animate({left:156}, vSpeed);
	collapseSideMenuBT.unbind('click.collapseSideMenuClick').bind('click.collapseSideMenuClick',collapseSideMenu).find('.arrow').switchClass('arrowRight','arrowLeft',30);
}
$(document).ready(function(){
	appSideMenu = $('#nav');
	appPagebody = $('#content-scroll');
	//appSideMenu
	collapseSideMenuBT = $('#collapsible-nav');
	collapseSideMenuBT.bind('click.collapseSideMenuClick',collapseSideMenu);				
	//collapseSideMenu();
    renderScrollbar()
    $(window, "#content-scroll").on("resize", updateScrollbar);
    updateScrollbar()
})