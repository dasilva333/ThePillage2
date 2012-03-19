App.Views.TrackPlayer = Backbone.View.extend

    id: "footer-container"
    isStationOwner: false
    ready: false
    volumeChangeChunk: 0.1
    volumePopupID: "#volume-popup"
    volumePopupDisappearDelay: 1000
    _volumePopupDisappearEvent: null
    events: 
        "click .volume-up": "volumeUp"
        "click .volume-down": "volumeDown"
        "click .player-skip": "forward"
        "click .favorite": "favorite"
        "click .share": "doShare"
    
    initialize: ->
        _.bindAll(this, "render", "forward", "playStation", "updateVolumePopup")
        @template = ich.player
        
        a = @
        b = false
        
        ##@model = sz.app.data.Station
        ##@model.bind("change", @updateStationBox, this)
        $(":input").live("focus", ->
            b = true
        ).live("blur", ->
            b = false
        )
        $(document).keypress( (c) ->
            if (b)
              return
            if (c.which is 187 or c.which is 61) 
                a.volumeUp()
            else if (c.which is 189 or c.which is 45)
                a.volumeDown()
             else if (c.which is 32)
                a.playPause()            
        )
    
    render: ->
        @volume = 0.60##sz.app.settings.get("volume")
        @$el.html @template(
            tracks: @model
        )
        @buildPlayer()
        this
    
    updateVolumePopup: ->
        if (@_volumePopupDisappearEvent)
            clearTimeout(@_volumePopupDisappearEvent)
        
        g = $(@volumePopupID + " div.tick").removeClass("active")
        c = @volume
        h = g.splice(0, c * 10)
        $(h).addClass("active")
        e = $(@volumePopupID + " #volume-icon")
        b = c * 100
        d = "volume-100"
        if (b < 1)
            d = "volume-0"
        else if (b <= 33) 
            d = "volume-33"
        else if (b <= 66)
            d = "volume-66"

        e.removeClass()
        e.addClass(d)
        $(@volumePopupID).stop().removeAttr("style").show()
        a = this
        @_volumePopupDisappearEvent = setTimeout(->
            $(a.volumePopupID).fadeOut()
        , a.volumePopupDisappearDelay)
    
    buildPlayer: ->
        a = @ 
        @$("#jplayer").jPlayer({
            cssSelectorAncestor: "#player-container",
            swfPath: "swf/",
            supplied: "mp3",
            solution: "flash, html",
            preload: "auto",
            volume: a.volume,
            ready: ->
                a.ready = true
                a.trigger("ready")
            
            play: (b) ->
                a.$(".player-pause").show()
                a.$(".player-play").hide()
            
            pause: (b) ->
                a.$(".player-play").show()
                a.$(".player-pause").hide()
            
            ended: ->
                a.getNextTrack("next")
            
            error: ->
                $(this).jPlayer("clearMedia")
                a.getNextTrack("error")
            
        })
        a.$(".jp-seek-bar").unbind("click")
        a.$(".jp-play-bar").unbind("click")
    
    volumeUp: ->
        @volume += @volumeChangeChunk
        if (@volume > 1) 
            @volume = 1
        
        @$("#jplayer").jPlayer("volume", @volume)
        
        @updateVolumePopup()
        false
    
    volumeDown: ->
        @volume -= @volumeChangeChunk
        if (@volume < 0)
            @volume = 0
        
        @$("#jplayer").jPlayer("volume", @volume)
        
        @updateVolumePopup()
        false
    
    playPause: ->
        a = @$("#jplayer")
        if (a.length) 
            if (a.data("jPlayer").status.paused) 
                a.jPlayer("play")
            else 
                a.jPlayer("pause")

    stopStation: (a) ->
        if (arguments.length is 1 or a isnt @model.id)
            return
        @$(".stopped").show()
        @$("#jplayer").jPlayer("stop").jPlayer("clearMedia")
        @model.clear()
        @trigger("stopped")
    
    playStation: (a) ->
        @$(".stopped").hide()
        @getNextTrack("first")
        @trigger("playing")
    
    getPlayDuration: ->
        a = 0
        b = @$(".jp-current-time").html()
        c = 0        
        b = b.split(":")
        a = parseInt(b[0], 10) * 60
        c = parseInt(b[1], 10)
        return a + c
    
    getNextTrack: (d) ->        
        ##console.log(d)
        ##@handleNext(e, f)
            
    handleNext: (b) ->
        if (b)
          ##f = b.toJSON()
          c = @$("#jplayer")
          ##e = f.duration
          ##a = Math.floor(e / 60)
          ##d = e - (a * 60)
          ##d = (d <= 9) ? "0" + d : d
          ##formattedDuration = (a <= 9 ? "0" : "") + a + ":" + d
          ##$("#duration").text(formattedDuration)
          ##$.jPlayer.convertTime
          $(c).jPlayer("setMedia", {
              mp3: b.getSongUrl()
          }).jPlayer("play")
          false
       
    handleError: (b, c) ->
        alert("player error")
        
    forward: ->
        @getNextTrack("next")
        false
    
    favorite: ->
        @model.toggleFavorite()
        false
    
    doShare: ->
        @model.share()
        false