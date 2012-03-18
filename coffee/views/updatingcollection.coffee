App.Views.UpdatingCollectionView = Backbone.View.extend
  initialize: (options) ->
    _(this).bindAll "add", "remove"
    throw "no child view constructor provided"  unless options.childViewConstructor
    @_childViewConstructor = options.childViewConstructor
    @_childViews = []
    @collection.each @add
    @collection.bind "add", @add
    @collection.bind "remove", @remove
    
  add: (model) ->
    childView = new @_childViewConstructor
      model: model
    @_childViews.push childView
    if @_rendered
      @el.append childView.render().el  

  remove: (model) ->
    viewToRemove = _(@_childViews).select((cv) ->
      cv.model is model
    )[0]
    @_childViews = _(@_childViews).without(viewToRemove)
    $(viewToRemove.el).remove()  if @_rendered

  render: ->
    @_rendered = true
    @el.empty()
    _(@_childViews).each (childView) =>
      @el.append childView.render().el
    @