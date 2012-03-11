window.RemoteLogger = 
  logEvent: ->
    
window.PPL = new (->
  
  ##these are placeholder objects that must be here for playlist.com's api
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

Content = Backbone.View.extend
  initialize: ->
      @render()
      @
  
  render: ->
    @renderScrollbar()
    ##@updateScrollbar()
    $(window, "#content-scroll").on("resize", @updateScrollbar)
  
  renderScrollbar: ->
      b = $("#content-scroll")
      c = $("#content-view")
      c.innerscroll
          destination: b
          draggable: true
      scrollbar = b.children().not(c)
      scrollbar.addClass("scrollbar")

      c = ( ->
          g = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>')
          $("body").append(g)
          f = g.children("div").innerWidth()
          g.css("overflow-y", "scroll")
          e = g.children("div").innerWidth()
          g.remove()
          (f - e)
      )()
      d = 155
      b = 338
      $('<style type="text/css">#content-scroll.scroll.open #content {right:' + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo("head")
      
  
  _updateScrollbar: ->
      d = $("#content").innerHeight()
      c = $("#content-scroll")
      b = c.height()
      c.removeClass("scroll")
      if (b < d)
          c.addClass("scroll")
  
  updateScrollbar: =>
      setTimeout(@_updateScrollbar, 500)
  

 
SearchView = Backbone.View.extend
    events: 
        "submit": "doSearch"  
   
    doSearch: ( event ) ->
        ##Button clicked, you can access the element that was clicked with event.currentTarget
        alert( "Search for " + this.el.find("input").val() )
        false

Sidebar = Backbone.View.extend
  speed: 200
  initialize: -> 
    @el = $(@options.el)
    @content = $(@options.content)
    @arrow = $(@options.arrow)
    @items = $(@options.items)
    @
  
  events: 
      'click #collapsible-nav': 'toggleExpand'

  toggleExpand: (event, show, speed) ->
    if (show or this.items.is(":visible"))
      this.el.animate({width:30}, speed || this.speed)
      this.items.fadeOut(30)
      this.arrow.switchClass('arrowLeft','arrowRight',30)
      this.content.animate({left:31}, speed || this.speed)
    else 
      this.el.animate({width:155}, speed || this.speed)
      this.items.delay(170).fadeIn(100)
      this.arrow.switchClass('arrowRight','arrowLeft',30)
      this.content.animate({left:156}, speed || this.speed)
 
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

class AppController extends Backbone.Router
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
    
app.homeController = new AppController()
    
$(document).ready ->
  ##Backbone.history.start()
  app.homeController.search("Muse")   
  
  sb = new Sidebar({ el: "#nav", content: "#content-scroll", arrow: "#arrow", items: "#nav-content" });
  sb.toggleExpand(null, false, 0);  
  content = new Content();
  search = new SearchView({ el: "#search-form" });
  
   
    
@app = app
