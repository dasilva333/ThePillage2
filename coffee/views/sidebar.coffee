App.Views.SearchView = Backbone.View.extend
    events: 
        "submit": "search"  
   
    search: ( event ) ->
      ##location.hash = '#/search/' + @$el.find("input").val() + '/1'
      app.router.navigate '#search-' + @$el.find("input").val() + '-1', {trigger: true}
      app.router.search @$el.find("input").val()
      false