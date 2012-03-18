
#
# Track View
#
App.Views.TrackView = Backbone.View.extend
  tagName: 'li'
  
  initialize: ->
    @template = ich.track
    
  render: ->
     @$el.html @template @model
     @