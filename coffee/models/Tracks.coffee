#
# Track Collection
#

class App.Models.Tracks extends Backbone.Collection
  model : App.Models.Track
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