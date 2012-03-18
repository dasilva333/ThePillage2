#
# Some helper methods
#

window.App =
  activePage: ->
    $ ".ui-page-active"

  reapplyStyles: (el) ->
    el.find("ul[data-role]").listview()
    el.find("div[data-role=\"fieldcontain\"]").fieldcontain()
    el.find("button[data-role=\"button\"]").button()
    el.find("input,textarea").textinput()
    el.page()
    App.appView.scroller.updateScrollbar()

  Views: {}
  Models: {}
  Routers: {}
  Collections: {}