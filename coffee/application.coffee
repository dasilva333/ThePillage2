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


TrackPlayer = Backbone.View.extend
    id: "footer-container"
    ##
    ##
    isStationOwner: false
    ready: false
    volumeChangeChunk: 0.1
    volumePopupID: "#volume-popup"
    volumePopupDisappearDelay: 1000
    _volumePopupDisappearEvent: null
    events: 
        "click .volume-up": "volumeUp"
        "click .volume-down": "volumeDown"
        "click .player-skip": "forward"
        "click .favorite": "favorite"
        "click .share": "doShare"
    
    initialize: ->
        @template = _.template($("#player-template").html())
        @detailTemplate = _.template($("#station-player-template").html())
        
        a = @
        b = false
        _.bindAll(this, "render", "forward", "playStation", "updateVolumePopup")
        ##@model = sz.app.data.Station
        ##@model.bind("change", @updateStationBox, this)
        $(":input").live("focus", ->
            b = true
        ).live("blur", ->
            b = false
        )
        $(document).keypress( (c) ->
            if (b)
              return
            if (c.which is 187 or c.which is 61) 
                a.volumeUp()
            else if (c.which is 189 or c.which is 45)
                a.volumeDown()
             else if (c.which is 32)
                a.playPause()            
        )
    
    render: ->
        @volume = 0.60##sz.app.settings.get("volume")
        $(@el).html(@template({
            tracks: @model
        }))
        @buildPlayer()
        this
    
    updateStationBox: (a) -> 
        if (!a or !a.get("meta")) 
            @$(".stopped").show()
            return
        
        @$(".stopped").hide()
        @$(".station").html(@detailTemplate(a))
    
    updateVolumePopup: ->
        if (@_volumePopupDisappearEvent)
            clearTimeout(@_volumePopupDisappearEvent)
        
        g = $(@volumePopupID + " div.tick").removeClass("active")
        c = @volume
        h = g.splice(0, c * 10)
        $(h).addClass("active")
        e = $(@volumePopupID + " #volume-icon")
        b = c * 100
        d = "volume-100"
        if (b < 1)
            d = "volume-0"
        else
            if (b <= 33) 
                d = "volume-33"
            else
                if (b <= 66)
                    d = "volume-66"
                
            
        
        e.removeClass()
        e.addClass(d)
        $(@volumePopupID).stop().removeAttr("style").show()
        ##a = this
        ##@_volumePopupDisappearEvent = setTimeout(function f() {
        ##    $(a.volumePopupID).fadeOut()
        ##}, a.volumePopupDisappearDelay)
    
    buildPlayer: ->
        a = @ 
        @$("#jplayer").jPlayer({
            cssSelectorAncestor: "#player-container",
            swfPath: "swf/",
            supplied: "mp3",
            solution: "flash, html",
            preload: "auto",
            volume: a.volume,
            ready: ->
                a.ready = true
                a.trigger("ready")
            
            play: (b) ->
                a.$(".player-pause").show()
                a.$(".player-play").hide()
            
            pause: (b) ->
                a.$(".player-play").show()
                a.$(".player-pause").hide()
            
            ended: ->
                a.getNextTrack("next")
            
            error: ->
                $(this).jPlayer("clearMedia")
                a.getNextTrack("error")
            
        })
        a.$(".jp-seek-bar").unbind("click")
        a.$(".jp-play-bar").unbind("click")
    
    volumeUp: ->
        @volume += @volumeChangeChunk
        if (@volume > 1) 
            @volume = 1
        
        @$("#jplayer").jPlayer("volume", @volume)
        
        @updateVolumePopup()
        false
    
    volumeDown: ->
        @volume -= @volumeChangeChunk
        if (@volume < 0)
            @volume = 0
        
        @$("#jplayer").jPlayer("volume", @volume)
        
        @updateVolumePopup()
        false
    
    playPause: ->
        a = @$("#jplayer")
        if (a.length) 
            if (a.data("jPlayer").status.paused) 
                a.jPlayer("play")
            else 
                a.jPlayer("pause")

    stopStation: (a) ->
        if (arguments.length is 1 or a isnt @model.id)
            return
        @$(".stopped").show()
        @$("#jplayer").jPlayer("stop").jPlayer("clearMedia")
        @model.clear()
        @trigger("stopped")
    
    playStation: (a) ->
        @$(".stopped").hide()
        @getNextTrack("first")
        @trigger("playing")
    
    getPlayDuration: ->
        a = 0
        b = @$(".jp-current-time").html()
        c = 0        
        b = b.split(":")
        a = parseInt(b[0], 10) * 60
        c = parseInt(b[1], 10)
        return a + c
    
    getNextTrack: (d) ->        
        console.log(d)
        ##@handleNext(e, f)
            
    handleNext: (b) ->
        ##f = b.toJSON()
        c = @$("#jplayer")
        ##e = f.duration
        ##a = Math.floor(e / 60)
        ##d = e - (a * 60)
        ##d = (d <= 9) ? "0" + d : d
        ##formattedDuration = (a <= 9 ? "0" : "") + a + ":" + d
        ##$("#duration").text(formattedDuration)
        ##$.jPlayer.convertTime
        
        $(c).jPlayer("setMedia", {
            mp3: b.getSongUrl()
        }).jPlayer("play")
    
    handleError: (b, c) ->
        alert("player error")
        
    forward: ->
        @getNextTrack("next")
        false
    
    favorite: ->
        @model.toggleFavorite()
        false
    
    doShare: ->
        @model.share()
        false
    


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
        "submit": "search"  
   
    search: ( event ) ->
      ##location.hash = '#/search/' + @$el.find("input").val() + '/1'
      app.homeController.navigate('#search-' + @$el.find("input").val() + '-1', {trigger: true});
      app.homeController.search @$el.find("input").val()
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
      
  getTrackId: ->
    @get 'trackid'    
    

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
# Tracks View
#
  
class TracksView extends Backbone.View
  
  constructor: ->
    super
    
    @el = app.activePage()

    @template = ich.tracks
    
    @tracks = new TrackCollection { keyword : @options.keyword, page: @options.page }
    
    @tracks.on "add", @render
    
  render: =>
    # Render the content
    
    @el.find('#content-body').html @template @tracks

    # A hacky way of reapplying the jquery mobile styles
    app.reapplyStyles(@el)
         
    
#
# SearchResults View
#
  
class HomeView extends Backbone.View
  
  constructor: ->
    super
    
    @el = app.activePage()

    @template = ich.history
    
    @history = 
      items: [
        {keyword: "Muse", count: 1}
        {keyword: "Radiohead", count: 5}
        {keyword: "Adele", count: 3}
        {keyword: "Tool", count: 2}
      ]
    
    @render()
    
  render: =>
    # Render the content
    
    @el.find('#content-body').html @template @history

    # A hacky way of reapplying the jquery mobile styles
    app.reapplyStyles(@el)         
    
    

class AppController extends Backbone.Router
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
    console.log('home')
    @_views['home'] ||= new HomeView

  search: (keyword, page) -> 
    console.log(arguments)
    page or= 1
    @_views["search-#{keyword}-#{page}"] ||= new TracksView { keyword : keyword, page: page }

  play: (keyword, page, cid) ->
      @search(keyword, page)
      ##need to figure out how to wait for the ready event of search to fire this part
      track = @_views["search-#{keyword}-#{page}"].tracks.getByCid(cid)
      app.TrackPlayer.handleNext track
            
$(document).ready ->

  ##app.homeController.search("Muse")   
  search = new SearchView({ el: "#search-form" })
  sb = new Sidebar({ el: "#nav", content: "#content-scroll", arrow: "#arrow", items: "#nav-content" })
  sb.toggleExpand(null, false, 0)  
  content = new Content()
  
  app.TrackPlayer = new TrackPlayer
    el: $("#player-container")
  app.TrackPlayer.render()   
  
  app.homeController = new AppController()
  
  Backbone.history.start({ pushState: false, root: "/TP2/" })
    
@app = app
