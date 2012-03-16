
App.Views.ContentView = Backbone.View.extend

  render: ->
    @renderScrollbar()
    $(window, "#content-scroll").on("resize", @updateScrollbar)
  
  renderScrollbar: ->
      b = $("#content-scroll")
      c = $("#content-view")
      c.innerscroll
          destination: b
          draggable: true
      scrollbar = b.children().not(c)
      scrollbar.addClass("scrollbar")

      ##this is outputting 50 for chrome and 33 for firefox, not sure why but its the cause of the right side 
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
      ##console.log( c )
      $('<style type="text/css">#content-scroll.scroll.open #content {right:' + (b - c) + "px}#content-scroll.scroll #content {right:" + (d - c) + "px}</style>").appendTo("head")
      
  _updateScrollbar: ->
      d = $("#content").innerHeight()
      c = $("#content-scroll")
      b = c.height()
      c.removeClass("scroll")
      if (b < d)
          c.addClass("scroll")
  
  updateScrollbar: =>
      try
        setTimeout(@_updateScrollbar, 500)
      catch e  