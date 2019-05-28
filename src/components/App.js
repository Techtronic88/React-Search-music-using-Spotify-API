import React, {Component} from 'react';

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com"

class App extends Component {
  state = { artistQuery: '', artist: null}

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
        }
    })
    
    
    
  }


  render () {
    return (
    <div>
      <h2> Music Master</h2>
      <input 
      onChange={this.updateArtistQuery} 
      onKeyPress={this.handleKeyPress}
      placeholder="Search for an Artist" 
      />
      <button onClick={this.searchArtist}> Search</button>
    </div>
  )
 }
}

export default App;
