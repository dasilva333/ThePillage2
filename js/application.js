(function() {
  var AppController, Content, SearchResultsView, SearchView, Sidebar, Track, TrackCollection, app;
  var _this = this, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.RemoteLogger = {
    logEvent: function() {}
  };

  window.PPL = new (function() {
    this.user = {};
    this.player = {
      playWhenReady: function() {}
    };
    this.search = new (function() {
      this.searchResultsFn = function() {};
      this.searchVersion = "";
      this.searchTerm = "";
      this.trackdata = null;
      return this.currentPage = 1;
    })();
    return false;
  })();

  Content = Backbone.View.extend({
    initialize: function() {
      this.render();
      return this;
    },
    render: function() {
      this.renderScrollbar();
      return $(window, "#content-scroll").on("resize", this.updateScrollbar);
    },
    renderScrollbar: function() {
      var b, c, d, scrollbar;
      b = $("#content-scroll");
      c = $("#content-view");
      c.innerscroll({
        destination: b,
        draggable: true
      });
      scrollbar = b.children().not(c);
      scrollbar.addClass("scrollbar");
      c = (function() {
        var e, f, g;
        g = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        $("body").append(g);
        f = g.children("div").innerWidth();
        g.css("overflow-y", "scroll");
        e = g.children("div").innerWidth();
        g.remove();
        return f - e;
      })();
      d = 155;
      b = 338;
      return $('<style type="text/css">#content-scroll.scroll.open #content {right:' + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo("head");
    },
    _updateScrollbar: function() {
      var b, c, d;
      d = $("#content").innerHeight();
      c = $("#content-scroll");
      b = c.height();
      c.removeClass("scroll");
      if (b < d) return c.addClass("scroll");
    },
    updateScrollbar: function() {
      return setTimeout(_this._updateScrollbar, 500);
    }
  });

  SearchView = Backbone.View.extend({
    events: {
      "submit": "doSearch"
    },
    doSearch: function(event) {
      alert("Search for " + this.el.find("input").val());
      return false;
    }
  });

  Sidebar = Backbone.View.extend({
    speed: 200,
    initialize: function() {
      this.el = $(this.options.el);
      this.content = $(this.options.content);
      this.arrow = $(this.options.arrow);
      this.items = $(this.options.items);
      return this;
    },
    events: {
      'click #collapsible-nav': 'toggleExpand'
    },
    toggleExpand: function(event, show, speed) {
      if (show || this.items.is(":visible")) {
        this.el.animate({
          width: 30
        }, speed || this.speed);
        this.items.fadeOut(30);
        this.arrow.switchClass('arrowLeft', 'arrowRight', 30);
        return this.content.animate({
          left: 31
        }, speed || this.speed);
      } else {
        this.el.animate({
          width: 155
        }, speed || this.speed);
        this.items.delay(170).fadeIn(100);
        this.arrow.switchClass('arrowRight', 'arrowLeft', 30);
        return this.content.animate({
          left: 156
        }, speed || this.speed);
      }
    }
  });

  app = {
    activePage: function() {
      return $(".ui-page-active");
    },
    reapplyStyles: function(el) {
      el.find('ul[data-role]').listview();
      el.find('div[data-role="fieldcontain"]').fieldcontain();
      el.find('button[data-role="button"]').button();
      el.find('input,textarea').textinput();
      return el.page();
    },
    redirectTo: function(page) {
      return $.mobile.changePage(page);
    },
    goBack: function() {
      return $.historyBack();
    },
    views: {}
  };

  Track = (function() {

    __extends(Track, Backbone.Model);

    function Track() {
      Track.__super__.constructor.apply(this, arguments);
    }

    Track.prototype.getSongUrl = function() {
      return rc4.decrypt(this.get("song_url"), "Error, this track is not valid!");
    };

    Track.prototype.getAlbumImage = function() {
      return "images/noAlbumImage.png";
    };

    Track.prototype.getArtist = function() {
      return this.get('artist');
    };

    Track.prototype.getTitle = function() {
      return this.get('title');
    };

    Track.prototype.getFullName = function() {
      return "" + (this.get('artist')) + " - " + (this.get('title')) + " ";
    };

    Track.prototype.getDurationFormatted = function() {
      return $.jPlayer.convertTime(this.get('duration'));
    };

    return Track;

  })();

  TrackCollection = (function() {

    __extends(TrackCollection, Backbone.Collection);

    TrackCollection.prototype.model = Track;

    TrackCollection.prototype.keyword = "";

    TrackCollection.prototype.page = 1;

    TrackCollection.prototype.url = function() {
      return "http://www.playlist.com/async/searchbeta/tracks?searchfor=" + this.keyword + "&page=" + this.page;
    };

    function TrackCollection(options) {
      this.success = __bind(this.success, this);      TrackCollection.__super__.constructor.apply(this, arguments);
      this.reset();
      this.keyword = options.keyword;
      this.page = options.page;
      this.fetch({
        type: "GET",
        dataType: "jsonp",
        complete: this.success
      });
    }

    TrackCollection.prototype.success = function(data) {
      return this.add(PPL.search.trackdata);
    };

    return TrackCollection;

  })();

  SearchResultsView = (function() {

    __extends(SearchResultsView, Backbone.View);

    function SearchResultsView() {
      this.render = __bind(this.render, this);      SearchResultsView.__super__.constructor.apply(this, arguments);
      this.el = app.activePage();
      this.template = ich.tracks;
      this.tracks = new TrackCollection({
        keyword: this.options.keyword,
        page: this.options.page
      });
      this.tracks.on("add", this.render);
      this.render();
    }

    SearchResultsView.prototype.render = function() {
      this.el.find('#content-body').html(this.template(this.tracks));
      return app.reapplyStyles(this.el);
    };

    return SearchResultsView;

  })();

  AppController = (function() {

    __extends(AppController, Backbone.Router);

    AppController.prototype.routes = {
      "home": "home",
      "search-:keyword": "search",
      "search-:keyword-:page": "search",
      "track-:trackid": "show"
    };

    function AppController() {
      AppController.__super__.constructor.apply(this, arguments);
      this._views = {};
    }

    AppController.prototype.home = function() {
      var _base;
      return (_base = this._views)['home'] || (_base['home'] = new HomeView);
    };

    AppController.prototype.search = function(keyword, page) {
      var _base, _name;
      page || (page = 1);
      return (_base = this._views)[_name = "search-" + keyword + "-" + page] || (_base[_name] = new SearchResultsView({
        keyword: keyword,
        page: page
      }));
    };

    AppController.prototype.show = function(cid) {};

    return AppController;

  })();

  app.homeController = new AppController();

  $(document).ready(function() {
    var content, sb, search;
    app.homeController.search("Muse");
    sb = new Sidebar({
      el: "#nav",
      content: "#content-scroll",
      arrow: "#arrow",
      items: "#nav-content"
    });
    sb.toggleExpand(null, false, 0);
    content = new Content();
    return search = new SearchView({
      el: "#search-form"
    });
  });

  this.app = app;

}).call(this);
