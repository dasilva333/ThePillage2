#
# Tracks View
#
  
class TracksList extends Backbone.View
  
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
         