App.Views.SearchView = Backbone.View.extend
    events: 
        "submit": "search"  
   
    search: ( event ) ->
      App.router.navigate '#search-' + @$el.find("input").val(), {trigger: true}
      App.router.search @$el.find("input").val()
      false