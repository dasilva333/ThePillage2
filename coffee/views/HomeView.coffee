#
# Home View
#
App.Views.HomeView = Backbone.View.extend  
  
  initialize: ->

    @template = ich.history
    
    @history = 
      items: [
        {keyword: "Muse", count: 1}
        {keyword: "Radiohead", count: 5}
        {keyword: "Adele", count: 3}
        {keyword: "Tool", count: 2}
      ]
    
  render: =>
    # Render the content
    @el = app.activePage()
        
    @el.find('#content-body').html @template @history

    # A hacky way of reapplying the jquery mobile styles
    App.reapplyStyles(@el)     