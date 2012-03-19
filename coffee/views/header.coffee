App.Views.HeaderView = Backbone.View.extend
  initialize: (options) ->
    @content = $(options.content)
    @
    
  hide: ->
    ##@$el.height(0)
    @content.css { "top": 0 }
    @

  show: ->
    ##@$el.height(82)
    @content.css { "top": "88px" }
    @