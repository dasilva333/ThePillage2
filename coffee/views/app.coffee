App.Views.AppView = Backbone.View.extend
  render: ->
    @sidebar = new App.Views.SidebarView { el: "#nav", content: "#content-scroll", arrow: "#arrow", items: "#nav-content" }
    @player = new App.Views.TrackPlayer { el: @.$("#player-container") }
    @search = new App.Views.SearchView { el: @.$("#search-form") }   
    @