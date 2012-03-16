##these are placeholder objects that must be here for playlist.com's api
window.RemoteLogger = 
  logEvent: ->
    
window.PPL = new (->
  @user = {}
  @player = 
    playWhenReady: ->
  @search = new (->
    ##This function gets called automatically due to the Playlist.com API
    @searchResultsFn = ->
    @searchVersion = ""
    @searchTerm = ""
    @trackdata = null
    @currentPage = 1
  )()
  false
)() 
 
$(document).ready ->

  App.appView = new App.Views.AppView({ el: $("body") }).render()
  
  App.appView.sidebar.toggle(null, false, 0)
  
  App.router = new App.Routers.Router()
  
  Backbone.history.start { pushState: false, root: "/TP2/" }