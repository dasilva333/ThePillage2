#
# Tracks View
#
App.Views.TracksList = Backbone.View.extend

  initialize: ->
    _.bindAll this, "next", "render"
    @template = ich.tracks
    @collection.bind "refresh", @render
    @
    
  events:
    "click a.next": "next"

  render: ->
    ##@el.html app.templates.pagination(@collection.pageInfo())
    @$el.find('#content-body').html @template @collection
    App.reapplyStyles(@$el)
    @

  next: ->
    @collection.nextPage()
    false



