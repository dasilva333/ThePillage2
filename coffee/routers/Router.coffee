class App.Router extends Backbone.Router
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

  defaultRoute: ->
    console.log("default?")
    
  home: ->
    @_views['home'] ||= new App.Views.HomeView

  search: (keyword, page) ->
    page or= 1
    @_views["search-#{keyword}-#{page}"] ||= new App.Views.TracksList { keyword : keyword, page: page }

  play: (keyword, page, cid) ->
      @search(keyword, page)
      ##need to figure out how to wait for the ready event of search to fire this part
      track = @_views["search-#{keyword}-#{page}"].tracks.getByCid(cid)
      app.TrackPlayer.handleNext track