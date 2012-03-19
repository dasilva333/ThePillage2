(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.App = {
    activePage: function() {
      return $(".ui-page-active");
    },
    reapplyStyles: function(el) {
      return setTimeout(function() {
        el.find("ul[data-role]").listview();
        el.find("div[data-role=\"fieldcontain\"]").fieldcontain();
        el.find("button[data-role=\"button\"]").button();
        el.find("input,textarea").textinput();
        el.css("min-height", "");
        el.page();
        return el.find(":jqmData(role=listview)").listview('refresh');
      }, 100);
    },
    redirectTo: function(page) {
      return $.mobile.changePage(page);
    },
    goBack: function() {
      return $.historyBack();
    },
    Views: {},
    Models: {},
    Routers: {},
    Collections: {}
  };

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

  $(document).ready(function() {
    App.appView = new App.Views.AppView({
      el: $("body")
    }).render();
    App.appView.sidebar.toggle(null, false, 0);
    App.router = new App.Routers.Router();
    return Backbone.history.start({
      pushState: false,
      root: "/TP2/"
    });
  });

  _.extend(Backbone.Model.prototype, {
    next: function() {
      return this.collection.at((this.collection.indexOf(this) + 1) % this.collection.length);
    },
    prev: function() {
      var index;
      index = this.collection.indexOf(this) - 1;
      return this.collection.at((index > -1 ? index : this.collection.length - 1));
    }
  });

  App.Models.Track = (function(_super) {

    __extends(Track, _super);

    function Track() {
      Track.__super__.constructor.apply(this, arguments);
    }

    Track.prototype.active = false;

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

  })(Backbone.Model);

  App.Collections.PaginatedCollection = Backbone.Collection.extend({
    initialize: function() {
      var options;
      _.bindAll(this, "parse", "url", "pageInfo", "nextPage", "previousPage");
      typeof options !== "undefined" || (options = {});
      this.page = 1;
      return typeof this.perPage !== "undefined" || (this.perPage = 10);
    },
    parse: function(resp) {
      this.page = resp.page;
      this.perPage = resp.perPage;
      this.total = resp.total;
      return resp.models;
    },
    url: function() {
      return this.baseUrl() + "&" + $.param({
        page: this.page
      });
    },
    pageInfo: function() {
      var info, max;
      info = {
        total: this.total,
        page: this.page,
        perPage: this.perPage,
        pages: Math.ceil(this.total / this.perPage),
        prev: false,
        next: false
      };
      max = Math.min(this.total, this.page * this.perPage);
      if (this.total === this.pages * this.perPage) max = this.total;
      info.range = [(this.page - 1) * this.perPage + 1, max];
      if (this.page > 1) info.prev = this.page - 1;
      if (this.page < info.pages) info.next = this.page + 1;
      return info;
    },
    nextPage: function() {
      if (!this.pageInfo().next) return false;
      this.page = this.page + 1;
      return this.fetch();
    },
    previousPage: function() {
      if (!this.pageInfo().prev) return false;
      this.page = this.page - 1;
      return this.fetch();
    }
  });

  App.Collections.Tracks = (function(_super) {

    __extends(Tracks, _super);

    function Tracks() {
      Tracks.__super__.constructor.apply(this, arguments);
    }

    Tracks.prototype.model = App.Models.Track;

    Tracks.prototype.baseUrl = function() {
      return "http://www.playlist.com/async/searchbeta/tracks?searchfor=" + this.keyword;
    };

    Tracks.prototype.sync = function(method, model, options) {
      var params;
      params = _.extend({
        type: "GET",
        dataType: "jsonp",
        url: model.url(),
        processData: false,
        complete: options.success
      }, options);
      return $.ajax(params);
    };

    Tracks.prototype.parse = function(resp) {
      return Tracks.__super__.parse.call(this, {
        page: PPL.search.currentPage,
        perPage: 10,
        total: parseInt(PPL.search.track_count),
        models: PPL.search.trackdata
      });
    };

    Tracks.prototype.fetch = function() {
      Tracks.__super__.fetch.call(this, {
        add: true
      });
      return this;
    };

    Tracks.prototype.next = function() {
      console.log(this);
      return this.find(function(track) {
        return track.active;
      }).next();
    };

    Tracks.prototype.initialize = function(collections, options) {
      return this.keyword = options.keyword;
    };

    return Tracks;

  })(App.Collections.PaginatedCollection);

  App.Views.AppView = Backbone.View.extend({
    render: function() {
      this.sidebar = new App.Views.SidebarView({
        el: "#nav",
        content: "#content-scroll",
        arrow: "#arrow",
        items: "#nav-content"
      });
      this.header = new App.Views.HeaderView({
        el: this.$("#header"),
        content: "#main"
      }).hide();
      this.player = new App.Views.TrackPlayer({
        el: this.$("#player-container")
      }).render();
      this.search = new App.Views.SearchView({
        el: this.$("#search-form")
      });
      return this;
    }
  });

  App.Views.HeaderView = Backbone.View.extend({
    initialize: function(options) {
      this.content = $(options.content);
      return this;
    },
    hide: function() {
      this.content.css({
        "top": 0
      });
      return this;
    },
    show: function() {
      this.content.css({
        "top": "88px"
      });
      return this;
    }
  });

  App.Views.HomeView = Backbone.View.extend({
    initialize: function() {
      this.template = ich.history;
      return this.history = {
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
    },
    render: function() {
      this.$el.find('#content-body').html(this.template(this.history));
      return App.reapplyStyles(this.$el);
    }
  });

  App.Views.SearchView = Backbone.View.extend({
    events: {
      "submit": "search"
    },
    search: function(event) {
      App.router.navigate('#search-' + this.$el.find("input").val(), {
        trigger: true
      });
      App.router.search(this.$el.find("input").val());
      return false;
    }
  });

  App.Views.SidebarView = Backbone.View.extend({
    speed: 200,
    initialize: function() {
      this.el = $(this.options.el);
      this.content = $(this.options.content);
      this.arrow = $(this.options.arrow);
      this.items = $(this.options.items);
      return this;
    },
    events: {
      'click #collapsible-nav': 'toggle'
    },
    toggle: function(event, show, speed) {
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

  App.Views.TrackView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      return this.template = ich.track;
    },
    render: function() {
      this.$el.html(this.template(this.model));
      return this;
    }
  });

  App.Views.TrackPlayer = Backbone.View.extend({
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
      _.bindAll(this, "render", "forward", "playStation", "updateVolumePopup");
      this.template = ich.player;
      a = this;
      b = false;
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
      this.$el.html(this.template({
        tracks: this.model
      }));
      this.buildPlayer();
      return this;
    },
    updateVolumePopup: function() {
      var a, b, c, d, e, g, h;
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
      } else if (b <= 33) {
        d = "volume-33";
      } else if (b <= 66) {
        d = "volume-66";
      }
      e.removeClass();
      e.addClass(d);
      $(this.volumePopupID).stop().removeAttr("style").show();
      a = this;
      return this._volumePopupDisappearEvent = setTimeout(function() {
        return $(a.volumePopupID).fadeOut();
      }, a.volumePopupDisappearDelay);
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
    getNextTrack: function(action, param) {
      this.activeTrack = this.collection[action](param);
      if (this.activeTrack) {
        this.activeTrack.active = true;
        return this.handleNext(this.activeTrack);
      }
    },
    handleNext: function(b) {
      var c;
      if (b) {
        c = this.$("#jplayer");
        c.jPlayer("setMedia", {
          mp3: b.getSongUrl()
        });
        c.jPlayer("play");
        return false;
      }
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

  App.Views.ContentView = Backbone.View.extend({
    render: function() {
      this.renderScrollbar();
      return $(window, "#content-scroll").on("resize", this.updateScrollbar);
    },
    a: function() {
      var b, c, d;
      c = (function() {
        var e, f, g;
        g = $("<div style=\"width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;\"><div style=\"height:100px;\"></div>");
        f = void 0;
        e = void 0;
        $("body").append(g);
        f = g.children("div").innerWidth();
        g.css("overflow-y", "scroll");
        e = g.children("div").innerWidth();
        g.remove();
        return f - e;
      })();
      d = 155;
      b = 338;
      return $("<style type=\"text/css\">#content-scroll.scroll.open #content {right:" + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo("head");
    },
    renderScrollbar: function() {
      var b, c, scrollbar;
      b = $("#content-scroll");
      c = $("#content-view");
      c.innerscroll({
        destination: b,
        draggable: true
      });
      scrollbar = b.children().not(c);
      scrollbar.addClass("scrollbar");
      return this.a();
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
      return setTimeout(this._updateScrollbar, 500);
    }
  });

  App.Views.TracksList = (function(_super) {

    __extends(TracksList, _super);

    function TracksList() {
      TracksList.__super__.constructor.apply(this, arguments);
    }

    TracksList.prototype.initialize = function() {
      _.bindAll(this, "next", "render");
      this.collection.bind("add", this.render);
      this.template = ich.tracks;
      this._trackCollectionView = new App.Views.UpdatingCollectionView({
        collection: this.collection,
        childViewConstructor: App.Views.TrackView
      });
      return this;
    };

    TracksList.prototype.events = {
      "click a.next": "next"
    };

    TracksList.prototype.render = function() {
      this.trigger("rendering");
      this.$el.find("#content-body").html(this.template(this.collection.pageInfo()));
      this._trackCollectionView.el = this.$el.find(".tracks").empty();
      this._trackCollectionView.render();
      App.reapplyStyles(this.$el);
      this.trigger("rendered");
      this._rendered = true;
      TracksList.__super__.render.apply(this, arguments);
      return this;
    };

    TracksList.prototype.next = function() {
      this.collection.nextPage();
      return false;
    };

    return TracksList;

  })(App.Views.ContentView);

  App.Views.UpdatingCollectionView = Backbone.View.extend({
    initialize: function(options) {
      _(this).bindAll("add", "remove");
      if (!options.childViewConstructor) {
        throw "no child view constructor provided";
      }
      this._childViewConstructor = options.childViewConstructor;
      this._childViews = [];
      this.collection.each(this.add);
      this.collection.bind("add", this.add);
      return this.collection.bind("remove", this.remove);
    },
    add: function(model) {
      var childView;
      childView = new this._childViewConstructor({
        model: model
      });
      this._childViews.push(childView);
      if (this._rendered) return this.el.append(childView.render().el);
    },
    remove: function(model) {
      var viewToRemove;
      viewToRemove = _(this._childViews).select(function(cv) {
        return cv.model === model;
      })[0];
      this._childViews = _(this._childViews).without(viewToRemove);
      if (this._rendered) return $(viewToRemove.el).remove();
    },
    render: function() {
      var _this = this;
      this._rendered = true;
      this.el.empty();
      _(this._childViews).each(function(childView) {
        return _this.el.append(childView.render().el);
      });
      return this;
    }
  });

  App.Routers.Router = (function(_super) {

    __extends(Router, _super);

    Router.prototype.routes = {
      '': "home",
      "home": "home",
      "search-:keyword-view-:trackid": "show",
      "search-:keyword-play-:trackid": "play",
      "search-:keyword": "search"
    };

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
      this._views = {};
      this._tracks = {};
    }

    Router.prototype.home = function() {
      var _base;
      return (_base = this._views)['home'] || (_base['home'] = new App.Views.HomeView({
        el: App.activePage()
      }).render());
    };

    Router.prototype.search = function(keyword) {
      var _base, _base2;
      (_base = this._tracks)[keyword] || (_base[keyword] = new App.Collections.Tracks(null, {
        keyword: keyword
      }).fetch());
      return (_base2 = this._views)[keyword] || (_base2[keyword] = new App.Views.TracksList({
        el: $("#home")[0],
        collection: this._tracks[keyword]
      }).render());
    };

    Router.prototype.play = function(keyword, cid) {
      var load,
        _this = this;
      this.search(keyword);
      load = function() {
        App.appView.player.collection = _this._tracks[keyword];
        App.appView.player.getNextTrack('getByCid', cid);
        return App.appView.header.show();
      };
      this._views[keyword].on("rendered", load);
      if (this._views[keyword]._rendered) return load();
    };

    return Router;

  })(Backbone.Router);

}).call(this);
