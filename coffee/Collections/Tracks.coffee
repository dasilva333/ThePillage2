#
# Track Collection
#

App.Collections.Tracks = Backbone.Collection.extend
  
  model : App.Models.Track
  keyword: ""
  page: 1
  url: ->
    "http://www.playlist.com/async/searchbeta/tracks?searchfor=#{@keyword}&page=#{@page}"
  add: (data) ->
    console.log("new collection added")
    console.log data
    
  initialize: (options) ->
    self = @
    
    @keyword = options.keyword
    @page = options.page
    
    console.log(@model)
    @fetch 
      type: "GET" 
      dataType: "jsonp" 
      complete: ->
        console.log(self)
        self.add PPL.search.trackdata
    