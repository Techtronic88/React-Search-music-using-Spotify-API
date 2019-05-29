import React, {Component} from 'react';
import Artist from "./Artist";
import Tracks from "./Tracks"

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com"

class App extends Component {
  state = { artistQuery: '', artist: null, tracks: null}

  updateArtistQuery = event => {
    this.setState({artistQuery: event.target.value})
  }

  handleKeyPress = event => {
     if (event.key === "Enter") {
          this.searchArtist();
          
     }
  }

  searchArtist = event => {
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
    .then(response => response.json())
    .then(json => {
        console.log('json', json);

        if (json.artists.total > 0) {
            const artist = json.artists.items[0];

            console.log('artist pulled', artist)
            this.setState({artist: artist})

            fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
                .then(response => response.json())
                .then(json => this.setState({tracks: json.tracks}))
                .catch(error => alert(error.message))
         }
      })
      .catch(error => alert(error.message)); 
  }


  render () {

    console.log('this.state', this.state);
    const {updateArtistQuery, handleKeyPress, searchArtist} = this
    const {artist, tracks} = this.state

    return (
    <div>
      <h2> Music Master</h2>
      <input 
      onChange={updateArtistQuery} 
      onKeyPress={handleKeyPress}
      placeholder="Search for an Artist" 
      />
      <button onClick={searchArtist}> Search</button>
      <Artist artist={artist} />
      <Tracks tracks={tracks} />
    </div>
  )
 }
}

export default App;
