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
    @_tracks[keyword] ||= new App.Collections.Tracks(null, { keyword : keyword })
    @_views[keyword] ||= new App.Views.TracksList({ el: $("#home")[0], collection: @_tracks[keyword] })
    @_tracks[keyword].fetch()
    @_views[keyword].render() 
    
  play: (keyword, cid) ->
      @search(keyword, page)
      ##need to figure out how to wait for the ready event of search to fire this part
      track = @_views["search-#{keyword}"].tracks.getByCid(cid)
      App.TrackPlayer.handleNext track