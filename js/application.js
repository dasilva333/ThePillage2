(function() {
  var HomeController, SearchResultsView, Track, TrackCollection, app;
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

  HomeController = (function() {

    __extends(HomeController, Backbone.Router);

    HomeController.prototype.routes = {
      "home": "home",
      "search-:keyword": "search",
      "search-:keyword-:page": "search",
      "track-:trackid": "show"
    };

    function HomeController() {
      HomeController.__super__.constructor.apply(this, arguments);
      this._views = {};
    }

    HomeController.prototype.home = function() {
      var _base;
      return (_base = this._views)['home'] || (_base['home'] = new HomeView);
    };

    HomeController.prototype.search = function(keyword, page) {
      var _base, _name;
      page || (page = 1);
      return (_base = this._views)[_name = "search-" + keyword + "-" + page] || (_base[_name] = new SearchResultsView({
        keyword: keyword,
        page: page
      }));
    };

    HomeController.prototype.show = function(cid) {};

    return HomeController;

  })();

  app.homeController = new HomeController();

  $(document).ready(function() {
    return app.homeController.search("Muse");
  });

  this.app = app;

}).call(this);
