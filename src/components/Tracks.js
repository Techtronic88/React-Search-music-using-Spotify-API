import React, { Component } from 'react';

class Tracks extends Component {

    state = { playing: false, audio: null, playingPreviewUrl: null }

    // NOTICE: we are using double arrow function
    playAudio = previewUrl => () => {
        const audio = new Audio(previewUrl);
        
        
        // The line below is the same as saying if (this.state.playing === false) just by putting an exclaimation mark
        // Note: false = playing, true = not playing
        // PROBLEM: Original object when clicked on playing. We want that to play not a new one with a new click
        // SOLUTION: notice we added audio into state: null -> we can refer to that to pause. 
        // TAKE AWAY LESSON  we can use boolean to solve these kind of problems

        // NEXT PROBLEM: It takes 2 clicks for each tracks to play while the previous song is playing
        // if they click on the same album -> we know to call pause  -> state now hold current song 
        // next album get click -> we change the state to the clicked one  preview URL
        

        if(!this.state.playing){
            audio.play();
            this.setState({playing: true, audio, playingPreviewUrl: previewUrl })
        } else {
            this.state.audio.pause();   
             if(this.state.playingPreviewUrl === previewUrl){
                 this.setState({playing: false})
                 audio.play()
                  
             } else {
                 this.setState({ audio, playingPreviewUrl: previewUrl})
             }
            this.setState({playing: false})
          }
        
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
                    <div key={id} onClick={this.playAudio(preview_url)}>
                        <img src={album.images && album.images[0].url} alt="album-cover" />
                        <p>{name}</p>
                    </div> 
                )
            })
        }
        </div> 
       )
    }
 }
 export default Tracks
