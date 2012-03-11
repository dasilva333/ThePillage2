var Sidebar = Backbone.View.extend({
	speed: 200,
    initialize: function (){ 
    	this.content = $(this.options.content);
    	this.arrow = $(this.options.arrow);
    	this.items = $(this.options.items);
        return this;
    },    
    events: {
        'click #collapsible-nav': 'toggleExpand'
    },
    toggleExpand: function(event, show, speed){
    	if (show || this.items.is(":visible")){
    		this.$el.animate({width:30}, speed || this.speed)
    		this.items.fadeOut(30);
    		this.arrow.switchClass('arrowLeft','arrowRight',30);
	    	this.content.animate({left:31}, speed || this.speed);
    	}
    	else {
    		this.$el.animate({width:155}, speed || this.speed)
    		this.items.delay(170).fadeIn(100);
    		this.arrow.switchClass('arrowRight','arrowLeft',30);
	    	this.content.animate({left:156}, speed || this.speed);
    	}
    }
})

var Content = Backbone.View.extend({   
	initialize: function (){ 
    	this.render();
        return this;
    }, 
	render: function () {
		this.renderScrollbar();
		this.updateScrollbar();
		$(window, "#content-scroll").on("resize", this.updateScrollbar);
	},
	renderScrollbar: function () {
	    var b = $("#content-scroll");
	    var c = $("#content-view");
	    c.innerscroll({
	        destination: b,
	        draggable: true
	    });
	    scrollbar = b.children().not(c);
	    scrollbar.addClass("scrollbar");

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
	    
	},
	_updateScrollbar: function () {
	    var d = $("#content").innerHeight();
	    var c = $("#content-scroll");
	    var b = c.height();
	    c.removeClass("scroll");
	    if (b < d) {
	        c.addClass("scroll")
	    }
	},
	updateScrollbar: function () {
	    setTimeout(this._updateScrollbar, 500)
	}
})



$(function(){
	var sb = new Sidebar({ el: "#nav", content: "#content-scroll", arrow: "#arrow", items: "#nav-content" });
	sb.toggleExpand(null, false, 0);	
	var content = new Content({ el: "content-scroll" });
})