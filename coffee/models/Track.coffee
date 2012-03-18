#
# Track class
#

class App.Models.Track extends Backbone.Model

  getSongUrl: ->
    rc4.decrypt @get("song_url"),"Error, this track is not valid!"
  
  getAlbumImage: ->
    "images/noAlbumImage.png"
    
  getArtist: ->
    @get 'artist'
  
  getTitle: ->
    @get 'title'
  
  getFullName: ->
    "#{ @get('artist') } - #{ @get('title') } "
  
  getDurationFormatted: ->
      $.jPlayer.convertTime @get 'duration'
      
  getTrackId: ->
    @get 'trackid'