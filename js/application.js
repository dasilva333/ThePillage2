(function() {
  var AppController, Content, HomeView, SearchView, Sidebar, Track, TrackCollection, TrackPlayer, TracksView, app;
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

  TrackPlayer = Backbone.View.extend({
    id: "footer-container",
    isStationOwner: false,
    ready: false,
    volumeChangeChunk: 0.1,
    volumePopupID: "#volume-popup",
    volumePopupDisappearDelay: 1000,
    _volumePopupDisappearEvent: null,
    events: {
      "click .volume-up": "volumeUp",
      "click .volume-down": "volumeDown",
      "click .player-skip": "forward",
      "click .favorite": "favorite",
      "click .share": "doShare"
    },
    initialize: function() {
      var a, b;
      this.template = _.template($("#player-template").html());
      this.detailTemplate = _.template($("#station-player-template").html());
      a = this;
      b = false;
      _.bindAll(this, "render", "forward", "playStation", "updateVolumePopup");
      $(":input").live("focus", function() {
        return b = true;
      }).live("blur", function() {
        return b = false;
      });
      return $(document).keypress(function(c) {
        if (b) return;
        if (c.which === 187 || c.which === 61) {
          return a.volumeUp();
        } else if (c.which === 189 || c.which === 45) {
          return a.volumeDown();
        } else if (c.which === 32) {
          return a.playPause();
        }
      });
    },
    render: function() {
      this.volume = 0.60;
      $(this.el).html(this.template({
        tracks: this.model
      }));
      this.buildPlayer();
      return this;
    },
    updateStationBox: function(a) {
      if (!a || !a.get("meta")) {
        this.$(".stopped").show();
        return;
      }
      this.$(".stopped").hide();
      return this.$(".station").html(this.detailTemplate(a));
    },
    updateVolumePopup: function() {
      var b, c, d, e, g, h;
      if (this._volumePopupDisappearEvent) {
        clearTimeout(this._volumePopupDisappearEvent);
      }
      g = $(this.volumePopupID + " div.tick").removeClass("active");
      c = this.volume;
      h = g.splice(0, c * 10);
      $(h).addClass("active");
      e = $(this.volumePopupID + " #volume-icon");
      b = c * 100;
      d = "volume-100";
      if (b < 1) {
        d = "volume-0";
      } else {
        if (b <= 33) {
          d = "volume-33";
        } else {
          if (b <= 66) d = "volume-66";
        }
      }
      e.removeClass();
      e.addClass(d);
      return $(this.volumePopupID).stop().removeAttr("style").show();
    },
    buildPlayer: function() {
      var a;
      a = this;
      this.$("#jplayer").jPlayer({
        cssSelectorAncestor: "#player-container",
        swfPath: "swf/",
        supplied: "mp3",
        solution: "flash, html",
        preload: "auto",
        volume: a.volume,
        ready: function() {
          a.ready = true;
          return a.trigger("ready");
        },
        play: function(b) {
          a.$(".player-pause").show();
          return a.$(".player-play").hide();
        },
        pause: function(b) {
          a.$(".player-play").show();
          return a.$(".player-pause").hide();
        },
        ended: function() {
          return a.getNextTrack("next");
        },
        error: function() {
          $(this).jPlayer("clearMedia");
          return a.getNextTrack("error");
        }
      });
      a.$(".jp-seek-bar").unbind("click");
      return a.$(".jp-play-bar").unbind("click");
    },
    volumeUp: function() {
      this.volume += this.volumeChangeChunk;
      if (this.volume > 1) this.volume = 1;
      this.$("#jplayer").jPlayer("volume", this.volume);
      this.updateVolumePopup();
      return false;
    },
    volumeDown: function() {
      this.volume -= this.volumeChangeChunk;
      if (this.volume < 0) this.volume = 0;
      this.$("#jplayer").jPlayer("volume", this.volume);
      this.updateVolumePopup();
      return false;
    },
    playPause: function() {
      var a;
      a = this.$("#jplayer");
      if (a.length) {
        if ((a.data("jPlayer").status.paused)) {
          return a.jPlayer("play");
        } else {
          return a.jPlayer("pause");
        }
      }
    },
    stopStation: function(a) {
      if (arguments.length === 1 || a !== this.model.id) return;
      this.$(".stopped").show();
      this.$("#jplayer").jPlayer("stop").jPlayer("clearMedia");
      this.model.clear();
      return this.trigger("stopped");
    },
    playStation: function(a) {
      this.$(".stopped").hide();
      this.getNextTrack("first");
      return this.trigger("playing");
    },
    getPlayDuration: function() {
      var a, b, c;
      a = 0;
      b = this.$(".jp-current-time").html();
      c = 0;
      b = b.split(":");
      a = parseInt(b[0], 10) * 60;
      c = parseInt(b[1], 10);
      return a + c;
    },
    getNextTrack: function(d) {
      return console.log(d);
    },
    handleNext: function(b) {
      var c;
      c = this.$("#jplayer");
      return $(c).jPlayer("setMedia", {
        mp3: b.getSongUrl()
      }).jPlayer("play");
    },
    handleError: function(b, c) {
      return alert("player error");
    },
    forward: function() {
      this.getNextTrack("next");
      return false;
    },
    favorite: function() {
      this.model.toggleFavorite();
      return false;
    },
    doShare: function() {
      this.model.share();
      return false;
    }
  });

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
      "submit": "search"
    },
    search: function(event) {
      app.homeController.navigate('#search-' + this.$el.find("input").val() + '-1', {
        trigger: true
      });
      app.homeController.search(this.$el.find("input").val());
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

    Track.prototype.getTrackId = function() {
      return this.get('trackid');
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

  TracksView = (function() {

    __extends(TracksView, Backbone.View);

    function TracksView() {
      this.render = __bind(this.render, this);      TracksView.__super__.constructor.apply(this, arguments);
      this.el = app.activePage();
      this.template = ich.tracks;
      this.tracks = new TrackCollection({
        keyword: this.options.keyword,
        page: this.options.page
      });
      this.tracks.on("add", this.render);
    }

    TracksView.prototype.render = function() {
      this.el.find('#content-body').html(this.template(this.tracks));
      return app.reapplyStyles(this.el);
    };

    return TracksView;

  })();

  HomeView = (function() {

    __extends(HomeView, Backbone.View);

    function HomeView() {
      this.render = __bind(this.render, this);      HomeView.__super__.constructor.apply(this, arguments);
      this.el = app.activePage();
      this.template = ich.history;
      this.history = {
        items: [
          {
            keyword: "Muse",
            count: 1
          }, {
            keyword: "Radiohead",
            count: 5
          }, {
            keyword: "Adele",
            count: 3
          }, {
            keyword: "Tool",
            count: 2
          }
        ]
      };
      this.render();
    }

    HomeView.prototype.render = function() {
      this.el.find('#content-body').html(this.template(this.history));
      return app.reapplyStyles(this.el);
    };

    return HomeView;

  })();

  AppController = (function() {

    __extends(AppController, Backbone.Router);

    AppController.prototype.routes = {
      '': "home",
      "home": "home",
      "search-:keyword-:page-view-:trackid": "show",
      "search-:keyword-:page-play-:trackid": "play",
      "search-:keyword-:page": "search",
      "search-:keyword": "search"
    };

    function AppController() {
      AppController.__super__.constructor.apply(this, arguments);
      this._views = {};
    }

    AppController.prototype.defaultRoute = function() {
      return console.log("default?");
    };

    AppController.prototype.home = function() {
      var _base;
      console.log('home');
      return (_base = this._views)['home'] || (_base['home'] = new HomeView);
    };

    AppController.prototype.search = function(keyword, page) {
      var _base, _name;
      console.log(arguments);
      page || (page = 1);
      return (_base = this._views)[_name = "search-" + keyword + "-" + page] || (_base[_name] = new TracksView({
        keyword: keyword,
        page: page
      }));
    };

    AppController.prototype.play = function(keyword, page, cid) {
      var track;
      this.search(keyword, page);
      track = this._views["search-" + keyword + "-" + page].tracks.getByCid(cid);
      return app.TrackPlayer.handleNext(track);
    };

    return AppController;

  })();

  $(document).ready(function() {
    var content, sb, search;
    search = new SearchView({
      el: "#search-form"
    });
    sb = new Sidebar({
      el: "#nav",
      content: "#content-scroll",
      arrow: "#arrow",
      items: "#nav-content"
    });
    sb.toggleExpand(null, false, 0);
    content = new Content();
    app.TrackPlayer = new TrackPlayer({
      el: $("#player-container")
    });
    app.TrackPlayer.render();
    app.homeController = new AppController();
    return Backbone.history.start({
      pushState: false,
      root: "/TP2/"
    });
  });

  this.app = app;

}).call(this);
