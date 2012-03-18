App.Views.SidebarView = Backbone.View.extend
  speed: 200
  initialize: -> 
    @el = $(@options.el)
    @content = $(@options.content)
    @arrow = $(@options.arrow)
    @items = $(@options.items)
    @
  
  events: 
      'click #collapsible-nav': 'toggle'

  toggle: (event, show, speed) ->
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