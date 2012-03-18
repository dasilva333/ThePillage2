class App.Routers.Router extends Backbone.Router
  routes :
    ''                                        : "home"
    "home"                                    : "home"
    "search-:keyword-:page-view-:trackid"     : "show"
    "search-:keyword-:page-play-:trackid"     : "play"       
    "search-:keyword-:page"                   : "search"
    "search-:keyword"                         : "search" 
    
  constructor: ->
    super
    @_views = {}
    @_tracks = {}
    
  defaultRoute: ->
    console.log("default?")
    
  home: ->
    console.log("creating new homepage after domready")
    @_views['home'] ||= new App.Views.HomeView({ el: App.activePage() }).render()

  search: (keyword) ->
    ##figure out a good way to structure the paging here
    @_tracks[keyword] ||= new App.Collections.Tracks(null, { keyword : keyword }).fetch()
    ##@_views["search-#{keyword}"] ||= new App.Views.TracksList({ el: $("#content-body")[0], collection: @_tracks[keyword] }).render()

  play: (keyword, page, cid) ->
      @search(keyword, page)
      ##need to figure out how to wait for the ready event of search to fire this part
      track = @_views["search-#{keyword}-#{page}"].tracks.getByCid(cid)
      app.TrackPlayer.handleNext track