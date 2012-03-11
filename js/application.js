(function() {
  var HomeController, HomeView, ShowTrackView, Track, TrackCollection, app;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
      return this.get('album');
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

    function TrackCollection() {
      TrackCollection.__super__.constructor.apply(this, arguments);
      this.add($PLAYLIST_JSON);
    }

    return TrackCollection;

  })();

  this.Tracks = new TrackCollection;

  ShowTrackView = (function() {

    __extends(ShowTrackView, Backbone.View);

    function ShowTrackView() {
      this.render = __bind(this.render, this);      ShowTrackView.__super__.constructor.apply(this, arguments);
      console.log("showTracKView");
      this.el = app.activePage();
      this.template = _.template('<a data-role="button" data-theme="b">Download</a>\n<a data-role="button">Find More By This Artist</a>\n<a data-role="button">Share Music Link</a>\n<a href="index.html" data-role="button" data-rel="back">Go Back</a>');
      this.model.bind('change', this.render);
      this.render();
    }

    ShowTrackView.prototype.render = function() {
      this.el.find('h1').text(this.model.getFullName());
      this.el.find('.ui-content').html(this.template({
        Track: this.model
      }));
      return app.reapplyStyles(this.el);
    };

    return ShowTrackView;

  })();

  HomeView = (function() {

    __extends(HomeView, Backbone.View);

    function HomeView() {
      this.render = __bind(this.render, this);      HomeView.__super__.constructor.apply(this, arguments);
      this.el = app.activePage();
      this.template = _.template('<div>\n\n<ul data-role="listview" data-theme="c" data-filter="true">\n  <% tracks.each(function(track){ %>\n    <li>\n      <a href="<%= track.getSongUrl() %>">\n        <img src="<%= track.getAlbumImage() %>" >\n        <h3><%= track.getArtist() %></h3>\n        <p><%= track.getTitle() %></p>\n        <span class="ui-li-count"><%= track.getDurationFormatted() %></span>\n      </a>  \n      <a href="#tracks-<%= track.cid %>">More Options</a>     \n    </li>          \n  <% }); %>\n</ul>\n\n</div>');
      this.render();
    }

    HomeView.prototype.render = function() {
      this.el.find('.ui-content').html(this.template({
        tracks: Tracks
      }));
      return app.reapplyStyles(this.el);
    };

    return HomeView;

  })();

  app.homeController = new $.mobile.Router({
    "#search": {
      handler: "viewTracks",
      events: "bc,c,i,bs,s,bh,h"
    },
    "#track-(?:[?/](.*))?": {
      handler: "view-track",
      events: "bc,c,i,bs,s,bh,h"
    },
    "#home": {
      handler: function(type) {
        var _base;
        console.log("index called");
        return (_base = app.views)['home'] || (_base['home'] = new HomeView);
      },
      events: "h,s"
    }
  }, {
    viewTracks: function(type, match, ui) {
      return console.log(arguments);
    },
    show: function(type, match, ui) {
      var _base, _name;
      console.log(arguments);
      return (_base = app.views)[_name = "track-" + cid] || (_base[_name] = new ShowTrackView({
        model: Tracks.getByCid(cid)
      }));
    }
  }, {
    defaultHandler: function(type, ui, page) {
      return console.log("Default handler called due to unknown route (" + type + ", " + ui + ", " + page + ")");
    },
    defaultHandlerEvents: "s"
  });

  HomeController = (function() {

    __extends(HomeController, Backbone.Controller);

    HomeController.prototype.routes = {
      "#venues-:cid": "show",
      "#home": "home"
    };

    function HomeController() {
      HomeController.__super__.constructor.apply(this, arguments);
      this._views = {};
    }

    HomeController.prototype.home = function() {
      var _base;
      console.log("home");
      return (_base = this._views)['home'] || (_base['home'] = new HomeView);
    };

    HomeController.prototype.show = function(cid) {
      var _base, _name;
      console.log("show");
      return (_base = this._views)[_name = "venues-" + cid] || (_base[_name] = new ShowVenueView({
        model: Venues.getByCid(cid)
      }));
    };

    return HomeController;

  })();

  this.app = app;

}).call(this);
