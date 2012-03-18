#
# Paginated Collection Helper
# Github Gist @ https://gist.github.com/838460/2e852c15a911f080559ec95b0960bf59be287616
# only modification was to remove the fetch method, and a tweak to the url method
#
App.Collections.PaginatedCollection = Backbone.Collection.extend(
  initialize: ->
    _.bindAll this, "parse", "url", "pageInfo", "nextPage", "previousPage"
    typeof (options) isnt "undefined" or (options = {})
    @page = 1
    typeof (@perPage) isnt "undefined" or (@perPage = 10)

  parse: (resp) ->
    @page = resp.page
    @perPage = resp.perPage
    @total = resp.total
    resp.models

  url: ->
    @baseUrl() + "&" + $.param(
      page: @page
    )

  pageInfo: ->
    info =
      total: @total
      page: @page
      perPage: @perPage
      pages: Math.ceil(@total / @perPage)
      prev: false
      next: false

    max = Math.min(@total, @page * @perPage)
    max = @total  if @total is @pages * @perPage
    info.range = [ (@page - 1) * @perPage + 1, max ]
    info.prev = @page - 1  if @page > 1
    info.next = @page + 1  if @page < info.pages
    info

  nextPage: ->
    return false  unless @pageInfo().next
    @page = @page + 1
    @fetch()

  previousPage: ->
    return false  unless @pageInfo().prev
    @page = @page - 1
    @fetch()
)

#
# Track Collection
#

class App.Collections.Tracks extends App.Collections.PaginatedCollection
  
  model : App.Models.Track
  
  baseUrl: ->
    "http://www.playlist.com/async/searchbeta/tracks?searchfor=#{@keyword}"
    
  sync: (method, model, options) ->
    params = _.extend(
      type: "GET"
      dataType: "jsonp"
      url: model.url()
      processData: false
      complete: options.success
    , options)
    $.ajax params
    
  parse: (resp) ->
    super
      page: PPL.search.currentPage
      perPage: 10
      total: parseInt PPL.search.track_count
      models: PPL.search.trackdata
      
      
  fetch: ->
    super { add: true }
    @
    
  initialize: (collections, options) ->
    @keyword = options.keyword
