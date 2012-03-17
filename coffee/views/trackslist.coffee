#
# Tracks View
#

App.Views.TracksList = Backbone.View.extend
  
  initialize: ->

    @template = ich.tracks
    console.log("TracksList initialize")
    console.log(@)
    @tracks = '';
    
    ##@tracks.on "add", @render
    @
    
  render: ->
    console.log("TracksList render")
    console.log(@)
    # Render the content
    @$el.find('#content-body').html @template @tracks
    
    # A hacky way of reapplying the jquery mobile styles
    App.reapplyStyles(@$el)
    @
         