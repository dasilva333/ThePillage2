#
# Some helper methods
#

app =
  activePage: ->
    $(".ui-page-active")
    
  reapplyStyles: (el) ->
    el.find('ul[data-role]').listview();
    el.find('div[data-role="fieldcontain"]').fieldcontain();
    el.find('button[data-role="button"]').button();
    el.find('input,textarea').textinput();
    el.page()
    
  redirectTo: (page) ->
    $.mobile.changePage page
  
  goBack: ->
    $.historyBack()
  
  views: {}    

#
# Track class
#

class Track extends Backbone.Model

  getSongUrl: ->
    rc4.decrypt @get("song_url"),"Error, this track is not valid!"
  
  getAlbumImage: ->
    "images/noAlbumImage.png"
    
  getArtist: ->
    @get 'artist'
  
  getTitle: ->
    @get 'title'
  
  getFullName: ->
    "#{ @get('artist') } - #{ @get('title') } "
  
  getDurationFormatted: ->
      $.jPlayer.convertTime @get 'duration'
#
# Track Collection
#

class TrackCollection extends Backbone.Collection
  model : Track
  keyword: ""
  page: 1
  url: ->
    "http://www.playlist.com/async/searchbeta/tracks?searchfor=#{@keyword}&page=#{@page}"
  
  constructor: (options)->
    super
    @reset()
    @keyword = options.keyword
    @page = options.page
    @fetch { type: "GET", dataType: "jsonp", complete: @success }

  success: (data) =>
    @add PPL.search.trackdata

#
# SearchResults View
#
  
class SearchResultsView extends Backbone.View
  
  
  constructor: ->
    super
    
    @el = app.activePage()

    @template = ich.tracks
    
    @tracks = new TrackCollection { keyword : @options.keyword, page: @options.page }
    
    @tracks.on "add", @render
    
    @render()
    
  render: =>
    # Render the content
    
    @el.find('#content-body').html @template @tracks

    # A hacky way of reapplying the jquery mobile styles
    app.reapplyStyles(@el)     

class HomeController extends Backbone.Router
  routes :
    "home"  : "home"
    "search-:keyword" : "search"
    "search-:keyword-:page" : "search"
    "track-:trackid" : "show"    

  constructor: ->
    super
    @_views = {}

  home : ->
    @_views['home'] ||= new HomeView

  search: (keyword, page) -> 
    page or= 1
    @_views["search-#{keyword}-#{page}"] ||= new SearchResultsView { keyword : keyword, page: page }

  show: (cid) ->
    ##@_views["venues-#{cid}-edit"] ||= new EditVenueView { model : Venues.getByCid(cid) }
    
app.homeController = new HomeController()
    
$(document).ready ->
  ##Backbone.history.start()
  app.homeController.search("Muse")    
    
@app = app
