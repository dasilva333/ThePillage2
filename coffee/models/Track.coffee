_.extend Backbone.Model::,
  next: ->
    @collection.at (@collection.indexOf(this) + 1) % @collection.length

  prev: ->
    index = @collection.indexOf(this) - 1
    @collection.at (if index > -1 then index else @collection.length - 1)
    
#
# Track class
#

class App.Models.Track extends Backbone.Model

  active: false
  
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