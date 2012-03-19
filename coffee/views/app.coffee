App.Views.AppView = Backbone.View.extend
  render: ->
    @sidebar = new App.Views.SidebarView { el: "#nav", content: "#content-scroll", arrow: "#arrow", items: "#nav-content" }
    @header = new App.Views.HeaderView({ el: @.$("#header"), content: "#main" }).hide()
    @player = new App.Views.TrackPlayer({ el: @.$("#player-container") }).render()
    @search = new App.Views.SearchView { el: @.$("#search-form") }   
    @