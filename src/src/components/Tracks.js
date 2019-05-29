import React, { Component } from 'react';

class Tracks extends Component {
    
    state = { playing: false, audio: null, playingReview: null }

    // NOTICE: we are using double arrow function
    playAudio = previewUrl => () => {
        const audio = new Audio(previewUrl);
        
        
        // The line below is the same as saying if (this.state.playing === false) just by putting an exclaimation mark
        // Note: false = playing, true = not playing
        // PROBLEM: Original object when clicked on playing. Click again the same song play over the same one
        // SOLUTION: notice we added audio into state: null -> we can refer to that to pause. 
        // TAKE AWAY LESSON  we can use boolean to solve these kind of problems

        // everytime CLICK happens -> new audio get recreated 
              // We want to pause the origial audio object: Not the new one
                // Then keep track of the current audio state so we can pause that one later



        // NEXT PROBLEM: It takes 1 click to pause - 1 click on the next to play the next song
               // We want one click on the next album and plays straight away.
        // STEPS: When click -> pause existing song -> get the next click object -> play that
               // The idea is if they click on the same album we know to pause
                  // If they click on a different previewURL = new click we want to pause and play that previewURL 
        // setstate to false again so song can play -> audio and plauying

        
        if(!this.state.playing){
            audio.play()
            this.setState({ playing:true, audio: audio, playingReview: previewUrl })
        } else {
            this.state.audio.pause();
             if ( this.state.playingReview === previewUrl ) {
                 this.setState({ playing: false});
             }  else {
                 audio.play();
                 this.setState({audio, playingReview: previewUrl})
        }
    }       
} 
    trackIcon = track => {
        if(!track.preview_url){
            return <span>N/A</span>
        }
        if(this.state.playing  && 
        this.state.playingReview === track.preview_url) {
            return <span>||</span>
        } 
        return <span>&#9654;</span>
    }

    render() {
        
        const { tracks } = this.props;
        if(!tracks)  return null
   

    return (
        <div>
        {
            tracks.map(track => {
                const {id, name, album, preview_url } = track;

                return (
                    // CODE BELOW onClick Handler need a reference to a function.
                    // Since we are using parentheses to pass in the URL -> we are calling the function right in JSX.
                    // THIS IS BAD practice as we don't execute function in JSX -> could cause loops / memory leaks.
                    // SOLUTION: Make an function return another function itself by using double arrow syntax.
                    <div key={id} 
                         onClick={this.playAudio(preview_url)}
                         className="track"
                         >
                        <img src={album.images && album.images[0].url} 
                             alt="album-cover" 
                             className="track-image"
                        />
                        <p className="track-text">{name}</p>
                        <p className="track-icon">{this.trackIcon(track)}</p> 
                    </div> 
                )
            })
        }
        </div> 
       )
    }
 }
 export default Tracks
