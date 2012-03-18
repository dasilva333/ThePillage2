class App.Routers.Router extends Backbone.Router
  routes :
    ''                                        : "home"
    "home"                                    : "home"
    "search-:keyword-view-:trackid"           : "show"
    "search-:keyword-play-:trackid"           : "play"       
    "search-:keyword"                         : "search" 
    
  constructor: ->
    super
    @_views = {}
    @_tracks = {}
    
  home: ->
    @_views['home'] ||= new App.Views.HomeView({ el: App.activePage() }).render()

  search: (keyword) ->
    @_tracks[keyword] ||= new App.Collections.Tracks(null, { keyword : keyword }).fetch()
    @_views[keyword] ||= new App.Views.TracksList({ el: $("#home")[0], collection: @_tracks[keyword] }).render()
    
  play: (keyword, cid) ->
      @search(keyword).on "rendered", =>
        App.appView.player.handleNext @_tracks[keyword].getByCid(cid)