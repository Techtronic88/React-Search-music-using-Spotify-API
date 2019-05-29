import React, {Component} from 'react';
import Artist from "./Artist";
import Tracks from "./Tracks";
import Search from "./Search"
import "../index.css"

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com"

class App extends Component {
  state = { artist: null, tracks: null}

  componentDidMount() {
    this.searchArtist("Akon");
  }

  searchArtist = artistQuery => {
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
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
    const {artist, tracks} = this.state
    return (
    <div>
      <h2> Music Master</h2>
      <Search searchArtist={this.searchArtist}/>
      <Artist artist={artist} />
      <Tracks tracks={tracks} />
    </div>
  )
 }
}

export default App;
