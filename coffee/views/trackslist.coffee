
App.Views.ContentView = Backbone.View.extend

  render: ->
    @renderScrollbar()
    $(window, "#content-scroll").on("resize", @updateScrollbar)
  
  a: ->
    c = (->
      g = $("<div style=\"width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;\"><div style=\"height:100px;\"></div>")
      f = undefined
      e = undefined
      $("body").append g
      f = g.children("div").innerWidth()
      g.css "overflow-y", "scroll"
      e = g.children("div").innerWidth()
      g.remove()
      f - e
    )()
    d = 155
    b = 338
    $("<style type=\"text/css\">#content-scroll.scroll.open #content {right:" + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo "head"
  
  renderScrollbar: ->
    b = $("#content-scroll")
    c = $("#content-view")
    c.innerscroll
      destination: b
      draggable: true
    
    scrollbar = b.children().not(c)
    scrollbar.addClass "scrollbar"
    @a()
  
  _updateScrollbar: ->
    d = $("#content").innerHeight()
    c = $("#content-scroll")
    b = c.height()
    c.removeClass "scroll"
    c.addClass "scroll"  if b < d
  
  updateScrollbar: ->
    setTimeout @_updateScrollbar, 500
    
#
# Tracks View
#
class App.Views.TracksList extends App.Views.ContentView

  initialize: ->
    _.bindAll this, "next", "render"
    @collection.bind "add", @render
    @template = ich.tracks
    @_trackCollectionView = new App.Views.UpdatingCollectionView
      collection: @collection,
      childViewConstructor: App.Views.TrackView
    @
    
  events:
    "click a.next": "next"

  render: ->
    
    @$el.find("#content-body").html @template @collection.pageInfo() 
    @_trackCollectionView.el = @$el.find(".tracks").empty()    
    @_trackCollectionView.render()
    App.reapplyStyles(@$el)
    super
    @

  next: ->
    @collection.nextPage()
    false



