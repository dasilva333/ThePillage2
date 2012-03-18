#
# Some helper methods
#

window.App =
  
  activePage: ->
    $ ".ui-page-active"

  reapplyStyles: (el) ->
    setTimeout(->
      el.find("ul[data-role]").listview()
      el.find("div[data-role=\"fieldcontain\"]").fieldcontain()
      el.find("button[data-role=\"button\"]").button()
      el.find("input,textarea").textinput()
      el.css("min-height","")
      el.page()
      el.find( ":jqmData(role=listview)" ).listview('refresh')
    ,100)
  
  redirectTo: (page) ->
    $.mobile.changePage page
  
  goBack: ->
    $.historyBack()

  Views: {}
  Models: {}
  Routers: {}
  Collections: {}