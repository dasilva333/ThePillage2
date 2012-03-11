#
# Some helper methods
#

app =
  activePage: ->
    $(".ui-page-active")
    
  reapplyStyles: (el) ->
    el.find('ul[data-role]').listview();
    el.find('div[data-role="fieldcontain"]').fieldcontain();
    el.find('button[data-role="button"]').button();
    el.find('input,textarea').textinput();
    el.page()
    
  redirectTo: (page) ->
    $.mobile.changePage page
  
  goBack: ->
    $.historyBack()
  
  views: {}    

#
# Track class
#

class Track extends Backbone.Model

  getSongUrl: ->
    rc4.decrypt @get("song_url"),"Error, this track is not valid!"
  
  getAlbumImage: ->
    @get 'album'
    
  getArtist: ->
    @get 'artist'
  
  getTitle: ->
    @get 'title'
  
  getFullName: ->
    "#{ @get('artist') } - #{ @get('title') } "
  
  getDurationFormatted: ->
      $.jPlayer.convertTime @get 'duration'
#
# Track Collection
#

class TrackCollection extends Backbone.Collection
  model : Track
  
  constructor: ->
    super
    @add($PLAYLIST_JSON)
  
this.Tracks = new TrackCollection


#
# Show Track View
#

class ShowTrackView extends Backbone.View
  constructor: ->
    super
    console.log("showTracKView")
    # Get the active page from jquery mobile. We need to keep track of what this
    # dom element is so that we can refresh the page when the page is no longer active.
    @el = app.activePage()
    
    @template = _.template('''
        <a data-role="button" data-theme="b">Download</a>
        <a data-role="button">Find More By This Artist</a>
        <a data-role="button">Share Music Link</a>
        <a href="index.html" data-role="button" data-rel="back">Go Back</a>
    ''')
    
    # Watch for changes to the model and redraw the view
    @model.bind 'change', @render
    
    # Draw the view
    @render()
    
  render: =>
    # Set the name of the page
    @el.find('h1').text(@model.getFullName())
    
    # Render the content
    @el.find('.ui-content').html(@template({Track : @model}))

    # A hacky way of reapplying the jquery mobile styles
    app.reapplyStyles(@el)
  
#
# Home View
#
  
class HomeView extends Backbone.View
  constructor: ->
    super
    
    @el = app.activePage()
    
    @template = _.template('''
      <div>
      
      <ul data-role="listview" data-theme="c" data-filter="true">
        <% tracks.each(function(track){ %>
          <li>
            <a href="<%= track.getSongUrl() %>">
              <img src="<%= track.getAlbumImage() %>" >
              <h3><%= track.getArtist() %></h3>
              <p><%= track.getTitle() %></p>
              <span class="ui-li-count"><%= track.getDurationFormatted() %></span>
            </a>  
            <a href="#tracks-<%= track.cid %>">More Options</a>     
          </li>          
        <% }); %>
      </ul>
      
      </div>
    ''')
    
    @render()
    
  render: =>
    # Render the content
    @el.find('.ui-content').html(@template({tracks : Tracks}))

    # A hacky way of reapplying the jquery mobile styles
    app.reapplyStyles(@el)  
    
#####
app.homeController = new $.mobile.Router(
  {
    "#search": 
        handler: "viewTracks"
        events: "bc,c,i,bs,s,bh,h"
        
    "#track-(?:[?/](.*))?": 
        handler: "view-track"
        events: "bc,c,i,bs,s,bh,h"

    "#home": 
        handler: (type) ->
          console.log("index called")
          app.views['home'] ||= new HomeView
            
        events: "h,s"    
  }, 
  {
    viewTracks: (type, match, ui) ->
      console.log(arguments)
      
    show: (type, match, ui) ->
        console.log(arguments)
        app.views["track-#{cid}"] ||= new ShowTrackView { model : Tracks.getByCid(cid) }    
  },
  {
      defaultHandler: (type, ui, page) ->
          console.log("Default handler called due to unknown route (" + type + ", " + ui + ", " + page + ")")
  
      defaultHandlerEvents: "s"    
  }
)
#####

class HomeController extends Backbone.Controller
  routes :
    "#venues-:cid" : "show"
    "#home"  : "home"

  constructor: ->
    super
    @_views = {}

  home : ->
    console.log("home")
    @_views['home'] ||= new HomeView

  show: (cid) ->
    console.log("show")
    @_views["venues-#{cid}"] ||= new ShowVenueView { model : Venues.getByCid(cid) }
    
@app = app
